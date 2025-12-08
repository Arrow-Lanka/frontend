import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Button,
    TextField,
    Typography,
    MenuItem,
    Autocomplete,
    IconButton,
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Snackbar from "../../../common/Snackbar";
import { API_URL } from "../../../shared/API_URLS";
import { http_Request } from "../../../shared/HTTP_Request";
import { useStyles } from "../../../../../assets/styles/styles";
import { FormCommonStyles } from "../../../../../assets/styles/FormCommonStyle";
import classNames from 'classnames';
import TableComponent from "../../../common/material/TableComponent";
import deleteIcon from "../../../../../assets/image/icons/ehr-delete.svg";
import ViewInvoiceModal from "./ViewInvoiceModal";

const NewAndEditSalesInvoice = ({
    isModal = true,
    isEditMode = false,
    isViewMode = false,
    invoiceInfo = {},
    closeAction,
    setIsRefresh
}) => {
    const classes = useStyles();
    const commonClasses = FormCommonStyles();

    const [invoiceDate, setInvoiceDate] = useState("");
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [items, setItems] = useState([]);
    const [paidAmount, setPaidAmount] = useState("");
    // payments support
    const [payments, setPayments] = useState([]); // { paymentId?, paymentDate, amount, note }
    const [newPaymentAmount, setNewPaymentAmount] = useState("");
    const [newPaymentDate, setNewPaymentDate] = useState(new Date().toISOString().slice(0, 10));
    const [newPaymentNote, setNewPaymentNote] = useState("");

    const [customers, setCustomers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [stockLocations, setStockLocations] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [snackText, setSnackText] = useState("");
    const [snackVariant, setSnackVariant] = useState("success");
    const [loading, setLoading] = useState(false);
    const [batchNoOptions, setBatchNoOptions] = useState({});

    const [isViewInvoice, setIsViewInvoice] = React.useState(false);

    const [currentItem, setCurrentItem] = useState({
        itemId: "",
        batchNo: "",
        stockLocationId: "",
        quantity: "",
        unitPrice: "",
        lineTotal: ""
    });

    const fetchInvoiceNumber = () => {
        http_Request(
            { url: API_URL.codeSequence.GET_GENERATED_NUMBER.replace("{codeType}", "Invoice"), method: "GET" },
            (response) => {
                if (response?.status === 200 || response?.status === 201) {
                    setInvoiceNumber(response.data?.name || "");
                }
            }
        );
    };

    // Fetch dropdown data
    useEffect(() => {
        const company = JSON.parse(localStorage.getItem("userDetail")).companyId;
        http_Request(
            {
                url: API_URL.non_staff_registration.GET_CUSTOMER_BY_COMPANY.replace("{companyId}", company),
                method: "GET"
            },
            (response) => {
                if (response?.status === 200 || response?.status === 201) {
                    setCustomers(response?.data || []);
                }
            }
        );
        http_Request(
            { url: API_URL.company.SEARCH_COMPANY, method: "POST", bodyData: { pageNo: 1, pageSize: 100 } },
            (res) => setCompanies(res?.data?.page || []),
            () => { }
        );
        http_Request(
            {
                url: API_URL.item.GET_ALL_ITEM_BY_COMPANY.replace("{companyId}", company),
                method: "GET"
            },
            (response) => {
                if (response?.status === 200 || response?.status === 201) {
                    setAllItems(response?.data || []);
                }
            }
        );
        http_Request(
            {
                url: API_URL.stock_location.GET_ALL_STOCK_LOCATION_BY_COMPANY.replace("{companyId}", company),
                method: "GET"
            },
            (response) => {
                if (response?.status === 200 || response?.status === 201) {
                    setStockLocations(response?.data || []);
                }
            }
        );
    }, []);

    useEffect(() => {
        if (isEditMode || isViewMode) {
            setInvoiceDate(invoiceInfo.invoiceDate || "");
            setSelectedCustomer(invoiceInfo.customerId || "");
            setCompanyId(invoiceInfo.companyId || "");
            setItems(Array.isArray(invoiceInfo.itemList) ? invoiceInfo.itemList.filter(item => item && typeof item === "object" && Object.keys(item).length > 0) : []);
            setInvoiceNumber(invoiceInfo.invoiceNumber || "");

            // load payments if present (supports multiple possible property names)
            const loadedPayments = Array.isArray(invoiceInfo.payments)
                ? invoiceInfo.payments
                : Array.isArray(invoiceInfo.paymentList)
                    ? invoiceInfo.paymentList
                    : Array.isArray(invoiceInfo.paymentsList)
                        ? invoiceInfo.paymentsList
                        : [];

            // normalize and preserve existing payment id (or paymentId) and set id:null for missing
            const normalizedPayments = (loadedPayments || []).map(p => ({
                paymentId: p.paymentId ?? p.id ?? null,
                amount: Number(p.amount ?? p.paidAmount ?? p.paymentAmount ?? 0),
                paymentDate: p.paymentDate || p.date || p.paymentDate || p.createdDate || "",
                note: p.note || p.description || ""
            }));
            setPayments(normalizedPayments);

            // prefer explicit invoiceInfo.paidAmount, otherwise sum payments
            const sumPaid = normalizedPayments.reduce((s, p) => s + (Number(p.amount) || 0), 0);
            setPaidAmount(invoiceInfo.paidAmount != null ? String(invoiceInfo.paidAmount) : (sumPaid ? String(sumPaid) : ""));
        } else {
            setInvoiceDate(new Date().toISOString().slice(0, 10));
            setSelectedCustomer("");
            setCompanyId("");
            setItems([]);
            fetchInvoiceNumber();
            setPaidAmount("");
            setPayments([]);
            setNewPaymentAmount("");
            setNewPaymentDate(new Date().toISOString().slice(0, 10));
            setNewPaymentNote("");
        }
        setSnackText("");
        setSnackVariant("success");
    }, [isModal, isEditMode, isViewMode, invoiceInfo]);

    const fetchBatchOptions = (itemId) => {
        if (!itemId) return;
        const company = JSON.parse(localStorage.getItem("userDetail")).companyId;
        const batchNoUrl = API_URL.batch.GET_ALL_BATCHES_BY_ITEM_AND_COMPANY
            .replace("{itemId}", itemId)
            .replace("{companyId}", company);

        http_Request(
            { url: batchNoUrl, method: "GET" },
            (response) => {
                if ((response?.status === 200 || response?.status === 201) && response?.data) {
                    setBatchNoOptions({ 0: response.data.map(b => ({ id: b.batchNumber, name: b.batchNumber })) });
                } else {
                    setBatchNoOptions({ 0: [] });
                }
            },
            () => setBatchNoOptions({ 0: [] })
        );
    };

    const handleCurrentItemChange = (field, value) => {
        let updated = { ...currentItem, [field]: value };
        if (field === "itemId") {
            updated.batchNo = "";
            fetchBatchOptions(value);
        }
        if (field === "quantity" || field === "unitPrice") {
            const qty = Number(field === "quantity" ? value : updated.quantity) || 0;
            const price = Number(field === "unitPrice" ? value : updated.unitPrice) || 0;
            updated.lineTotal = qty * price;
        }
        setCurrentItem(updated);
    };

    const handleAddCurrentItem = () => {
        if (!currentItem.itemId || !currentItem.stockLocationId || !currentItem.quantity || !currentItem.unitPrice) {
            setSnackVariant("error");
            setSnackText("Please fill all item fields!");
            return;
        }
        if (items.some(item => item.itemId === currentItem.itemId)) {
            setSnackVariant("error");
            setSnackText("This item is already added!");
            return;
        }
        setItems([...items, { ...currentItem }]);
        setCurrentItem({
            itemId: "",
            batchNo: "",
            stockLocationId: "",
            quantity: "",
            unitPrice: "",
            lineTotal: ""
        });
        setBatchNoOptions({});
    };

    // Remove item from the table using array index
    const handleRemoveItem = (rowIndex) => {
        setItems(items.filter((_, idx) => idx !== rowIndex));
    };

    // derived totals
    const totalAmount = items.reduce((sum, item) => sum + (Number(item.lineTotal) || 0), 0);
    const paid = Number(paidAmount) || 0;
    const balance = totalAmount - paid;



    // payments functions
    const addPayment = () => {
        const amt = Number(newPaymentAmount) || 0;
        if (amt <= 0) {
            setSnackVariant("error");
            setSnackText("Payment amount must be greater than zero.");
            return;
        }
        if (amt > balance) {
            setSnackVariant("error");
            setSnackText("Payment cannot exceed remaining balance.");
            return;
        }
        // new payments get id: null
        const payment = { paymentId: null, amount: amt, paymentDate: newPaymentDate, note: newPaymentNote };
        const updated = [...payments, payment];
        setPayments(updated);
        setPaidAmount(String((Number(paidAmount) || 0) + amt));
        setNewPaymentAmount("");
        setNewPaymentDate(new Date().toISOString().slice(0, 10));
        setNewPaymentNote("");
        setSnackVariant("success");
        setSnackText("Payment added.");
    };

    const removePaymentAt = (idx) => {
        const p = payments[idx];
        if (!p) return;
        const updated = payments.filter((_, i) => i !== idx);
        setPayments(updated);
        setPaidAmount(String(Math.max(0, (Number(paidAmount) || 0) - Number(p.amount || 0))));
        setSnackVariant("success");
        setSnackText("Payment removed.");
    };

    const handleSubmit = () => {
        if (!invoiceDate || !items.length) {
            setSnackVariant("error");
            setSnackText("All fields are required!");
            return;
        }

        if (Number(paidAmount) < 0) {
            setSnackVariant("error");
            setSnackText("Paid amount cannot be negative!");
            return;
        }
        if (Number(paidAmount) > totalAmount) {
            setSnackVariant("error");
            setSnackText("Paid amount cannot exceed total amount!");
            return;
        }
        setLoading(true);
        const company = JSON.parse(localStorage.getItem("userDetail")).companyId;

        const selectedCustomerObj = customers.find(c => c.personId === selectedCustomer);

        const payload = {
            invoiceNumber: invoiceNumber || "",
            customerName: selectedCustomerObj ? selectedCustomerObj.fullName : "",
            customerId: selectedCustomer,
            totalAmount,
            paidAmount: Number(paidAmount) || 0,
            // include id for existing payments; new payments have id: null
            payments: payments.map(p => ({
                paymentId: p.paymentId ?? null,
                paymentDate: p.paymentDate || p.date || null, // LocalDate-like string yyyy-mm-dd
                amount: Number(p.amount) || 0,
                note: p.note || ""
            })),
            balance: totalAmount - (Number(paidAmount) || 0),
            companyId: company,
            invoiceDate,
            itemList: items.map(({ itemId, batchNo, stockLocationId, quantity, unitPrice, lineTotal }) => ({
                itemId,
                batchNo,
                stockLocationId,
                quantity,
                unitPrice,
                lineTotal
            }))
        };
        const url = isEditMode
            ? API_URL.salesInvoice.UPDATE_SALES_INVOICE.replace("{invoiceId}", invoiceInfo.invoiceId)
            : API_URL.salesInvoice.CREATE_SALES_INVOICE;
        const method = isEditMode ? "PUT" : "POST";
        http_Request(
            { url, method, bodyData: payload },
            (response) => {
                setLoading(false);
                if (response.status === 200 || response.status === 201) {
                    setSnackVariant("success");
                    setSnackText(`Invoice ${isEditMode ? "updated" : "created"} successfully!`);
                    setTimeout(() => {
                        closeAction && closeAction();
                        setIsRefresh && setIsRefresh(prev => !prev);
                    }, 1000);
                }
            },
            (error) => {
                setLoading(false);
                setSnackVariant("error");
                setSnackText("Failed to save invoice!");
            }
        );
    };

    const itemColumnData = [
        { id: "itemName", name: "Item" },
        { id: "batchNo", name: "Batch No" },
        { id: "stockLocationName", name: "Stock Location" },
        { id: "quantity", name: "Quantity" },
        { id: "unitPrice", name: "Unit Price" },
        { id: "lineTotal", name: "Line Total" },
        {
            id: "action",
            name: "Action",
            template: {
                type: "clickableIconBlock",
                columnAlign: "right",
                iconClickAction: (event, row) => {
                    if (!row) return;
                    const idx = items.findIndex(i => i.itemId === row.itemId && i.stockLocationId === row.stockLocationId);
                    if (idx !== -1) handleRemoveItem(idx);
                },
                icons: [
                    {
                        id: "delete",
                        name: "Remove",
                        alt: "remove",
                        iconLink: deleteIcon,
                        iconClass: commonClasses.pointerClass
                    }
                ]
            }
        }
    ];

    // Prepare itemRows for table (add display fields)
    const itemRows = Array.isArray(items)
        ? items.map((item, idx) => ({
            ...item,
            itemName: allItems.find(i => i.itemId === item.itemId)?.itemName || "",
            stockLocationName: stockLocations.find(loc => loc.stockLocationId === item.stockLocationId)?.stockName || "",
            rowIndex: idx // for remove action
        }))
        : [];

    return (
        <Dialog
            open={isModal}
            onClose={closeAction}
            maxWidth="lg"
            fullWidth
            scroll="body"
            aria-labelledby="sales-invoice-dialog-title"
        >
            <DialogTitle
                id="sales-invoice-dialog-title"
                className={classes.modelHeader}
            >
                {isEditMode ? "Update Sales Invoice" : "Add Sales Invoice"}
                <CancelIcon
                    onClick={() => closeAction()}
                    className={classNames(classes.dialogCloseBtn, classes.appointmentModalCloseIcon)}
                />
            </DialogTitle>
            <DialogContent dividers className={commonClasses.mainCardContainer}>
                <Snackbar text={snackText} variant={snackVariant} reset={() => setSnackText("")} />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Invoice Date"
                            type="date"
                            value={invoiceDate}
                            onChange={e => setInvoiceDate(e.target.value)}
                            fullWidth
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            disabled={isViewMode}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Autocomplete
                            options={customers}
                            getOptionLabel={option => option.fullName || ""}
                            value={customers.find(customer => customer.personId === selectedCustomer) || null}
                            onChange={(_, newValue) => setSelectedCustomer(newValue ? newValue.personId : "")}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label="Select Customer"
                                    fullWidth
                                    size="small"
                                />
                            )}
                            isOptionEqualToValue={(option, value) => option.personId === value?.personId}
                            disabled={isViewMode}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Invoice Number"
                                value={invoiceNumber}
                                onChange={e => setInvoiceNumber(e.target.value)}
                                fullWidth
                                size="small"
                                disabled
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Typography sx={{ mt: 2, mb: 1, fontWeight: 600 }}>Add Item</Typography>
                <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Grid item xs={2}>
                        <Autocomplete
                            options={allItems}
                            getOptionLabel={option => option.itemName || ""}
                            value={currentItem.itemId ? allItems.find(i => i.itemId === currentItem.itemId) : null}
                            onChange={(_, newValue) => handleCurrentItemChange("itemId", newValue ? newValue.itemId : "")}
                            renderInput={params => <TextField {...params} label="Item" size="small" />}
                            isOptionEqualToValue={(option, value) => option.itemId === value?.itemId}
                            disabled={isViewMode}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Autocomplete
                            size="small"
                            options={batchNoOptions[0] || []}
                            getOptionLabel={option => option.name || ""}
                            value={
                                (batchNoOptions[0] || []).find(opt => opt.id === currentItem.batchNo) ||
                                (currentItem.batchNo ? { id: currentItem.batchNo, name: currentItem.batchNo } : null)
                            }
                            onChange={(_, newValue) => handleCurrentItemChange("batchNo", newValue ? newValue.id : "")}
                            disabled={isViewMode || !currentItem.itemId}
                            renderInput={params => <TextField {...params} label="Batch No" size="small" />}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            select
                            label="Stock Location"
                            value={currentItem.stockLocationId}
                            onChange={e => handleCurrentItemChange("stockLocationId", e.target.value)}
                            fullWidth
                            size="small"
                            disabled={isViewMode}
                        >
                            {stockLocations.map(loc => (
                                <MenuItem key={loc.stockLocationId} value={loc.stockLocationId}>{loc.stockName}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={1.5}>
                        <TextField
                            label="Quantity"
                            type="number"
                            value={currentItem.quantity}
                            onChange={e => handleCurrentItemChange("quantity", e.target.value)}
                            fullWidth
                            size="small"
                            disabled={isViewMode}
                        />
                    </Grid>
                    <Grid item xs={1.5}>
                        <TextField
                            label="Unit Price"
                            type="number"
                            value={currentItem.unitPrice}
                            onChange={e => handleCurrentItemChange("unitPrice", e.target.value)}
                            fullWidth
                            size="small"
                            disabled={isViewMode}
                        />
                    </Grid>
                    <Grid item xs={1.5}>
                        <TextField
                            label="Line Total"
                            value={currentItem.lineTotal}
                            fullWidth
                            size="small"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={
                                !currentItem.itemId ||
                                !currentItem.stockLocationId ||
                                !currentItem.quantity ||
                                !currentItem.unitPrice
                            }
                            onClick={handleAddCurrentItem}
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>

                <Typography sx={{ mt: 2, mb: 1, fontWeight: 600 }}>Items</Typography>
                <TableComponent
                    classes={classes}
                    columns={itemColumnData}
                    rows={itemRows}
                    isPagination={false}
                />

                {/* Payment summary */}
                <Grid container spacing={2} sx={{ mt: 2 }} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Total Amount"
                            value={totalAmount.toFixed(2)}
                            fullWidth
                            size="small"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Paid Amount"
                            type="number"
                            value={paidAmount}
                            onChange={e => setPaidAmount(e.target.value)}
                            fullWidth
                            size="small"
                            // editable when creating only; in edit mode payments control paidAmount
                            disabled={isViewMode || isEditMode}
                            inputProps={{ min: 0, max: totalAmount }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Balance"
                            value={balance.toFixed(2)}
                            fullWidth
                            size="small"
                            disabled
                        />
                    </Grid>

                    {/* Payments list */}
                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <Typography sx={{ fontWeight: 600 }}>Payments</Typography>
                    </Grid>

                    {payments.length > 0 ? (
                        <Grid item xs={12}>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item xs={3}><Typography sx={{ fontWeight: 600 }}>Date</Typography></Grid>
                                <Grid item xs={3}><Typography sx={{ fontWeight: 600 }}>Amount</Typography></Grid>
                                <Grid item xs={5}><Typography sx={{ fontWeight: 600 }}>Note</Typography></Grid>
                                <Grid item xs={1}></Grid>
                            </Grid>

                            {payments.map((p, idx) => (
                                <Grid container spacing={1} alignItems="center" key={idx} sx={{ mt: 0.5 }}>
                                    <Grid item xs={3}><TextField size="small" fullWidth value={p.paymentDate || p.date || ""} disabled /></Grid>
                                    <Grid item xs={3}><TextField size="small" fullWidth value={(Number(p.amount) || 0).toFixed(2)} disabled /></Grid>
                                    <Grid item xs={5}><TextField size="small" fullWidth value={p.note || ""} disabled /></Grid>
                                    <Grid item xs={1}>
                                        {!isViewMode && isEditMode && (
                                            <IconButton size="small" onClick={() => removePaymentAt(idx)} aria-label="delete-payment">
                                                <DeleteOutlineIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Grid item xs={12}><Typography color="text.secondary">No payments recorded.</Typography></Grid>
                    )}

                    {/* Add payment controls - only in edit mode */}
                    {isEditMode && (
                        <>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    label="Payment Amount"
                                    type="number"
                                    value={newPaymentAmount}
                                    onChange={e => setNewPaymentAmount(e.target.value)}
                                    fullWidth
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    label="Payment Date"
                                    type="date"
                                    value={newPaymentDate}
                                    onChange={e => setNewPaymentDate(e.target.value)}
                                    fullWidth
                                    size="small"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Note"
                                    value={newPaymentNote}
                                    onChange={e => setNewPaymentNote(e.target.value)}
                                    fullWidth
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={addPayment}
                                    disabled={Number(newPaymentAmount) <= 0 || Number(newPaymentAmount) > balance}
                                >
                                    Add Payment
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeAction} color="secondary" variant="outlined">
                    {isViewMode ? "Close" : "Cancel"}
                </Button>

                <Button
                    onClick={() => setIsViewInvoice(true)}
                    color="secondary"
                    variant="outlined"
                >
                    Print
                </Button>

                {isViewInvoice && (
                    <ViewInvoiceModal
                        isOpenModal={isViewInvoice}
                        closeModalAction={() => setIsViewInvoice(false)}
                        selectedInvoiceId={invoiceNumber}
                    />
                )}

                {!isViewMode && (
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                        disabled={loading}
                    >
                        {isEditMode ? "Update Invoice" : "Create Invoice"}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default NewAndEditSalesInvoice;