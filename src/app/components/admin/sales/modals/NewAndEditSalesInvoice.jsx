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
  IconButton,
  MenuItem,
  Autocomplete
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel'
import Snackbar from "../../../common/Snackbar";
import { API_URL } from "../../../shared/API_URLS";
import { http_Request } from "../../../shared/HTTP_Request";
import { useStyles } from "../../../../../assets/styles/styles";
import { FormCommonStyles } from "../../../../../assets/styles/FormCommonStyle";
import classNames from 'classnames';

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
  const [customerName, setCustomerName] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [items, setItems] = useState([
    { itemId: "", stockLocationId: "", batchNo: "", quantity: "", unitPrice: "", lineTotal: "" }
  ]);
  const [customers, setCustomers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [stockLocations, setStockLocations] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [snackText, setSnackText] = useState("");
  const [snackVariant, setSnackVariant] = useState("success");
  const [loading, setLoading] = useState(false);

  // Fetch dropdown data
  useEffect(() => {
    // Fetch customers
    http_Request(
      { url: API_URL.non_staff_registration.SEARCH_CUSTOMER, method: "POST", bodyData: { pageNo: 1, pageSize: 100 } },
      (res) => setCustomers(res?.data?.page || []),
      () => {}
    );
    // Fetch companies
    http_Request(
      { url: API_URL.company.SEARCH_COMPANY, method: "POST", bodyData: { pageNo: 1, pageSize: 100 } },
      (res) => setCompanies(res?.data?.page || []),
      () => {}
    );
    // Fetch items
    http_Request(
      { url: API_URL.item.SEARCH_ITEM, method: "POST", bodyData: { pageNo: 1, pageSize: 100 } },
      (res) => setAllItems(res?.data?.page || []),
      () => {}
    );
    // Fetch stock locations
    http_Request(
      { url: API_URL.stock_location.SEARCH_STOCK_LOCATION, method: "POST", bodyData: { pageNo: 1, pageSize: 100 } },
      (res) => setStockLocations(res?.data?.page || []),
      () => {}
    );
  }, []);

  useEffect(() => {
    if (isEditMode || isViewMode) {
      setInvoiceDate(invoiceInfo.invoiceDate || "");
      setCustomerName(invoiceInfo.customerName || "");
      setCompanyId(invoiceInfo.companyId || "");
      setItems(invoiceInfo.items?.length ? invoiceInfo.items : [
        { itemId: "", stockLocationId: "", batchNo: "", quantity: "", unitPrice: "", lineTotal: "" }
      ]);
    } else {
      setInvoiceDate("");
      setCustomerName("");
      setCompanyId("");
      setItems([{ itemId: "", stockLocationId: "", batchNo: "", quantity: "", unitPrice: "", lineTotal: "" }]);
    }
    setSnackText("");
    setSnackVariant("success");
  }, [isModal, isEditMode, isViewMode, invoiceInfo]);

  const handleItemChange = (idx, field, value) => {
    const updated = [...items];
    updated[idx][field] = value;
    // Auto-calc lineTotal if quantity or unitPrice changes
    if (field === "quantity" || field === "unitPrice") {
      const qty = Number(updated[idx].quantity) || 0;
      const price = Number(updated[idx].unitPrice) || 0;
      updated[idx].lineTotal = qty * price;
    }
    setItems(updated);
  };

  const handleAddItem = () => {
    setItems([...items, { itemId: "", stockLocationId: "", batchNo: "", quantity: "", unitPrice: "", lineTotal: "" }]);
  };

  const handleRemoveItem = (idx) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== idx));
    }
  };

  const handleSubmit = () => {
    if (!invoiceDate || !customerName || !companyId || !items.length) {
      setSnackVariant("error");
      setSnackText("All fields are required!");
      return;
    }
    setLoading(true);
    const payload = {
      invoiceDate,
      customerName,
      companyId,
      items
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
                          onChange={(_, newValue) => {
                            setCustomerName(newValue ? newValue.personId : "");
                            setSelectedCustomer(newValue ? newValue.personId : "");
                          }}
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
            <TextField
              select
              label="Company"
              value={companyId}
              onChange={e => setCompanyId(e.target.value)}
              fullWidth
              size="small"
              disabled={isViewMode}
            >
              {companies.map(c => (
                <MenuItem key={c.companyId} value={c.companyId}>{c.companyName}</MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Typography sx={{ mt: 2, mb: 1, fontWeight: 600 }}>Items</Typography>
        {items.map((item, idx) => (
          <Grid container spacing={2} key={idx} alignItems="center">
            <Grid item xs={12} md={2}>
              <TextField
                select
                label="Item"
                value={item.itemId}
                onChange={e => handleItemChange(idx, "itemId", e.target.value)}
                fullWidth
                size="small"
                disabled={isViewMode}
              >
                {allItems.map(i => (
                  <MenuItem key={i.itemId} value={i.itemId}>{i.itemName}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                select
                label="Stock Location"
                value={item.stockLocationId}
                onChange={e => handleItemChange(idx, "stockLocationId", e.target.value)}
                fullWidth
                size="small"
                disabled={isViewMode}
              >
                {stockLocations.map(loc => (
                  <MenuItem key={loc.stockLocationId} value={loc.stockLocationId}>{loc.stockName}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Batch No"
                value={item.batchNo}
                onChange={e => handleItemChange(idx, "batchNo", e.target.value)}
                fullWidth
                size="small"
                disabled={isViewMode}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Quantity"
                type="number"
                value={item.quantity}
                onChange={e => handleItemChange(idx, "quantity", e.target.value)}
                fullWidth
                size="small"
                disabled={isViewMode}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Unit Price"
                type="number"
                value={item.unitPrice}
                onChange={e => handleItemChange(idx, "unitPrice", e.target.value)}
                fullWidth
                size="small"
                disabled={isViewMode}
              />
            </Grid>
            <Grid item xs={12} md={1}>
              <TextField
                label="Line Total"
                value={item.lineTotal}
                fullWidth
                size="small"
                disabled
              />
            </Grid>
            <Grid item xs={12} md={1}>
              {!isViewMode && (
                <>
                  <Button onClick={() => handleRemoveItem(idx)} disabled={items.length === 1}>Remove</Button>
                  {idx === items.length - 1 && (
                    <Button onClick={handleAddItem}>Add</Button>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        ))}
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