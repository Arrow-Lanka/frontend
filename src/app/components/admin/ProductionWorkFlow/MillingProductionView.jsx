import React, { useEffect, useState } from "react";
import {
    Grid,
    Button,
    Card,
    CardContent,
    Typography,
    TextField,
} from "@mui/material";
import classNames from "classnames";
import { useStyles } from "../../../../assets/styles/styles";
import TableComponent from "../../common/material/TableComponent";
import Snackbar from "../../common/Snackbar";
import ConfirmationModal from "../../common/ConfirmationModal";
import { API_URL } from "../../shared/API_URLS";
import { http_Request } from "../../shared/HTTP_Request";
import { FormCommonStyles } from "../../../../assets/styles/FormCommonStyle";
import SearchComponent from '../../common/material/SearchComponent';
import editIcon from "../../../../assets/image/icons/editIcon.png";
import viewIcon from "../../../../assets/image/icons/viewAction.svg";
import deleteIcon from "../../../../assets/image/icons/ehr-delete.svg";


// sub components
import NewAndEditMillingProduction from "../milling/modals/MillingProduction";

const MillingProductionView = () => {
    const commonClasses = FormCommonStyles();
    const classes = useStyles();

    const [snackText, setSnackText] = useState("");
    const [snackVariant, setSnackVariant] = useState("");
    const [changesConfirmationModal, setChangesConfirmationModal] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);

    // For modals (edit/view)
    const [isEditMode, setIsEditMode] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [clickedProduction, setClickedProduction] = useState({});
    const [isNewAndUpdateModal, setIsNewAndUpdateModal] = useState(false); // Uncomment if you have a modal

    const [millingSearchFieldData, setMillingSearchFieldData] = useState({
        isAdvanceSearch: false,
        advancedSearchOptions: [

            { id: "paddy", name: "Paddy" },
            { id: "paddyBatch", name: "Paddy Batch" },
            { id: "rice", name: "Rice" }
        ],
        selectedSearchOption: "",
        searchValue: "",
    });

    const [dateRange, setDateRange] = useState({
        fromDate: "",
        toDate: ""
    });

    const [millingListPaginationData, setMillingListPagination] = useState({
        listData: [],
        pageNo: 1,
        pageSize: 10,
        totalElements: 0,
        isInitialRequest: true,
    });


    const columnData = [
        { id: "productionDate", name: "Production Date" },
        { id: "paddyItemName", name: "Paddy" },
        { id: "paddyBatch", name: "Paddy Batch" },
        { id: "riceItemName", name: "Rice" },
        { id: "totalPaddyKg", name: "Total Paddy (Kg)" },
        { id: "mainRiceKg", name: "Main Rice (Kg)" },
        { id: "wastageKg", name: "Wastage (Kg)" },
        {
            id: "action",
            name: "Action",
            template: {
                type: "clickableIconBlock",
                columnAlign: "right",
                iconClickAction: (event) => MillingProductionIconClickAction(event),
                icons: [
                    { id: "view", name: "View", alt: "view", iconLink: viewIcon, iconClass: commonClasses.pointerClass },
                    { id: "edit", name: "Edit", alt: "edit", iconLink: editIcon, iconClass: commonClasses.pointerClass },
                    { id: "delete", name: "Delete", alt: "delete", iconLink: deleteIcon, iconClass: commonClasses.pointerClass }
                ]
            }
        }
    ];

    const MillingProductionIconClickAction = (event) => {
        let id = event.target.id.split("_")[1];
        let type = event.target.id.split("_")[0];
        let clickedData = millingListPaginationData?.listData?.find(
            (singleProd) => singleProd?.millingProductionId?.toString() === id.toString()
        );
        setClickedProduction(clickedData || {});
        if (type === "view") {
            setIsNewAndUpdateModal(true); // Uncomment if you have a modal
            setIsViewMode(true);
            setIsEditMode(false);
        } else if (type === "edit") {
            setIsNewAndUpdateModal(true); // Uncomment if you have a modal
            setIsEditMode(true);
            setIsViewMode(false);
        } else {
            setChangesConfirmationModal(true);
            setInactiveProductionId(id); // If you want to track which to delete
        }
    };

    useEffect(() => {
        let payload = {
            pageNo: millingListPaginationData.pageNo,
            pageSize: millingListPaginationData.pageSize,
            companyId: JSON.parse(localStorage.getItem("userDetail")).companyId,
            fromDate: dateRange.fromDate,
            toDate: dateRange.toDate,
        };

        if (!millingSearchFieldData.isAdvanceSearch) {
            payload.productionNo = millingSearchFieldData.searchValue;
        } else if (millingSearchFieldData.selectedSearchOption) {
            payload[millingSearchFieldData.selectedSearchOption] = millingSearchFieldData.searchValue;
        }

        http_Request(
            {
                url: API_URL.milling.SEARCH_MILLING,
                method: "POST",
                bodyData: payload
            },
            function successCallback(response) {
                if (response.status === 200 || response.status === 201) {
                    console.log("API response:", response?.data);
                    setMillingListPagination((prev) => ({
                        ...prev,
                        listData: response?.data?.page || response?.data,
                        totalElements: response?.data?.totalElements || 0,
                    }));
                }
            },
            function errorCallback(error) {
                setSnackVariant("error");
                setSnackText("Failed to fetch milling productions");
            }
        );
    }, [
        millingSearchFieldData.searchValue,
        millingSearchFieldData.isAdvanceSearch,
        millingSearchFieldData.selectedSearchOption,
        millingListPaginationData.pageNo,
        isRefresh,
        dateRange.fromDate,
        dateRange.toDate
    ]);

    const handleAdvanceSearch = (isChecked) => {
        setMillingSearchFieldData(prev => ({
            ...prev,
            isAdvanceSearch: isChecked,
            searchValue: ''
        }));
    };

    const handleDropDownSelect = (event) => {
        setMillingSearchFieldData(prev => ({
            ...prev,
            selectedSearchOption: event.target?.value || '',
            searchValue: ''
        }));
    };

    const handleSearchValue = (event) => {
        setMillingSearchFieldData(prev => ({
            ...prev,
            searchValue: event.target?.value || ''
        }));
    };

    return (
        <div className={commonClasses.dashboardContainer}>
            <Snackbar text={snackText} variant={snackVariant} reset={() => setSnackText("")} />
            {isNewAndUpdateModal &&
                <NewAndEditMillingProduction
                    isModal={isNewAndUpdateModal}
                    closeAction={() => { setIsNewAndUpdateModal(false); setIsEditMode(false); setIsViewMode(false); }}
                    isEditMode={isEditMode}
                    isViewMode={isViewMode}
                    productionInfo={clickedProduction}
                    isRefresh={isRefresh}
                    setIsRefresh={setIsRefresh}
                />
            }
            <Card elevation={10}>
                <CardContent className={commonClasses.mainCardContainer}>

                    <Grid container xs={12} display={"flex"} justifyContent='space-between' alignItems="center" sx={{ mb: 2 }}>
                        <Grid item>
                            <Typography className={commonClasses.resturantTitleWordTypo}>Milling Productions</Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                className={classNames(commonClasses.mediumAddBtn, commonClasses.addBtn)}
                                onClick={() => {
                                    setIsEditMode(false);
                                    setIsViewMode(false);
                                    setClickedProduction({});
                                    setIsNewAndUpdateModal(true); // Uncomment if you have a modal

                                }}
                            >
                                Milling Production
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" style={{ marginTop: 10, marginBottom: 10 }}>
                        <Grid item xs={6} md={6}>
                            <SearchComponent
                                comName='milling-production-list-search'
                                isAdvancedSearch={millingSearchFieldData?.isAdvanceSearch}
                                isAdvanceSearchHandler={checked => handleAdvanceSearch(checked)}
                                toggleSectionGridSize={2}
                                searchSectionGridSize={10}
                                dropdownOptionData={millingSearchFieldData?.advancedSearchOptions}
                                dropdownSelectValue={millingSearchFieldData?.selectedSearchOption}
                                handleDropDownSelect={handleDropDownSelect}
                                searchValue={millingSearchFieldData?.searchValue}
                                handleSearchValue={handleSearchValue}
                                inputFieldText={
                                    !millingSearchFieldData?.isAdvanceSearch ? "Search " : ""
                                }
                            />
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <TextField
                                label="From Date"
                                type="date"
                                value={dateRange.fromDate}
                                onChange={e => setDateRange(prev => ({ ...prev, fromDate: e.target.value }))}
                                fullWidth
                                size="small"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <TextField
                                label="To Date"
                                type="date"
                                value={dateRange.toDate}
                                onChange={e => setDateRange(prev => ({ ...prev, toDate: e.target.value }))}
                                fullWidth
                                size="small"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container xs={12} className={commonClasses.tableBlock}>
                        <TableComponent
                            classes={classes}
                            columns={columnData}
                            rows={millingListPaginationData.listData}
                            uniqueField="millingProductionId"
                            pageNo={millingListPaginationData.pageNo}
                            pageDataCount={millingListPaginationData.pageSize}
                            isPagination={true}
                            apiHandlePagination={true}
                            handlePagination={(page) => {
                                setMillingListPagination(prev => ({
                                    ...prev,
                                    pageNo: page
                                }));
                            }}
                            datatotalCount={millingListPaginationData.totalElements}
                            paginationClass={commonClasses.paginationStyle}
                        />
                    </Grid>
                    <ConfirmationModal
                        classes={classes}
                        isConfirmationModal={changesConfirmationModal}
                        closeConfirmationAction={() => setChangesConfirmationModal(false)}
                        modalConfirmAction={() => {
                            // handle inactivate here
                            setChangesConfirmationModal(false);
                        }}
                        confirmationModalHeader="Inactive Production"
                        confirmationModalContent="Are You Sure You Want to Inactive!"
                        noBtnId="redirectCancel"
                        yesBtnId="redirectPage"
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default MillingProductionView;