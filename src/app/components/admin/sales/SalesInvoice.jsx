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
import NewAndEditSalesInvoice from "./modals/NewAndEditSalesInvoice";
import { API_URL } from "../../shared/API_URLS";
import { http_Request } from "../../shared/HTTP_Request";
import { FormCommonStyles } from "../../../../assets/styles/FormCommonStyle";
import editIcon from "../../../../assets/image/icons/editIcon.png";
import viewIcon from "../../../../assets/image/icons/viewAction.svg";
import deleteIcon from "../../../../assets/image/icons/ehr-delete.svg";

const SalesInvoice = () => {
  const commonClasses = FormCommonStyles();
  const classes = useStyles();

  const [isNewAndUpdateModal, setIsNewAndUpdateModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [clickedInvoice, setClickedInvoice] = useState({});
  const [invoiceListPaginationData, setInvoiceListPagination] = useState({
    listData: [],
    pageNo: 1,
    pageSize: 10,
    totalElements: 0,
    isInitialRequest: true,
  });
  const [snackText, setSnackText] = useState("");
  const [snackVariant, setSnackVariant] = useState("");
  const [changesConfirmationModal, setChangesConfirmationModal] = useState(false);
  const [inactiveInvoiceId, setInactiveInvoiceId] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);

  const columnData = [
    { id: "invoiceDate", name: "Invoice Date" },
    { id: "customerName", name: "Customer" },
    { id: "companyName", name: "Company" },
    { id: "totalAmount", name: "Total Amount" },
    {
      id: "action",
      name: "Action",
      template: {
        type: "clickableIconBlock",
        columnAlign: "right",
        iconClickAction: (event) => SalesInvoiceIconclickAction(event),
        icons: [
          { id: "view", name: "View", alt: "view", iconLink: viewIcon, iconClass: commonClasses.pointerClass },
          { id: "edit", name: "Edit", alt: "edit", iconLink: editIcon, iconClass: commonClasses.pointerClass },
          { id: "delete", name: "Delete", alt: "delete", iconLink: deleteIcon, iconClass: commonClasses.pointerClass }
        ]
      }
    }
  ];

  const SalesInvoiceIconclickAction = (event) => {
    let id = event.target.id.split("_")[1];
    let type = event.target.id.split("_")[0];
    let clickeData = invoiceListPaginationData?.listData?.find(
      (singleInvoice) => singleInvoice?.invoiceId?.toString() === id.toString()
    );
    setClickedInvoice(clickeData || {});
    if (type === "view") {
      setIsNewAndUpdateModal(true);
      setIsViewMode(true);
      setIsEditMode(false);
    } else if (type === "edit") {
      setIsNewAndUpdateModal(true);
      setIsEditMode(true);
      setIsViewMode(false);
    } else {
      setChangesConfirmationModal(true);
      setInactiveInvoiceId(id);
    }
  };

  useEffect(() => {
    http_Request(
      {
        url: API_URL.salesInvoice.SEARCH_SALES_INVOICE, // Add this to your API_URLS.js
        method: "POST",
        bodyData: {
          pageNo: invoiceListPaginationData.pageNo,
          pageSize: invoiceListPaginationData.pageSize,
        },
      },
      function successCallback(response) {
        if (response.status === 200 || response.status === 201) {
          setInvoiceListPagination((prev) => ({
            ...prev,
            listData: response?.data?.page,
            totalElements: response?.data?.totalElements,
          }));
        }
      },
      function errorCallback(error) {
        setSnackVariant("error");
        setSnackText("Failed to fetch invoices");
      }
    );
  }, [isRefresh]);

  return (
    <div className={commonClasses.dashboardContainer}>
      <Snackbar text={snackText} variant={snackVariant} reset={() => setSnackText("")} />
      {isNewAndUpdateModal &&
        <NewAndEditSalesInvoice
          isModal={isNewAndUpdateModal}
          closeAction={() => { setIsNewAndUpdateModal(false); setIsEditMode(false); setIsViewMode(false); }}
          isEditMode={isEditMode}
          isViewMode={isViewMode}
          invoiceInfo={clickedInvoice}
          isRefresh={isRefresh}
          setIsRefresh={setIsRefresh}
        />
      }
      <Card elevation={10}>
        <CardContent className={commonClasses.mainCardContainer}>
          <Grid container xs={12} md={12} display="flex" justifyContent='flex-start'>
            <Typography className={commonClasses.resturantTitleWordTypo}>{"Sales Invoices"}</Typography>
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
                  setClickedInvoice({});
                }}
              >
                {"Add Sales Invoice"}
              </Button>
            </Grid>
          </Grid>
          <Grid container xs={12} className={commonClasses.tableBlock}>
            <TableComponent
              classes={classes}
              columns={columnData}
              rows={invoiceListPaginationData.listData}
              uniqueField="invoiceId"
              pageNo={invoiceListPaginationData.pageNo}
              pageDataCount={invoiceListPaginationData.pageSize}
              isPagination={true}
              apiHandlePagination={true}
              handlePagination={(page) => { /* set pageNo here if needed */ }}
              datatotalCount={invoiceListPaginationData.totalElements}
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
            confirmationModalHeader="Inactive Invoice"
            confirmationModalContent="Are You Sure You Want to Inactive!"
            noBtnId="redirectCancel"
            yesBtnId="redirectPage"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesInvoice;