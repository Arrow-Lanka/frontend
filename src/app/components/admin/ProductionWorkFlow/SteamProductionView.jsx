import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, Button, Typography, TextField } from "@mui/material";
import classNames from "classnames";
import { useStyles } from "../../../../assets/styles/styles";
import { FormCommonStyles } from "../../../../assets/styles/FormCommonStyle";
import TableComponent from "../../common/material/TableComponent";
import SteamProduction from "../steam/modals/SteamProduction";
import Snackbar from "../../common/Snackbar";
import SearchComponent from '../../common/material/SearchComponent';
import { API_URL } from "../../shared/API_URLS";
import { http_Request } from "../../shared/HTTP_Request";

import editIcon from "../../../../assets/image/icons/editIcon.png";
import viewIcon from "../../../../assets/image/icons/viewAction.svg";
import deleteIcon from "../../../../assets/image/icons/ehr-delete.svg";

const SteamProductionView = () => {
    const classes = useStyles();
    const commonClasses = FormCommonStyles();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [clickedProduction, setClickedProduction] = useState({});
    const [isRefresh, setIsRefresh] = useState(false);

    const [snackText, setSnackText] = useState("");
    const [snackVariant, setSnackVariant] = useState("success");

    // Search and filter states
    const [steamSearchFieldData, setSteamSearchFieldData] = useState({
        isAdvanceSearch: false,
        advancedSearchOptions: [
            { id: "name", name: "Name" },
            { id: "paddy", name: "Paddy" },
            { id: "fromLocation", name: "From Location" },
            { id: "paddyBatch", name: "Paddy Batch" }
        ],
        selectedSearchOption: "",
        searchValue: "",
    });

    const [dateRange, setDateRange] = useState({
        fromDate: "",
        toDate: ""
    });

    const [steamListPaginationData, setSteamListPagination] = useState({
        listData: [],
        pageNo: 1,
        pageSize: 10,
        totalElements: 0,
        isInitialRequest: true,
    });

    // Table columns
    const columnData = [
    { id: "productionDate", name: "Production Date" },
    { id: "rawPaddyItemName", name: "Raw Paddy Item" },
    { id: "batchNo", name: "Batch No" },
    { id: "fromLocationName", name: "From Location" },
    { id: "toLocationName", name: "To Location" },
    { id: "steamPaddyItemName", name: "Steam Paddy Item" },
    { id: "paddyQuantity", name: "Paddy Quantity" },
    { id: "finalMoisture", name: "Final Moisture (%)" },
    {
        id: "action",
        name: "Action",
        template: {
            type: "clickableIconBlock",
            columnAlign: "right",
            iconClickAction: (event) => SteamProductionIconClickAction(event),
            icons: [
                { id: "view", name: "View", alt: "view", iconLink: viewIcon, iconClass: commonClasses.pointerClass },
                { id: "edit", name: "Edit", alt: "edit", iconLink: editIcon, iconClass: commonClasses.pointerClass },
                { id: "delete", name: "Delete", alt: "delete", iconLink: deleteIcon, iconClass: commonClasses.pointerClass }
            ]
        }
    }
];

const SteamProductionIconClickAction = (event) => {
    let id = event.target.id.split("_")[1];
    let type = event.target.id.split("_")[0];
    let clickedData = steamListPaginationData?.listData?.find(
        (singleProd) => singleProd?.steamProductionId?.toString() === id.toString()
    );
    setClickedProduction(clickedData || {});
    if (type === "view") {
        setIsModalOpen(true);
        setIsViewMode(true);
        setIsEditMode(false);
    } else if (type === "edit") {
        setIsModalOpen(true);
        setIsEditMode(true);
        setIsViewMode(false);
    } else {
        // Handle delete or inactive logic here
        // setChangesConfirmationModal(true);
        // setInactiveProductionId(id);
    }
};
    // Fetch data
    useEffect(() => {
        let payload = {
            pageNo: steamListPaginationData.pageNo,
            pageSize: steamListPaginationData.pageSize,
            companyId: JSON.parse(localStorage.getItem("userDetail")).companyId,
            fromDate: dateRange.fromDate,
            toDate: dateRange.toDate,
        };

        if (!steamSearchFieldData.isAdvanceSearch) {
            payload.name = steamSearchFieldData.searchValue;
        } else if (steamSearchFieldData.selectedSearchOption) {
            payload[steamSearchFieldData.selectedSearchOption] = steamSearchFieldData.searchValue;
        }

        http_Request(
            {
                url: API_URL.steam.SEARCH_STEAM,
                method: "POST",
                bodyData: payload
            },
            function successCallback(response) {
                if (response.status === 200 || response.status === 201) {
                    setSteamListPagination((prev) => ({
                        ...prev,
                        listData: response?.data?.page || response?.data,
                        totalElements: response?.data?.totalElements || 0,
                    }));
                }
            },
            function errorCallback(error) {
                setSnackVariant("error");
                setSnackText("Failed to fetch steam productions");
            }
        );
    }, [
        steamSearchFieldData.searchValue,
        steamSearchFieldData.isAdvanceSearch,
        steamSearchFieldData.selectedSearchOption,
        steamListPaginationData.pageNo,
        isRefresh,
        dateRange.fromDate,
        dateRange.toDate
    ]);

    // Search handlers
    const handleAdvanceSearch = (isChecked) => {
        setSteamSearchFieldData(prev => ({
            ...prev,
            isAdvanceSearch: isChecked,
            searchValue: ''
        }));
    };

    const handleDropDownSelect = (event) => {
        setSteamSearchFieldData(prev => ({
            ...prev,
            selectedSearchOption: event.target?.value || '',
            searchValue: ''
        }));
    };

    const handleSearchValue = (event) => {
        setSteamSearchFieldData(prev => ({
            ...prev,
            searchValue: event.target?.value || ''
        }));
    };

    return (
        <div className={commonClasses.dashboardContainer}>
            <Snackbar text={snackText} variant={snackVariant} reset={() => setSnackText("")} />
            {isModalOpen && (
                <SteamProduction
                    isModal={isModalOpen}
                    closeAction={() => {
                        setIsModalOpen(false);
                        setIsEditMode(false);
                        setIsViewMode(false);
                        setClickedProduction({});
                    }}
                    isEditMode={isEditMode}
                    isViewMode={isViewMode}
                    productionInfo={clickedProduction}
                    setIsRefresh={setIsRefresh}
                />
            )}
            <Card elevation={10}>
                <CardContent className={commonClasses.mainCardContainer}>
                    <Grid container xs={12} display={"flex"} justifyContent='space-between' alignItems="center" sx={{ mb: 2 }}>
                        <Grid item>
                            <Typography className={commonClasses.resturantTitleWordTypo}>Steam Productions</Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                className={classNames(commonClasses.mediumAddBtn, commonClasses.addBtn)}
                                onClick={() => {
                                    setIsEditMode(false);
                                    setIsViewMode(false);
                                    setClickedProduction({});
                                    setIsModalOpen(true);
                                }}
                            >
                                Steam Production
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" style={{ marginTop: 10, marginBottom: 10 }}>
                        <Grid item xs={6} md={6}>
                            <SearchComponent
                                comName='steam-production-list-search'
                                isAdvancedSearch={steamSearchFieldData?.isAdvanceSearch}
                                isAdvanceSearchHandler={checked => handleAdvanceSearch(checked)}
                                toggleSectionGridSize={2}
                                searchSectionGridSize={10}
                                dropdownOptionData={steamSearchFieldData?.advancedSearchOptions}
                                dropdownSelectValue={steamSearchFieldData?.selectedSearchOption}
                                handleDropDownSelect={handleDropDownSelect}
                                searchValue={steamSearchFieldData?.searchValue}
                                handleSearchValue={handleSearchValue}
                                inputFieldText={
                                    !steamSearchFieldData?.isAdvanceSearch ? "Search " : ""
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
                            rows={steamListPaginationData.listData}
                            uniqueField="steamProductionId"
                            pageNo={steamListPaginationData.pageNo}
                            pageDataCount={steamListPaginationData.pageSize}
                            isPagination={true}
                            apiHandlePagination={true}
                            handlePagination={(page) => {
                                setSteamListPagination(prev => ({
                                    ...prev,
                                    pageNo: page
                                }));
                            }}
                            datatotalCount={steamListPaginationData.totalElements}
                            paginationClass={commonClasses.paginationStyle}
                        />
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
};

export default SteamProductionView;