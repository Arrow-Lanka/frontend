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
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import Snackbar from "../../../common/Snackbar";
import { API_URL } from "../../../shared/API_URLS";
import { http_Request } from "../../../shared/HTTP_Request";
import { useStyles } from "../../../../../assets/styles/styles";
import { FormCommonStyles } from "../../../../../assets/styles/FormCommonStyle";
import classNames from 'classnames';
import TableComponent from "../../../common/material/TableComponent";
import deleteIcon from "../../../../../assets/image/icons/ehr-delete.svg";

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
    const [customers, setCustomers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [stockLocations, setStockLocations] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [snackText, setSnackText] = useState("");
    const [snackVariant, setSnackVariant] = useState("success");
    const [loading, setLoading] = useState(false);
    const [batchNoOptions, setBatchNoOptions] = useState({});

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
        http_Request(
            {
                url: API_URL.non_staff_registration.GET_CUSTOMER_BY_COMPANY.replace("{companyId}", JSON.parse(localStorage.getItem("userDetail")).companyId),
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
                url: API_URL.item.GET_ALL_ITEM_BY_COMPANY.replace("{companyId}", JSON.parse(localStorage.getItem("userDetail")).companyId),
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
                url: API_URL.stock_location.GET_ALL_STOCK_LOCATION_BY_COMPANY.replace("{companyId}", JSON.parse(localStorage.getItem("userDetail")).companyId),
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
        } else {
            setInvoiceDate(new Date().toISOString().slice(0, 10));
            setSelectedCustomer("");
            setCompanyId("");
            setItems([]);
            fetchInvoiceNumber();
        }
        setSnackText("");
        setSnackVariant("success");
    }, [isModal, isEditMode, isViewMode, invoiceInfo]);

    const fetchBatchOptions = (itemId) => {
        if (!itemId) return;
        const companyId = JSON.parse(localStorage.getItem("userDetail")).companyId;
        const batchNoUrl = API_URL.batch.GET_ALL_BATCHES_BY_ITEM_AND_COMPANY
            .replace("{itemId}", itemId)
            .replace("{companyId}", companyId);

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

    const handleSubmit = () => {
        if (!invoiceDate || !items.length) {
            setSnackVariant("error");
            setSnackText("All fields are required!");
            return;
        }
        setLoading(true);
        const companyId = JSON.parse(localStorage.getItem("userDetail")).companyId;

        // Calculate totalAmount
        const totalAmount = items.reduce((sum, item) => sum + (Number(item.lineTotal) || 0), 0);
        const selectedCustomerObj = customers.find(c => c.personId === selectedCustomer);

        const payload = {
            invoiceNumber: invoiceNumber || "", // or generate a new one if needed
            customerName: selectedCustomerObj ? selectedCustomerObj.fullName : "", // not required, but keep if your API expects it
            customerId: selectedCustomer,
            totalAmount,
            companyId,
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
                            isOptionEqualToValue={(option, value) => option.personId === value.personId}
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
                            isOptionEqualToValue={(option, value) => option.itemId === value.itemId}
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
            </DialogContent>
            <DialogActions>
                <Button onClick={closeAction} color="secondary" variant="outlined">
                    {isViewMode ? "Close" : "Cancel"}
                </Button>
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