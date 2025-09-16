import React, { useState, useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Grid, Button, Typography, TextField, MenuItem
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import Snackbar from "../../../common/Snackbar";
import { API_URL } from "../../../shared/API_URLS";
import { http_Request } from "../../../shared/HTTP_Request";
import { useStyles } from "../../../../../assets/styles/styles";
import { FormCommonStyles } from "../../../../../assets/styles/FormCommonStyle";
import classNames from 'classnames';

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

    // Dropdown options
    const [locationOptions, setLocationOptions] = useState([]);
    const [paddyOptions, setPaddyOptions] = useState([]);
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
        http_Request(
            { url: API_URL.item.GET_ALL_ITEM_BY_COMPANY.replace("{companyId}", companyId), method: "GET" },
            (res) => setPaddyOptions(res?.data || [])
        );
    }, []);

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
        if ((isEditMode || isViewMode) && productionInfo) {
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

    const handleSubmit = () => {
        if (
            !productionDate || !rawPaddyItem || !batchNo || !fromLocation || !toLocation ||
            !steamPaddyItem || !paddyQuantity || !waterAddingTime || !waterReleaseTime ||
            !steamStartTime || !steamEndTime || !dryingStartTime || !dryingEndTime || !finalMoisture
        ) {
            setSnackVariant("error");
            setSnackText("Please fill all required fields!");
            return;
        }
        setLoading(true);
        const payload = {
            productionDate,
            rawPaddyItem: Number(rawPaddyItem),
            batchNo,
            fromLocation: Number(fromLocation),
            toLocation: Number(toLocation),
            steamPaddyItem: Number(steamPaddyItem),
            paddyQuantity: Number(paddyQuantity),
            waterAddingTime,
            waterReleaseTime,
            steamStartTime,
            steamEndTime,
            dryingStartTime,
            dryingEndTime,
            finalMoisture: Number(finalMoisture),
            companyId: Number(companyId)
        };
        http_Request(
            { url: isEditMode ? API_URL.milling.UPDATE_MILLING : API_URL.milling.SAVE_MILLING, method: isEditMode ? "PUT" : "POST", bodyData: payload },
            (response) => {
                setLoading(false);
                if (response.status === 200 || response.status === 201) {
                    setSnackVariant("success");
                    setSnackText("Steam production entry saved successfully!");
                    setTimeout(() => {
                        closeAction && closeAction();
                        setIsRefresh && setIsRefresh(prev => !prev);
                    }, 1000);
                }
            },
            (error) => {
                setLoading(false);
                setSnackVariant("error");
                setSnackText("Failed to save steam production entry!");
            }
        );
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
                <Grid container spacing={2} style={{ marginTop: 16 }}>
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
                    <Grid item xs={12} md={4}>
                        <TextField
                            select
                            label="Steam Paddy Item"
                            value={steamPaddyItem}
                            onChange={e => setSteamPaddyItem(e.target.value)}
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
                    <Grid item xs={12} md={4}>
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
                    <Grid item xs={12} md={4}>
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
                    <Grid item xs={12} md={4}>
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
                    <Grid item xs={12} md={4}>
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
                    <Grid item xs={12} md={4}>
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
                    <Grid item xs={12} md={4}>
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
                </Grid>
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
                        {isEditMode ? "Update Steam Production" : "Create Steam Production"}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default SteamProduction;