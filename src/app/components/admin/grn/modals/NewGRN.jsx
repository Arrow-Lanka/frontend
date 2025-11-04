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

        const fetchGRNNumber = () => {
        http_Request(
            { url: API_URL.codeSequence.GET_GENERATED_NUMBER.replace("{codeType}", "GRN"), method: "GET" },
            (response) => {
                if (response?.status === 200 || response?.status === 201) {
                    setGrnNumber(response.data?.name || "");
                }
            }
        );
    };

    // Error fields
    const [errorFields, setErrorFields] = useState({});

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
        console.log("grnInfo?.grnItemRequestModelList", grnInfo?.grnItemRequestModelList);
        setItems(
            grnInfo?.grnItemRequestModelList?.length
                ? grnInfo.grnItemRequestModelList.map((item) => ({
                    grnItemId: item.grnItemId || "",
                    itemId: item.itemId || "",
                    quantity: item.quantity || "",
                    itemCost: item.itemCost || "",
                    unitPrice: item.unitPrice || "",
                    batchNo: item.batchNo || "",
                    stockLocationId: item.stockLocation || "",
                }))
                : [
                    {grnItemId: "",
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
        fetchGRNNumber();
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
        const last = items[items.length - 1];
        // Only add a new item if the last item is fully filled
        if (
            last.itemId &&
            last.quantity &&
            last.stockLocationId
        ) {
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
        } else {
            setSnackVariant("error");
            setSnackText("Please fill all fields before adding a new item.");
        }
    };


    const isLastItemValid = () => {
        const lastItem = items[items.length - 1];

        if (lastItem.itemId &&
            lastItem.quantity &&
            lastItem.stockLocationId) {
                return true;
        } else {
            setSnackVariant("error");
            setSnackText("Please fill all fields in New Item before saving a GRN.");
        }
        
    };


    // Fetch dropdown data on mount
    useEffect(() => {
        getItemOptionData();
        getStockLocationOptionData();
    }, []);

    // Reset snackbar
    const resetSnack = () => {
        setSnackText();
        setSnackVariant();
    };

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
      
        let canSave = true;


        if (!isEditMode) {
            if (!grnNumber.length) {
                setErrorFields({ ...errorFields, grnNumber: !grnNumber.length });
                setSnackVariant("error");
                setSnackText("GRN Number is Required!");
                canSave = false;
            } else if (!grnDate?.length) {
                setErrorFields({ ...errorFields, grnDate: !grnDate.length });
                setSnackVariant("error");
                setSnackText("GRN Date is Required!");
                canSave = false;
            }
        }

        if (!isLastItemValid()) {
            canSave = false;
        }

        if (canSave) {
            const companyId = JSON.parse(localStorage.getItem("userDetail")).companyId;
            const payload = {
                grnNumber,
                grnDate,
                companyId,

                grnItemRequestModelList: items.map(item => ({
                        grnItemId: Number(item.grnItemId) || undefined,
                    itemId: Number(item.itemId),
                    quantity: Number(item.quantity),
                    unitPrice: Number(item.unitPrice),
                    itemCost: Number(item.itemCost),
                    batchNo: item.batchNo,
                    stockLocation: Number(item.stockLocationId)

                }))


            };

            if (isEditMode) {
                payload["grnId"] = grnInfo.grnId;
            }

            http_Request(
                {
                    url: isEditMode ? API_URL?.grn?.UPDATE_GRN.replace('{grnId}', grnInfo.grnId) : API_URL?.grn?.CREATE_GRN,
                    method: isEditMode ? "PUT" : "POST",
                    bodyData: payload,
                },
                function successCallback(response) {
                    if (response.status === 200 || response.status === 201) {
                        setSnackVariant("success");

                        setSnackText(`GRN ${grnNumber} is ${isEditMode ? 'Updated' : 'Created'} Successfully...!`);

                        setTimeout(() => {
                            closeAction();
                            
                            setIsRefresh(!isRefresh);
                          
                        }, 1000);
                    }
                },
                function errorCallback(error) {
                    console.log("GRN", error);
                    setSnackVariant("error");
                    setSnackText(`GRN ${grnNumber} is ${isEditMode ? 'Updated' : 'Created'} Faild...!`);
                }
            );
        }



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

                                value={grnNumber}
                                disabled
                                onChange={(e) => {
                                    setGrnNumber(e.target.value);
                                    setErrorFields({ ...errorFields, grnNumber: false });
                                }}
                                error={errorFields?.grnNumber}
                                label={
                                    <span>
                                        GRN Number <span style={{ color: "red" }}>*</span>
                                    </span>
                                }
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

                                value={grnDate}
                                disabled={isViewMode}
                                onChange={(e) => {
                                    setGrnDate(e.target.value);
                                    setErrorFields({ ...errorFields, grnDate: false });
                                }}
                                error={errorFields?.grnDate}
                                label={
                                    <span>
                                        GRN Date <span style={{ color: "red" }}>*</span>
                                    </span>
                                }
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
                                                    (batchNoOptions[idx] || []).find(opt => opt.id === item.batchNo) || 
                                                    (item.batchNo ? { id: item.batchNo, name: item.batchNo } : null)
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
                                    <Button onClick={addItem} sx={{ mt: 1 }}
                                    >
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