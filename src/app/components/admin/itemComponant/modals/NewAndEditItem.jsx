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
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

// sub components
import NewAndEditItemCategory from "./NewAndEditItemCategory";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ItemForm = (props) => {

    const { isModal, isEditMode, isViewMode, ItemInfo, closeAction, isRefresh, setIsRefresh } = props;
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

    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");

    const [barCode, setBarcode] = useState("");

    const [inventoryItem, setInventoryItem] = useState("");

    const [itemUOM, setItemUOM] = useState('');
    const [itemCode, setItemCode] = useState("");

    const [itemCategoryId, setCategory] = useState("");

    const [isNewAndUpdateIteCategoryModal, setIsNewAndUpdateItemCategoryModal] = useState(false);







    const navigate = useNavigate();


    //rest snack
    const resetSnack = () => {
        setSnackText();
        setSnackVariant();
    };


    // initial Item form data
    const [formData, setFormData] = useState({
        id: "",
        firstName: "",
        itemName: "",
        itemDescription: "",

        barCode: "",

        inventoryItem: "",
        itemUOM: "",
        status: "",
    });

    // Cancel button hadler
    const cancleAgentCompanyHandler = () => {
        // reset all form fields to empty
        setFormData({
            firstName: "",
            itemName: "",
            itemDescription: "",

            barCode: "",

            inventoryItem: "",
            itemUOM: "",
        });
        navigate("/alt/admin/Item");

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
            if (!itemCode.length) {
                setErrorFields({ ...errorFields, itemCode: !itemCode.length });
                setSnackVariant("error");
                setSnackText("Item Code is Required!");
                canSave = false;
            } else if (!itemName?.length) {
                setErrorFields({ ...errorFields, itemName: !itemName.length });
                setSnackVariant("error");
                setSnackText("Item Name is Required!");
                canSave = false;
            } else if (!itemUOM?.length) {
                setErrorFields({ ...errorFields, itemUOM: !itemUOM.length });
                setSnackVariant("error");
                setSnackText("UOM is Required!");
                canSave = false;
            }
        }


        if (canSave) {
            let payload = {
                itemCategoryId: itemCategoryId,
                itemCode: itemCode,
                itemName: itemName,
                itemDescription: itemDescription,
                barCode: barCode,
                itemUOM: itemUOM,
                inventoryItem: inventoryItem === "true" ? true : false,
                status: 1,
                companyId: JSON.parse(localStorage.getItem("userDetail")).companyId,             };

            if (isEditMode) {
                payload["itemId"] = ItemInfo.itemId;
            }
            http_Request(
                {
                    url: isEditMode ? API_URL?.item?.UPDATE_ITEM.replace('{itemId}', ItemInfo.itemId) : API_URL?.item?.CREATE_ITEM,
                    method: isEditMode ? "PUT" : "POST",
                    bodyData: payload,
                },
                function successCallback(response) {
                    if (response.status === 200 || response.status === 201) {
                        setSnackVariant("success");

                        setSnackText(`Item ${itemName} is ${isEditMode ? 'Updated' : 'Created'} Successfully...!`);

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
                    setSnackText(`Item ${itemName} is ${isEditMode ? 'Updated' : 'Created'} Faild...!`);
                }
            );
        }
    };

    const getClickedItemDetail = (itemId) => {
        http_Request(
            {
                url: API_URL.item.GET_ITEM_BY_ID.replace("{itemId}", itemId),
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
            getClickedItemDetail(ItemInfo?.itemId);
        }
    }, [ItemInfo]);
    useEffect(() => {

        if (isEditMode || isViewMode) {

            setItemName(ItemInfo?.itemName);
            setItemDescription(ItemInfo?.itemDescription);
            setBarcode(ItemInfo?.barCode);
            setItemUOM(ItemInfo?.itemUOM);
            setItemCode(ItemInfo?.itemCode);
            setCategory(ItemInfo?.itemCategoryId);
            setInventoryItem(ItemInfo?.inventoryItem ? "true" : "false");

        }
    }, []);



    useEffect(() => {
        getCategoryOptionData();
    }, []);

    const [cateOptionData, setCateOptionData] = useState([]);
    const { nonStafftUserClasses, tableActionType } = props;
    const [errorFields, setErrorFields] = useState({});





    // Get all Category options for the dropdown
    const getCategoryOptionData = () => {
        let categoryDataSearchUrl =
            API_URL.item_category.GET_ALL_ITEM_CATEGORY_BY_COMPANY.replace("{companyId}", JSON.parse(localStorage.getItem("userDetail")).companyId);
        const requestBody = {
            url: categoryDataSearchUrl,
            method: "GET",
        };
        const successCallback = (response) => { 
            if (
                (response?.status === 200 || response?.status === 201) &&
                response?.data
            ) {
                // console.log("user composite data opt", response.data);
                let tempCateOptions = response?.data?.map((option) => ({
                    id: option?.id,
                    name: option?.name,
                }));
                setCateOptionData(tempCateOptions);
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
            maxWidth='lg'
            fullWidth={true}
        >
            <DialogTitle
                id='resturant-modal-dialog-title'
                className={classes.modelHeader}
            >
                {isEditMode ? "Update Item" : "Add Item"}
                <CancelIcon
                    onClick={() => closeAction()}
                    className={classNames(classes.dialogCloseBtn, classes.appointmentModalCloseIcon)}
                />
            </DialogTitle>
            <DialogContent className={classes.popupPaper}  >

                {isNewAndUpdateIteCategoryModal &&
                    <NewAndEditItemCategory
                        isModal={isNewAndUpdateIteCategoryModal}
                        closeAction={() => { setIsNewAndUpdateItemCategoryModal(false); }}

                        isSaveAsNew={isSaveAsNew}
                        setIsSaveAsNew={setIsSaveAsNew}
                        isRefresh={isRefresh}
                        setIsRefresh={setIsRefresh}
                    />
                }


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
                                name="itemCode"
                                value={itemCode}
                                disabled={isSaveAsNew || isViewMode}
                                onChange={(e) => {
                                    setItemCode(e.target.value);
                                    handledChangeFieldFun(e, "itemCode");
                                    setErrorFields({ ...errorFields, itemCode: false });
                                }}
                                error={errorFields?.itemCode}
                                label={
                                    <span>
                                        Item Code <span style={{ color: "red" }}>*</span>
                                    </span>
                                }
                            />


                            <TextField
                                size="small"
                                variant="outlined"
                                fullWidth
                                type="text"
                                name="itemDescription"
                                value={itemDescription}
                                disabled={isSaveAsNew || isViewMode}
                                label="Description"
                                onChange={(e) => {
                                    setItemDescription(e.target.value);
                                    handledChangeFieldFun(e, "itemDescription");
                                    setErrorFields({ ...errorFields, itemDescription: false });
                                }}
                            />
                            <Grid container >
                                <Grid item xs={11}>
                                    <DropDown
                                        id="itemCategoryId"
                                        size="small"
                                        variant="outlined"
                                        value={itemCategoryId}
                                        optionData={cateOptionData}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setCategory(value);
                                            setFormData({ ...formData, itemCategoryId: value });
                                            setErrorFields({ ...errorFields, itemCategoryId: false });
                                        }}

                                        className={nonStafftUserClasses?.addResturantPageDropdown}
                                        label={
                                            <span>
                                                Item Category <span style={{ color: "red" }}>*</span>
                                            </span>
                                        }
                                        disabled={isSaveAsNew || isViewMode}
                                        error={errorFields?.itemCategoryId}
                                        formControlClass={nonStafftUserClasses?.width}
                                    /> </Grid>
                                <Grid item xs={1} style={{ display: "flex", alignItems: "center" }}>
                                    <IconButton
                                        sx={{ color: "red" }}
                                        onClick={() => {
                                            setIsNewAndUpdateItemCategoryModal(true);
                                        }

                                        } // replace with your modal state function
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>

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
                                name="itemName"
                                value={itemName}
                                disabled={isSaveAsNew || isViewMode}
                                error={errorFields?.itemName}
                                label={
                                    <span>
                                        Item Name <span style={{ color: "red" }}>*</span>
                                    </span>
                                }
                                onChange={(e) => {
                                    setItemName(e.target.value);
                                    handledChangeFieldFun(e, "itemName");
                                    setErrorFields({ ...errorFields, itemName: false });
                                }}
                            />
                            <TextField
                                size="small"
                                variant="outlined"
                                fullWidth
                                name="itemUOM"
                                type="itemUOM"
                                error={errorFields?.itemUOM}
                                label={
                                    <span>
                                        UOM<span style={{ color: "red" }}>*</span>
                                    </span>
                                }
                                value={itemUOM}
                                disabled={isSaveAsNew || isViewMode}
                                onChange={(e) => {
                                    setItemUOM(e.target.value);
                                    handledChangeFieldFun(e, "itemUOM");
                                    setErrorFields({ ...errorFields, itemUOM: false });
                                }}
                            />
                            <TextField
                                size="small"
                                variant="outlined"
                                fullWidth
                                type="text"
                                name="barCode"
                                label="Bar Code"
                                value={barCode}
                                disabled={isSaveAsNew || isViewMode}

                                onChange={(e) => {
                                    setBarcode(e.target.value);
                                    handledChangeFieldFun(e, "barCode");
                                    setErrorFields({ ...errorFields, barCode: false });
                                }}
                            />

                            <RadioGroup row name="inventoryItem" value={inventoryItem}

                                onChange={(e) => {
                                    setInventoryItem(e.target.value);
                                    handledChangeFieldFun(e, "inventoryItem");
                                    setErrorFields({ ...errorFields, inventoryItem: false });
                                }}>
                                <FormControlLabel disabled={isSaveAsNew || isViewMode} value="true" control={<Radio />} label="Is Inventory Item" />

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

export default ItemForm;
