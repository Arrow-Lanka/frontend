import React, { useEffect, useState } from 'react';
import {
    Grid,
    Button,
    Card,
    CardContent,
    Typography,
} from "@mui/material";
import classNames from 'classnames';
import { useStyles } from "../../../../assets/styles/styles";
import TableComponent from '../../common/material/TableComponent';
import SearchComponent from '../../common/material/SearchComponent';
import Snackbar from '../../common/Snackbar';
import ConfirmationModal from "../../common/ConfirmationModal";

// sub components
// You can create NewAndEditStock modal similar to NewAndEditStockLocation
// import NewAndEditStock from "./modals/NewAndEditStock";

//BackEnd
import { API_URL } from "../../shared/API_URLS";
import { http_Request } from "../../shared/HTTP_Request";

// styles
import { FormCommonStyles } from "../../../../assets/styles/FormCommonStyle";

// icons
import editIcon from '../../../../assets/image/icons/editIcon.png'
import viewIcon from "../../../../assets/image/icons/viewAction.svg";
import deleteIcon from "../../../../assets/image/icons/ehr-delete.svg";

const Stock = () => {
    const commonClasses = FormCommonStyles();
    const classes = useStyles();

    const [isNewAndUpdateItemModal, setIsNewAndUpdateItemModal] = useState(false);
    const [ItemSearchFieldData, setItemSearchFieldData] = useState({
        isAdvanceSearch: false,
        advancedSearchOptions: [
    
            { id: "batchNo", name: "Batch No" },
            { id: "stockLocation", name: "Stock Location" },
        ],
        selectedSearchOption: "",
        searchValue: "",
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [isSaveAsNew, setIsSaveAsNew] = useState(true);
    const [pageNo, setPageNo] = useState(1);
    const [clickedItem, setClickedItem] = useState({});
    const [ItemListPaginationData, setItemListPagination] = useState({
        listData: [],
        pageNo: 1,
        pageSize: 10,
        totalElements: 0,
        isInitialRequest: true
    });
    const [snackText, setSnackText] = useState("");
    const [snackVariant, setSnackVariant] = useState("");
    const [changesConfirmationModal, setChangesConfirmationModal] = useState(false);
    const [isModalSucceed, setIsModalSucceed] = React.useState(false);
    const [inactiveItemId, setInactiveItemId] = useState(null);
    const [isRefresh, setIsRefresh] = useState(false);

    const resetSnack = () => {
        setSnackText();
        setSnackVariant();
    };

    // Search handlers
    const handleAdvanceSearch = (isChecked) => {
        setItemSearchFieldData(prev => ({
            ...prev,
            isAdvanceSearch: isChecked,
            searchValue: ''
        }))
    }
    const handleDropDownSelectItem = (event) => {
        setItemSearchFieldData(prev => ({
            ...prev,
            selectedSearchOption: event.target?.value || '',
            searchValue: ''
        }))
    }
    const handleItemSearchValue = (event) => {
        setItemSearchFieldData(prev => ({
            ...prev,
            searchValue: event.target?.value || ''
        }))
    }

    // Table columns
    const columnData = [
        {
            id: "itemName",
            name: "Item Name",

        },
        {
            id: "stockLocationName",
            name: "Stock Location",

        },
        {
            id: "batchNo",
            name: "Batch No",
        },
        {
            id: "quantityIn",
            name: "Quantity In",
        },
        {
            id: "quantityOut",
            name: "Quantity Out",
        },
        {
            id: "balance",
            name: "Balance",
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
                        id: "view",
                        name: "View",
                        alt: "view",
                        iconLink: viewIcon,
                        iconClass: commonClasses.pointerClass
                    },
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

    const ItemIconclickAction = (event) => {
        let id = event.target.id.split("_")[1];
        let type = event.target.id.split("_")[0];
        let clickeData = ItemListPaginationData?.listData?.filter(
            (singleItem) => singleItem?.stockId?.toString() === id.toString()
        );
        setClickedItem(clickeData[0]);

        if (type === "view") {
            setIsNewAndUpdateItemModal(true);
            setIsViewMode(true);
        } else if (type === "edit") {
            setIsNewAndUpdateItemModal(true);
            setIsEditMode(true);
        } else {
            setChangesConfirmationModal(true);
            setInactiveItemId(id);
        }
    }

    // Inactive Item function (implement your own API endpoint)
    const handleInActiveItem = (inactiveItemId) => {
        http_Request(
            {
                url: API_URL.stock.INACTIVE_STOCK.replace('{stockId}', inactiveItemId),
                method: "PUT",
            },
            function successCallback(response) {
                if ((response.status === 200 || response.status === 201)) {
                    setSnackVariant("success");
                    setSnackText("Stock is Inactivated Successfully...!");
                    setIsRefresh(!isRefresh);
                }
            },
            function errorCallback(error) {
                console.log("Error_Stock", error)
            }
        );
    }

    // Fetch stock list
    useEffect(() => {
        let ItemPayload = {
            pageNo: pageNo,
            pageSize: ItemListPaginationData?.pageSize,
            itemName: (!ItemSearchFieldData?.isAdvanceSearch) ? ItemSearchFieldData?.searchValue : "",
            batchNo: (ItemSearchFieldData?.isAdvanceSearch && ItemSearchFieldData?.selectedSearchOption == "batchNo") ? ItemSearchFieldData?.searchValue : "",
            stockLocation: (ItemSearchFieldData?.isAdvanceSearch && ItemSearchFieldData?.selectedSearchOption == "stockLocation") ? ItemSearchFieldData?.searchValue : "",
            companyId: JSON.parse(localStorage.getItem("userDetail")).companyId,
        }
        http_Request(
            {
                url: API_URL.stock.SEARCH_STOCK,
                method: "POST",
                bodyData: ItemPayload
            },
            function successCallback(response) {
                if ((response.status === 200 || response.status === 201)) {
                    setItemListPagination((prev) => ({
                        ...prev,
                        listData: response?.data?.page,
                        totalElements: response?.data?.totalElements
                    }))
                }
            },
            function errorCallback(error) {
                console.log("Error_Stock", error)
            }
        );
    }, [
        ItemSearchFieldData?.searchValue,
        ItemSearchFieldData?.isAdvanceSearch,
        pageNo,
        isRefresh
    ])

    return (
        <div className={commonClasses?.dashboardContainer}>
            <Snackbar
                text={snackText}
                variant={snackVariant}
                reset={() => { resetSnack() }}
            />
            {/* 
            {isNewAndUpdateItemModal &&
                <NewAndEditStock
                    isModal={isNewAndUpdateItemModal}
                    closeAction={() => { setIsNewAndUpdateItemModal(false); setIsEditMode(false); setIsViewMode(false); }}
                    isEditMode={isEditMode}
                    isViewMode={isViewMode}
                    StockInfo={clickedItem}
                    isSaveAsNew={isSaveAsNew}
                    setIsSaveAsNew={setIsSaveAsNew}
                    isRefresh={isRefresh}
                    setIsRefresh={setIsRefresh}
                />
            }
            */}
            <Card elevation={10}>
                <CardContent className={commonClasses.mainCardContainer}>
                    <Grid container xs={12} md={12} display="flex" justifyContent='flex-start'>
                        <Typography className={commonClasses?.resturantTitleWordTypo}>{"Stock Details"}</Typography>
                    </Grid>
                    <Grid container xs={12} display={"flex"} justifyContent='space-between'>
                        <Grid item xs={10} md={10}></Grid>
                        <Grid container item xs={2} md={2} display={"flex"} justifyContent='flex-end'>
                            <Button
                                className={classNames(commonClasses.mediumAddBtn, commonClasses.addBtn)}
                                onClick={() => {
                                    setIsNewAndUpdateItemModal(true);
                                    setIsSaveAsNew(true);
                                }}
                            >
                                {"Add Stock"}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container xs={12} display={"flex"} justifyContent='space-between' style={{ marginTop: "10px" }}>
                        <Grid item xs={6}></Grid>
                        <Grid
                            item
                            xs={6}
                            style={{
                                marginTop: "10px",
                                justifyContent: "flex-end"
                            }}
                        >
                            <SearchComponent
                                comName='Stock-list-search'
                                isAdvancedSearch={ItemSearchFieldData?.isAdvanceSearch}
                                isAdvanceSearchHandler={checked => handleAdvanceSearch(checked)}
                                toggleSectionGridSize={2}
                                searchSectionGridSize={10}
                                dropdownOptionData={ItemSearchFieldData?.advancedSearchOptions}
                                dropdownSelectValue={ItemSearchFieldData?.selectedSearchOption}
                                handleDropDownSelect={handleDropDownSelectItem}
                                searchValue={ItemSearchFieldData?.searchValue}
                                handleSearchValue={handleItemSearchValue}
                                inputFieldText={
                                    !ItemSearchFieldData?.isAdvanceSearch ? "Search By Item Name" : ""
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container xs={12} className={commonClasses?.tableBlock}>
                        <TableComponent
                            classes={classes}
                            columns={columnData}
                            rows={ItemListPaginationData?.listData}
                            uniqueField="stockId"
                            pageNo={ItemListPaginationData?.pageNo}
                            pageDataCount={ItemListPaginationData?.pageSize}
                            isPagination={true}
                            apiHandlePagination={true}
                            handlePagination={(page) => { setPageNo(page) }}
                            datatotalCount={ItemListPaginationData?.totalElements}
                            paginationClass={commonClasses?.paginationStyle}
                        />
                    </Grid>
                    <Grid container xs={12} justifyContent="flex-end" style={{ marginTop: 16 }}>
                        <Typography variant="h6" style={{ fontWeight: 600 }}>
                            Total Balance:&nbsp;
                            {ItemListPaginationData?.listData?.reduce(
                                (sum, row) => sum + (parseFloat(row.balance) || 0), 0
                            )}
                        </Typography>
                    </Grid>
                    <ConfirmationModal
                        classes={classes}
                        isConfirmationModal={changesConfirmationModal}
                        closeConfirmationAction={() => {
                            setChangesConfirmationModal(false);
                        }}
                        modalConfirmAction={() => {
                            handleInActiveItem(inactiveItemId);
                            setIsModalSucceed(true);
                            setChangesConfirmationModal(false);
                            setTimeout(() => setIsModalSucceed(false), 50);
                        }}
                        confirmationModalHeader="Inactive Stock"
                        confirmationModalContent="Are You Sure You Want to Inactive!"
                        noBtnId="redirectCancel"
                        yesBtnId="redirectPage"
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default Stock;