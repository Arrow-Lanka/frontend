import React, { useEffect, useState } from 'react';
import { Grid, Button, Box } from "@mui/material";
import { useStyles } from "../../../../../assets/styles/styles";
import { RolesStyle } from './RolesStyle';
import Input from "../../../common/material/Input";
import SearchIcon from '@mui/icons-material/Search';
import CheckboxField from '../../../common/material/CheckboxField';
import TableComponent from '../../../common/material/TableComponent'
import NewAndEditRole from './NewAndEditRole';
import RoleUsers from './RoleUsers';
import { API_URL } from '../../../shared/API_URLS';
import { http_Request } from '../../../shared/HTTP_Request';
import { getLabel } from '../../../shared/localization';
import classNames from 'classnames';
import Snackbar from '../../../common/Snackbar'
import moment from 'moment';

// images
import Edit from '../../../../../assets/image/icons/edit.svg';
import File from '../../../../../assets/image/icons/file.svg';
import User from '../../../../../assets/image/icons/user_orange.svg';


const Roles = (props) => {
    // style classes
    const rolesClass = RolesStyle();
    const classes = useStyles();

    const [checkboxValue, setCheckboxValue] = useState({all: true, active: true, inactive: true});
    const [searchKey, setSearchKey] = useState("");
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [roleListData, setRoleListData] = useState([]);
    const [roleListLength, setRoleListLength] = useState(0);
    const [snackText, setSnackText] = useState("");
    const [snackVariant, setSnackVariant] = useState("");
    const [clickedRole, setClickedRole] = useState({});
    const [isNewAndUpdateRoleModal, setIsNewAndUpdateRoleModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [isRoleUsersModal, setIsRoleUsersModal] = useState(false);

    const columnData = [
        {
            id: "roleId",
            name: getLabel({ module: "userManagement", label: "roleId" })
        },
        {
            id: "roleName",
            name: getLabel({ module: "userManagement", label: "roleName" })
        },
        {
            id: "description",
            name: getLabel({ module: "userManagement", label: "description" })
        },
        {
            id: "createdUser",
            name: getLabel({ module: "userManagement", label: "createdBy" })
        },
        {
            id: "createdTime",
            name: getLabel({ module: "userManagement", label: "createdOn" })
        },
        {
            id: "updatedUser",
            name: getLabel({ module: "userManagement", label: "modifiedBy" })
        },
        {
            id: "updatedTime",
            name: getLabel({ module: "userManagement", label: "modifiedOn" })
        },
        {
            id: "status",
            name: getLabel({ module: "userManagement", label: "status" }),
            template:{
                type: "twoLineTextFields",
                fieldList: [{
                    id: "status",
                    options: [
                        {
                            id: "status",
                            value: "Active",
                            conditionClass: rolesClass.greenChip 
                        },
                        {
                            id: "status",
                            value: "Inactive",
                            conditionClass: rolesClass.darkRedChip 
                        }
                    ]
                }]
            }
        },
        {
            id: "action",
            name: getLabel({ module: "userManagement", label: "action" }),
            template: {
                type: "clickableIconBlock",
                columnAlign: "right",
                iconClickAction: ((event) => { userIconclickAction(event) }),
                icons: [
                    {
                        id: "edit",
                        name:getLabel({ module: "userManagement", label: "edit" }),
                        alt: getLabel({ module: "userManagement", label: "view" }),
                        iconLink: Edit,
                        iconClass: rolesClass.pointerClass
                    },
                    {
                        id: "view",
                        name: getLabel({ module: "userManagement", label: "view" }),
                        alt: getLabel({ module: "userManagement", label: "view" }),
                        iconLink: File,
                        iconClass: rolesClass.pointerClass
                    },
                    {
                        id: "users",
                        name: getLabel({ module: "userManagement", label: "users" }),
                        alt: getLabel({ module: "userManagement", label: "view" }),
                        iconLink: User,
                        iconClass: rolesClass.pointerClass
                    }
                ]
            },
        },
    ];

    const userIconclickAction = (event) => {
        let id = event.target.id.split("_")[1];
        let type = event.target.id.split("_")[0];
        roleListData.map((singleRole) => {
            if(singleRole.roleId?.toString() === id){
                setClickedRole(singleRole);
            }
        });
        // singleUserInfo(id, type);
        if(type === "edit"){
            setIsNewAndUpdateRoleModal(true);
            setIsEditMode(true);
        }else if(type === "users"){
            setIsRoleUsersModal(true);
        }else{
            setIsNewAndUpdateRoleModal(true);
            setIsViewMode(true);            
        }
    }

    // useEffect(() => {
    //     getRoleData();
    // }, [pageNo]);

    // const getRoleData = () => {
    //     http_Request(
    //     {
    //         url: API_URL.userManagement.roles.GETROLES.replace("{pageNo}", pageNo).replace("{pageSize}", pageSize),
    //         method: 'GET'
    //     },
    //     function successCallback(response) {
    //         let roles = response.data.page;
    //         setRoleListLength(response.data.totalElements);
    //         console.log("roles", response.data);
    //         setRoleListData(roles.map(function (role, index) {
    //             return({
    //                 ...role,
    //                 createdTime: moment(role.createdTime).format("DD-MM-YYYY HH:mm") !== "Invalid date" ? moment(role.createdTime).format("DD-MM-YYYY HH:mm") : "",
    //                 updatedTime: moment(role.createdTime).format("DD-MM-YYYY HH:mm") !== "Invalid date" ? moment(role.createdTime).format("DD-MM-YYYY HH:mm") : "",
    //                 status: role.status === "1" ? "Active" : "Inactive"
    //             })
    //         }));
    //     },
    //     function errorCallback(error) {
    //         console.log("error", error);
    //     });
    // }

    useEffect(() => {
        searchRoleData(1);
        setPageNo(1);
    }, [checkboxValue, searchKey]);

    useEffect(() => {
        searchRoleData(pageNo);
    }, [pageNo]);

    const searchRoleData = (currentPageNo) => {
        let requestUrl = API_URL.userManagement.roles.ROLE_SEARCH;

        if(searchKey.length >= 3){
            requestUrl += "&roleName=" + searchKey;
        }

        if((checkboxValue.active && !checkboxValue.inactive) || (!checkboxValue.active && checkboxValue.inactive)){
            requestUrl += "&status=" + (checkboxValue.active ? "1" : "0");
        }

        http_Request(
        {
            url: requestUrl.replace("{pageNo}", currentPageNo).replace("{pageSize}", pageSize),
            method: 'GET'
        },
        function successCallback(response) {
            let roles = response.data.page;
            console.log("roles", response.data);
            setRoleListLength(response.data.totalElements);
            setRoleListData(roles.map(function (role, index) {
                return({
                    ...role,
                    createdTime: moment(role.createdTime).format("DD-MM-YYYY HH:mm") !== "Invalid date" ? moment(role.createdTime).format("DD-MM-YYYY HH:mm") : "",
                    updatedTime: moment(role.updatedTime).format("DD-MM-YYYY HH:mm") !== "Invalid date" ? moment(role.updatedTime).format("DD-MM-YYYY HH:mm") : "",
                    status: role.status === 1 ? "Active" : "Inactive"
                })
            }));
        },
        function errorCallback(error) {
            console.log("error", error);
            setRoleListLength(0);
            setRoleListData([]);
        });
    }

    const resetSnack = () => {
        setSnackText();
        setSnackVariant();
    };

    const triggerSavedAction = (type, roleName, error) => {
        if(type === "newRoleSuccess" || type === "editRoleSuccess"){
            setSnackVariant("success");
            setSnackText((type === "newRoleSuccess") ? ("Role " + roleName + " is Created Successfully") : ("Role " + roleName + " is Updated Successfully"));   
        }
        if(type === "checkAlreadyExistRole"){
            setSnackVariant("error");  
            setSnackText(error?.response?.data?.errorMessage);     
        }
        setPageNo(1);
        searchRoleData(1);
    };
    
    return(
        <Grid>
            <Snackbar
                text={snackText}
                variant={snackVariant}
                reset={() => { resetSnack() }}
            />
            {
                isNewAndUpdateRoleModal &&
                <NewAndEditRole
                    isModal={ isNewAndUpdateRoleModal }
                    isEditMode={ isEditMode }
                    isViewMode={ isViewMode }
                    roleInfo={ clickedRole }
                    closeAction={ () => { setIsNewAndUpdateRoleModal(false); setIsEditMode(false); setIsViewMode(false); }}
                    roleSaveCallback={ (type, role, error) => triggerSavedAction(type, role, error) }
                />
            }

            {
                isRoleUsersModal &&
                <RoleUsers
                    isModal={ isRoleUsersModal }
                    closeAction={ () => { setIsRoleUsersModal(false) }}
                    roleInfo={ clickedRole }
                />
            }

            <Grid display="flex" container justifyContent="space-between">
                <Grid item xs={12} md={7} display="flex" container justifyContent="space-between">
                    <Grid item xs={5}>
                        <Input
                            id="search"
                            name="search"
                            variant="outlined"
                            size="small"
                            className={ rolesClass.searchInput }
                            InputProps={{
                                endAdornment: (
                                    <SearchIcon/>
                                ),
                            }}
                            placeholder={ getLabel({ module: "userManagement", label: "searchRolesHere" }) }
                            value={ searchKey }
                            onChange={ (e) => { setSearchKey(e.target.value) } }
                        />
                    </Grid>

                    <Grid item xs={6} container className={rolesClass.checkboxFilter} display="flex" justifyContent="space-around">
                        <Grid item>
                            <CheckboxField
                                id="all"
                                name="all"
                                color="primary"
                                checked={ checkboxValue.all }
                                onChange={ (e) => setCheckboxValue({ all: e.target.checked, active: e.target.checked, inactive: e.target.checked }) }
                                label={ getLabel({ module: "userManagement", label: "all" }) }
                                mainClassName={ rolesClass.blueText }
                            />
                        </Grid>
                        <Grid item>
                            <CheckboxField
                                id="active"
                                name="active"
                                color="primary"
                                checked={ checkboxValue.active }
                                onChange={ (e) => setCheckboxValue({ ...checkboxValue, active: e.target.checked, all: e.target.checked && checkboxValue.inactive }) }
                                label={ getLabel({ module: "userManagement", label: "active" }) }
                                mainClassName={ rolesClass.greenText }
                            />
                        </Grid>
                        <Grid item>
                            <CheckboxField
                                id="inactive"
                                name="inactive"
                                color="primary"
                                checked={ checkboxValue.inactive }
                                onChange={ (e) => setCheckboxValue({ ...checkboxValue, inactive: e.target.checked, all: e.target.checked && checkboxValue.active }) }
                                label={ getLabel({ module: "userManagement", label: "inactive" }) }
                                mainClassName={ rolesClass.redText }
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={5} display="flex" container justifyContent="flex-end">
                    <Grid item xs={3} container display="flex" justifyContent="flex-end">
                        <Box display="flex" justifyContent="flex-end">
                            <Button 
                                className={ classNames(classes.mediumAddBtn, rolesClass.addBtn) }
                                onClick={ () => { setIsNewAndUpdateRoleModal(true) } }
                                >
                                { getLabel({ module: "userManagement", label: "addNew" }) }
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            <Grid className={ rolesClass.tableBlock }>
                <TableComponent
                    classes={ classes }
                    columns={ columnData }
                    rows={ roleListData }
                    uniqueField="roleId"
                    pageNo={ pageNo }
                    pageDataCount={ pageSize }
                    isPagination={ roleListLength/pageSize > 1 }
                    apiHandlePagination={true}
                    handlePagination={ (page) => { setPageNo(page); } }
                    datatotalCount={ roleListLength }
                />
            </Grid>
        </Grid>
    );
}

export default Roles;