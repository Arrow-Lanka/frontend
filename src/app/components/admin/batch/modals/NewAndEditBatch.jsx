import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Stack,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  Typography
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import classNames from "classnames";
import { useStyles } from "../../../../../assets/styles/styles";
import { API_URL } from "../../../shared/API_URLS";
import { http_Request } from "../../../shared/HTTP_Request";
import DropDown from "../../../common/DropDown";
import Snackbar from "../../../common/Snackbar";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewAndEditBatch = ({
  isModal,
  isEditMode,
  isViewMode,
  BatchInfo = {},
  closeAction,
  isRefresh,
  setIsRefresh,
}) => {
  const classes = useStyles();

  // Form fields
  const [itemId, setItemId] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [productionDate, setProductionDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [remarks, setRemarks] = useState("");

  // Dropdown options
  const [itemOptions, setItemOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);

  // Error fields
  const [errorFields, setErrorFields] = useState({});
  // Snackbar
  const [snackText, setSnackText] = useState();
  const [snackVariant, setSnackVariant] = useState();

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
          id: option?.id,
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

  // Fetch Supplier options
  const getSupplierOptionData = () => {
    let supplierDataSearchUrl = API_URL.non_staff_registration.GET_SUPPLIER_BY_COMPANY.replace(
      "{companyId}",
      JSON.parse(localStorage.getItem("userDetail")).companyId
    );
    const requestBody = {
      url: supplierDataSearchUrl,
      method: "GET",
    };
    const successCallback = (response) => {
      if ((response?.status === 200 || response?.status === 201) && response?.data) {
        let tempSupplierOptions = response?.data?.map((option) => ({
          id: option?.personId,
          name: option?.fullName,
        }));
        setSupplierOptions(tempSupplierOptions);
      }
    };
    const errorCallback = (error) => {
      console.log("error", error);
    };
    http_Request(requestBody, successCallback, errorCallback);
  };

  // Set form fields if editing or viewing
  useEffect(() => {
    if (isEditMode || isViewMode) {
      setItemId(BatchInfo?.itemId || "");
      setBatchNumber(BatchInfo?.batchNumber || "");
      setProductionDate(BatchInfo?.productionDate || "");
      setExpiryDate(BatchInfo?.expiryDate || "");
      setSupplierId(BatchInfo?.supplierId || "");
      setRemarks(BatchInfo?.remarks || "");
    } else {
      setItemId("");
      setBatchNumber("");
      setProductionDate("");
      setExpiryDate("");
      setSupplierId("");
      setRemarks("");
    }
  }, [isEditMode, isViewMode, BatchInfo]);

  // Fetch dropdown data on mount
  useEffect(() => {
    getItemOptionData();
    getSupplierOptionData();
  }, []);

  // Save handler
  const createOrUpdateBatch = () => {
    let canSave = true;
    let errors = {};

    if (!itemId) {
      errors.itemId = true;
      canSave = false;
    }
    if (!batchNumber) {
      errors.batchNumber = true;
      canSave = false;
    }
    if (!productionDate) {
      errors.productionDate = true;
      canSave = false;
    }

    setErrorFields(errors);

    if (!canSave) {
      setSnackVariant("error");
      setSnackText("Please fill all required fields!");
      return;
    }

    let payload = {
      itemId,
      batchNumber,
      productionDate,
      expiryDate,
      supplierId,
      remarks,
      companyId: JSON.parse(localStorage.getItem("userDetail")).companyId,
    };

    if (isEditMode) {
      payload["batchId"] = BatchInfo.batchId;
    }

    http_Request(
      {
        url: isEditMode
          ? API_URL.batch.UPDATE_BATCH.replace("{batchId}", BatchInfo.batchId)
          : API_URL.batch.CREATE_BATCH,
        method: isEditMode ? "PUT" : "POST",
        bodyData: payload,
      },
      function successCallback(response) {
        if (response.status === 200 || response.status === 201) {
          setSnackVariant("success");
          setSnackText(
            `Batch ${batchNumber} is ${isEditMode ? "Updated" : "Created"} Successfully!`
          );
          setTimeout(() => {
            closeAction();
            setIsRefresh && setIsRefresh(!isRefresh);
          }, 1000);
        }
      },
      function errorCallback(error) {
        setSnackVariant("error");
        setSnackText(
          `Batch ${batchNumber} ${isEditMode ? "Update" : "Create"} Failed!`
        );
      }
    );
  };

  return (
    <Dialog
      open={isModal}
      TransitionComponent={Transition}
      aria-labelledby="batch-modal-dialog-title"
      aria-describedby="batch-modal-dialog-description"
      scroll="body"
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle id="batch-modal-dialog-title" className={classes.modelHeader}>
        {isEditMode ? "Update Batch" : isViewMode ? "View Batch" : "Add Batch"}
        <CancelIcon
          onClick={() => closeAction()}
          className={classNames(classes.dialogCloseBtn, classes.appointmentModalCloseIcon)}
        />
      </DialogTitle>
      <DialogContent className={classes.popupPaper}>
        <Snackbar text={snackText} variant={snackVariant} reset={resetSnack} />
        <Grid container spacing={4} style={{ marginTop: 16 }}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <DropDown
                id="itemId"
                size="small"
                variant="outlined"
                value={itemId}
                optionData={itemOptions}
                onChange={(e) => {
                  const value = e.target.value;
                  setItemId(value);
                  setErrorFields({ ...errorFields, itemId: false });
                }}
                label={
                  <span>
                    Item <span style={{ color: "red" }}>*</span>
                  </span>
                }
                disabled={isViewMode}
                error={errorFields?.itemId}
              />
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                type="text"
                name="batchNumber"
                value={batchNumber}
                disabled={isViewMode}
                onChange={(e) => {
                  setBatchNumber(e.target.value);
                  setErrorFields({ ...errorFields, batchNumber: false });
                }}
                error={errorFields?.batchNumber}
                label={
                  <span>
                    Batch Number <span style={{ color: "red" }}>*</span>
                  </span>
                }
              />


              <TextField
                size="small"
                variant="outlined"
                fullWidth
                type="date"
                name="productionDate"
                value={productionDate}
                disabled={isViewMode}
                onChange={(e) => {
                  setProductionDate(e.target.value);
                  setErrorFields({ ...errorFields, productionDate: false });
                }}
                error={errorFields?.productionDate}
                label="Production Date"
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
          </Grid>
          {/* Right Column */}
          <Grid item xs={12} md={6}>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                type="date"
                name="expiryDate"
                value={expiryDate}
                disabled={isViewMode}
                onChange={(e) => setExpiryDate(e.target.value)}
                label="Expiry Date"
                InputLabelProps={{ shrink: true }}
              />
              <DropDown
                id="supplierId"
                size="small"
                variant="outlined"
                value={supplierId}
                optionData={supplierOptions}
                onChange={(e) => {
                  const value = e.target.value;
                  setSupplierId(value);
                  setErrorFields({ ...errorFields, supplierId: false });
                }}
                label="Supplier"
                disabled={isViewMode}
                error={errorFields?.supplierId}
              />
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                name="remarks"
                label="Remarks"
                value={remarks}
                disabled={isViewMode}
                onChange={(e) => setRemarks(e.target.value)}
                multiline
                rows={2}
              />
            </Stack>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            className={classes.outlineMediumSecondary}
            onClick={() => closeAction()}
          >
            {isViewMode ? "Back" : "Cancel"}
          </Button>
          {!isViewMode && (
            <Button
              className={classes.mediumSecondaryBtn}
              onClick={createOrUpdateBatch}
            >
              {isEditMode ? "Update" : "Save"}
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NewAndEditBatch;