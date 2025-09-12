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

// Sub components (replace with your actual modal components)
import MillingProduction from "./modals/MillingProduction";


// Backend
import { API_URL } from "../../shared/API_URLS";
import { http_Request } from "../../shared/HTTP_Request";

// Styles
import { FormCommonStyles } from "../../../../assets/styles/FormCommonStyle";

// Icons
import editIcon from '../../../../assets/image/icons/editIcon.png';
import viewIcon from "../../../../assets/image/icons/viewAction.svg";
import deleteIcon from "../../../../assets/image/icons/ehr-delete.svg";

const MillingProductionView = () => {
  const commonClasses = FormCommonStyles();
  const classes = useStyles();

  const [isMillingProductionModal, setIsMillingProductionModal] = useState(false);
  const [isViewModal, setIsViewModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [clickedProduction, setClickedProduction] = useState({});
  const [pageNo, setPageNo] = useState(1);
  const [millingProductionSearchFieldData, setMillingProductionSearchFieldData] = useState({
    isAdvanceSearch: false,
    advancedSearchOptions: [
      { id: "paddyBatch", name: "Paddy Batch" },
      { id: "productionDate", name: "Production Date" },
    ],
    selectedSearchOption: "",
    searchValue: "",
  });
  const [millingProductionListPaginationData, setMillingProductionListPagination] = useState({
    listData: [],
    pageNo: 1,
    pageSize: 10,
    totalElements: 0,
    isInitialRequest: true
  });
  const [snackText, setSnackText] = useState("");
  const [snackVariant, setSnackVariant] = useState("");
  const [changesConfirmationModal, setChangesConfirmationModal] = useState(false);
  const [inactiveProductionId, setInactiveProductionId] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);

  const resetSnack = () => {
    setSnackText();
    setSnackVariant();
  };

  const handleAdvanceSearch = (isChecked) => {
    setMillingProductionSearchFieldData(
      prev => ({
        ...prev,
        isAdvanceSearch: isChecked,
        searchValue: ''
      })
    );
  };

  const handleDropDownSelect = (event) => {
    setMillingProductionSearchFieldData(
      prev => ({
        ...prev,
        selectedSearchOption: event.target?.value || '',
        searchValue: ''
      })
    );
  };

  const handleSearchValue = (event) => {
    setMillingProductionSearchFieldData(
      prev => ({
        ...prev,
        searchValue: event.target?.value || ''
      })
    );
  };

  const columnData = [
    { id: "productionDate", name: "Production Date" },
    { id: "paddyBatch", name: "Paddy Batch" },
    { id: "paddyItemName", name: "Paddy Item" },
    { id: "totalPaddyKg", name: "Total Paddy (Kg)" },
    { id: "riceItemName", name: "Rice Item" },
    { id: "mainRiceKg", name: "Main Rice (Kg)" },
    { id: "wastageKg", name: "Wastage (Kg)" },
    { id: "fromLocationName", name: "From Location" },
    { id: "toLocationName", name: "To Location" },
    {
      id: "action",
      name: "Action",
      template: {
        type: "clickableIconBlock",
        columnAlign: "right",
        iconClickAction: ((event) => { MillingProductionIconClickAction && MillingProductionIconClickAction(event) }),
        icons: [
          { id: "view", name: "View", alt: "view", iconLink: viewIcon, iconClass: commonClasses.pointerClass },
          { id: "edit", name: "Edit", alt: "edit", iconLink: editIcon, iconClass: commonClasses.pointerClass },
          { id: "delete", name: "Delete", alt: "delete", iconLink: deleteIcon, iconClass: commonClasses.pointerClass }
        ]
      },
    },
  ];

  const MillingProductionIconClickAction = (event) => {
    let id = event.target.id.split("_")[1];
    let type = event.target.id.split("_")[0];

    let clickedData = millingProductionListPaginationData?.listData?.find(
      (singleProduction) => singleProduction?.millingProductionId?.toString() === id.toString()
    );

    setClickedProduction(clickedData || {});

    if (type === "view") {
      setIsViewModal(true);
      setIsEditMode(false);
    } else if (type === "edit") {
      setIsMillingProductionModal(true);
      setIsEditMode(true);
      setIsViewModal(false);
    } else {
      setChangesConfirmationModal(true);
      setInactiveProductionId(id);
    }
  };

  const handleInActiveProduction = (inactiveProductionId) => {
    http_Request(
      {
        url: API_URL.milling.INACTIVE_MILLING_PRODUCTION.replace('{millingProductionId}', inactiveProductionId),
        method: "PUT",
      },
      function successCallback(response) {
        if (response.status === 200 || response.status === 201) {
          setSnackVariant("success");
          setSnackText("Milling Production is Inactivated Successfully!");
          setIsRefresh(!isRefresh);
        }
      },
      function errorCallback(error) {
        setSnackVariant("error");
        setSnackText("Failed to inactivate Milling Production!");
      }
    );
  };

  useEffect(() => {
    let payload = {
      pageNo: pageNo,
      pageSize: millingProductionListPaginationData?.pageSize,
      companyId: JSON.parse(localStorage.getItem("userDetail")).companyId,
    };

    if (!millingProductionSearchFieldData?.isAdvanceSearch) {
      payload.paddyBatch = millingProductionSearchFieldData?.searchValue;
    } else if (millingProductionSearchFieldData?.selectedSearchOption) {
      payload[millingProductionSearchFieldData?.selectedSearchOption] = millingProductionSearchFieldData?.searchValue;
    }

    http_Request(
      {
        url: API_URL.milling.SEARCH_MILLING,
        method: "POST",
        bodyData: payload
      },
      function successCallback(response) {
        if (response.status === 200 || response.status === 201) {
          setMillingProductionListPagination((prev) => ({
            ...prev,
            listData: response?.data?.page,
            totalElements: response?.data?.totalElements
          }));
        }
      },
      function errorCallback(error) {
        setSnackVariant("error");
        setSnackText("Failed to fetch Milling Production list!");
      }
    );
  }, [
    millingProductionSearchFieldData?.searchValue,
    millingProductionSearchFieldData?.isAdvanceSearch,
    millingProductionSearchFieldData?.selectedSearchOption,
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
      {isMillingProductionModal &&
        <MillingProduction
          isModal={isMillingProductionModal}
          closeAction={() => { setIsMillingProductionModal(false); setIsEditMode(false); }}
          isEditMode={isEditMode}
          productionInfo={clickedProduction}
          isRefresh={isRefresh}
          setIsRefresh={setIsRefresh}
        />
      }
    
      <Card elevation={10}>
        <CardContent className={commonClasses.mainCardContainer}>
          <Grid container xs={12} md={12} display="flex" justifyContent='flex-start'>
            <Typography className={commonClasses?.resturantTitleWordTypo}>{"Milling Production"}</Typography>
          </Grid>
          <Grid container xs={12} display={"flex"} justifyContent='space-between'>
            <Grid item xs={10} md={10}></Grid>
            <Grid container item xs={2} md={2} display={"flex"} justifyContent='flex-end'>
              <Button
                className={classNames(commonClasses.mediumAddBtn, commonClasses.addBtn)}
                onClick={() => {
                  setIsMillingProductionModal(true);
                  setIsEditMode(false);
                  setClickedProduction({});
                }}
              >
                {"Milling"}
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
                comName='MillingProduction-list-search'
                isAdvancedSearch={millingProductionSearchFieldData?.isAdvanceSearch}
                isAdvanceSearchHandler={checked => handleAdvanceSearch(checked)}
                toggleSectionGridSize={2}
                searchSectionGridSize={10}
                dropdownOptionData={millingProductionSearchFieldData?.advancedSearchOptions}
                dropdownSelectValue={millingProductionSearchFieldData?.selectedSearchOption}
                handleDropDownSelect={handleDropDownSelect}
                searchValue={millingProductionSearchFieldData?.searchValue}
                handleSearchValue={handleSearchValue}
                inputFieldText={
                  !millingProductionSearchFieldData?.isAdvanceSearch ? "Search By Paddy Batch" : ""
                }
              />
            </Grid>
          </Grid>
          <Grid container xs={12} className={commonClasses?.tableBlock}>
            <TableComponent
              classes={classes}
              columns={columnData}
              rows={millingProductionListPaginationData?.listData}
              uniqueField="millingProductionId"
              pageNo={millingProductionListPaginationData?.pageNo}
              pageDataCount={millingProductionListPaginationData?.pageSize}
              isPagination={true}
              apiHandlePagination={true}
              handlePagination={(page) => { setPageNo(page) }}
              datatotalCount={millingProductionListPaginationData?.totalElements}
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
              handleInActiveProduction(inactiveProductionId);
              setChangesConfirmationModal(false);
            }}
            confirmationModalHeader="Inactive Milling Production"
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