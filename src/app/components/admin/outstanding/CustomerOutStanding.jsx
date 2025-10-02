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
// import modal for create/edit/view if you have one
// import NewCustomerOutstanding from "./modals/NewCustomerOutstanding";
import { API_URL } from "../../shared/API_URLS";
import { http_Request } from "../../shared/HTTP_Request";
import { FormCommonStyles } from "../../../../assets/styles/FormCommonStyle";
import editIcon from '../../../../assets/image/icons/editIcon.png'
import viewIcon from "../../../../assets/image/icons/viewAction.svg";
import deleteIcon from "../../../../assets/image/icons/ehr-delete.svg";

const CustomerOutstanding = () => {
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
  const [outstandingListData, setOutstandingListData] = useState({
    listData: [],
    pageNo: 1,
    pageSize: 10,
    totalElements: 0,
    isInitialRequest: true
  });
  const [searchFieldData, setSearchFieldData] = useState({
    isAdvanceSearch: false,
    advancedSearchOptions: [
      { id: "customerName", name: "Customer Name" }
    ],
    selectedSearchOption: "",
    searchValue: "",
  });
  const [changesConfirmationModal, setChangesConfirmationModal] = useState(false);
  const [inactiveOutstandingId, setInactiveOutstandingId] = useState(null);

  const resetSnack = () => {
    setSnackText();
    setSnackVariant();
  };

  const handleAdvanceSearch = (isChecked) => {
    setSearchFieldData(prev => ({
      ...prev,
      isAdvanceSearch: isChecked,
      searchValue: ''
    }));
  };
  const handleDropDownSelect = (event) => {
    setSearchFieldData(prev => ({
      ...prev,
      selectedSearchOption: event.target?.value || '',
      searchValue: ''
    }));
  };
  const handleSearchValue = (event) => {
    setSearchFieldData(prev => ({
      ...prev,
      searchValue: event.target?.value || ''
    }));
  };

  const columnData = [
    { id: "customerName", name: "Customer Name" },
    { id: "totalOutstanding", name: "Total Outstanding" },
    { id: "lastUpdated", name: "Last Updated" },
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
    const [type, id] = (event.target.id || "").split("_");
    if (!id) return;
    const clickedData = outstandingListData?.listData?.find(item => String(item?.outstandingId) === String(id));
    setClickedItem(clickedData || {});

    if (type === "view") {
      // open view modal if implemented
      setIsNewAndUpdateModal(true);
      setIsViewMode(true);
    } else if (type === "edit") {
      setIsNewAndUpdateModal(true);
      setIsEditMode(true);
    } else {
      setChangesConfirmationModal(true);
      setInactiveOutstandingId(id);
    }
  };

  const handleInActiveOutstanding = (id) => {
    if (!id) return;
    // adjust API path if different
    http_Request(
      {
        url: API_URL.outstanding?.INACTIVE_OUTSTANDING?.replace('{outstandingId}', id) || API_URL.outstanding?.INACTIVE?.replace('{outstandingId}', id),
        method: "PUT",
      },
      function successCallback(response) {
        if (response.status === 200 || response.status === 201) {
          setSnackVariant("success");
          setSnackText("Outstanding record inactivated successfully!");
          setIsRefresh(prev => !prev);
        }
      },
      function errorCallback(error) {
        console.log("Error_Outstanding_Inactivate", error);
      }
    );
  };

  useEffect(() => {
    const payload = {
      pageNo: pageNo , // API sample shows page number zero-based
      pageSize: outstandingListData?.pageSize || 10,
      name: (!searchFieldData?.isAdvanceSearch) ? (searchFieldData?.searchValue || "") : "",
      companyId: JSON.parse(localStorage.getItem("userDetail")).companyId,
    };

    http_Request(
      {
        url: API_URL.outstanding?.SEARCH_OUTSTANDING || API_URL.outstanding?.SEARCH || "/outstanding/search",
        method: "POST",
        bodyData: payload
      },
      function successCallback(response) {
        if (response.status === 200 || response.status === 201) {
          const page = response?.data?.page || response?.data || [];
          // format lastUpdated for display
          const normalized = (Array.isArray(page) ? page : []).map(item => ({
            ...item,
            lastUpdated: item.lastUpdated ? new Date(item.lastUpdated).toLocaleString() : ""
          }));
          setOutstandingListData(prev => ({
            ...prev,
            listData: normalized,
            totalElements: response?.data?.totalElements ?? normalized.length
          }));
        }
      },
      function errorCallback(error) {
        console.log("Error_Outstanding_List", error);
      }
    );
  }, [
    searchFieldData?.searchValue,
    searchFieldData?.isAdvanceSearch,
    pageNo,
    isRefresh
  ]);

  return (
    <div className={commonClasses?.dashboardContainer}>
      <Snackbar
        text={snackText}
        variant={snackVariant}
        reset={() => { resetSnack(); }}
      />

      {/* TODO: implement modal component and uncomment below */}
      {/* {isNewAndUpdateModal &&
        <NewCustomerOutstanding
          isModal={isNewAndUpdateModal}
          closeAction={() => { setIsNewAndUpdateModal(false); setIsEditMode(false); setIsViewMode(false); }}
          isEditMode={isEditMode}
          isViewMode={isViewMode}
          outstandingInfo={clickedItem}
          isRefresh={isRefresh}
          setIsRefresh={setIsRefresh}
        />
      } */}

      <Card elevation={10}>
        <CardContent className={commonClasses.mainCardContainer}>
          <Grid container xs={12} md={12} display="flex" justifyContent='flex-start'>
            <Typography className={commonClasses?.resturantTitleWordTypo}>{"Customer Outstanding"}</Typography>
          </Grid>

          <Grid container xs={12} display={"flex"} justifyContent='space-between'>
            <Grid item xs={10} md={10}></Grid>
            <Grid container item xs={2} md={2} display={"flex"} justifyContent='flex-end'>
              <Button
                className={classNames(commonClasses.mediumAddBtn, commonClasses.addBtn)}
                onClick={() => { 
                  // open add modal if implemented
                  setIsNewAndUpdateModal(true);
                  setIsEditMode(false);
                  setIsViewMode(false);
                }}
              >
                {"Add Outstanding"}
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
                comName='outstanding-list-search'
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
                  !searchFieldData?.isAdvanceSearch ? "Search By Customer" : ""
                }
              />
            </Grid>
          </Grid>

          <Grid container xs={12} className={commonClasses?.tableBlock}>
            <TableComponent
              classes={classes}
              columns={columnData}
              rows={outstandingListData?.listData}
              uniqueField="outstandingId"
              pageNo={outstandingListData?.pageNo}
              pageDataCount={outstandingListData?.pageSize}
              isPagination={true}
              apiHandlePagination={true}
              handlePagination={(page) => { setPageNo(page) }}
              datatotalCount={outstandingListData?.totalElements}
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
              handleInActiveOutstanding(inactiveOutstandingId);
              setChangesConfirmationModal(false);
            }}
            confirmationModalHeader="Inactive Outstanding"
            confirmationModalContent="Are you sure you want to inactivate this outstanding record?"
            noBtnId="redirectCancel"
            yesBtnId="redirectPage"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerOutstanding;