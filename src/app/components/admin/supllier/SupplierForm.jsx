import React, { useState, useEffect } from "react";

import {
  Button,
  FormControlLabel,
  Typography,
  Radio,
  RadioGroup,
  TextField,
  Autocomplete,
  Grid,
  Stack
} from "@mui/material";
import Save from "@mui/icons-material/Save";
import { Span } from "../../Typography";
import DropDown from "../../common/DropDown";

import { API_URL } from "../../shared/API_URLS";
import { http_Request } from "../../shared/HTTP_Request";

import Snackbar from "../../common/Snackbar";
import { useNavigate } from 'react-router-dom';


const SupplierForm = (props) => {


  /**
  |--------------------------------------------------
  | Mount on effect to get clicked table action type
  |--------------------------------------------------
  */
  useEffect(() => {
    setActionType(history?.location?.state?.clikedActionType);
  }, [history]);



  // Snackbar states.
  const [snackText, setSnackText] = React.useState();
  const [snackVariant, setSnackVariant] = React.useState();
  const [actionType, setActionType] = useState("");


const navigate = useNavigate();


  //rest snack
  const resetSnack = () => {
    setSnackText();
    setSnackVariant();
  };


  // initial supplier form data
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    secondName: "",
    mobile: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    gender: "",
    email: "",
    status: "",
  });

  // Cancel button hadler
  const cancleAgentCompanyHandler = () => {
    // reset all form fields to empty
    setFormData({
      firstName: "",
      secondName: "",
      mobile: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      gender: "",
      email: "",
    });
     navigate("/admin/usermgt/supplier");
   
  };



  // Capture form fields values
  const handledChangeFieldFun = (event, fieldName) => {
    const { value } = event.target;
    let newErrorFields = { ...errorFields };

    setFormData({
      ...formData,
      [fieldName]: value,
    });
    setErrorFields(newErrorFields);
  };



  // Create or Edit api handler
  const createSupplier = () => {
    console.log("formData", formData);
    let canSave = true;
    if (
      !formData?.title ||
      !formData?.firstName ||
      !formData?.secondName ||
      !formData?.mobile ||
      !formData?.addressLine1 ||
      !formData?.addressLine2 ||
      !formData?.addressLine3 ||
      !formData?.gender ||
      !formData?.email

    ) {

      setSnackVariant("error");
      setSnackText("Please Fill All Required  Fields...!");
      canSave = false;
      return;
    }
    if (errorFields?.title) {
      setSnackVariant("error");
      setSnackText("Titel is Required...!");
      canSave = false;
      return;
    }
    if (errorFields?.invalidFinaceEmail) {
      setSnackVariant("error");
      setSnackText("Please Add Valid Finance Email...!");
      canSave = false;
      return;
    }
    if (canSave) {
      let payload = {
        titleId: formData?.title,
        firstName: formData?.firstName,
        secondName: formData?.secondName,
        mobile: formData?.mobile,
        addressLine1: formData?.addressLine1,
        addressLine2: formData?.addressLine2,
        addressLine3: formData?.addressLine3,
        gender: formData?.gender,
        email: formData?.email,
        status: 1,
        personType: 6, // 6 is for supplier
      };
      http_Request(
        {
          url: (actionType == "edit") ? API_URL?.agentCompany?.UPDATE_AGENT_COMPANY.replace('{agentCompanyId}', formData?.id) : API_URL?.non_staff_registration?.CREATE_SUPPLIER,
          method: (actionType == "edit") ? "PUT" : "POST",
          bodyData: payload,
        },
        function successCallback(response) {
          if (response.status === 200 || response.status === 201) {
            setSnackVariant("success");
            setSnackText(`Supplier ${(actionType == 'edit') ? "Updated" : "Created"} Successfully...!`);
            setTimeout(() => {
              cancleAgentCompanyHandler();
            }, 1000);
          }
        },
        function errorCallback(error) {
          console.log("Error_Supplier", error);
          setSnackVariant("error");
          setSnackText(`Supplier ${(actionType == 'edit') ? "Updation" : "Creation"} Fail...!`);
        }
      );
    }
  };



  useEffect(() => {
    getTitleOptionData();
  }, []);

  const [titleOptionData, setTitleOptionData] = useState([]);
  const { nonStafftUserClasses, tableActionType } = props;
  const [errorFields, setErrorFields] = useState({});





  // Get all titels
  const getTitleOptionData = () => {
    let compositeDataSearchUrl =
      API_URL.non_staff_registration.GET_ALL_USER_GENERAL_COMPOSITE_DETAILS;
    const requestBody = {
      url: compositeDataSearchUrl,
      method: "GET",
    };
    const successCallback = (response) => {
      if (
        (response?.status === 200 || response?.status === 201) &&
        response?.data
      ) {
        // console.log("user composite data opt", response.data);
        let tempPersonTitleOptions = response?.data?.titles?.map((option) => ({
          id: option?.id,
          name: option?.name,
        }));
        setTitleOptionData(tempPersonTitleOptions);
      }
    };
    const errorCallback = (error) => {
      console.log("error", error);
    };
    http_Request(requestBody, successCallback, errorCallback);
  };

  const [title, setTitle] = useState("");



  return (
    <form >
      <Grid container spacing={4}>
        <Snackbar
          text={snackText}
          variant={snackVariant}
          reset={resetSnack}
        />
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={4}>

              <DropDown
                id="title"
                size="small"
                variant="outlined"
                value={title}
                optionData={titleOptionData}
                onChange={(e) => {
                  const value = e.target.value;
                  setTitle(value);
                  setFormData({ ...formData, title: value });
                  setErrorFields({ ...errorFields, title: false });
                }}

                className={nonStafftUserClasses?.addResturantPageDropdown}
                label={
                  <span>
                    Title <span style={{ color: "red" }}>*</span>
                  </span>
                }
                disabled={tableActionType == 'view'}
                error={errorFields?.agentCompany}
                formControlClass={nonStafftUserClasses?.width}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField

                size="small"
                variant="outlined"
                fullWidth
                type="text"
                name="firstName"
                label={
                  <span>
                    First Name <span style={{ color: "red" }}>*</span>
                  </span>
                }
                onChange={(e) => {
                  handledChangeFieldFun(e, "firstName");
                  setErrorFields({ ...errorFields, firstName: false });
                }}
                value={formData.firstName}
              />
            </Grid>
          </Grid>

          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={(e) => {
                handledChangeFieldFun(e, "mobile");
                setErrorFields({ ...errorFields, mobile: false });
              }}
              label={
                  <span>
                   Mobile <span style={{ color: "red" }}>*</span>
                  </span>
                }
            />

            <TextField
              size="small"
              variant="outlined"
              fullWidth
              type="text"
              name="addressLine1"
               label={
                  <span>
                    Address Line 1 <span style={{ color: "red" }}>*</span>
                  </span>
                }
              value={formData.addressLine1}
              onChange={(e) => {
                handledChangeFieldFun(e, "addressLine1");
                setErrorFields({ ...errorFields, addressLine1: false });
              }}
            />

            <TextField
              size="small"
              variant="outlined"
              fullWidth
              type="text"
              name="addressLine3"
             label="Address Line 3"
              value={formData.addressLine3}
              onChange={(e) => {
                handledChangeFieldFun(e, "addressLine3");
                setErrorFields({ ...errorFields, addressLine3: false });
              }}
            />
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              type="text"
              name="secondName"
              value={formData.secondName}
             label={
                  <span>
                    Second Name <span style={{ color: "red" }}>*</span>
                  </span>
                }
              onChange={(e) => {
                handledChangeFieldFun(e, "secondName");
                setErrorFields({ ...errorFields, secondName: false });
              }}
            />
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={(e) => {
                handledChangeFieldFun(e, "email");
                setErrorFields({ ...errorFields, email: false });
              }}
            />
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              type="text"
              name="addressLine2"
              label={
                  <span>
                    Address Line 2 <span style={{ color: "red" }}>*</span>
                  </span>
                }
              value={formData.addressLine2}
              onChange={(e) => {
                handledChangeFieldFun(e, "addressLine2");
                setErrorFields({ ...errorFields, addressLine2: false });
              }}
            />

            <RadioGroup row name="gender" value={formData.gender}
              onChange={(e) => {
                handledChangeFieldFun(e, "gender");
                setErrorFields({ ...errorFields, gender: false });
              }}>
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="Others" control={<Radio />} label="Others" />
            </RadioGroup>
          </Stack>
        </Grid>
      </Grid>

      <Button
        color="primary"
        variant="contained"
        type="submit"
        sx={{ mt: 4 }}
        startIcon={<Save />}
        onClick={(e) => {
          e.preventDefault(); // <--- prevents reload
          createSupplier();
        }}

      >
        <Span sx={{ textTransform: "capitalize" }}>Submit</Span>
      </Button>
    </form>
  );
};

export default SupplierForm;
