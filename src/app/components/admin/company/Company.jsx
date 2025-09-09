import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import classNames from "classnames";
import { useStyles } from "../../../../assets/styles/styles";
import TableComponent from "../../common/material/TableComponent";
import Snackbar from "../../common/Snackbar";
import ConfirmationModal from "../../common/ConfirmationModal";
import SearchComponent from "../../common/material/SearchComponent";
import NewAndEditCompany from "./modals/NewAndEditCompany";
import { API_URL } from "../../shared/API_URLS";
import { http_Request } from "../../shared/HTTP_Request";
import { FormCommonStyles } from "../../../../assets/styles/FormCommonStyle";
import editIcon from "../../../../assets/image/icons/editIcon.png";
import viewIcon from "../../../../assets/image/icons/viewAction.svg";
import deleteIcon from "../../../../assets/image/icons/ehr-delete.svg";

const Company = () => {
  const commonClasses = FormCommonStyles();
  const classes = useStyles();

  const [isNewAndUpdateCompanyModal, setIsNewAndUpdateCompanyModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [clickedCompany, setClickedCompany] = useState({});
  const [companyListPaginationData, setCompanyListPagination] = useState({
    listData: [],
    pageNo: 1,
    pageSize: 10,
    totalElements: 0,
    isInitialRequest: true,
  });
  const [snackText, setSnackText] = useState("");
  const [snackVariant, setSnackVariant] = useState("");
  const [changesConfirmationModal, setChangesConfirmationModal] = useState(false);
  const [inactiveCompanyId, setInactiveCompanyId] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);

  const columnData = [
    { id: "companyName", name: "Company Name" },
    { id: "generalEmail", name: "General Email" },
    { id: "financeEmail", name: "Finance Email" },
    { id: "financeContactPerson", name: "Finance Contact" },
    { id: "contactNumber", name: "Contact Number" },
    {
      id: "status",
      name: "Status",
      template: {
        type: "twoLineTextFields",
        fieldList: [{
          id: "status",
          options: [
            { id: "status", value: 1, conditionClass: commonClasses.greenChip },
            { id: "status", value: 0, conditionClass: commonClasses.darkRedChip }
          ]
        }]
      }
    },
    {
      id: "action",
      name: "Action",
      template: {
        type: "clickableIconBlock",
        columnAlign: "right",
        iconClickAction: (event) => CompanyIconclickAction(event),
        icons: [
          { id: "view", name: "View", alt: "view", iconLink: viewIcon, iconClass: commonClasses.pointerClass },
          { id: "edit", name: "Edit", alt: "edit", iconLink: editIcon, iconClass: commonClasses.pointerClass },
          { id: "delete", name: "Delete", alt: "delete", iconLink: deleteIcon, iconClass: commonClasses.pointerClass }
        ]
      }
    }
  ];

  const CompanyIconclickAction = (event) => {
    let id = event.target.id.split("_")[1];
    let type = event.target.id.split("_")[0];
    let clickeData = companyListPaginationData?.listData?.find(
      (singleCompany) => singleCompany?.companyId?.toString() === id.toString()
    );
    setClickedCompany(clickeData || {});
    if (type === "view") {
      setIsNewAndUpdateCompanyModal(true);
      setIsViewMode(true);
      setIsEditMode(false);
    } else if (type === "edit") {
      setIsNewAndUpdateCompanyModal(true);
      setIsEditMode(true);
      setIsViewMode(false);
    } else {
      setChangesConfirmationModal(true);
      setInactiveCompanyId(id);
    }
  };

  useEffect(() => {
    let payload = {
      pageNo: companyListPaginationData.pageNo,
      pageSize: companyListPaginationData.pageSize,
      // Add search/filter params if needed
    };
    http_Request(
      {
        url: API_URL.company.SEARCH_COMPANY, // You need to add this in API_URLS.js
        method: "POST",
        bodyData: payload,
      },
      function successCallback(response) {
        if (response.status === 200 || response.status === 201) {
          setCompanyListPagination((prev) => ({
            ...prev,
            listData: response?.data?.page,
            totalElements: response?.data?.totalElements,
          }));
        }
      },
      function errorCallback(error) {
        setSnackVariant("error");
        setSnackText("Failed to fetch companies");
      }
    );
  }, [isRefresh]);

  return (
    <div className={commonClasses.dashboardContainer}>
      <Snackbar text={snackText} variant={snackVariant} reset={() => setSnackText("")} />
      {isNewAndUpdateCompanyModal &&
        <NewAndEditCompany
          isModal={isNewAndUpdateCompanyModal}
          closeAction={() => { setIsNewAndUpdateCompanyModal(false); setIsEditMode(false); setIsViewMode(false); }}
          isEditMode={isEditMode}
          isViewMode={isViewMode}
          companyInfo={clickedCompany}
          isRefresh={isRefresh}
          setIsRefresh={setIsRefresh}
        />
      }
      <Card elevation={10}>
        <CardContent className={commonClasses.mainCardContainer}>
          <Grid container xs={12} md={12} display="flex" justifyContent='flex-start'>
            <Typography className={commonClasses.resturantTitleWordTypo}>{"Companies"}</Typography>
          </Grid>
          <Grid container xs={12} display={"flex"} justifyContent='space-between'>
            <Grid item xs={10} md={10}></Grid>
            <Grid container item xs={2} md={2} display={"flex"} justifyContent='flex-end'>
              <Button
                className={classNames(commonClasses.mediumAddBtn, commonClasses.addBtn)}
                onClick={() => {
                  setIsNewAndUpdateCompanyModal(true);
                  setIsEditMode(false);
                  setIsViewMode(false);
                  setClickedCompany({});
                }}
              >
                {"Add Company"}
              </Button>
            </Grid>
          </Grid>
          <Grid container xs={12} className={commonClasses.tableBlock}>
            <TableComponent
              classes={classes}
              columns={columnData}
              rows={companyListPaginationData.listData}
              uniqueField="companyId"
              pageNo={companyListPaginationData.pageNo}
              pageDataCount={companyListPaginationData.pageSize}
              isPagination={true}
              apiHandlePagination={true}
              handlePagination={(page) => { /* set pageNo here if needed */ }}
              datatotalCount={companyListPaginationData.totalElements}
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
            confirmationModalHeader="Inactive Company"
            confirmationModalContent="Are You Sure You Want to Inactive!"
            noBtnId="redirectCancel"
            yesBtnId="redirectPage"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Company;