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
import NewAndEditProduction from "./modals/Production";

//BackEnd
import { API_URL } from "../../shared/API_URLS";
import { http_Request } from "../../shared/HTTP_Request";

// styles
import { FormCommonStyles } from "../../../../assets/styles/FormCommonStyle";

// icons
import editIcon from '../../../../assets/image/icons/editIcon.png';
import viewIcon from "../../../../assets/image/icons/viewAction.svg";
import deleteIcon from "../../../../assets/image/icons/ehr-delete.svg";

const ProductionView = () => {
  const commonClasses = FormCommonStyles();
  const classes = useStyles();

  const [isNewAndUpdateProductionModal, setIsNewAndUpdateProductionModal] = useState(false);
  const [ProductionSearchFieldData, setProductionSearchFieldData] = useState({
    isAdvanceSearch: false,
    advancedSearchOptions: [
      { id: "productionOrderId", name: "Order No" },
      { id: "finishedItemName", name: "Finished Item" },
   
    ],
    selectedSearchOption: "",
    searchValue: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [clickedProduction, setClickedProduction] = useState({});
  const [ProductionListPaginationData, setProductionListPagination] = useState({
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
    setProductionSearchFieldData(
      prev => ({
        ...prev,
        isAdvanceSearch: isChecked,
        searchValue: ''
      })
    );
  };

  const handleDropDownSelectProduction = (event) => {
    setProductionSearchFieldData(
      prev => ({
        ...prev,
        selectedSearchOption: event.target?.value || '',
        searchValue: ''
      })
    );
  };

  const handleProductionSearchValue = (event) => {
    setProductionSearchFieldData(
      prev => ({
        ...prev,
        searchValue: event.target?.value || ''
      })
    );
  };

  const columnData = [
    { id: "productionRefNo", name: "Order No" },
    { id: "productionDate", name: "Production Date" },
    { id: "finishedItemName", name: "Finished Item" },
    { id: "finishedQty", name: "Quantity" },
    { id: "fromLocation", name: "From Location" },
    { id: "toLocation", name: "To Location" },
    {
      id: "action",
      name: "Action",
      template: {
        type: "clickableIconBlock",
        columnAlign: "right",
        iconClickAction: ((event) => { ProductionIconclickAction && ProductionIconclickAction(event) }),
        icons: [
          { id: "view", name: "View", alt: "view", iconLink: viewIcon, iconClass: commonClasses.pointerClass },
          { id: "edit", name: "Edit", alt: "edit", iconLink: editIcon, iconClass: commonClasses.pointerClass },
          { id: "delete", name: "Delete", alt: "delete", iconLink: deleteIcon, iconClass: commonClasses.pointerClass }
        ]
      },
    },
  ];

const ProductionIconclickAction = (event) => {
  let id = event.target.id.split("_")[1];
  let type = event.target.id.split("_")[0];

  console.log("id:", id);
console.log("listData:", ProductionListPaginationData?.listData);
  let clickeData = ProductionListPaginationData?.listData?.find(
    (singleProduction) => singleProduction?.productionOrderId?.toString() === id.toString()
  );

  setClickedProduction(clickeData || {}); // fallback to empty object

  if (type === "view") {
    setIsNewAndUpdateProductionModal(true);
    setIsViewMode(true);
    setIsEditMode(false);
  } else if (type === "edit") {
    console.log("clickeData", clickeData);
    setIsNewAndUpdateProductionModal(true);
    setIsEditMode(true);
    setIsViewMode(false);
  } else {
    setChangesConfirmationModal(true);
    setInactiveProductionId(id);
  }
};

  const handleInActiveProduction = (inactiveProductionId) => {
    http_Request(
      {
        url: API_URL.production.INACTIVE_PRODUCTION.replace('{produceId}', inactiveProductionId),
        method: "PUT",
      },
      function successCallback(response) {
        if (response.status === 200 || response.status === 201) {
          setSnackVariant("success");
          setSnackText("Production is Inactivated Successfully...!");
          setIsRefresh(!isRefresh);
        }
      },
      function errorCallback(error) {
        console.log("Error_Production", error);
      }
    );
  };

  useEffect(() => {
    let ProductionPayload = {
      pageNo: pageNo,
      pageSize: ProductionListPaginationData?.pageSize,
      refNumber: (!ProductionSearchFieldData?.isAdvanceSearch) ? ProductionSearchFieldData?.searchValue : "",
      finishedItemName: (ProductionSearchFieldData?.isAdvanceSearch && ProductionSearchFieldData?.selectedSearchOption === "finishedItemName") ? ProductionSearchFieldData?.searchValue : "",
      companyId: JSON.parse(localStorage.getItem("userDetail")).companyId,
    };
    http_Request(
      {
        url: API_URL.production.SEARCH_PRODUCTION,
        method: "POST",
        bodyData: ProductionPayload
      },
      function successCallback(response) {
        if (response.status === 200 || response.status === 201) {
          setProductionListPagination((prev) => ({
            ...prev,
            listData: response?.data?.page,
            totalElements: response?.data?.totalElements
          }));
        }
      },
      function errorCallback(error) {
        console.log("Error_Production", error);
      }
    );
  }, [
    ProductionSearchFieldData?.searchValue,
    ProductionSearchFieldData?.isAdvanceSearch,
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
      {isNewAndUpdateProductionModal &&
        <NewAndEditProduction
          isModal={isNewAndUpdateProductionModal}
          closeAction={() => { setIsNewAndUpdateProductionModal(false); setIsEditMode(false); setIsViewMode(false); }}
          isEditMode={isEditMode}
          isViewMode={isViewMode}
          productionInfo={clickedProduction}
          isRefresh={isRefresh}
          setIsRefresh={setIsRefresh}
        />
      }
      <Card elevation={10}>
        <CardContent className={commonClasses.mainCardContainer}>
          <Grid container xs={12} md={12} display="flex" justifyContent='flex-start'>
            <Typography className={commonClasses?.resturantTitleWordTypo}>{"Production"}</Typography>
          </Grid>
          <Grid container xs={12} display={"flex"} justifyContent='space-between'>
            <Grid item xs={10} md={10}></Grid>
            <Grid container item xs={2} md={2} display={"flex"} justifyContent='flex-end'>
              <Button
                className={classNames(commonClasses.mediumAddBtn, commonClasses.addBtn)}
                onClick={() => {
                  setIsNewAndUpdateProductionModal(true);
                }}
              >
                {"Add Production"}
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
                comName='Production-list-search'
                isAdvancedSearch={ProductionSearchFieldData?.isAdvanceSearch}
                isAdvanceSearchHandler={checked => handleAdvanceSearch(checked)}
                toggleSectionGridSize={2}
                searchSectionGridSize={10}
                dropdownOptionData={ProductionSearchFieldData?.advancedSearchOptions}
                dropdownSelectValue={ProductionSearchFieldData?.selectedSearchOption}
                handleDropDownSelect={handleDropDownSelectProduction}
                searchValue={ProductionSearchFieldData?.searchValue}
                handleSearchValue={handleProductionSearchValue}
                inputFieldText={
                  !ProductionSearchFieldData?.isAdvanceSearch ? "Search By Order No" : ""
                }
              />
            </Grid>
          </Grid>
          <Grid container xs={12} className={commonClasses?.tableBlock}>
            <TableComponent
              classes={classes}
              columns={columnData}
              rows={ProductionListPaginationData?.listData}
              uniqueField="productionOrderId"
              pageNo={ProductionListPaginationData?.pageNo}
              pageDataCount={ProductionListPaginationData?.pageSize}
              isPagination={true}
              apiHandlePagination={true}
              handlePagination={(page) => { setPageNo(page) }}
              datatotalCount={ProductionListPaginationData?.totalElements}
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

export default ProductionView;