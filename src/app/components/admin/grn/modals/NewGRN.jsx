import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Grid,
    Stack,
    Box,
    TextField,
    Slide,
    Autocomplete,
} from "@mui/material";
import classNames from "classnames";
import DropDown from "../../../common/DropDown";
import Snackbar from "../../../common/Snackbar";
import CancelIcon from "@mui/icons-material/Cancel";
import { useStyles } from "../../../../../assets/styles/styles";
import { API_URL } from "../../../shared/API_URLS";
import { http_Request } from "../../../shared/HTTP_Request";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const NewGRN = (props) => {

    const { isModal, isEditMode, isViewMode, grnInfo, closeAction, isRefresh, setIsRefresh } = props;
    const classes = useStyles();

    // State
    const [grnNumber, setGrnNumber] = useState("");
    const [grnDate, setGrnDate] = useState("");
    const [supplierName, setSupplierName] = useState("");
    const [items, setItems] = useState([
        {
            itemId: "",
            quantity: "",
            itemCost: "",
            unitPrice: "",
            batchNo: "",
            stockLocationId: "",
        },
    ]);
    const [snackText, setSnackText] = useState("");
    const [snackVariant, setSnackVariant] = useState("");
    // Example options, replace with API data if needed
    const [itemOptions, setItemOptions] = useState([]);
    const [stockLocationOptions, setStockLocationOptions] = useState([]);

    const [batchNoOptions, setBatchNoOptions] = useState({});

    // Reset/initialize state on open or mode change
    useEffect(() => {
        if (isEditMode || isViewMode) {
            setGrnNumber(grnInfo?.grnNumber || "");
            setGrnDate(grnInfo?.grnDate || "");
            setSupplierName(grnInfo?.supplierName || "");
            setItems(
                grnInfo?.items?.length
                    ? grnInfo.items.map((item) => ({
                        itemId: item.item?.itemId || "",
                        quantity: item.quantity || "",
                        itemCost: item.itemCost || "",
                        unitPrice: item.unitPrice || "",
                        batchNo: item.batchNo || "",
                        stockLocationId: item.stockLocation?.stockLocationId || "",
                    }))
                    : [
                        {
                            itemId: "",
                            quantity: "",
                            itemCost: "",
                            unitPrice: "",
                            batchNo: "",
                            stockLocationId: "",
                        },
                    ]
            );
        } else {
            setGrnNumber("");
            setGrnDate("");
            setSupplierName("");
            setItems([
                {
                    itemId: "",
                    quantity: "",
                    itemCost: "",
                    unitPrice: "",
                    batchNo: "",
                    stockLocationId: "",
                },
            ]);
        }
    }, [isEditMode, isViewMode, grnInfo, isModal]);

    const handleItemChange = async (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;

        // If itemId changes, fetch batch numbers for that item
        if (field === "itemId" && value) {
            const companyId = JSON.parse(localStorage.getItem("userDetail")).companyId;
            const batchNoUrl = API_URL.batch.GET_ALL_BATCHES_BY_ITEM_AND_COMPANY
                .replace("{itemId}", value)
                .replace("{companyId}", companyId);

            const requestBody = {
                url: batchNoUrl,
                method: "GET",
            };
            const successCallback = (response) => {
                if ((response?.status === 200 || response?.status === 201) && response?.data) {
                    setBatchNoOptions(prev => ({
                        ...prev,
                        [index]: response.data.map(b => ({ id: b.batchNumber, name: b.batchNumber }))
                    }));
                } else {
                    setBatchNoOptions(prev => ({ ...prev, [index]: [] }));
                }
            };
            const errorCallback = () => {
                setBatchNoOptions(prev => ({ ...prev, [index]: [] }));
            };
            http_Request(requestBody, successCallback, errorCallback);

            // Optionally clear batchNo when item changes
            updated[index]["batchNo"] = "";
        }

        setItems(updated);
    };

    const addItem = () => {
        setItems([
            ...items,
            {
                itemId: "",
                quantity: "",
                itemCost: "",
                unitPrice: "",
                batchNo: "",
                stockLocationId: "",
            },
        ]);
    };

    // Fetch dropdown data on mount
    useEffect(() => {
        getItemOptionData();
        getStockLocationOptionData();
    }, []);

    // Fetch Item options
    const getItemOptionData = () => {
        let itemDataSearchUrl = API_URL.item.GET_ALL_ITEM_BY_COMPANY.replace(
            "{companyId}",
            JSON.parse(localStorage.getItem("userDetail")).companyId
        );
        const requestBody = {
            url: itemDataSearchUrl,
            method: "GET",
        };
        const successCallback = (response) => {
            if ((response?.status === 200 || response?.status === 201) && response?.data) {
                let tempItemOptions = response?.data?.map((option) => ({
                    id: option?.itemId,
                    name: option?.itemName,
                }));
                setItemOptions(tempItemOptions);
            }
        };
        const errorCallback = (error) => {
            console.log("error", error);
        };
        http_Request(requestBody, successCallback, errorCallback);
    };


    // Fetch Stock Location options
    const getStockLocationOptionData = () => {
        let stockLocationUrl = API_URL.stock_location.GET_ALL_STOCK_LOCATION_BY_COMPANY.replace(
            "{companyId}",
            JSON.parse(localStorage.getItem("userDetail")).companyId
        );
        const requestBody = {
            url: stockLocationUrl,
            method: "GET",
        };
        const successCallback = (response) => {
            if ((response?.status === 200 || response?.status === 201) && response?.data) {
                let tempStockLocationOptions = response?.data?.map((option) => ({
                    id: option?.stockLocationId,
                    name: option?.stockName,
                }));
                setStockLocationOptions(tempStockLocationOptions);
            }
        };
        const errorCallback = (error) => {
            console.log("error", error);
        };
        http_Request(requestBody, successCallback, errorCallback);
    };
    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        // Compose payload and call API here
        const payload = {
            grnNumber,
            grnDate,
            supplierName,
            items,
        };
        // Example: Call API and handle response
        setSnackText(isEditMode ? "GRN updated successfully!" : "GRN created successfully!");
        setSnackVariant("success");
        setIsRefresh && setIsRefresh((prev) => !prev);
        closeAction();
    };

    const resetSnack = () => {
        setSnackText("");
        setSnackVariant("");
    };

    return (
        <Dialog
            open={isModal}
            TransitionComponent={Transition}
            aria-labelledby="batch-modal-dialog-title"
            aria-describedby="batch-modal-dialog-description"
            scroll="body"
            maxWidth="lg"
            fullWidth={true}
        >
            <DialogTitle id="batch-modal-dialog-title" className={classes.modelHeader}>
                {isEditMode ? "Update GRN" : isViewMode ? "View GRN" : "Add GRN"}
                <CancelIcon
                    onClick={() => closeAction()}
                    className={classNames(classes.dialogCloseBtn, classes.appointmentModalCloseIcon)}
                />
            </DialogTitle>
            <DialogContent>
                <Snackbar text={snackText} variant={snackVariant} reset={resetSnack} />
                <Grid container spacing={2} style={{ marginTop: 16 }}>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <TextField
                                size="small"
                                variant="outlined"
                                fullWidth
                                name="grnNumber"
                                label="GRN Number"
                                value={grnNumber}
                                disabled={isViewMode}
                                onChange={(e) => setGrnNumber(e.target.value)}
                            />

                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <TextField
                                size="small"
                                variant="outlined"
                                fullWidth
                                type="date"
                                name="grnDate"
                                label="GRN Date"
                                value={grnDate}
                                disabled={isViewMode}
                                onChange={(e) => setGrnDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Stack spacing={2} sx={{ mt: 2 }}>

                            <TextField
                                size="small"
                                variant="outlined"
                                fullWidth
                                name="supplierName"
                                label="Supplier Name"
                                value={supplierName}
                                disabled={isViewMode}
                                onChange={(e) => setSupplierName(e.target.value)}
                            />
                        </Stack>
                    </Grid>

                </Grid>
                <Grid container spacing={4} style={{ marginTop: 4 }}>
                    <Grid item xs={12} md={12}>
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <Box>
                                <strong>GRN Items</strong>
                                {items.map((item, idx) => (
                                    <Grid container spacing={1} key={idx} alignItems="center" sx={{ mt: 1 }}>
                                        <Grid item xs={2}>
                                            <Autocomplete
                                                size="small"
                                                options={itemOptions}
                                                getOptionLabel={(option) => option.name || ""}
                                                value={itemOptions.find(opt => opt.id === item.itemId) || null}
                                                onChange={(_, newValue) => handleItemChange(idx, "itemId", newValue ? newValue.id : "")}
                                                disabled={isViewMode}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Item" variant="outlined" fullWidth />
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Autocomplete
                                                size="small"
                                                options={batchNoOptions[idx] || []}
                                                getOptionLabel={(option) => option.name || ""}
                                                value={
                                                    (batchNoOptions[idx] || []).find(opt => opt.id === item.batchNo) || null
                                                }
                                                onChange={(_, newValue) => handleItemChange(idx, "batchNo", newValue ? newValue.id : "")}
                                                disabled={isViewMode || !item.itemId}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Batch No" variant="outlined" fullWidth />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <TextField
                                                label="Qty"
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                                                disabled={isViewMode}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField
                                                label="Item Cost"
                                                type="number"
                                                value={item.itemCost}
                                                onChange={(e) => handleItemChange(idx, "itemCost", e.target.value)}
                                                disabled={isViewMode}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField
                                                label="Unit Price"
                                                type="number"
                                                value={item.unitPrice}
                                                onChange={(e) => handleItemChange(idx, "unitPrice", e.target.value)}
                                                disabled={isViewMode}
                                                size="small"
                                            />
                                        </Grid>

                                        <Grid item xs={2}>
                                            <DropDown
                                                id={`stockLocationId-${idx}`}
                                                size="small"
                                                variant="outlined"
                                                value={item.stockLocationId}
                                                optionData={stockLocationOptions}
                                                onChange={(e) => handleItemChange(idx, "stockLocationId", e.target.value)}
                                                label="Stock Location"
                                                disabled={isViewMode}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Button
                                                color="error"
                                                onClick={() => removeItem(idx)}
                                                disabled={items.length === 1 || isViewMode}
                                                size="small"
                                            >
                                                Remove
                                            </Button>
                                        </Grid>
                                    </Grid>
                                ))}
                                {!isViewMode && (
                                    <Button onClick={addItem} sx={{ mt: 1 }}>
                                        Add Item
                                    </Button>
                                )}
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
                <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button onClick={() => closeAction()}>
                        {isViewMode ? "Back" : "Cancel"}
                    </Button>
                    {!isViewMode && (
                        <Button variant="contained" onClick={handleSave} sx={{ ml: 2 }}>
                            {isEditMode ? "Update" : "Save"}
                        </Button>
                    )}
                </Box>
            </DialogContent>
        </Dialog >
    );
};

export default NewGRN;