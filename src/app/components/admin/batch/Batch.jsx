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
import editIcon from '../../../../assets/image/icons/editIcon.png';
import viewIcon from "../../../../assets/image/icons/viewAction.svg";
import deleteIcon from "../../../../assets/image/icons/ehr-delete.svg";

// Backend
import { API_URL } from "../../shared/API_URLS";
import { http_Request } from "../../shared/HTTP_Request";

// sub components
import NewAndEditBatch from "./modals/NewAndEditBatch";

const Batch = () => {
  const commonClasses = FormCommonStyles();
  const classes = useStyles();

  const [isNewAndUpdateBatchModal, setIsNewAndUpdateBatchModal] = useState(false);
  const [BatchSearchFieldData, setBatchSearchFieldData] = useState({
    isAdvanceSearch: false,
    advancedSearchOptions: [
      { id: "batchNumber", name: "Batch Number" },
      { id: "itemId", name: "Item ID" },
      { id: "supplierId", name: "Supplier ID" }
    ],
    selectedSearchOption: "",
    searchValue: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isSaveAsNew, setIsSaveAsNew] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [clickedBatch, setClickedBatch] = useState({});
  const [BatchListPaginationData, setBatchListPagination] = useState({
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
  const [inactiveBatchId, setInactiveBatchId] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);

  const resetSnack = () => {
    setSnackText();
    setSnackVariant();
  };

  // Search handlers
  const handleAdvanceSearch = (isChecked) => {
    setBatchSearchFieldData(prev => ({
      ...prev,
      isAdvanceSearch: isChecked,
      searchValue: ''
    }));
  };

  const handleDropDownSelectBatch = (event) => {
    setBatchSearchFieldData(prev => ({
      ...prev,
      selectedSearchOption: event.target?.value || '',
      searchValue: ''
    }));
  };

  const handleBatchSearchValue = (event) => {
    setBatchSearchFieldData(prev => ({
      ...prev,
      searchValue: event.target?.value || ''
    }));
  };

  // Table columns
  const columnData = [
    { id: "batchNumber", name: "Batch Number" },
    { id: "itemId", name: "Item ID" },
    { id: "productionDate", name: "Production Date" },
    { id: "expiryDate", name: "Expiry Date" },
    { id: "supplierId", name: "Supplier ID" },
    { id: "remarks", name: "Remarks" },
    {
      id: "action",
      name: "Action",
      template: {
        type: "clickableIconBlock",
        columnAlign: "right",
        iconClickAction: (event) => { BatchIconClickAction && BatchIconClickAction(event) },
        icons: [
          { id: "view", name: "View", alt: "view", iconLink: viewIcon, iconClass: commonClasses.pointerClass },
          { id: "edit", name: "Edit", alt: "edit", iconLink: editIcon, iconClass: commonClasses.pointerClass },
          { id: "delete", name: "Delete", alt: "delete", iconLink: deleteIcon, iconClass: commonClasses.pointerClass }
        ]
      }
    }
  ];

  const BatchIconClickAction = (event) => {
    let id = event.target.id.split("_")[1];
    let type = event.target.id.split("_")[0];
    let clickedData = BatchListPaginationData?.listData?.find(
      (singleBatch) => singleBatch?.batchId?.toString() === id.toString()
    );
    setClickedBatch(clickedData);

    if (type === "view") {
      setIsNewAndUpdateBatchModal(true);
      setIsViewMode(true);
    } else if (type === "edit") {
      setIsNewAndUpdateBatchModal(true);
      setIsEditMode(true);
    } else {
      setChangesConfirmationModal(true);
      setInactiveBatchId(id);
    }
  };

  // Inactivate Batch
  const handleInActiveBatch = (inactiveBatchId) => {
    http_Request(
      {
        url: API_URL.batch.INACTIVE_BATCH.replace('{batchId}', inactiveBatchId),
        method: "PUT",
      },
      function successCallback(response) {
        if (response.status === 200 || response.status === 201) {
          setSnackVariant("success");
          setSnackText("Batch is Inactivated Successfully!");
          setIsRefresh(!isRefresh);
        }
      },
      function errorCallback(error) {
        console.log("Error_Batch", error)
      }
    );
  };

  // Fetch batch list
  useEffect(() => {
    let BatchPayload = {
      pageNo: pageNo,
      pageSize: BatchListPaginationData?.pageSize,
      batchNumber: (!BatchSearchFieldData?.isAdvanceSearch) ? BatchSearchFieldData?.searchValue : "",
      itemId: "", // Add logic if needed
      supplierId: "", // Add logic if needed
      // companyId: JSON.parse(localStorage.getItem("userDetail")).companyId,
    };
    http_Request(
      {
        url: API_URL.batch.SEARCH_BATCH,
        method: "POST",
        bodyData: BatchPayload
      },
      function successCallback(response) {
        if (response.status === 200 || response.status === 201) {
          setBatchListPagination((prev) => ({
            ...prev,
            listData: response?.data?.page,
            totalElements: response?.data?.totalElements
          }));
        }
      },
      function errorCallback(error) {
        console.log("Error_Batch", error)
      }
    );
  }, [
    BatchSearchFieldData?.searchValue,
    BatchSearchFieldData?.isAdvanceSearch,
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
        { isNewAndUpdateBatchModal && 
            <NewAndEditBatch
                isModal={isNewAndUpdateBatchModal}
                closeAction={ () => { setIsNewAndUpdateBatchModal(false); setIsEditMode(false); setIsViewMode(false);}}
                isEditMode={ isEditMode }
                isViewMode={ isViewMode }
                BatchInfo={clickedBatch}
                isSaveAsNew={isSaveAsNew}
                setIsSaveAsNew={setIsSaveAsNew}
                isRefresh={isRefresh}
                setIsRefresh={setIsRefresh}
            />
        }
      <Card elevation={10}>
        <CardContent className={commonClasses.mainCardContainer}>
          <Grid container xs={12} md={12} display="flex" justifyContent='flex-start'>
            <Typography className={commonClasses?.resturantTitleWordTypo}>{"Batches"}</Typography>
          </Grid>
          <Grid container xs={12} display={"flex"} justifyContent='space-between'>
            <Grid item xs={10} md={10}></Grid>
            <Grid container item xs={2} md={2} display={"flex"} justifyContent='flex-end'>
              <Button
                className={classNames(commonClasses.mediumAddBtn, commonClasses.addBtn)}
                onClick={() => {
                  setIsNewAndUpdateBatchModal(true);
                  setIsSaveAsNew(true);
                }}
              >
                {"Add Batch"}
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
                comName='Batch-list-search'
                isAdvancedSearch={BatchSearchFieldData?.isAdvanceSearch}
                isAdvanceSearchHandler={checked => handleAdvanceSearch(checked)}
                toggleSectionGridSize={2}
                searchSectionGridSize={10}
                dropdownOptionData={BatchSearchFieldData?.advancedSearchOptions}
                dropdownSelectValue={BatchSearchFieldData?.selectedSearchOption}
                handleDropDownSelect={handleDropDownSelectBatch}
                searchValue={BatchSearchFieldData?.searchValue}
                handleSearchValue={handleBatchSearchValue}
                inputFieldText={
                  !BatchSearchFieldData?.isAdvanceSearch ? "Search By Batch Number" : ""
                }
              />
            </Grid>
          </Grid>
          <Grid container xs={12} className={commonClasses?.tableBlock}>
            <TableComponent
              classes={classes}
              columns={columnData}
              rows={BatchListPaginationData?.listData}
              uniqueField="batchId"
              pageNo={BatchListPaginationData?.pageNo}
              pageDataCount={BatchListPaginationData?.pageSize}
              isPagination={true}
              apiHandlePagination={true}
              handlePagination={(page) => { setPageNo(page) }}
              datatotalCount={BatchListPaginationData?.totalElements}
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
              handleInActiveBatch(inactiveBatchId);
              setIsModalSucceed(true);
              setChangesConfirmationModal(false);
              setTimeout(() => setIsModalSucceed(false), 50);
            }}
            confirmationModalHeader="Inactive Batch"
            confirmationModalContent="Are You Sure You Want to Inactive!"
            noBtnId="redirectCancel"
            yesBtnId="redirectPage"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Batch;