import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  TextField,
  IconButton
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel'
import Snackbar from "../../../common/Snackbar";
import { API_URL } from "../../../shared/API_URLS";
import { http_Request } from "../../../shared/HTTP_Request";
import { useStyles } from "../../../../../assets/styles/styles";
import { FormCommonStyles } from "../../../../../assets/styles/FormCommonStyle";
import classNames from 'classnames';

const NewAndEditCompany = ({
  isModal = true,
  isEditMode = false,
  isViewMode = false,
  companyInfo = {},
  closeAction,
  setIsRefresh
}) => {
  const classes = useStyles();
  const commonClasses = FormCommonStyles();

  const [companyName, setCompanyName] = useState("");
  const [generalEmail, setGeneralEmail] = useState("");
  const [financeEmail, setFinanceEmail] = useState("");
  const [financeContactPerson, setFinanceContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address1, setAddressLine1] = useState("");
  const [address2, setAddressLine2] = useState("");
  const [address3, setAddressLine3] = useState("");
  const [snackText, setSnackText] = useState("");
  const [snackVariant, setSnackVariant] = useState("success");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode || isViewMode) {
      setCompanyName(companyInfo.companyName || "");
      setGeneralEmail(companyInfo.generalEmail || "");
      setFinanceEmail(companyInfo.financeEmail || "");
      setFinanceContactPerson(companyInfo.financeContactPerson || "");
      setContactNumber(companyInfo.contactNumber || "");
      setAddressLine1(companyInfo.addressResponseModels?.[0]?.address1 || "");
      setAddressLine2(companyInfo.addressResponseModels?.[0]?.address2 || "");
      setAddressLine3(companyInfo.addressResponseModels?.[0]?.address3 || "");
    } else {
      setCompanyName("");
      setGeneralEmail("");
      setFinanceEmail("");
      setFinanceContactPerson("");
      setContactNumber("");
      setAddressLine1("");
      setAddressLine2("");
      setAddressLine3("");
    }
    setSnackText("");
    setSnackVariant("success");
  }, [isModal, isEditMode, isViewMode, companyInfo]);

  const handleSubmit = () => {
    console.log("companyName@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", companyInfo);
    if (!companyName) {
      setSnackVariant("error");
      setSnackText("Company Name is required!");
      return;
    }
    setLoading(true);
    const payload = {
      companyName,
      generalEmail,
      financeEmail,
      financeContactPerson,
      contactNumber,
      status: 1, // Hardcoded
      addresses: [{
        addressId : companyInfo.addressResponseModels?.[0]?.addressId || null,
        address1,
        address2,
        address3
      }]
    };
    const url = isEditMode
      ? API_URL.company.UPDATE_COMPANY.replace("{companyId}", companyInfo.companyId)
      : API_URL.company.CREATE_COMPANY;
    const method = isEditMode ? "PUT" : "POST";
    http_Request(
      { url, method, bodyData: payload },
      (response) => {
        setLoading(false);
        if (response.status === 200 || response.status === 201) {
          setSnackVariant("success");
          setSnackText(`Company ${isEditMode ? "updated" : "created"} successfully!`);
          setTimeout(() => {
            closeAction && closeAction();
            setIsRefresh && setIsRefresh(prev => !prev);
          }, 1000);
        }
      },
      (error) => {
        setLoading(false);
        setSnackVariant("error");
        setSnackText("Failed to save company!");
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
      aria-labelledby="company-dialog-title"
    >
            <DialogTitle
                id='resturant-modal-dialog-title'
                className={classes.modelHeader}
            >
                {isEditMode ? "Update Company" : "Add Company"}
                <CancelIcon
                    onClick={() => closeAction()}
                    className={classNames(classes.dialogCloseBtn, classes.appointmentModalCloseIcon)}
                />
            </DialogTitle>
      <DialogContent dividers className={commonClasses.mainCardContainer}>
        <Snackbar text={snackText} variant={snackVariant} reset={() => setSnackText("")} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Company Name"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              fullWidth
              size="small"
              disabled={isViewMode}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="General Email"
              value={generalEmail}
              onChange={e => setGeneralEmail(e.target.value)}
              fullWidth
              size="small"
              disabled={isViewMode}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Finance Email"
              value={financeEmail}
              onChange={e => setFinanceEmail(e.target.value)}
              fullWidth
              size="small"
              disabled={isViewMode}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Finance Contact Person"
              value={financeContactPerson}
              onChange={e => setFinanceContactPerson(e.target.value)}
              fullWidth
              size="small"
              disabled={isViewMode}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Contact Number"
              value={contactNumber}
              onChange={e => setContactNumber(e.target.value)}
              fullWidth
              size="small"
              disabled={isViewMode}
            />
          </Grid>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Address Line 1"
              value={address1}
              onChange={e => setAddressLine1(e.target.value)}
              fullWidth
              size="small"
              disabled={isViewMode}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="City"
              value={address2}
              onChange={e => setAddressLine2(e.target.value)}
              fullWidth
              size="small"
              disabled={isViewMode}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Country"
              value={address3}
              onChange={e => setAddressLine3(e.target.value)}
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
            {isEditMode ? "Update Company" : "Create Company"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default NewAndEditCompany;