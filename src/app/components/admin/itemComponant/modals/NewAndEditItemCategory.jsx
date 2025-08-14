import React, { useState, useEffect } from "react";

import {
    Button,
    TextField,
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

import TableComponent from '../../../common/material/TableComponent';


// styles
import { FormCommonStyles } from "../../../../../assets/styles/FormCommonStyle";

// icons
import editIcon from '../../../../../assets/image/icons/editIcon.png'
import viewIcon from "../../../../../assets/image/icons/viewAction.svg";
import deleteIcon from "../../../../../assets/image/icons/ehr-delete.svg";
import { set } from "lodash";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ItemCategoryForm = (props) => {

    const { isModal, isViewMode, closeAction, isRefresh, setIsRefresh } = props;
    const [isEditMode, setIsEditMode] = useState(false);
    const [ItemCategoryInfo, setItemCategoryInfo] = useState({});
    const classes = useStyles();
    const [actionType, setActionType] = useState("");
        const [clickedItemDetails, setClickedItemDetails] = useState({
          
        });


    // style classes
    const commonClasses = FormCommonStyles();

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

    const [isSaveAsNew, setIsSaveAsNew] = useState(false);


    const [itemCategoryName, setItemCategoryName] = useState("");

    const [itemCategoryDescription, setItemCategoryDescription] = useState("");

    const [pageNo, setPageNo] = useState(1);
    const [clickedItem, setClickedItem] = useState({});
    const [ItemListPaginationData, setItemListPagination] = useState({
        listData: [],
        pageNo: 1,
        pageSize: 5,
        totalElements: 0,
        isInitialRequest: true
    });


    const [ItemSearchFieldData, setItemSearchFieldData] = useState({
        isAdvanceSearch: false,
        advancedSearchOptions: [

            {
                id: "name",
                name: "Name",
            }
        ],
        selectedSearchOption: "",
        searchValue: "",
    });





    // initial Item form data
    const [formData, setFormData] = useState({
        itemCategoryName: "",
        itemCategoryDescription: "",

    });


    /**
    |--------------------------------------------------
    | Table column data
    |--------------------------------------------------
    */
    const columnData = [
        {
            id: "itemCategoryName",
            name: "Category"
        },
        {
            id: "itemCategoryDescription",
            name: "Description",
        },

        {
            id: "status",
            name: "Status",
            template: {
                type: "twoLineTextFields",
                fieldList: [{
                    id: "status",
                    options: [
                        {
                            id: "status",
                            value: "Active",
                            conditionClass: commonClasses.greenChip
                        },
                        {
                            id: "status",
                            value: "Inactive",
                            conditionClass: commonClasses.darkRedChip
                        }
                    ]
                }]
            }
        },
        {
            id: "action",
            name: "Action",
            template: {
                type: "clickableIconBlock",
                columnAlign: "right",
                iconClickAction: ((event) => { ItemIconclickAction && ItemIconclickAction(event) }),
                icons: [
                    {
                        id: "edit",
                        name: "Edit",
                        alt: "edit",
                        iconLink: editIcon,
                        iconClass: commonClasses.pointerClass
                    },
                    {
                        id: "delete",
                        name: "Delete",
                        alt: "delete",
                        iconLink: deleteIcon,
                        iconClass: commonClasses.pointerClass
                    }
                ]
            },
        },
    ];




    const navigate = useNavigate();


    //rest snack
    const resetSnack = () => {
        setSnackText();
        setSnackVariant();
    };


    // Cancel button hadler
    const cancleAgentCompanyHandler = () => {
        // reset all form fields to empty
        setFormData({
            itemCategoryDescription: "",
            itemCategoryName: "",
        });

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
            if (!itemCategoryName.length) {
                setErrorFields({ ...errorFields, itemCategoryName: !itemCategoryName.length });
                setSnackVariant("error");
                setSnackText("Category Name is Required!");
                canSave = false;
            }
        }


        if (canSave) {
            let payload = {

                itemCategoryDescription: itemCategoryDescription,
                itemCategoryName: itemCategoryName,
                statusId: 1,
                companyId: JSON.parse(localStorage.getItem("userDetail")).companyId, // Assuming companyId is 1 for now
            };

            if (isEditMode) {
                payload["itemCategoryId"] = ItemCategoryInfo.itemCategoryId;
            }
            http_Request(
                {
                    url: isEditMode ? API_URL?.item_category?.UPDATE_ITEM_CAREGORY.replace('{itemCategoryId}', ItemCategoryInfo.itemCategoryId) : API_URL?.item_category?.CREATE_ITEM_CATEGORY,
                    method: isEditMode ? "PUT" : "POST",
                    bodyData: payload,
                },
                function successCallback(response) {
                    if (response.status === 200 || response.status === 201) {
                        setSnackVariant("success");

                        setSnackText(`Item ${itemCategoryName} is ${isEditMode ? 'Updated' : 'Created'} Successfully...!`);

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
                    setSnackText(`Item ${itemCategoryName} is ${isEditMode ? 'Updated' : 'Created'} Faild...!`);
                }
            );
        }
    };

    // const getClickedItemDetail = (itemCategoryId) => {
    //     http_Request(
    //         {
    //             url: API_URL.item_category.GET_ITEM_CATEGORY_BY_ID.replace("{itemCategoryId}", itemCategoryId),
    //             method: 'GET'
    //         },
    //         function successCallback(response) {
    //             console.log("clicked Item response", response?.data);
    //             setClickedItemDetails(response?.data);
               
    //         },
    //         function errorCallback(error) {
    //             console.log("error", error);
    //         });
    // }

    // useEffect(() => {
    //     if ((isEditMode || isViewMode)) {
    //         getClickedItemDetail(ItemCategoryInfo?.itemCategoryId);
    //     }
    // }, [ItemCategoryInfo]);
    // useEffect(() => {

    //     if (isEditMode || isViewMode) {

    //         setItemCategoryName(ItemCategoryInfo?.itemCategoryName);
    //         setItemCategoryDescription(ItemCategoryInfo?.itemCategoryDescription);

    //     }
    // }, []);



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


    /**
     |--------------------------------------------------
     | Mount on function
     |--------------------------------------------------
     */
    useEffect(() => {
        let ItemPayload = {
            pageNo: pageNo,
            pageSize: ItemListPaginationData?.pageSize,
            name: (!ItemSearchFieldData?.isAdvanceSearch) ? ItemSearchFieldData?.searchValue : "",

            //   companyId: localStorage.getItem("companyId"),
            companyId: JSON.parse(localStorage.getItem("userDetail")).companyId,
        }
        http_Request(
            {
                url: API_URL.item_category.SEARCH_ITEM_CATEGORY,
                method: "POST",
                bodyData: ItemPayload
            },
            function successCallback(response) {
                if (
                    (response.status === 200 || response.status === 201)) {
                    console.log(response, "response_Item")
                    setItemListPagination((prev) => ({
                        ...prev,
                        listData: response?.data?.page,
                        totalElements: response?.data?.totalElements
                    }))
                }
            },
            function errorCallback(error) {
                console.log("Error_Item", error)
            }
        );

    }, [
        ItemSearchFieldData?.searchValue,
        ItemSearchFieldData?.isAdvanceSearch,
        pageNo,
        isRefresh
    ])

        const ItemIconclickAction = (event) => {
        let id = event.target.id.split("_")[1];
        let type = event.target.id.split("_")[0];
        console.log(id, type, ItemListPaginationData?.listData,"TableAction");   
        let clickeData =  ItemListPaginationData?.listData?.filter(
            (singleItem) => singleItem?.itemCategoryId?.toString() === id.toString()
          );
          console.log(clickeData,"clickeDataclickeData");
          setClickedItem(clickeData[0]);     

         if(type === "edit"){
            console.log("edit",clickeData[0]);
            setItemCategoryInfo(clickeData[0]);
            setActionType("edit");
           setIsEditMode(true);
           setItemCategoryName(clickeData[0]?.itemCategoryName);
           setItemCategoryDescription(clickeData[0]?.itemCategoryDescription);
        }else{
            
            setInactiveItemId(id);
        }
    }



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
                {isEditMode ? "Update Item Category" : "Add Item Category"}
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
                                name="itemCategoryName"
                                value={itemCategoryName}
                                disabled={isSaveAsNew || isViewMode}
                                error={errorFields?.itemCategoryName}
                                label={
                                    <span>
                                        Category Name <span style={{ color: "red" }}>*</span>
                                    </span>
                                }
                                onChange={(e) => {
                                    setItemCategoryName(e.target.value);
                                    handledChangeFieldFun(e, "itemCategoryName");
                                    setErrorFields({ ...errorFields, itemCategoryName: false });
                                }}
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
                                name="itemCategoryDescription"
                                value={itemCategoryDescription}
                                disabled={isSaveAsNew || isViewMode}
                                label="Description"
                                onChange={(e) => {
                                    setItemCategoryDescription(e.target.value);
                                    handledChangeFieldFun(e, "itemCategoryDescription");
                                    setErrorFields({ ...errorFields, itemCategoryDescription: false });
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

                      <Grid container xs={12} className={commonClasses?.tableBlock}>
                    <TableComponent
                        classes={classes}
                        columns={columnData}
                        rows={ItemListPaginationData?.listData}
                        uniqueField="itemCategoryId"
                        pageNo={ItemListPaginationData?.pageNo}
                        pageDataCount={ItemListPaginationData?.pageSize}
                        isPagination={true}
                        apiHandlePagination={true}
                        handlePagination={(page) => { setPageNo(page) }}
                        datatotalCount={ItemListPaginationData?.totalElements}
                        paginationClass={commonClasses?.paginationStyle}
                    />
                </Grid>

            </DialogContent>


        </Dialog>
    );
};

export default ItemCategoryForm;
