import React, { useEffect, useState } from 'react';
import {
    Grid, Button, Card, CardContent, Typography
} from "@mui/material";
import classNames from 'classnames';
import { useStyles } from "../../../../assets/styles/styles";
import TableComponent from '../../common/material/TableComponent';
import SearchComponent from '../../common/material/SearchComponent';
import Snackbar from '../../common/Snackbar';
import ConfirmationModal from "../../common/ConfirmationModal";
import NewBOM from "./modals/NewBom";
import { API_URL } from "../../shared/API_URLS";
import { http_Request } from "../../shared/HTTP_Request";
import { FormCommonStyles } from "../../../../assets/styles/FormCommonStyle";
import editIcon from '../../../../assets/image/icons/editIcon.png'
import viewIcon from "../../../../assets/image/icons/viewAction.svg";
import deleteIcon from "../../../../assets/image/icons/ehr-delete.svg";

const BOM = () => {
    const commonClasses = FormCommonStyles();
    const classes = useStyles();

    const [isNewAndUpdateModal, setIsNewAndUpdateModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [clickedItem, setClickedItem] = useState({});
    const [isRefresh, setIsRefresh] = useState(false);
    const [snackText, setSnackText] = useState("");
    const [snackVariant, setSnackVariant] = useState("");
    const [pageNo, setPageNo] = useState(1);
    const [bomListData, setBomListData] = useState({
        listData: [],
        pageNo: 1,
        pageSize: 10,
        totalElements: 0,
        isInitialRequest: true
    });
    const [searchFieldData, setSearchFieldData] = useState({
        isAdvanceSearch: false,
        advancedSearchOptions: [
           
            { id: "description", name: "Description" }
        ],
        selectedSearchOption: "",
        searchValue: "",
    });
    const [changesConfirmationModal, setChangesConfirmationModal] = useState(false);
    const [inactiveBomId, setInactiveBomId] = useState(null);

    const resetSnack = () => {
        setSnackText();
        setSnackVariant();
    };

    const handleAdvanceSearch = (isChecked) => {
        setSearchFieldData(prev => ({
            ...prev,
            isAdvanceSearch: isChecked,
            searchValue: ''
        }))
    }
    const handleDropDownSelect = (event) => {
        setSearchFieldData(prev => ({
            ...prev,
            selectedSearchOption: event.target?.value || '',
            searchValue: ''
        }))
    }
    const handleSearchValue = (event) => {
        setSearchFieldData(prev => ({
            ...prev,
            searchValue: event.target?.value || ''
        }))
    }

    const columnData = [
        
        { id: "finishedItem", name: "Finished Item" },
        { id: "description", name: "Description" },
        { id: "status", name: "Status" },
        {
            id: "action",
            name: "Action",
            template: {
                type: "clickableIconBlock",
                columnAlign: "right",
                iconClickAction: ((event) => { iconClickAction && iconClickAction(event) }),
                icons: [
                    { id: "view", name: "View", alt: "view", iconLink: viewIcon, iconClass: commonClasses.pointerClass },
                    { id: "edit", name: "Edit", alt: "edit", iconLink: editIcon, iconClass: commonClasses.pointerClass },
                    { id: "delete", name: "Delete", alt: "delete", iconLink: deleteIcon, iconClass: commonClasses.pointerClass }
                ]
            },
        },
    ];

    const iconClickAction = (event) => {
        let id = event.target.id.split("_")[1];
        let type = event.target.id.split("_")[0];
        let clickedData = bomListData?.listData?.find(
            (singleItem) => singleItem?.bomId?.toString() === id.toString()
        );
        setClickedItem(clickedData);

        if (type === "view") {
            setIsNewAndUpdateModal(true);
            setIsViewMode(true);
        } else if (type === "edit") {
            setIsNewAndUpdateModal(true);
            setIsEditMode(true);
        } else {
            setChangesConfirmationModal(true);
            setInactiveBomId(id);
        }
    }

    // Inactive BOM function (implement your own API endpoint)
    const handleInActiveBom = (inactiveBomId) => {
        http_Request(
            {
                url: API_URL.bom.INACTIVE_BOM.replace('{bomId}', inactiveBomId),
                method: "PUT",
            },
            function successCallback(response) {
                if ((response.status === 200 || response.status === 201)) {
                    setSnackVariant("success");
                    setSnackText("BOM is Inactivated Successfully...!");
                    setIsRefresh(!isRefresh);
                }
            },
            function errorCallback(error) {
                console.log("Error_BOM", error)
            }
        );
    }

    useEffect(() => {
        let payload = {
            pageNo: pageNo,
            pageSize: bomListData?.pageSize,
            name: (!searchFieldData?.isAdvanceSearch && searchFieldData?.selectedSearchOption === "name") ? searchFieldData?.searchValue : "",
            
            companyId: JSON.parse(localStorage.getItem("userDetail")).companyId,
        }
        http_Request(
            {
                url: API_URL.bom.SEARCH_BOM,
                method: "POST",
                bodyData: payload
            },
            function successCallback(response) {
                if ((response.status === 200 || response.status === 201)) {
                    setBomListData((prev) => ({
                        ...prev,
                        listData: response?.data?.page,
                        totalElements: response?.data?.totalElements
                    }))
                }
            },
            function errorCallback(error) {
                console.log("Error_BOM", error)
            }
        );
    }, [
        searchFieldData?.searchValue,
        searchFieldData?.isAdvanceSearch,
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
            {isNewAndUpdateModal &&
                <NewBOM
                    isModal={isNewAndUpdateModal}
                    closeAction={() => { setIsNewAndUpdateModal(false); setIsEditMode(false); setIsViewMode(false); }}
                    isEditMode={isEditMode}
                    isViewMode={isViewMode}
                    bomInfo={clickedItem}
                    isRefresh={isRefresh}
                    setIsRefresh={setIsRefresh}
                />
            }
            <Card elevation={10}>
                <CardContent className={commonClasses.mainCardContainer}>
                    <Grid container xs={12} md={12} display="flex" justifyContent='flex-start'>
                        <Typography className={commonClasses?.resturantTitleWordTypo}>{"BOM Management"}</Typography>
                    </Grid>
                    <Grid container xs={12} display={"flex"} justifyContent='space-between'>
                        <Grid item xs={10} md={10}></Grid>
                        <Grid container item xs={2} md={2} display={"flex"} justifyContent='flex-end'>
                            <Button
                                className={classNames(commonClasses.mediumAddBtn, commonClasses.addBtn)}
                                onClick={() => {
                                    setIsNewAndUpdateModal(true);
                                    setIsEditMode(false);
                                    setIsViewMode(false);
                                }}
                            >
                                {"Add BOM"}
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
                                comName='bom-list-search'
                                isAdvancedSearch={searchFieldData?.isAdvanceSearch}
                                isAdvanceSearchHandler={checked => handleAdvanceSearch(checked)}
                                toggleSectionGridSize={2}
                                searchSectionGridSize={10}
                                dropdownOptionData={searchFieldData?.advancedSearchOptions}
                                dropdownSelectValue={searchFieldData?.selectedSearchOption}
                                handleDropDownSelect={handleDropDownSelect}
                                searchValue={searchFieldData?.searchValue}
                                handleSearchValue={handleSearchValue}
                                inputFieldText={
                                    !searchFieldData?.isAdvanceSearch ? "Search By Finished Item" : ""
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container xs={12} className={commonClasses?.tableBlock}>
                        <TableComponent
                            classes={classes}
                            columns={columnData}
                            rows={bomListData?.listData}
                            uniqueField="bomId"
                            pageNo={bomListData?.pageNo}
                            pageDataCount={bomListData?.pageSize}
                            isPagination={true}
                            apiHandlePagination={true}
                            handlePagination={(page) => { setPageNo(page) }}
                            datatotalCount={bomListData?.totalElements}
                            paginationClass={commonClasses?.paginationStyle}
                        />
                    </Grid>
                    <ConfirmationModal
                        classes={classes}
                        isConfirmationModal={changesConfirmationModal}
                        closeConfirmationAction={() => {
                            setChangesConfirmationModal(false);
                        }}
                        modalConfirmAction={() => {
                            handleInActiveBom(inactiveBomId);
                            setChangesConfirmationModal(false);
                        }}
                        confirmationModalHeader="Inactive BOM"
                        confirmationModalContent="Are You Sure You Want to Inactive!"
                        noBtnId="redirectCancel"
                        yesBtnId="redirectPage"
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default BOM;