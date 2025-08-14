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


const NewAndEditStockLocation = (props) => {

    const { isModal, isEditMode, isViewMode, StockLocationInfo, closeAction, isRefresh, setIsRefresh } = props;
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



    const [clickedItemDetails, setClickedItemDetails] = useState({});

    const [stockName, setStockName] = useState("");
    const [locationDescription, setLocationDescription] = useState("");


    const navigate = useNavigate();


    //rest snack
    const resetSnack = () => {
        setSnackText();
        setSnackVariant();
    };


    // initial Item form data
    const [formData, setFormData] = useState({
        id: "",
        stockName: "",
        locationDescription: "",
        status: "",
    });

    // Cancel button hadler
    const cancleAgentCompanyHandler = () => {
        // reset all form fields to empty
        setFormData({
            stockName: "",
            locationDescription: "",
        });
        navigate("/alt/admin/stock-location");

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
    const createItem = () => {

        let canSave = true;


        if (!isEditMode) {
            if (!stockName.length) {
                setErrorFields({ ...errorFields, stockName: !stockName.length });
                setSnackVariant("error");
                setSnackText("Stock Name is Required!");
                canSave = false;
            } 
        }


        if (canSave) {
            let payload = {
                stockName: stockName,
                locationDescription: locationDescription,
                 statusId:1,
                 companyId: JSON.parse(localStorage.getItem("userDetail")).companyId, 
            };

            if (isEditMode) {
                
                payload["stockLocationId"] = StockLocationInfo.stockLocationId;
            }
            http_Request(
                {
                    url: isEditMode ? API_URL?.stock_location?.UPDATE_STOCK_LOCATION.replace('{stockLocationId}', StockLocationInfo.stockLocationId) : API_URL?.stock_location?.CREATE_STOCK_LOCATION,
                    method: isEditMode ? "PUT" : "POST",
                    bodyData: payload,
                },
                function successCallback(response) {
                    if (response.status === 200 || response.status === 201) {
                        setSnackVariant("success");

                        setSnackText(`Stock Location ${stockName} is ${isEditMode ? 'Updated' : 'Created'} Successfully...!`);

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
                    console.log("Error_Item", error);
                    setSnackVariant("error");
                    setSnackText(`Stock location ${stockName} is ${isEditMode ? 'Updated' : 'Created'} Faild...!`);
                }
            );
        }
    };

    const getClickedItemDetail = (stockLocationId) => {
        http_Request(
            {
                url: API_URL.stock_location.GET_STOCK_LOCATION_BY_ID.replace("{stockLocationId}", stockLocationId),
                method: 'GET'
            },
            function successCallback(response) {
                console.log("clicked Item response", response?.data);
                setClickedItemDetails(response?.data);
            },
            function errorCallback(error) {
                console.log("error", error);
            });
    }

    useEffect(() => {
        if ((isEditMode || isViewMode)) {
         
            getClickedItemDetail(StockLocationInfo?.stockLocationId);
        }
    }, [StockLocationInfo]);
    useEffect(() => {

        if (isEditMode || isViewMode) {

            setStockName(StockLocationInfo?.stockName);
            setLocationDescription(StockLocationInfo?.locationDescription);
           

        }
    }, []);




    const [errorFields, setErrorFields] = useState({});



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
                {isEditMode ? "Update Stock Location" : "Add Stock Location"}
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

                        <Stack spacing={2} sx={{ mt: 2 }}>

                            <TextField
                                size="small"
                                variant="outlined"
                                fullWidth
                                type="text"
                                name="stockName"
                                value={stockName}
                                disabled={isSaveAsNew || isViewMode}
                                onChange={(e) => {
                                    setStockName(e.target.value);
                                    handledChangeFieldFun(e, "stockName");
                                    setErrorFields({ ...errorFields, stockName: false });
                                }}
                                error={errorFields?.stockName}
                                label={
                                    <span>
                                        Stock Name <span style={{ color: "red" }}>*</span>
                                    </span>
                                }
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
                                type="text"
                                name="locationDescription"
                                value={locationDescription}
                                disabled={isSaveAsNew || isViewMode}
                                error={errorFields?.locationDescription}
                                label="Location Description"
                                onChange={(e) => {
                                    setLocationDescription(e.target.value);
                                    handledChangeFieldFun(e, "locationDescription");
                                    setErrorFields({ ...errorFields, locationDescription: false });
                                }}
                            />
                           
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
                            onClick={() => { createItem() }}
                        >
                            {getLabel({ module: "userManagement", label: (isEditMode && !isSaveAsNew ? "Update" : "Save") })}
                        </Button>
                    }
                </Box>

            </DialogContent>


        </Dialog>
    );
};

export default NewAndEditStockLocation;
