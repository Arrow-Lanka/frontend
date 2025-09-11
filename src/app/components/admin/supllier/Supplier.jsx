
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
import NewAndEditSupplier from "./modals/NewAndEditSupplier";

//BackEnd
import { API_URL } from "../../shared/API_URLS";
import { http_Request } from "../../shared/HTTP_Request";

// styles
import {FormCommonStyles} from "../../../../assets/styles/FormCommonStyle";

// icons
import editIcon from '../../../../assets/image/icons/editIcon.png'
import viewIcon from "../../../../assets/image/icons/viewAction.svg";
import deleteIcon from "../../../../assets/image/icons/ehr-delete.svg";

const Supplier = () => {

    // style classes
    const commonClasses = FormCommonStyles();
    const classes = useStyles();

    const [isNewAndUpdateSupplierModal, setIsNewAndUpdateSupplierModal] = useState(false);
    const [SupplierSearchFieldData, setSupplierSearchFieldData] = useState({
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
    const [clickedSupplier, setClickedSupplier] = useState({});
    const [SupplierListPaginationData, setSupplierListPagination] = useState({
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
    const [inactiveSupplierId, setInactiveSupplierId] = useState(null);
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
    setSupplierSearchFieldData(
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
  const  handleDropDownSelectSupplier = (event) => {
    setSupplierSearchFieldData(
        prev => ({
            ...prev,
            selectedSearchOption: event.target?.value || '',
            searchValue: ''
        })
   )
 }
 const handleSupplierSearchValue = (event) => {
    setSupplierSearchFieldData(
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
                iconClickAction: ((event) => { SupplierIconclickAction && SupplierIconclickAction(event) }),
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
    const SupplierIconclickAction = (event) => {
        let id = event.target.id.split("_")[1];
        let type = event.target.id.split("_")[0];
        console.log(id, type, SupplierListPaginationData?.listData,"TableAction");   
        let clickeData =  SupplierListPaginationData?.listData?.filter(
            (singleSupplier) => singleSupplier?.personId?.toString() === id.toString()
          );
          console.log(clickeData,"clickeDataclickeData");
          setClickedSupplier(clickeData[0]);     

        if(type === "view"){
            setIsNewAndUpdateSupplierModal(true);
            setIsViewMode(true);
        }else if(type === "edit"){
            setIsNewAndUpdateSupplierModal(true);
            setIsEditMode(true);
        }else{
            setChangesConfirmationModal(true);
            setInactiveSupplierId(id);
        }
    }

  /**
  |--------------------------------------------------
  | Inactive Supplier function
  |--------------------------------------------------
  */ 
    const handleInActiveSupplier = (inactiveSupplierId) =>{
        http_Request(
            {
              url: API_URL.Supplier.INACTIVE_Supplier.replace('{personId}', inactiveSupplierId),
              method: "PUT",
            },
            function successCallback(response) {
              if (
                (response.status === 200 || response.status === 201)) {
                    setSnackVariant("success");
                    setSnackText("Supplier is Inactivated Successfuly...!");
                    setIsRefresh(!isRefresh);
              }
            },
            function errorCallback(error) {
              console.log("Error_Supplier", error)
            }
        );
    }

  /**
  |--------------------------------------------------
  | Mount on function
  |--------------------------------------------------
  */ 
    useEffect(()=>{
        let SupplierPayload = {
            pageNo: pageNo,
            pageSize : SupplierListPaginationData?.pageSize,
            companyId: JSON.parse(localStorage.getItem("userDetail")).companyId,
            firstName: (!SupplierSearchFieldData?.isAdvanceSearch) ? SupplierSearchFieldData?.searchValue : "",
            secondName: (SupplierSearchFieldData?.isAdvanceSearch && SupplierSearchFieldData?.selectedSearchOption == "secondName") ? SupplierSearchFieldData?.searchValue : "",
          
        }
        http_Request(
            {
              url: API_URL.non_staff_registration.SEARCH_SUPPLIER,
              method: "POST",
              bodyData: SupplierPayload
            },
            function successCallback(response) {
              if (
                (response.status === 200 || response.status === 201)) {
                //   console.log(response,"response_Supplier")
                  setSupplierListPagination((prev)=>({
                    ...prev,
                    listData : response?.data?.page,
                    totalElements: response?.data?.totalElements
                  }))
              }
            },
            function errorCallback(error) {
              console.log("Error_Supplier", error)
            }
        );

    },[
        SupplierSearchFieldData?.searchValue, 
        SupplierSearchFieldData?.isAdvanceSearch, 
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
        { isNewAndUpdateSupplierModal && 
            <NewAndEditSupplier
                isModal={isNewAndUpdateSupplierModal}
                closeAction={ () => { setIsNewAndUpdateSupplierModal(false); setIsEditMode(false); setIsViewMode(false);}}
                isEditMode={ isEditMode }
                isViewMode={ isViewMode }
                supplierInfo={clickedSupplier}
                isSaveAsNew={isSaveAsNew}
                setIsSaveAsNew={setIsSaveAsNew}
                isRefresh={isRefresh}
                setIsRefresh={setIsRefresh}
            />
        }
        <Card elevation={10}>
            <CardContent className={commonClasses.mainCardContainer}>
               
               <Grid container xs={12} md={12} display="flex" justifyContent='flex-start'>
                                   <Typography className={commonClasses?.resturantTitleWordTypo}>{"Suppliers"}</Typography>
                               </Grid>
                <Grid container xs={12} display={"flex"} justifyContent='space-between'>
                    <Grid item xs={10} md={10}></Grid>
                    <Grid container item xs={2} md={2} display={"flex"} justifyContent='flex-end'>
                        <Button
                             className={ classNames(commonClasses.mediumAddBtn, commonClasses.addBtn) }
                             onClick={() => {
                                setIsNewAndUpdateSupplierModal(true);
                                setIsSaveAsNew(true);
                            }}
                        >
                            {"Add Supplier"}
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
                      comName='Supplier-list-search'
                      isAdvancedSearch={SupplierSearchFieldData?.isAdvanceSearch}
                      isAdvanceSearchHandler={checked => handleAdvanceSearch(checked)}
                      toggleSectionGridSize={2}
                      searchSectionGridSize={10}
                      dropdownOptionData={SupplierSearchFieldData?.advancedSearchOptions}
                      dropdownSelectValue={SupplierSearchFieldData?.selectedSearchOption}
                      handleDropDownSelect={handleDropDownSelectSupplier}
                      searchValue={SupplierSearchFieldData?.searchValue}
                      handleSearchValue={handleSupplierSearchValue}
                      inputFieldText={
                         !SupplierSearchFieldData?.isAdvanceSearch ? "Search By Name" : ""
                      }
                    />
                  </Grid>
                </Grid>
                
                <Grid container xs={12} className={commonClasses?.tableBlock}>
                    <TableComponent
                        classes={ classes }
                        columns={ columnData }
                        rows={ SupplierListPaginationData?.listData }
                        uniqueField="personId"
                        pageNo={ SupplierListPaginationData?.pageNo }
                        pageDataCount={ SupplierListPaginationData?.pageSize }
                        isPagination={ true }
                        apiHandlePagination={true}
                        handlePagination={(page)=> {setPageNo(page)}}
                        datatotalCount={ SupplierListPaginationData?.totalElements }
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
                        handleInActiveSupplier(inactiveSupplierId);
                        setIsModalSucceed(true);
                        setChangesConfirmationModal(false);
                        setTimeout(() => setIsModalSucceed(false), 50);
                    }}
                    confirmationModalHeader="Inactive Supplier"
                    confirmationModalContent="Are You Sure You Want to Inactive!"
                    noBtnId="redirectCancel"
                    yesBtnId="redirectPage"
                />
            </CardContent>
        </Card>
    </div>
  )
}

export default Supplier