
import React, { useEffect, useState } from 'react';
import { 
    Grid, 
    Button, 
    Card, 
    CardContent,
    Typography, 
} from  "@mui/material";
import classNames from 'classnames';
import { useStyles } from "../../../../assets/styles/styles";
import TableComponent from '../../common/material/TableComponent';
import SearchComponent from '../../common/material/SearchComponent';
import Snackbar from '../../common/Snackbar';
import ConfirmationModal from "../../common/ConfirmationModal";

// sub components
import NewAndEditCustomer from "./modals/NewAndEditCustomer";

//BackEnd
import { API_URL } from "../../shared/API_URLS";
import { http_Request } from "../../shared/HTTP_Request";

// styles
import {FormCommonStyles} from "../../../../assets/styles/FormCommonStyle";

// icons
import editIcon from '../../../../assets/image/icons/editIcon.png'
import viewIcon from "../../../../assets/image/icons/viewAction.svg";
import deleteIcon from "../../../../assets/image/icons/ehr-delete.svg";

const Customer = () => {

    // style classes
    const commonClasses = FormCommonStyles();
    const classes = useStyles();

    const [isNewAndUpdateCustomerModal, setIsNewAndUpdateCustomerModal] = useState(false);
    const [CustomerSearchFieldData, setCustomerSearchFieldData] = useState({
        isAdvanceSearch: false,
        advancedSearchOptions: [
      
          {
            id: "firstName",
            name: "First Name",
          },
          {
            id: "secondName",
            name: "Second Name",
          }
        ],
        selectedSearchOption: "",
        searchValue: "",
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [isSaveAsNew, setIsSaveAsNew] = useState(true);
    const [pageNo, setPageNo] = useState(1);
    const [clickedCustomer, setClickedCustomer] = useState({});
    const [CustomerListPaginationData, setCustomerListPagination] = useState({
        listData: [],
        pageNo: 1,
        pageSize: 10,
        totalElements: 0,
        isInitialRequest: true  
    });
    const [snackText, setSnackText] = useState("");
    const [snackVariant, setSnackVariant] = useState("");
    const [changesConfirmationModal, setChangesConfirmationModal] = useState(false);
    const [isModalSucceed, setIsModalSucceed] = React.useState(false);
    const [inactiveCustomerId, setInactiveCustomerId] = useState(null);
    const [isRefresh, setIsRefresh] = useState(false);

    const resetSnack = () => {
        setSnackText();
        setSnackVariant();
    };
  /**
  |--------------------------------------------------
  | Handle advanced search
  |--------------------------------------------------
  */
  const handleAdvanceSearch = (isChecked) => {
    setCustomerSearchFieldData(
        prev => ({
            ...prev,
            isAdvanceSearch: isChecked,
            searchValue: ''
        })
    )
  } 
  /**
  |--------------------------------------------------
  | Handle select dropdown value and search value
  |--------------------------------------------------
  */
  const  handleDropDownSelectCustomer = (event) => {
    setCustomerSearchFieldData(
        prev => ({
            ...prev,
            selectedSearchOption: event.target?.value || '',
            searchValue: ''
        })
   )
 }
 const handleCustomerSearchValue = (event) => {
    setCustomerSearchFieldData(
      prev => ({
          ...prev,
          searchValue: event.target?.value || ''
      })
    )
  } 
  /**
  |--------------------------------------------------
  | Table column data
  |--------------------------------------------------
  */  
    const columnData = [
        {
            id: "fullName",
            name: "Name"
        },
        {
            id: "mobile",
            name: "Mobile Number"
        },
        {
            id: "fullAddress",
            name: "Address"
        },
        {
            id: "email",
            name: "Email"
        },
        
        {
            id: "status",
            name: "Status",
            template:{
                type: "twoLineTextFields",
                fieldList: [{
                    id: "statusName",
                    options: [
                        {
                            id: "statusName",
                            value: "Active",
                            conditionClass: commonClasses.greenChip 
                        },
                        {
                            id: "statusName",
                            value: "Inactive",
                            conditionClass: commonClasses.darkRedChip 
                        }
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
                iconClickAction: ((event) => { CustomerIconclickAction && CustomerIconclickAction(event) }),
                icons: [
                    {
                        id: "view",
                        name: "View",
                        alt: "view",
                        iconLink: viewIcon,
                        iconClass: commonClasses.pointerClass
                    },
                    {
                        id: "edit",
                        name:"Edit",
                        alt: "edit",
                        iconLink: editIcon,
                        iconClass: commonClasses.pointerClass
                    },
                    {
                        id: "delete",
                        name: "Delete",
                        alt: "delete",
                        iconLink: deleteIcon,
                        iconClass: commonClasses.pointerClass
                    }
                ]
            },
        },
    ];
    const CustomerIconclickAction = (event) => {
        let id = event.target.id.split("_")[1];
        let type = event.target.id.split("_")[0];
        console.log(id, type, CustomerListPaginationData?.listData,"TableAction");   
        let clickeData =  CustomerListPaginationData?.listData?.filter(
            (singleCustomer) => singleCustomer?.personId?.toString() === id.toString()
          );
          console.log(clickeData,"clickeDataclickeData");
          setClickedCustomer(clickeData[0]);     

        if(type === "view"){
            setIsNewAndUpdateCustomerModal(true);
            setIsViewMode(true);
        }else if(type === "edit"){
            setIsNewAndUpdateCustomerModal(true);
            setIsEditMode(true);
        }else{
            setChangesConfirmationModal(true);
            setInactiveCustomerId(id);
        }
    }

  /**
  |--------------------------------------------------
  | Inactive Customer function
  |--------------------------------------------------
  */ 
    const handleInActiveCustomer = (inactiveCustomerId) =>{
        http_Request(
            {
              url: API_URL.Customer.INACTIVE_Customer.replace('{personId}', inactiveCustomerId),
              method: "PUT",
            },
            function successCallback(response) {
              if (
                (response.status === 200 || response.status === 201)) {
                    setSnackVariant("success");
                    setSnackText("Customer is Inactivated Successfuly...!");
                    setIsRefresh(!isRefresh);
              }
            },
            function errorCallback(error) {
              console.log("Error_Customer", error)
            }
        );
    }

  /**
  |--------------------------------------------------
  | Mount on function
  |--------------------------------------------------
  */ 
    useEffect(()=>{
        let CustomerPayload = {
            pageNo: pageNo,
            pageSize : CustomerListPaginationData?.pageSize,
            companyId: JSON.parse(localStorage.getItem("userDetail")).companyId,
            firstName: (!CustomerSearchFieldData?.isAdvanceSearch) ? CustomerSearchFieldData?.searchValue : "",
            secondName: (CustomerSearchFieldData?.isAdvanceSearch && CustomerSearchFieldData?.selectedSearchOption == "secondName") ? CustomerSearchFieldData?.searchValue : "",
          
        }
        http_Request(
            {
              url: API_URL.non_staff_registration.SEARCH_CUSTOMER,
              method: "POST",
              bodyData: CustomerPayload
            },
            function successCallback(response) {
              if (
                (response.status === 200 || response.status === 201)) {
                //   console.log(response,"response_Customer")
                  setCustomerListPagination((prev)=>({
                    ...prev,
                    listData : response?.data?.page,
                    totalElements: response?.data?.totalElements
                  }))
              }
            },
            function errorCallback(error) {
              console.log("Error_Customer", error)
            }
        );

    },[
        CustomerSearchFieldData?.searchValue, 
        CustomerSearchFieldData?.isAdvanceSearch, 
        pageNo, 
        isRefresh
    ])

  return (
    <div className={commonClasses?.dashboardContainer}>
        <Snackbar
            text={snackText}
            variant={snackVariant}
            reset={() => { resetSnack() }}
        />
        { isNewAndUpdateCustomerModal && 
            <NewAndEditCustomer
                isModal={isNewAndUpdateCustomerModal}
                closeAction={ () => { setIsNewAndUpdateCustomerModal(false); setIsEditMode(false); setIsViewMode(false);}}
                isEditMode={ isEditMode }
                isViewMode={ isViewMode }
                CustomerInfo={clickedCustomer}
                isSaveAsNew={isSaveAsNew}
                setIsSaveAsNew={setIsSaveAsNew}
                isRefresh={isRefresh}
                setIsRefresh={setIsRefresh}
            />
        }
        <Card elevation={10}>
            <CardContent className={commonClasses?.mainCardContainer}>
               <Grid container xs={12} md={12} display="flex" justifyContent='flex-start'>
                    <Typography className={commonClasses?.resturantTitleWordTypo}>{"Customers"}</Typography>
                </Grid>
                <Grid container xs={12} display={"flex"} justifyContent='space-between'>
                    <Grid item xs={10} md={10}></Grid>
                    <Grid container item xs={2} md={2} display={"flex"} justifyContent='flex-end'>
                        <Button
                             className={ classNames(commonClasses.mediumAddBtn, commonClasses.addBtn) }
                             onClick={() => {
                                setIsNewAndUpdateCustomerModal(true);
                                setIsSaveAsNew(true);
                            }}
                        >
                            {"Add Customer"}
                        </Button>
                    </Grid>
                </Grid>
                <Grid container xs={12} display={"flex"} justifyContent='space-between' style={{marginTop:"10px"}}>
                    <Grid item xs={6}></Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        marginTop: "10px",
                        justifyContent:"flex-end"
                      }}
                    >
                    <SearchComponent
                      comName='Customer-list-search'
                      isAdvancedSearch={CustomerSearchFieldData?.isAdvanceSearch}
                      isAdvanceSearchHandler={checked => handleAdvanceSearch(checked)}
                      toggleSectionGridSize={2}
                      searchSectionGridSize={10}
                      dropdownOptionData={CustomerSearchFieldData?.advancedSearchOptions}
                      dropdownSelectValue={CustomerSearchFieldData?.selectedSearchOption}
                      handleDropDownSelect={handleDropDownSelectCustomer}
                      searchValue={CustomerSearchFieldData?.searchValue}
                      handleSearchValue={handleCustomerSearchValue}
                      inputFieldText={
                         !CustomerSearchFieldData?.isAdvanceSearch ? "Search By Name" : ""
                      }
                    />
                  </Grid>
                </Grid>
                
                <Grid container xs={12} className={commonClasses?.tableBlock}>
                    <TableComponent
                        classes={ classes }
                        columns={ columnData }
                        rows={ CustomerListPaginationData?.listData }
                        uniqueField="personId"
                        pageNo={ CustomerListPaginationData?.pageNo }
                        pageDataCount={ CustomerListPaginationData?.pageSize }
                        isPagination={ true }
                        apiHandlePagination={true}
                        handlePagination={(page)=> {setPageNo(page)}}
                        datatotalCount={ CustomerListPaginationData?.totalElements }
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
                        handleInActiveCustomer(inactiveCustomerId);
                        setIsModalSucceed(true);
                        setChangesConfirmationModal(false);
                        setTimeout(() => setIsModalSucceed(false), 50);
                    }}
                    confirmationModalHeader="Inactive Customer"
                    confirmationModalContent="Are You Sure You Want to Inactive!"
                    noBtnId="redirectCancel"
                    yesBtnId="redirectPage"
                />
            </CardContent>
        </Card>
    </div>
  )
}

export default Customer