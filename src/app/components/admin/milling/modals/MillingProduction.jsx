import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  Typography,
  TextField,
  MenuItem,
  Box,
  IconButton
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel'
import Snackbar from "../../../common/Snackbar";
import { API_URL } from "../../../shared/API_URLS";
import { http_Request } from "../../../shared/HTTP_Request";
import { useStyles } from "../../../../../assets/styles/styles";
import { FormCommonStyles } from "../../../../../assets/styles/FormCommonStyle";
import classNames from 'classnames';

const MillingProduction = ({
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
  const [itemOptions, setItemOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [byProductOptions, setByProductOptions] = useState([]);

  // Main fields
  const [productionDate, setProductionDate] = useState("");
  const [paddyItem, setPaddyItem] = useState("");
  const [paddyBatch, setPaddyBatch] = useState("");
  const [totalPaddyKg, setTotalPaddyKg] = useState("");
  const [riceItem, setRiceItem] = useState("");
  const [mainRiceKg, setMainRiceKg] = useState("");
  const [wastageKg, setWastageKg] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [byProducts, setByProducts] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [loading, setLoading] = useState(false);

  // By-product entry
  const [currentByProduct, setCurrentByProduct] = useState({ byProduct: "", quantityKg: "" });

  // Reset form on open/close or edit/view mode change
  useEffect(() => {
    const companyId = JSON.parse(localStorage.getItem("userDetail")).companyId;
    setCompanyId(companyId);

    // Fetch dropdown data
    http_Request(
      { url: API_URL.item.GET_ALL_ITEM_BY_COMPANY.replace("{companyId}", companyId), method: "GET" },
      (res) => setItemOptions(res?.data || [])
    );
    http_Request(
      { url: API_URL.stock_location.GET_ALL_STOCK_LOCATION_BY_COMPANY.replace("{companyId}", companyId), method: "GET" },
      (res) => setLocationOptions(res?.data || [])
    );
    http_Request(
      { url: API_URL.item.GET_ALL_BYPRODUCTS.replace("{companyId}", companyId), method: "GET" },
      (res) => setByProductOptions(res?.data || [])
    );
  }, []);

  useEffect(() => {
    if ((isEditMode || isViewMode) && productionInfo) {
      setProductionDate(productionInfo.productionDate || "");
      setPaddyItem(productionInfo.paddyItem || "");
      setPaddyBatch(productionInfo.paddyBatch || "");
      setTotalPaddyKg(productionInfo.totalPaddyKg || "");
      setRiceItem(productionInfo.riceItem || "");
      setMainRiceKg(productionInfo.mainRiceKg || "");
      setWastageKg(productionInfo.wastageKg || "");
      setFromLocation(productionInfo.fromLocation || "");
      setToLocation(productionInfo.toLocation || "");
      setByProducts(productionInfo.byProducts || []);
      setCompanyId(productionInfo.companyId || companyId);
    } else {
      setProductionDate("");
      setPaddyItem("");
      setPaddyBatch("");
      setTotalPaddyKg("");
      setRiceItem("");
      setMainRiceKg("");
      setWastageKg("");
      setFromLocation("");
      setToLocation("");
      setByProducts([]);
      setCompanyId(companyId);
    }
    setCurrentByProduct({ byProduct: "", quantityKg: "" });
    setSnackText("");
    setSnackVariant("success");
  }, [isModal, isEditMode, isViewMode, productionInfo]);

  const handleAddByProduct = () => {
    if (!currentByProduct.byProduct || !currentByProduct.quantityKg) {
      setSnackVariant("error");
      setSnackText("Please select by-product and quantity!");
      return;
    }
    setByProducts([...byProducts, { ...currentByProduct }]);
    setCurrentByProduct({ byProduct: "", quantityKg: "" });
  };

  const handleRemoveByProduct = (idx) => {
    setByProducts(byProducts.filter((_, i) => i !== idx));
  };

  const handleSubmit = () => {
    if (
      !productionDate || !paddyItem || !paddyBatch || !totalPaddyKg ||
      !riceItem || !mainRiceKg || !wastageKg ||
      !fromLocation || !toLocation || !companyId
    ) {
      setSnackVariant("error");
      setSnackText("Please fill all required fields!");
      return;
    }
    setLoading(true);
    const payload = {
      productionDate,
      paddyItem,
      paddyBatch,
      totalPaddyKg: Number(totalPaddyKg),
      riceItem,
      mainRiceKg: Number(mainRiceKg),
      wastageKg: Number(wastageKg),
      fromLocation,
      toLocation,
      byProducts: byProducts.map(bp => ({
        byProduct: bp.byProduct,
        quantityKg: Number(bp.quantityKg)
      })),
      companyId
    };
    http_Request(
      { url: isEditMode ? API_URL.millingProduction.UPDATE : API_URL.millingProduction.CREATE, method: isEditMode ? "PUT" : "POST", bodyData: payload },
      (response) => {
        setLoading(false);
        if (response.status === 200 || response.status === 201) {
          setSnackVariant("success");
          setSnackText("Production entry saved successfully!");
          setTimeout(() => {
            closeAction && closeAction();
            setIsRefresh && setIsRefresh(prev => !prev);
          }, 1000);
        }
      },
      (error) => {
        setLoading(false);
        setSnackVariant("error");
        setSnackText("Failed to save production entry!");
      }
    );
  };

  return (
    <Dialog
      open={isModal}
      onClose={closeAction}
      maxWidth="md"
      fullWidth
      scroll="body"
      aria-labelledby="milling-production-dialog-title"
    >
      <DialogTitle
        id="milling-production-dialog-title"
        className={classes.modelHeader}
      >
        {isViewMode ? "View Milling Production" : isEditMode ? "Update Milling Production" : "Add Milling Production"}
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
              label="Paddy Item"
              value={paddyItem}
              onChange={e => setPaddyItem(e.target.value)}
              fullWidth
              size="small"
              disabled={isViewMode}
            >
              {itemOptions.map(item => (
                <MenuItem key={item.itemId} value={item.itemId}>{item.itemName}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Paddy Batch"
              value={paddyBatch}
              onChange={e => setPaddyBatch(e.target.value)}
              fullWidth
              size="small"
              disabled={isViewMode}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Total Paddy (Kg)"
              type="number"
              value={totalPaddyKg}
              onChange={e => setTotalPaddyKg(e.target.value)}
              fullWidth
              size="small"
              disabled={isViewMode}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              label="Rice Item"
              value={riceItem}
              onChange={e => setRiceItem(e.target.value)}
              fullWidth
              size="small"
              disabled={isViewMode}
            >
              {itemOptions.map(item => (
                <MenuItem key={item.itemId} value={item.itemId}>{item.itemName}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Main Rice (Kg)"
              type="number"
              value={mainRiceKg}
              onChange={e => setMainRiceKg(e.target.value)}
              fullWidth
              size="small"
              disabled={isViewMode}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Wastage (Kg)"
              type="number"
              value={wastageKg}
              onChange={e => setWastageKg(e.target.value)}
              fullWidth
              size="small"
              disabled={isViewMode}
            />
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
        </Grid>
        <Typography sx={{ mt: 2, mb: 1, fontWeight: 600 }}>By-Products</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={5}>
            <TextField
              select
              label="By-Product"
              value={currentByProduct.byProduct}
              onChange={e => setCurrentByProduct(bp => ({ ...bp, byProduct: e.target.value }))}
              fullWidth
              size="small"
              disabled={isViewMode}
            >
              {byProductOptions.map(bp => (
                <MenuItem key={bp.itemId} value={bp.itemId}>{bp.itemName}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="Quantity (Kg)"
              type="number"
              value={currentByProduct.quantityKg}
              onChange={e => setCurrentByProduct(bp => ({ ...bp, quantityKg: e.target.value }))}
              fullWidth
              size="small"
              disabled={isViewMode}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddByProduct}
              fullWidth
              disabled={isViewMode}
            >
              Add
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {byProducts.map((bp, idx) => (
            <Grid item xs={12} key={idx}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs={5}>
                  <Typography>{byProductOptions.find(opt => opt.itemId === bp.byProduct)?.itemName || bp.byProduct}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography>{bp.quantityKg} Kg</Typography>
                </Grid>
                <Grid item xs={2}>
                  {!isViewMode && (
                    <Button color="error" variant="outlined" onClick={() => handleRemoveByProduct(idx)} fullWidth>Remove</Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          ))}
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
            {isEditMode ? "Update Milling Production" : "Create Milling Production"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default MillingProduction;