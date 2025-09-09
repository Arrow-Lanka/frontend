import React, { useState, useEffect } from "react";

import {
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Autocomplete,
    Grid,
    Stack,
    Box
} from "@mui/material";
import Save from "@mui/icons-material/Save";
import { Span } from "../../../Typography";
import DropDown from "../../../common/DropDown";
import { useStyles } from "../../../../../assets/styles/styles";
import { API_URL } from "../../../shared/API_URLS";
import { http_Request } from "../../../shared/HTTP_Request";
import { getLabel } from '../../../shared/localization';
import CancelIcon from '@mui/icons-material/Cancel'
import Snackbar from "../../../common/Snackbar";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, Slide, Typography } from '@mui/material'
import classNames from 'classnames';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const CustomerForm = (props) => {

    const { isModal, isEditMode, isViewMode, CustomerInfo, closeAction, isRefresh, setIsRefresh } = props;
    const classes = useStyles();


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
    const [isSaveAsNew, setIsSaveAsNew] = useState(false);
     

    const [clickedCustomerDetails, setClickedCustomerDetails] = useState({});


    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [mobile, setMobile] = useState("");
    const [addressLine1, setAddress1] = useState("");
    const [addressLine2, setAddress2] = useState("");
    const [addressLine3, setAddress3] = useState("");
    const [gender, setGender] = useState("");

    const [email, setEmail] = useState('');
    const [title, setTitle] = useState("");




    const navigate = useNavigate();


    //rest snack
    const resetSnack = () => {
        setSnackText();
        setSnackVariant();
    };


    // initial Customer form data
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
        navigate("/alt/admin/Customer");

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
    const createCustomer = () => {

        let canSave = true;


        if (!isEditMode) {
            if (!firstName.length) {
                setErrorFields({ ...errorFields, firstName: !firstName.length });
                setSnackVariant("error");
                setSnackText("First Name is Required!");
                canSave = false;
            } else if (!secondName?.length) {
                setErrorFields({ ...errorFields, secondName: !secondName.length });
                setSnackVariant("error");
                setSnackText("Second Name is Required!");
                canSave = false;
            } else if (!mobile?.length) {
                setErrorFields({ ...errorFields, mobile: !mobile.length });
                setSnackVariant("error");
                setSnackText("Mobile Number is Required!");
                canSave = false;
            } else if (!addressLine1) {
                setErrorFields({ ...errorFields, addressLine1: !addressLine1 });
                setSnackVariant("error");
                setSnackText("Address Line 1 is Required!");
                canSave = false;
            } else if (!addressLine2?.length) {
                setErrorFields({ ...errorFields, addressLine2: !addressLine2?.length });
                setSnackVariant("error");
                setSnackText("Address Line 2 is Required!");
                canSave = false;
            }
        }


        if (canSave) {
            let payload = {
                titleId: title,
                firstName: firstName,
                secondName: secondName,
                mobile: mobile,
                addresses: [
                    {
                        addressId: isEditMode? CustomerInfo?.addressId : null,
                        address1: addressLine1,
                        address2: addressLine2,
                        address3: addressLine3
                    }],
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                addressLine3: addressLine3,
                gender: gender,
                email: email,
                status: 1,
                personType: 3, // 3 is for Customer
                 companyId: JSON.parse(localStorage.getItem("userDetail")).companyId, 
            };

            if (isEditMode) {
                payload["personId"] = CustomerInfo.personId;
            }
            http_Request(
                {
                    url: isEditMode? API_URL?.non_staff_registration?.UPDATE_CUSTOMER.replace('{personId}', CustomerInfo.personId) : API_URL?.non_staff_registration?.CREATE_CUSTOMER,
                    method: isEditMode? "PUT" : "POST",
                    bodyData: payload,
                },
                function successCallback(response) {
                    if (response.status === 200 || response.status === 201) {
                        setSnackVariant("success");

                        setSnackText(`Customer ${firstName} is ${isEditMode ? 'Updated' : 'Created'} Successfully...!`);
                    
                        setTimeout(() => {
                            closeAction();
                            setIsSaveAsNew(false);  
                         setIsSaveAsNew(true);
                         setIsRefresh(!isRefresh);
                            cancleAgentCompanyHandler();
                        }, 1000);
                    }
                },
                function errorCallback(error) {
                    console.log("Error_Customer", error);
                    setSnackVariant("error");
                    setSnackText(`Customer ${firstName} is ${isEditMode ? 'Updated' : 'Created'} Faild...!`);
                }
            );
        }
    };

    const getClickedCustomerDetail = (personId) => {
        http_Request(
            {
                url: API_URL.non_staff_registration.GET_CUSTOMER_BY_ID.replace("{personId}", personId),
                method: 'GET'
            },
            function successCallback(response) {
                console.log("clicked Customer response", response?.data);
                setClickedCustomerDetails(response?.data);
            },
            function errorCallback(error) {
                console.log("error", error);
            });
    }

    useEffect(() => {
        if ((isEditMode || isViewMode)) {
            getClickedCustomerDetail(CustomerInfo?.personId);
        }
    }, [CustomerInfo]);
    useEffect(() => {

        if (isEditMode || isViewMode) {

            setFirstName(CustomerInfo?.firstName);
            setSecondName(CustomerInfo?.secondName);
            setMobile(CustomerInfo?.mobile);
            setAddress1(CustomerInfo?.address1);
            setAddress2(CustomerInfo?.address2);
            setAddress3(CustomerInfo?.address3);
            setEmail(CustomerInfo?.email);
            setTitle(CustomerInfo?.titleId);
            setGender(CustomerInfo?.gender);

        }
    }, []);



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





    return (

        <Dialog
            open={isModal}
            TransitionComponent={Transition}
            aria-labelledby='resturant-modal-dialog-title'
            aria-describedby='resturant-modal-dialog-description'
            scroll='body'
            maxWidth='md'
            fullWidth={true}
        >
            <DialogTitle
                id='resturant-modal-dialog-title'
                className={classes.modelHeader}
            >
                {isEditMode ? "Update Customer" : "Add Customer"}
                <CancelIcon
                    onClick={() => closeAction()}
                    className={classNames(classes.dialogCloseBtn, classes.appointmentModalCloseIcon)}
                />
            </DialogTitle>
            <DialogContent className={classes.popupPaper}  >

                <Grid container spacing={4} style={{ marginTop: 16 }}>
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
                                    disabled={isSaveAsNew || isViewMode}
                                    error={errorFields?.title}
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
                                        setFirstName(e.target.value);
                                        handledChangeFieldFun(e, "firstName");
                                        setErrorFields({ ...errorFields, firstName: false });
                                    }}
                                    error={errorFields?.firstName}
                                    value={firstName}
                                    disabled={isSaveAsNew || isViewMode}
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
                                value={mobile}
                                disabled={isSaveAsNew || isViewMode}
                                onChange={(e) => {
                                    setMobile(e.target.value);
                                    handledChangeFieldFun(e, "mobile");
                                    setErrorFields({ ...errorFields, mobile: false });
                                }}
                                error={errorFields?.mobile}
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
                                value={addressLine1}
                                disabled={isSaveAsNew || isViewMode}
                                error={errorFields?.addressLine1}
                                onChange={(e) => {
                                    setAddress1(e.target.value);
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
                                value={addressLine3}
                                disabled={isSaveAsNew || isViewMode}
                                onChange={(e) => {
                                    setAddress3(e.target.value);
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
                                value={secondName}
                                disabled={isSaveAsNew || isViewMode}
                                error={errorFields?.secondName}
                                label={
                                    <span>
                                        Second Name <span style={{ color: "red" }}>*</span>
                                    </span>
                                }
                                onChange={(e) => {
                                    setSecondName(e.target.value);
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
                                value={email}
                                disabled={isSaveAsNew || isViewMode}
                                onChange={(e) => {
                                    setEmail(e.target.value);
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
                                value={addressLine2}
                                disabled={isSaveAsNew || isViewMode}
                                error={errorFields?.addressLine2}
                                onChange={(e) => {
                                    setAddress2(e.target.value);
                                    handledChangeFieldFun(e, "addressLine2");
                                    setErrorFields({ ...errorFields, addressLine2: false });
                                }}
                            />

                            <RadioGroup row name="gender" value={gender}

                                onChange={(e) => {
                                    setGender(e.target.value);
                                    handledChangeFieldFun(e, "gender");
                                    setErrorFields({ ...errorFields, gender: false });
                                }}>
                                <FormControlLabel disabled={isSaveAsNew || isViewMode} value="Male" control={<Radio />} label="Male" />
                                <FormControlLabel disabled={isSaveAsNew || isViewMode} value="Female" control={<Radio />} label="Female" />
                                <FormControlLabel disabled={isSaveAsNew || isViewMode} value="Others" control={<Radio />} label="Others" />
                            </RadioGroup>
                        </Stack>
                    </Grid>
                </Grid>


                <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button
                        className={classes.outlineMediumSecondary}
                        onClick={() => closeAction()}
                    >
                        {getLabel({ module: "userManagement", label: (isViewMode ? "back" : "cancel") })}
                    </Button>
                    {
                        !isViewMode &&
                        <Button
                            className={classes.mediumSecondaryBtn}
                            onClick={() => { createCustomer() }}
                        >
                            {getLabel({ module: "userManagement", label: (isEditMode && !isSaveAsNew ? "Update" : "Save") })}
                        </Button>
                    }
                </Box>

            </DialogContent>


        </Dialog>
    );
};

export default CustomerForm;
