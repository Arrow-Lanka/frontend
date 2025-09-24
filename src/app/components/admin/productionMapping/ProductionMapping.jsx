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

// icons (reuse same icons as Batch)
import editIcon from '../../../../assets/image/icons/editIcon.png';
import viewIcon from "../../../../assets/image/icons/viewAction.svg";
import deleteIcon from "../../../../assets/image/icons/ehr-delete.svg";

// Backend
import { API_URL } from "../../shared/API_URLS";
import { http_Request } from "../../shared/HTTP_Request";

// sub components
import NewandEditMapping from "./modals/NewandEditMapping";

const ProductionMapping = () => {
  const commonClasses = FormCommonStyles();
  const classes = useStyles();

  const [isNewAndUpdateMappingModal, setIsNewAndUpdateMappingModal] = useState(false);
  const [MappingSearchFieldData, setMappingSearchFieldData] = useState({
    isAdvanceSearch: false,
    advancedSearchOptions: [
      { id: "mappingId", name: "Mapping ID" },
      { id: "inputItemName", name: "Input Item" },
      { id: "outputItemName", name: "Output Item" }
    ],
    selectedSearchOption: "",
    searchValue: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [clickedMapping, setClickedMapping] = useState({});
  const [MappingsListPaginationData, setMappingsListPagination] = useState({
    listData: [],
    pageNo: 1,
    pageSize: 10,
    totalElements: 0,
    isInitialRequest: true
  });
  const [snackText, setSnackText] = useState("");
  const [snackVariant, setSnackVariant] = useState("");
  const [changesConfirmationModal, setChangesConfirmationModal] = useState(false);
  const [inactiveMappingId, setInactiveMappingId] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);

  const resetSnack = () => {
    setSnackText();
    setSnackVariant();
  };

  // Search handlers
  const handleAdvanceSearch = (isChecked) => {
    setMappingSearchFieldData(prev => ({
      ...prev,
      isAdvanceSearch: isChecked,
      searchValue: ''
    }));
  };

  const handleDropDownSelectMapping = (event) => {
    setMappingSearchFieldData(prev => ({
      ...prev,
      selectedSearchOption: event.target?.value || '',
      searchValue: ''
    }));
  };

  const handleMappingSearchValue = (event) => {
    setMappingSearchFieldData(prev => ({
      ...prev,
      searchValue: event.target?.value || ''
    }));
  };

  // Table columns
  const columnData = [
   
    { id: "inputItemName", name: "Input Item" },
    { id: "outputItemName", name: "Output Item" },
    { id: "processType", name: "Process Type" },
    {
      id: "action",
      name: "Action",
      template: {
        type: "clickableIconBlock",
        columnAlign: "right",
        iconClickAction: (event) => { ProductionMappingIconClickAction && ProductionMappingIconClickAction(event) },
        icons: [
          { id: "view", name: "View", alt: "view", iconLink: viewIcon, iconClass: commonClasses.pointerClass },
          { id: "edit", name: "Edit", alt: "edit", iconLink: editIcon, iconClass: commonClasses.pointerClass },
          { id: "delete", name: "Delete", alt: "delete", iconLink: deleteIcon, iconClass: commonClasses.pointerClass }
        ]
      }
    }
  ];

  const ProductionMappingIconClickAction = (event) => {
    const [type, id] = (event.target.id || "").split("_");
    const clickedData = MappingsListPaginationData?.listData?.find(
      (m) => String(m?.productionMappingId) === String(id)
    );
    setClickedMapping(clickedData || {});

    if (type === "view") {
      setIsNewAndUpdateMappingModal(true);
      setIsViewMode(true);
    } else if (type === "edit") {
      setIsNewAndUpdateMappingModal(true);
      setIsEditMode(true);
    } else {
      setChangesConfirmationModal(true);
      setInactiveMappingId(id);
    }
  };

  const handleInActiveMapping = (id) => {
    if (!id) return;
    // ensure your API has INACTIVE_MAPPING endpoint or adjust accordingly
    http_Request(
      {
        url: API_URL.mapping.INACTIVE_MAPPING?.replace('{mappingId}', id) || API_URL.mapping.INACTIVE?.replace('{mappingId}', id),
        method: "PUT",
      },
      function successCallback(response) {
        if (response.status === 200 || response.status === 201) {
          setSnackVariant("success");
          setSnackText("Mapping is Inactivated Successfully!");
          setIsRefresh(!isRefresh);
        }
      },
      function errorCallback(error) {
        console.log("Error_Mapping", error)
      }
    );
  };

  // Fetch mapping list
  useEffect(() => {
    const payload = {
      pageNo: pageNo,
      pageSize: MappingsListPaginationData?.pageSize,
      name: (!MappingSearchFieldData?.isAdvanceSearch) ? MappingSearchFieldData?.searchValue : "",
      companyId: JSON.parse(localStorage.getItem("userDetail")).companyId,
    };
    http_Request(
      {
        url: API_URL.mapping.SEARCH_MAPPING,
        method: "POST",
        bodyData: payload
      },
      function successCallback(response) {
        if (response.status === 200 || response.status === 201) {
          setMappingsListPagination((prev) => ({
            ...prev,
            listData: response?.data?.page || response?.data || [],
            totalElements: response?.data?.totalElements || (response?.data?.page?.length || 0)
          }));
        }
      },
      function errorCallback(error) {
        console.log("Error_Mapping_List", error)
      }
    );
  }, [
    MappingSearchFieldData?.searchValue,
    MappingSearchFieldData?.isAdvanceSearch,
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
      { isNewAndUpdateMappingModal &&
        <NewandEditMapping
          isModal={isNewAndUpdateMappingModal}
          closeAction={() => { setIsNewAndUpdateMappingModal(false); setIsEditMode(false); setIsViewMode(false); }}
          isEditMode={isEditMode}
          isViewMode={isViewMode}
          mappingInfo={clickedMapping}
          isRefresh={isRefresh}
          setIsRefresh={setIsRefresh}
        />
      }
      <Card elevation={10}>
        <CardContent className={commonClasses.mainCardContainer}>
          <Grid container xs={12} md={12} display="flex" justifyContent='flex-start'>
            <Typography className={commonClasses?.resturantTitleWordTypo}>{"Production Mapping"}</Typography>
          </Grid>

          <Grid container xs={12} display={"flex"} justifyContent='space-between'>
            <Grid item xs={10} md={10}></Grid>
            <Grid container item xs={2} md={2} display={"flex"} justifyContent='flex-end'>
              <Button
                className={classNames(commonClasses.mediumAddBtn, commonClasses.addBtn)}
                onClick={() => {
                  setIsNewAndUpdateMappingModal(true);
                  setIsEditMode(false);
                  setIsViewMode(false);
                }}
              >
                {"Add Mapping"}
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
                comName='Mapping-list-search'
                isAdvancedSearch={MappingSearchFieldData?.isAdvanceSearch}
                isAdvanceSearchHandler={checked => handleAdvanceSearch(checked)}
                toggleSectionGridSize={2}
                searchSectionGridSize={10}
                dropdownOptionData={MappingSearchFieldData?.advancedSearchOptions}
                dropdownSelectValue={MappingSearchFieldData?.selectedSearchOption}
                handleDropDownSelect={handleDropDownSelectMapping}
                searchValue={MappingSearchFieldData?.searchValue}
                handleSearchValue={handleMappingSearchValue}
                inputFieldText={
                  !MappingSearchFieldData?.isAdvanceSearch ? "Search By Mapping" : ""
                }
              />
            </Grid>
          </Grid>

          <Grid container xs={12} className={commonClasses?.tableBlock}>
            <TableComponent
              classes={classes}
              columns={columnData}
              rows={MappingsListPaginationData?.listData}
              uniqueField="productionMappingId"
              pageNo={MappingsListPaginationData?.pageNo}
              pageDataCount={MappingsListPaginationData?.pageSize}
              isPagination={true}
              apiHandlePagination={true}
              handlePagination={(page) => { setPageNo(page) }}
              datatotalCount={MappingsListPaginationData?.totalElements}
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
              handleInActiveMapping(inactiveMappingId);
              setChangesConfirmationModal(false);
            }}
            confirmationModalHeader="Inactive Mapping"
            confirmationModalContent="Are You Sure You Want to Inactivate?"
            noBtnId="redirectCancel"
            yesBtnId="redirectPage"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductionMapping;