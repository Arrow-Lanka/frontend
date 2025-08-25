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

// styles
import { FormCommonStyles } from "../../../../assets/styles/FormCommonStyle";

// icons
import viewIcon from "../../../../assets/image/icons/viewAction.svg";
import editIcon from '../../../../assets/image/icons/editIcon.png';
import deleteIcon from "../../../../assets/image/icons/ehr-delete.svg";

// Backend
import { API_URL } from "../../shared/API_URLS";
import { http_Request } from "../../shared/HTTP_Request";

// sub components
import NewGRN from "./modals/NewGRN";

const GRN = () => {
    const commonClasses = FormCommonStyles();
    const classes = useStyles();

    const [isNewGRNModal, setIsNewGRNModal] = useState(false);
    const [GRNSearchFieldData, setGRNSearchFieldData] = useState({
        isAdvanceSearch: false,
        advancedSearchOptions: [
            { id: "grnNumber", name: "GRN Number" },
            { id: "supplierName", name: "Supplier Name" }
        ],
        selectedSearchOption: "",
        searchValue: "",
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [clickedGRN, setClickedGRN] = useState({});
    const [GRNListPaginationData, setGRNListPagination] = useState({
        listData: [],
        pageNo: 1,
        pageSize: 10,
        totalElements: 0,
        isInitialRequest: true
    });
    const [snackText, setSnackText] = useState("");
    const [snackVariant, setSnackVariant] = useState("");
    const [changesConfirmationModal, setChangesConfirmationModal] = useState(false);
    const [isModalSucceed, setIsModalSucceed] = useState(false);
    const [inactiveGRNId, setInactiveGRNId] = useState(null);
    const [isRefresh, setIsRefresh] = useState(false);

    const resetSnack = () => {
        setSnackText();
        setSnackVariant();
    };

    // Search handlers
    const handleAdvanceSearch = (isChecked) => {
        setGRNSearchFieldData(prev => ({
            ...prev,
            isAdvanceSearch: isChecked,
            searchValue: ''
        }));
    };

    const handleDropDownSelectGRN = (event) => {
        setGRNSearchFieldData(prev => ({
            ...prev,
            selectedSearchOption: event.target?.value || '',
            searchValue: ''
        }));
    };

    const handleGRNSearchValue = (event) => {
        setGRNSearchFieldData(prev => ({
            ...prev,
            searchValue: event.target?.value || ''
        }));
    };

    // Table columns
    const columnData = [
        { id: "grnNumber", name: "GRN Number" },
        { id: "grnDate", name: "GRN Date" },
        { id: "itemCount", name: "Items Count" },
        {
            id: "action",
            name: "Action",
            template: {
                type: "clickableIconBlock",
                columnAlign: "right",
                iconClickAction: (event) => { GRNIconClickAction && GRNIconClickAction(event) },
                icons: [
                    { id: "view", name: "View", alt: "view", iconLink: viewIcon, iconClass: commonClasses.pointerClass },
                    { id: "edit", name: "Edit", alt: "edit", iconLink: editIcon, iconClass: commonClasses.pointerClass },
                    { id: "delete", name: "Delete", alt: "delete", iconLink: deleteIcon, iconClass: commonClasses.pointerClass }
                ]
            }
        }
    ];

    const GRNIconClickAction = (event) => {
        let id = event.target.id.split("_")[1];
        let type = event.target.id.split("_")[0];
        let clickedData = GRNListPaginationData?.listData?.find(
            (singleGRN) => singleGRN?.grnId?.toString() === id.toString()
        );
        setClickedGRN(clickedData);

        if (type === "view") {
            setIsNewGRNModal(true);
            setIsViewMode(true);
        } else if (type === "edit") {
            setIsNewGRNModal(true);
            setIsEditMode(true);
        } else {
            setChangesConfirmationModal(true);
            setInactiveGRNId(id);
        }
    };

    // Inactivate GRN (implement as needed)
    const handleInActiveGRN = (inactiveGRNId) => {
        http_Request(
            {
                url: API_URL.grn.INACTIVE_GRN.replace('{grnId}', inactiveGRNId),
                method: "PUT",
            },
            function successCallback(response) {
                if (response.status === 200 || response.status === 201) {
                    setSnackVariant("success");
                    setSnackText("GRN is Inactivated Successfully!");
                    setIsRefresh(!isRefresh);
                }
            },
            function errorCallback(error) {
                console.log("Error_GRN", error)
            }
        );
    };

    // Fetch GRN list
    useEffect(() => {
        let GRNPayload = {
            pageNo: pageNo,
            pageSize: GRNListPaginationData?.pageSize,
            grnNumber: (!GRNSearchFieldData?.isAdvanceSearch) ? GRNSearchFieldData?.searchValue : "",
            // supplierName: "", // Add logic if needed
            companyId: JSON.parse(localStorage.getItem("userDetail")).companyId,
        };
        http_Request(
            {
                url: API_URL.grn.SEARCH_GRN,
                method: "POST",
                bodyData: GRNPayload
            },
            function successCallback(response) {
                if (response.status === 200 || response.status === 201) {
                    setGRNListPagination((prev) => ({
                        ...prev,
                        listData: response?.data?.page?.map(grn => ({
                            ...grn,
                            itemCount: grn.items?.length || 0
                        })),
                        totalElements: response?.data?.totalElements
                    }));
                }
            },
            function errorCallback(error) {
                console.log("Error_GRN", error)
            }
        );
    }, [
        GRNSearchFieldData?.searchValue,
        GRNSearchFieldData?.isAdvanceSearch,
        pageNo,
        isRefresh
    ]);

    return (
        <div className={commonClasses?.dashboardContainer}>
            <Snackbar
                text={snackText}
                variant={snackVariant}
                reset={() => { resetSnack() }}
            />
            {isNewGRNModal && (
                <NewGRN
                    isModal={isNewGRNModal}
                    closeAction={() => { setIsNewGRNModal(false); setIsEditMode(false); setIsViewMode(false); }}
                    isEditMode={isEditMode}
                    isViewMode={isViewMode}
                    grnInfo={clickedGRN}
                    isRefresh={isRefresh}
                    setIsRefresh={setIsRefresh}
                />
            )}
            <Card elevation={10}>
                <CardContent className={commonClasses.mainCardContainer}>
                    <Grid container xs={12} md={12} display="flex" justifyContent='flex-start'>
                        <Typography className={commonClasses?.resturantTitleWordTypo}>{"GRN List"}</Typography>
                    </Grid>
                    <Grid container xs={12} display={"flex"} justifyContent='space-between'>
                        <Grid item xs={10} md={10}></Grid>
                        <Grid container item xs={2} md={2} display={"flex"} justifyContent='flex-end'>
                            <Button
                                className={classNames(commonClasses.mediumAddBtn, commonClasses.addBtn)}
                                onClick={() => {
                                    setIsNewGRNModal(true);
                                    setIsEditMode(false);
                                    setIsViewMode(false);
                                }}
                            >
                                {"Add GRN"}
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
                                comName='GRN-list-search'
                                isAdvancedSearch={GRNSearchFieldData?.isAdvanceSearch}
                                isAdvanceSearchHandler={checked => handleAdvanceSearch(checked)}
                                toggleSectionGridSize={2}
                                searchSectionGridSize={10}
                                dropdownOptionData={GRNSearchFieldData?.advancedSearchOptions}
                                dropdownSelectValue={GRNSearchFieldData?.selectedSearchOption}
                                handleDropDownSelect={handleDropDownSelectGRN}
                                searchValue={GRNSearchFieldData?.searchValue}
                                handleSearchValue={handleGRNSearchValue}
                                inputFieldText={
                                    !GRNSearchFieldData?.isAdvanceSearch ? "Search By GRN Number" : ""
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container xs={12} className={commonClasses?.tableBlock}>
                        <TableComponent
                            classes={classes}
                            columns={columnData}
                            rows={GRNListPaginationData?.listData}
                            uniqueField="grnId"
                            pageNo={GRNListPaginationData?.pageNo}
                            pageDataCount={GRNListPaginationData?.pageSize}
                            isPagination={true}
                            apiHandlePagination={true}
                            handlePagination={(page) => { setPageNo(page) }}
                            datatotalCount={GRNListPaginationData?.totalElements}
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
                            handleInActiveGRN(inactiveGRNId);
                            setIsModalSucceed(true);
                            setChangesConfirmationModal(false);
                            setTimeout(() => setIsModalSucceed(false), 50);
                        }}
                        confirmationModalHeader="Inactive GRN"
                        confirmationModalContent="Are You Sure You Want to Inactive!"
                        noBtnId="redirectCancel"
                        yesBtnId="redirectPage"
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default GRN;