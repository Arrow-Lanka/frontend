import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from "@mui/material";
import { useStyles } from "../../../../../assets/styles/styles";
import { PermissionsStyle } from './PermissionsStyle';

import { API_URL } from '../../../shared/API_URLS';
import { http_Request } from '../../../shared/HTTP_Request';

// images

import PermissionSetter from '../roles/PermissionSetter';
import loadingSpinner from "../../../../../assets/image/loadingsniperNew.gif";

const Permissions = (props) => {
    // style classes
    const permissionClass = PermissionsStyle();
    const classes = useStyles();

    const [modulesArray, setModulesArray] = useState([]);
    const [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        getAllModuleDetail();
    },[]);

    const getAllModuleDetail = () => {
        http_Request(
        {
            url: API_URL.userManagement.modules.GET_MODULE_DETAILS,
            method: 'GET'
        },
        function successCallback(response){
            console.log("module response", response.data.treeNodeSet);
            let tempModulesOptions = response?.data?.treeNodeSet?.map((singleModule, singleModuleIndex) => {
                return(
                    {
                        id: singleModuleIndex + 1,
                        name: singleModule.label,
                        ...singleModule
                    }
                );
            });
            // stop the visibility of spinner
            setTimeout(() => {
                setIsLoader(false);
            }, 1000);
            setModulesArray([...tempModulesOptions]);
        },
        function errorCallback(error) {
            console.log("error", error);
        });
    }

    return(
        <Grid>
            {
                isLoader &&
                <Grid className={permissionClass.spinnerBlock} container display="flex" justifyContent="center">
                    <img src={loadingSpinner}/>
                </Grid>
            }
            {/* search API is onhold for now */}
            {/* <Grid display="flex" container justifyContent="space-between">
                <Grid item xs={12} md={7} display="flex" container justifyContent="space-between">
                    <Input
                        id="search"
                        name="search"
                        variant="outlined"
                        size="small"
                        className={ permissionClass.searchInput }
                        InputProps={{
                            endAdornment: (
                                <SearchIcon/>
                            ),
                        }}
                        placeholder="Search Permisson here"
                        value={ searchKey }
                        onchange={ (e) => { setSearchKey(e.target.value) } }
                    />
                </Grid>
            </Grid> */}

            {/* <Grid className={ permissionClass.tableBlock }> */}
            <Grid>
                {
                    modulesArray.map((singleModule) => {
                        return(
                            <Box mb={2}>
                                <PermissionSetter
                                    selectedModule={ singleModule }
                                    deleteAction={ () => {  } }
                                    passTreeStructureData = { (structure) => {  } }
                                    fromCompomponent = "permissionList"
                                />
                            </Box>
                        );
                    })
                }
            </Grid>
        </Grid>
    );
}

export default Permissions;