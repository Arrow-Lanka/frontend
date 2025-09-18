import React, { useState, useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Grid, Button, Typography, TextField, MenuItem, Stepper, Step, StepLabel
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import Snackbar from "../../../common/Snackbar";
import { API_URL } from "../../../shared/API_URLS";
import { http_Request } from "../../../shared/HTTP_Request";
import { useStyles } from "../../../../../assets/styles/styles";
import { FormCommonStyles } from "../../../../../assets/styles/FormCommonStyle";
import classNames from 'classnames';

const steps = [
    "Start ",
    "Steam ",
    "Drying ",
    "Final Details"
];

const SteamProduction = ({
    isModal = true,
    isEditMode = false,
    isViewMode = false,
    productionInfo = {},
    closeAction,
    setIsRefresh,
}) => {
    const commonClasses = FormCommonStyles();
    const classes = useStyles();
    const [snackText, setSnackText] = useState("");
    const [snackVariant, setSnackVariant] = useState("success");
    const [activeStep, setActiveStep] = useState(0);
    const [steamProductionId, setSteamProductionId] = useState(null);

    // Dropdown options
    const [locationOptions, setLocationOptions] = useState([]);
    const [paddyOptions, setPaddyOptions] = useState([]);
    const [steamPaddyOptions, setSteamPaddyOptions] = useState([]);
    const [batchNoOptions, setBatchNoOptions] = useState([]);

    // Main fields
    const [productionDate, setProductionDate] = useState("");
    const [rawPaddyItem, setRawPaddyItem] = useState("");
    const [batchNo, setBatchNo] = useState("");
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");
    const [steamPaddyItem, setSteamPaddyItem] = useState("");
    const [paddyQuantity, setPaddyQuantity] = useState("");
    const [waterAddingTime, setWaterAddingTime] = useState("");
    const [waterReleaseTime, setWaterReleaseTime] = useState("");
    const [steamStartTime, setSteamStartTime] = useState("");
    const [steamEndTime, setSteamEndTime] = useState("");
    const [dryingStartTime, setDryingStartTime] = useState("");
    const [dryingEndTime, setDryingEndTime] = useState("");
    const [finalMoisture, setFinalMoisture] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch dropdowns on mount
    useEffect(() => {
        const companyId = JSON.parse(localStorage.getItem("userDetail")).companyId;
        setCompanyId(companyId);
        // Fetch locations
        http_Request(
            { url: API_URL.stock_location.GET_ALL_STOCK_LOCATION_BY_COMPANY.replace("{companyId}", companyId), method: "GET" },
            (res) => setLocationOptions(res?.data || [])
        );
        // Fetch paddy items
        getItemOptionData();
    }, []);

    const getItemOptionData = () => {
        const companyId = JSON.parse(localStorage.getItem("userDetail")).companyId;
        let compositeDataSearchUrl =
            API_URL.item.GET_ALL_ITEM_BY_CATEGORY_DETAILS.replace("{companyId}", companyId);
        const requestBody = {
            url: compositeDataSearchUrl,
            method: "GET",
        };
        const successCallback = (response) => {
            if (
                (response?.status === 200 || response?.status === 201) &&
                response?.data
            ) {
                let tempPaddyOptions = response?.data?.Paddy?.map((option) => ({
                    id: option?.id,
                    name: option?.name,
                }));
                setPaddyOptions(tempPaddyOptions);

                let tempSteamOptions = response?.data?.SteamPaddy?.map((option) => ({
                    id: option?.id,
                    name: option?.name,
                }));
                setSteamPaddyOptions(tempSteamOptions);
            }
        };
        const errorCallback = (error) => {
            console.log("error", error);
        };
        http_Request(requestBody, successCallback, errorCallback);
    };

    // Fetch batch options when rawPaddyItem changes
    useEffect(() => {
        if (!rawPaddyItem) return;
        const companyId = JSON.parse(localStorage.getItem("userDetail")).companyId;
        const batchNoUrl = API_URL.batch.GET_ALL_BATCHES_BY_ITEM_AND_COMPANY
            .replace("{itemId}", rawPaddyItem)
            .replace("{companyId}", companyId);
        http_Request(
            { url: batchNoUrl, method: "GET" },
            (res) => setBatchNoOptions((res?.data || []).map(b => ({
                id: String(b.batchNumber), name: b.batchNumber
            })))
        );
    }, [rawPaddyItem]);

    // Reset or populate form
    useEffect(() => {
        setActiveStep(0);
        if ((isEditMode || isViewMode) && productionInfo) {
            setSteamProductionId(productionInfo.steamProductionId || "");
            setProductionDate(productionInfo.productionDate || "");
            setRawPaddyItem(productionInfo.rawPaddyItem || "");
            setBatchNo(productionInfo.batchNo || "");
            setFromLocation(productionInfo.fromLocation || "");
            setToLocation(productionInfo.toLocation || "");
            setSteamPaddyItem(productionInfo.steamPaddyItem || "");
            setPaddyQuantity(productionInfo.paddyQuantity || "");
            setWaterAddingTime(productionInfo.waterAddingTime || "");
            setWaterReleaseTime(productionInfo.waterReleaseTime || "");
            setSteamStartTime(productionInfo.steamStartTime || "");
            setSteamEndTime(productionInfo.steamEndTime || "");
            setDryingStartTime(productionInfo.dryingStartTime || "");
            setDryingEndTime(productionInfo.dryingEndTime || "");
            setFinalMoisture(productionInfo.finalMoisture || "");
            setCompanyId(productionInfo.companyId || companyId);
        } else {
            setProductionDate("");
            setRawPaddyItem("");
            setBatchNo("");
            setFromLocation("");
            setToLocation("");
            setSteamPaddyItem("");
            setPaddyQuantity("");
            setWaterAddingTime("");
            setWaterReleaseTime("");
            setSteamStartTime("");
            setSteamEndTime("");
            setDryingStartTime("");
            setDryingEndTime("");
            setFinalMoisture("");
            setCompanyId(companyId);
        }
        setSnackText("");
        setSnackVariant("success");
    }, [isModal, isEditMode, isViewMode, productionInfo]);

    // Step validation
    const isStepValid = () => {
        if (activeStep === 0) {
            return (
                productionDate && rawPaddyItem && batchNo && fromLocation && paddyQuantity &&
                waterAddingTime
            );
        }
        if (activeStep === 1) {
            return waterReleaseTime && steamStartTime;
        }
        if (activeStep === 2) {
            return steamEndTime && dryingStartTime;
        }
        if (activeStep === 3) {
            return dryingEndTime && finalMoisture && steamPaddyItem && toLocation;
        }
        return false;
    };

    // Stepper content
    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Production Date"
                                type="date"
                                value={productionDate}
                                onChange={e => setProductionDate(e.target.value)}
                                fullWidth
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                disabled={isViewMode}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                select
                                label="Raw Paddy Item"
                                value={rawPaddyItem}
                                onChange={e => setRawPaddyItem(e.target.value)}
                                fullWidth
                                size="small"
                                disabled={isViewMode}
                            >
                                {paddyOptions.map(item => (
                                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                select
                                label="Batch No"
                                value={batchNo || ""}
                                onChange={e => setBatchNo(e.target.value)}
                                fullWidth
                                size="small"
                                disabled={isViewMode || !rawPaddyItem}
                            >
                                {batchNoOptions.map(opt => (
                                    <MenuItem key={opt.id} value={opt.id}>{opt.name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                select
                                label="From Location"
                                value={fromLocation}
                                onChange={e => setFromLocation(e.target.value)}
                                fullWidth
                                size="small"
                                disabled={isViewMode}
                            >
                                {locationOptions.map(loc => (
                                    <MenuItem key={loc.stockLocationId} value={loc.stockLocationId}>{loc.stockName}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Paddy Quantity"
                                type="number"
                                value={paddyQuantity}
                                onChange={e => setPaddyQuantity(e.target.value)}
                                fullWidth
                                size="small"
                                disabled={isViewMode}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Water Adding Time"
                                type="datetime-local"
                                value={waterAddingTime}
                                onChange={e => setWaterAddingTime(e.target.value)}
                                fullWidth
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                disabled={isViewMode}
                            />
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Water Release Time"
                                type="datetime-local"
                                value={waterReleaseTime}
                                onChange={e => setWaterReleaseTime(e.target.value)}
                                fullWidth
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                disabled={isViewMode}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Steam Start Time"
                                type="datetime-local"
                                value={steamStartTime}
                                onChange={e => setSteamStartTime(e.target.value)}
                                fullWidth
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                disabled={isViewMode}
                            />
                        </Grid>
                    </Grid>
                );
            case 2:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Steam End Time"
                                type="datetime-local"
                                value={steamEndTime}
                                onChange={e => setSteamEndTime(e.target.value)}
                                fullWidth
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                disabled={isViewMode}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Drying Start Time"
                                type="datetime-local"
                                value={dryingStartTime}
                                onChange={e => setDryingStartTime(e.target.value)}
                                fullWidth
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                disabled={isViewMode}
                            />
                        </Grid>
                    </Grid>
                );
            case 3:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Drying End Time"
                                type="datetime-local"
                                value={dryingEndTime}
                                onChange={e => setDryingEndTime(e.target.value)}
                                fullWidth
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                disabled={isViewMode}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Final Moisture (%)"
                                type="number"
                                value={finalMoisture}
                                onChange={e => setFinalMoisture(e.target.value)}
                                fullWidth
                                size="small"
                                disabled={isViewMode}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                label="Steam Paddy Item"
                                value={steamPaddyItem}
                                onChange={e => setSteamPaddyItem(e.target.value)}
                                fullWidth
                                size="small"
                                disabled={isViewMode}
                            >
                                {steamPaddyOptions.map(item => (
                                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                label="To Location"
                                value={toLocation}
                                onChange={e => setToLocation(e.target.value)}
                                fullWidth
                                size="small"
                                disabled={isViewMode}
                            >
                                {locationOptions.map(loc => (
                                    <MenuItem key={loc.stockLocationId} value={loc.stockLocationId}>{loc.stockName}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                );
            default:
                return null;
        }
    };

    return (
        <Dialog
            open={isModal}
            onClose={closeAction}
            maxWidth="lg"
            fullWidth
            scroll="body"
            aria-labelledby="steam-production-dialog-title"
        >
            <DialogTitle
                id="steam-production-dialog-title"
                className={classes.modelHeader}
            >
                {isViewMode ? "View Steam Production" : isEditMode ? "Update Steam Production" : "Add Steam Production"}
                <CancelIcon
                    onClick={closeAction}
                    className={classNames(classes.dialogCloseBtn, classes.appointmentModalCloseIcon)}
                />
            </DialogTitle>
            <DialogContent dividers className={commonClasses.mainCardContainer}>
                <Snackbar text={snackText} variant={snackVariant} reset={() => setSnackText("")} />
                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {renderStepContent(activeStep)}
            </DialogContent>
           
            <DialogActions>
                <Button onClick={closeAction} color="secondary" variant="outlined">
                    {isViewMode ? "Close" : "Cancel"}
                </Button>

                {isViewMode ? (
                    <>
                        {activeStep > 0 && (
                            <Button
                                onClick={() => setActiveStep(prev => prev - 1)}
                                color="inherit"
                                variant="outlined"
                            >
                                Back
                            </Button>
                        )}
                        {activeStep < steps.length - 1 && (
                            <Button
                                onClick={() => setActiveStep(prev => prev + 1)}
                                color="primary"
                                variant="contained"
                            >
                                Next
                            </Button>
                        )}
                    </>
                ) : (
                    <>
                        {activeStep > 0 && (
                            <Button
                                onClick={() => setActiveStep(prev => prev - 1)}
                                color="inherit"
                                variant="outlined"
                            >
                                Back
                            </Button>
                        )}

                        {/* First Step: Show Save and Next separately for Add mode */}
                        {activeStep === 0 && !isEditMode ? (
                            <>
                                <Button
                                    onClick={() => {
                                        if (!isStepValid()) {
                                            setSnackVariant("error");
                                            setSnackText("Please fill all required fields in this step!");
                                            return;
                                        }
                                        setLoading(true);
                                        const payload = {
                                            companyId: Number(JSON.parse(localStorage.getItem("userDetail")).companyId),
                                            productionDate,
                                            rawPaddyItem: Number(rawPaddyItem),
                                            batchNo,
                                            fromLocation: Number(fromLocation),
                                            paddyQuantity: Number(paddyQuantity),
                                            waterAddingTime,
                                        };
                                        http_Request(
                                            {
                                                url: API_URL.steam.SAVE_STEAM,
                                                method: "POST",
                                                bodyData: payload,
                                            },
                                            (response) => {
                                                setLoading(false);
                                                if (response.status === 200 || response.status === 201) {
                                                    setSnackVariant("success");
                                                    setSnackText("Saved!");
                                                    if (response.data?.steamProductionId) {
                                                        setSteamProductionId(response.data.steamProductionId);
                                                    }
                                                } else {
                                                    setSnackVariant("error");
                                                    setSnackText("Failed to save step!");
                                                }
                                            },
                                            (error) => {
                                                setLoading(false);
                                                setSnackVariant("error");
                                                setSnackText("Failed to save step!");
                                            }
                                        );
                                    }}
                                    color="primary"
                                    variant="contained"
                                    disabled={loading}
                                >
                                    Save
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (!steamProductionId) {
                                            setSnackVariant("error");
                                            setSnackText("Please save before going next!");
                                            return;
                                        }
                                        setActiveStep(prev => prev + 1);
                                    }}
                                    color="primary"
                                    variant="outlined"
                                    disabled={loading}
                                >
                                    Next
                                </Button>
                            </>
                        ) : (
                            activeStep < steps.length - 1 ? (
                                <>
                                    <Button
                                        onClick={() => {
                                            if (!isStepValid()) {
                                                setSnackVariant("error");
                                                setSnackText("Please fill all required fields in this step!");
                                                return;
                                            }
                                            setLoading(true);
                                            let payload = { companyId: Number(JSON.parse(localStorage.getItem("userDetail")).companyId), steamProductionId: steamProductionId };
                                            if (activeStep === 1) {
                                                payload = {
                                                    ...payload,
                                                    waterReleaseTime,
                                                    steamStartTime,
                                                    // Step 0 fields
                                                    productionDate,
                                                    rawPaddyItem: Number(rawPaddyItem),
                                                    batchNo,
                                                    fromLocation: Number(fromLocation),
                                                    paddyQuantity: Number(paddyQuantity),
                                                    waterAddingTime,
                                                };
                                            } else if (activeStep === 2) {
                                                payload = {
                                                    ...payload,
                                                    steamEndTime,
                                                    dryingStartTime,
                                                    // Step 0 & 1 fields
                                                    productionDate,
                                                    rawPaddyItem: Number(rawPaddyItem),
                                                    batchNo,
                                                    fromLocation: Number(fromLocation),
                                                    paddyQuantity: Number(paddyQuantity),
                                                    waterAddingTime,
                                                    waterReleaseTime,
                                                    steamStartTime,
                                                };
                                            } else if (activeStep === 0 && isEditMode) {
                                                payload = {
                                                    ...payload,
                                                    productionDate,
                                                    rawPaddyItem: Number(rawPaddyItem),
                                                    batchNo,
                                                    fromLocation: Number(fromLocation),
                                                    paddyQuantity: Number(paddyQuantity),
                                                    waterAddingTime,
                                                };
                                            }
                                            http_Request(
                                                {
                                                    url: API_URL.steam.UPDATE_STEAM.replace('{produceId}', steamProductionId),
                                                    method: "PUT",
                                                    bodyData: payload,
                                                },
                                                (response) => {
                                                    setLoading(false);
                                                    if (response.status === 200 || response.status === 201) {
                                                        setSnackVariant("success");
                                                        setSnackText("Step updated!");
                                                    } else {
                                                        setSnackVariant("error");
                                                        setSnackText("Failed to update step!");
                                                    }
                                                },
                                                (error) => {
                                                    setLoading(false);
                                                    setSnackVariant("error");
                                                    setSnackText("Failed to update step!");
                                                }
                                            );
                                        }}
                                        color="primary"
                                        variant="outlined"
                                        disabled={loading}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            if (!steamProductionId) {
                                                setSnackVariant("error");
                                                setSnackText("No steam production ID. Please save first step.");
                                                return;
                                            }
                                            setActiveStep(prev => prev + 1);
                                        }}
                                        color="primary"
                                        variant="contained"
                                        disabled={loading}
                                    >
                                        Next
                                    </Button>
                                </>
                            ) : (
                                // Last step: Finish/Update
                                <Button
                                    onClick={() => {
                                        if (!isStepValid()) {
                                            setSnackVariant("error");
                                            setSnackText("Please fill all required fields in this step!");
                                            return;
                                        }
                                        setLoading(true);
                                        const payload = {
                                            steamProductionId: steamProductionId,
                                            companyId: Number(JSON.parse(localStorage.getItem("userDetail")).companyId),
                                            dryingEndTime,
                                            finalMoisture: Number(finalMoisture),
                                            steamPaddyItem: Number(steamPaddyItem),
                                            toLocation: Number(toLocation),
                                            // All previous step fields
                                            productionDate,
                                            rawPaddyItem: Number(rawPaddyItem),
                                            batchNo,
                                            fromLocation: Number(fromLocation),
                                            paddyQuantity: Number(paddyQuantity),
                                            waterAddingTime,
                                            waterReleaseTime,
                                            steamStartTime,
                                            steamEndTime,
                                            dryingStartTime,
                                        };
                                        http_Request(
                                            {
                                                url: API_URL.steam.UPDATE_STEAM.replace('{produceId}', steamProductionId),
                                                method: "PUT",
                                                bodyData: payload,
                                            },
                                            (response) => {
                                                setLoading(false);
                                                if (response.status === 200 || response.status === 201) {
                                                    setSnackVariant("success");
                                                    setSnackText("Steam production entry saved successfully!");
                                                    setTimeout(() => {
                                                        closeAction && closeAction();
                                                        setIsRefresh && setIsRefresh(prev => !prev);
                                                    }, 1000);
                                                } else {
                                                    setSnackVariant("error");
                                                    setSnackText("Failed to save steam production entry!");
                                                }
                                            },
                                            (error) => {
                                                setLoading(false);
                                                setSnackVariant("error");
                                                setSnackText("Failed to save steam production entry!");
                                            }
                                        );
                                    }}
                                    color="primary"
                                    variant="contained"
                                    disabled={loading}
                                >
                                    {isEditMode ? "Update Steam Production" : "Start Steam Production"}
                                </Button>
                            )
                        )}
                    </>
                )}
            </DialogActions>

        </Dialog>
    );
};

export default SteamProduction;