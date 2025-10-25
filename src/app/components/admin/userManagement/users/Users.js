import React, { useEffect, useState } from 'react';
import { Grid, Button, Box } from "@mui/material";
import { useStyles } from "../../../../../assets/styles/styles";
import { UsersStyle } from './UsersStyle';
import Input from "../../../common/material/Input";
import SearchIcon from '@mui/icons-material/Search';
import CheckboxField from '../../../common/material/CheckboxField';
import DropDown from '../../../common/DropDown';
import TableComponent from '../../../common/material/TableComponent'
import { API_URL } from '../../../shared/API_URLS';
import { http_Request } from '../../../shared/HTTP_Request';
import { getLabel } from '../../../shared/localization';
import classNames from 'classnames';
import NewAndUpdateUser from './NewAndUpdateUser';
import Snackbar from '../../../common/Snackbar'
import ResetPassword from './ResetPassword';
import moment from 'moment';

import { textLengthValidator } from '../../../shared/validations';

// images
import Edit from '../../../../../assets/image/icons/edit.svg';
import Refresh from '../../../../../assets/image/icons/refresh.svg';

const Users = (props) => {
    // style classes
    const userClass = UsersStyle();
    const classes = useStyles();

    const [checkboxValue, setCheckboxValue] = useState({all: true, locked: true, active: true, inactive: true});
    const [searchKey, setSearchKey] = useState("");
    const [staffType, setStaffType] = useState("default");
    const [staffTypeOptions, setStaffTypeOptions] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [userListData, setUserListData] = useState([]);
    const [userListLength, setUserListLength] = useState(0);
    const [isNewAndUpdateUserModal, setIsNewAndUpdateUserModal] = useState(false);
    const [isResetModal, setIsResetModal] = useState(false);
    const [snackText, setSnackText] = useState("");
    const [snackVariant, setSnackVariant] = useState("");
    const [clickedUser, setClickedUser] = useState({});
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);

    const columnData = [
        {
            id: "userId",
            name: getLabel({ module: "userManagement", label: "userId" }),
            width: "5%"
        },
        {
            id: "personType",
            name: getLabel({ module: "userManagement", label: "staffType" }),
            width: "5%"
        },
        {
            id: "username",
            name: getLabel({ module: "userManagement", label: "userName" }),
            width: "5%"
        },
        {
            id: "firstName",
            name: getLabel({ module: "userManagement", label: "firstName" }),
            width: "7%"
        },
        {
            id: "lastName",
            name: getLabel({ module: "userManagement", label: "lastName" }),
            width: "7%"
        },
        {
            id: "phone",
            name: getLabel({ module: "userManagement", label: "mobileNumber" }),
            width: "14%"
        },
        {
            id: "email",
            name: getLabel({ module: "userManagement", label: "email" }),
            width: "6%"
        },
        {
            id: "createdUser",
            name: getLabel({ module: "userManagement", label: "createdBy" }),
            width: "5%"
        },
        {
            id: "createdTime",
            name: getLabel({ module: "userManagement", label: "createdOn" }),
            width: "14%"
        },
        {
            id: "updatedUser",
            name: getLabel({ module: "userManagement", label: "modifiedBy" }),
            width: "5%"
        },
        {
            id: "updatedTime",
            name: getLabel({ module: "userManagement", label: "modifiedOn" }),
            width: "14%"
        },
        {
            id: "status",
            name: getLabel({ module: "userManagement", label: "status" }),
            width: "5%",
            template:{
                type: "twoLineTextFields",
                fieldList: [{
                    id: "status",
                    options: [
                        {
                            id: "status",
                            value: "Active",
                            conditionClass: userClass.greenChip 
                        },
                        {
                            id: "status",
                            value: "Inactive",
                            conditionClass: userClass.darkRedChip 
                        }
                    ]
                }]
            }
        },
        {
            id: "action",
            name: getLabel({ module: "userManagement", label: "action" }),
            width: "8%",
            template: {
                type: "clickableIconBlock",
                columnAlign: "right",
                iconClickAction: ((event) => { userIconclickAction(event) }),
                icons: [
                    {
                        id: "edit",
                        name: getLabel({ module: "userManagement", label: "edit" }),
                        alt: getLabel({ module: "userManagement", label: "edit" }),
                        iconLink: Edit,
                        iconClass: userClass.pointerClass
                    },
                    {
                        id: "password",
                        name: getLabel({ module: "userManagement", label: "passwordReset" }),
                        alt: getLabel({ module: "userManagement", label: "passwordReset" }),
                        iconLink: Refresh,
                        iconClass: userClass.pointerClass
                    }
                ]
            },
        },
    ];

    useEffect(() => {
        getPersonTypeOptions();
    },[isSuperAdmin]);

    useEffect(()=> {
        getPersonTypeforSuperAdmin();
    },[])

    const getPersonTypeOptions = () => {
        http_Request(
        {
            url: API_URL.userManagement.users.GETPERSONOPTIONS.replace('{isSuperAdmin}',isSuperAdmin),
            method: 'GET'
        },
        function successCallback(response) {
            console.log("user person opt", response.data);
            let tempPersonTypeOptions = [{id: "default", name: getLabel({ module: "userManagement", label: "all" })}];
            for (const [key, value] of Object.entries(response.data)) {
                tempPersonTypeOptions.push({
                    id: value,
                    name: key
                });
            }
            setStaffTypeOptions([...tempPersonTypeOptions]);
        },
        function errorCallback(error) {
            console.log("error", error.response || error);
        });
    }

    const userIconclickAction = (event) => {
        let id = event.target.id.split("_")[1];
        let type = event.target.id.split("_")[0];
        singleUserInfo(id, type);
    }

    const singleUserInfo = (userId, type) => {
        http_Request(
        {
            url: API_URL.userManagement.users.GETUSERINFO.replace("{userId}", parseInt(userId)),
            method: 'GET'
        },
        function successCallback(response) {
            setClickedUser(response.data);
            if(type === "edit"){
                setIsNewAndUpdateUserModal(true);
            }else{
                setIsResetModal(true);
            }
        },
        function errorCallback(error) {
            console.log("error", error);
        });
    }

    useEffect(() => {
        searchUserData(1);
        setPageNo(1)
    }, [checkboxValue, searchKey, staffType, isSuperAdmin]);

    useEffect(() => {
        searchUserData(pageNo);
    }, [pageNo]);
    
    const getPersonTypeforSuperAdmin=()=>{
        const loginUserDetail = localStorage.getItem('userDetail') && JSON.parse(localStorage.getItem('userDetail'))
        const loginUserHospitals = (Array.isArray(loginUserDetail?.hospitals) && loginUserDetail?.hospitals) || [];
        const loginUserPersonType = ((loginUserDetail?.personType) && loginUserDetail?.personType) || 0;
      
        if(loginUserHospitals?.length>1 && (loginUserPersonType === 6)){
            setIsSuperAdmin(true)
        }
    }

    const searchUserData = (currentPageNo) => {
        let requestUrl = API_URL.userManagement.users.USER_SEARCH.replace('{pageNo}', currentPageNo).replace('{pageSize}', pageSize).replace('{isSuperAdmin}',isSuperAdmin);

        requestUrl += "&all=" + (checkboxValue.all ? "true" : "false");

        if(!checkboxValue.all){
            requestUrl += "&locked=" + (checkboxValue.locked ? "1" : "0");
        }

        if(checkboxValue.active && !checkboxValue.inactive || !checkboxValue.active && checkboxValue.inactive){
            requestUrl += "&enabled=" + (checkboxValue.active ? "1" : "0");
        }

        if(textLengthValidator(searchKey)){
            requestUrl += "&name=" + searchKey;
        }

        if(staffType && staffType !== "default"){
            requestUrl += "&personType=" + staffType;
        }

        http_Request(
        {
            url: requestUrl,
            method: 'GET'
        },
        function successCallback(response){
            setUserListData(response.data.page.map((singleUser) => {
                return({
                    ...singleUser,
                    createdTime: moment(singleUser.createdTime).format('DD/MM/YYYY HH:mm') !== "Invalid date" ? moment(singleUser.createdTime).format('DD/MM/YYYY HH:mm') : "",
                    updatedTime: moment(singleUser.updatedTime).format('DD/MM/YYYY HH:mm') !== "Invalid date" ? moment(singleUser.updatedTime).format('DD/MM/YYYY HH:mm') : "",                    
                    status: singleUser.enabled ? "Active" : "Inactive"                    
                })
            }));
            setUserListLength(response?.data.totalElements);
        },
        function errorCallback(error) {
            console.log("user search error", error);
            setUserListData([]);
            setUserListLength(0);
        });
    }

    const resetSnack = () => {
        setSnackText();
        setSnackVariant();
    };
    
    return(
        <Grid>
            <Snackbar
                text={snackText}
                variant={snackVariant}
                reset={() => { resetSnack() }}
            />
            { 
                isNewAndUpdateUserModal &&
                <NewAndUpdateUser
                    isModal={ isNewAndUpdateUserModal }
                    closeAction={ (success, user) => { 
                        setIsNewAndUpdateUserModal(false); 
                        if(success){
                            searchUserData(1);
                            setPageNo(1);
                            setSnackVariant("success");
                            setSnackText("User " + user + " is " + (clickedUser.userId ? "Updated" : "Created") + " Successfully!");
                        }
                        setClickedUser({});
                    } }
                    staffTypeOptions = { staffTypeOptions }
                    userDetails = { clickedUser }
                    isEditMode = { clickedUser.userId ? true : false }
                />
            }
            {
                isResetModal &&
                <ResetPassword
                    userDetails = { clickedUser }
                    isModal={ isResetModal }
                    staffTypeOptions = { staffTypeOptions }
                    closeAction={ (success) => { 
                        if(success){
                            setSnackVariant("success");
                            setSnackText(`Temporary Password is Sent to ${clickedUser.username} !`);
                        }
                        setIsResetModal(false); 
                        setClickedUser({});
                    } }
                />
            }
            <Grid display="flex" container justifyContent="space-between">
                <Grid item xs={12} md={7} display="flex" container justifyContent="space-between">
                    <Grid item xs={4}>
                        <Input
                            id="search"
                            name="search"
                            variant="outlined"
                            size="small"
                            className={ userClass.searchInput }
                            InputProps={{
                                endAdornment: (
                                    <SearchIcon/>
                                ),
                            }}
                            placeholder={'Search user here'}
                            value={ searchKey }
                            onChange={ (e) => { setSearchKey(e.target.value) } }
                        />
                    </Grid>

                    <Grid item xs={7} container className={userClass.checkboxFilter} display="flex" justifyContent="space-around">
                        <Grid item>
                            <CheckboxField
                                id="all"
                                name="all"
                                color="primary"
                                checked={ checkboxValue.all }
                                onChange={ (e) => setCheckboxValue({ all: e.target.checked, active: e.target.checked, locked: e.target.checked, inactive: e.target.checked }) }
                                label={ getLabel({ module: "userManagement", label: "all" }) }
                                mainClassName={ userClass.blueText }
                            />
                        </Grid>
                        <Grid item>
                            <CheckboxField
                                id="active"
                                name="active"
                                color="primary"
                                checked={ checkboxValue.locked }
                                onChange={ (e) => setCheckboxValue({ ...checkboxValue, locked: e.target.checked, all: e.target.checked && checkboxValue.active && checkboxValue.inactive }) }
                                label={ getLabel({ module: "userManagement", label: "locked" }) }
                                mainClassName={ userClass.orangeText }
                            />
                        </Grid>
                        <Grid item>
                            <CheckboxField
                                id="active"
                                name="active"
                                color="primary"
                                checked={ checkboxValue.active }
                                onChange={ (e) => setCheckboxValue({ ...checkboxValue, active: e.target.checked, all: e.target.checked && checkboxValue.locked && checkboxValue.inactive }) }
                                label={ getLabel({ module: "userManagement", label: "active" }) }
                                mainClassName={ userClass.greenText }
                            />
                        </Grid>
                        <Grid item>
                            <CheckboxField
                                id="inactive"
                                name="inactive"
                                color="primary"
                                checked={ checkboxValue.inactive }
                                onChange={ (e) => setCheckboxValue({ ...checkboxValue, inactive: e.target.checked, all: e.target.checked && checkboxValue.locked && checkboxValue.active }) }
                                label={ getLabel({ module: "userManagement", label: "inactive" }) }
                                mainClassName={ userClass.redText }
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={5} display="flex" container justifyContent="space-between">
                    <Grid item xs={1}></Grid>
                    <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-end">
                            <DropDown
                                id="staffType"
                                name="staffType"
                                variant="outlined"
                                value={ staffType }
                                handleChange={ (e) => { setStaffType(e.target.value); } }
                                optionData={ staffTypeOptions }
                                formControlClass={ userClass.dropDownMainClass }
                                label={ getLabel({ module: "userManagement", label: "staffType" }) }
                                size="small"
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={3} container display="flex" justifyContent="flex-end">
                        <Box display="flex" justifyContent="flex-end">
                            <Button 
                                className={ classNames(classes.mediumAddBtn, userClass.addBtn) }
                                onClick={ () => { setClickedUser({}); setIsNewAndUpdateUserModal(true); } }
                                >
                                { getLabel({ module: "userManagement", label: "addNew" }) }
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            <Grid className={userClass.tableBlock}>
                <TableComponent
                    classes={ classes }
                    columns={ columnData }
                    rows={ userListData }
                    uniqueField="userId"
                    pageNo={ pageNo }
                    pageDataCount={ pageSize }
                    isPagination={ userListLength/pageSize > 1 }
                    apiHandlePagination={true}
                    handlePagination={ (page) => { setPageNo(page); } }
                    datatotalCount={ userListLength }
                />
            </Grid>
        </Grid>
    );
}

export default Users;