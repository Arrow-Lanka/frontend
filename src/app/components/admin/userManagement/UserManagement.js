import { Grid, Paper, Typography, Tabs, Tab, Box } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { userManagementStyle } from './UserManagementStyle';
import { useLocation, useNavigate , Route ,Routes } from 'react-router-dom';
import loadingSpinner from "../../../../assets/image/loadingsniperNew.gif";

import Users from "./users/Users";
import Roles from "./roles/Roles";
import Permissions from './permissions/Permissions';
import { http_Request } from '../../shared/HTTP_Request';
import { API_URL } from '../../shared/API_URLS';
import { getLabel } from '../../shared/localization';

const UserManagement = (props) => {
    const userManagementClass = userManagementStyle();
    const location = useLocation();
    const navigate = useNavigate();

    const [tabValue, setTabValue] = useState(0);
    const [isLoader, setIsLoader] = useState(true);
    const [usersStatsDetail, setUsersStatsDetail] = useState({});
    const [rolesStatsDetail, setRolesStatsDetail] = useState({});

    useEffect(() => {
        let pathName = location.pathname.toLocaleLowerCase();
        getUsersStatisticsData();
        getRolesStatisticsData();

        let currentTabValue = 0;
        if(pathName.includes("roles")){
            currentTabValue = 1;
        }else if(pathName.includes("permissions")){
            currentTabValue = 2;
        }
        setTabValue(currentTabValue);
        setTimeout(() => {
            setIsLoader(false);
        },[1500]);
    },[]);

    const tabChangeAction = (e, count) => {
        setTabValue(count);
        let redirectUrl;

        if(count === 0){
            redirectUrl = "/alt/admin/userManagement/users";
        }else if(count === 1){
            redirectUrl = "/alt/admin/userManagement/roles";
        }else if(count === 2){
            redirectUrl = "/alt/admin/userManagement/permissions";
        }
        navigate(redirectUrl);
        
    }

    const getUsersStatisticsData = () => {
        http_Request(
        {
            url: API_URL.userManagement.users.GET_USER_STATS,
            method: 'GET'
        },
        function successCallback(response) {
            console.log("users stats detail", response.data);
            setUsersStatsDetail(response.data);            
        },
        function errorCallback(error) {
            console.log("error", error.response || error);
        });
    };

    const getRolesStatisticsData = () => {
        http_Request(
        {
            url: API_URL.userManagement.roles.GET_ROLE_STATS,
            method: 'GET'
        },
        function successCallback(response) {
            console.log("roles stats detail", response.data);
            setRolesStatsDetail(response.data);            
        },
        function errorCallback(error) {
            console.log("error", error.response || error);
        });
    };

    return (
        <div className={userManagementClass.mainContainer}>
            {
                isLoader && (tabValue !== 2) &&
                <Grid className={userManagementClass.spinnerBlock} container display="flex" justifyContent="center">
                    <img src={loadingSpinner}/>
                </Grid>
            }
            <Grid container spacing={2}>
                <Grid item container xs={6}>
                    <Grid item container xs={12} sm={12} md={6} lg={6} alignItems='center' className={userManagementClass.totalCountContainer}>
                        <Typography item xs={6} sm={6} md={6} lg={6} className={userManagementClass.totalCountNumber}>
                            { usersStatsDetail.totalUsers }
                        </Typography>
                        <Typography item xs={6} sm={6} md={6} lg={6} className={userManagementClass.totalCountLabel}>
                            <Box>{ getLabel({module: "userManagement", label: "total"}) }</Box>
                            <Box>{ getLabel({module: "userManagement", label: "users"}) }</Box>
                        </Typography>
                    </Grid>

                    <Grid item container xs={12} sm={12} md={6} lg={6} justify='flex-end' className={userManagementClass.numberBlockCountsContainer}>
                        <Grid item container xs={12} sm={12} md={4} lg={4}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography className={ userManagementClass.OrangeNumber }>
                                    { usersStatsDetail.totalLocked }
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography className={userManagementClass.countsSecondaryLabel}>
                                    { getLabel({module: "userManagement", label: "locked"}) }
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item container xs={12} sm={12} md={4} lg={4}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography className={userManagementClass.blueNumber}>
                                    { usersStatsDetail.totalActive }
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography className={userManagementClass.countsSecondaryLabel}>
                                    { getLabel({module: "userManagement", label: "active"}) }
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item container xs={12} sm={12} md={4} lg={4}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography className={userManagementClass.redNumber}>
                                    { usersStatsDetail.totalInactive }
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography className={userManagementClass.countsSecondaryLabel}>
                                    { getLabel({module: "userManagement", label: "inactive"}) }
                                </Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item container xs={6}>
                    <Grid item container xs={12} sm={12} md={6} lg={6} alignItems='center' className={userManagementClass.totalCountContainer}>
                        <Typography className={userManagementClass.totalCountNumber}>
                            { rolesStatsDetail.totalRoles }
                        </Typography>
                        <Typography className={userManagementClass.totalCountLabel}>
                            <Box>{ getLabel({module: "userManagement", label: "total"}) }</Box>
                            <Box>{ getLabel({module: "userManagement", label: "roles"}) }</Box>
                        </Typography>
                    </Grid>

                    <Grid item container xs={12} sm={12} md={6} lg={6} justify='flex-end' className={userManagementClass.numberBlockCountsContainer}>
                        <Grid item container xs={12} sm={12} md={5} lg={5}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography className={userManagementClass.blueNumber}>
                                    { rolesStatsDetail.totalActive }
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography className={userManagementClass.countsSecondaryLabel}>
                                    { getLabel({module: "userManagement", label: "active"}) }
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item container xs={12} sm={12} md={5} lg={5}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography className={userManagementClass.redNumber}>
                                    { rolesStatsDetail.totalInactive }
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography className={userManagementClass.countsSecondaryLabel}>
                                    { getLabel({module: "userManagement", label: "inactive"}) }
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container className={userManagementClass.bodyContainer}>
                <Grid container className={userManagementClass.tabContainer}>
                    <Tabs
                        value={ tabValue }
                        onChange={(e, count) => { tabChangeAction(e, count); }}
                        indicatorColor='primary'
                        textColor='primary'
                    >
                        <Tab label="Users" className={userManagementClass.tabLabel} style={{ outline: 'none' }} />
                        <Tab label="Roles" className={userManagementClass.tabLabel} style={{ outline: 'none' }} />
                        <Tab label="Permissions" className={userManagementClass.tabLabel} style={{ outline: 'none' }} />
                    </Tabs>
                </Grid>

             <Grid className={userManagementClass.singleSection}>
    <Routes>
        <Route path="users" element={<Users />} />
        <Route path="roles" element={<Roles />} />
        <Route path="permissions" element={<Permissions />} />
    </Routes>
</Grid>

            </Grid>     
        </div>
    )

}

export default UserManagement;