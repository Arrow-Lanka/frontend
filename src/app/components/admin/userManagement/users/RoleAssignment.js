import React, { useEffect, useState } from 'react';
import { Grid, Button, Box } from "@mui/material";
import SingleRoleSelection from './SingleRoleSelection';

import { http_Request } from "../../../shared/HTTP_Request";
import { API_URL } from "../../../shared/API_URLS";
import { getLabel } from "../../../shared/localization";

const RoleAssignment = (props) => {
    const [roleList, setRoleList] = useState([]);
    const [selectedRoleList, setSelectedRoleList] = useState(props.initialRoleList);

    useEffect(() => {
        if( props.searchKey.length === 0 || props.searchKey.length > 2){
            searchRoles();
        }
    }, [props.searchKey]);

    const searchRoles = () => {
        http_Request(
        {
            url: API_URL.userManagement.roles.ROLE_SEARCH.replace("{pageNo}", 1).replace("{pageSize}", 100) + `&roleName=${props.searchKey}` + "&status=1",
            method: 'GET'
        },
        function successCallback(response) {
            let roles = response.data.page.filter((singleRole) => 
                !selectedRoleList.some((singleAssignedRole) => {
                    return( singleAssignedRole?.roleId?.toString() === singleRole?.roleId?.toString() );
                })
            );
            setRoleList(roles);
            console.log(response.data.page,roles,'help me' )

        },
        function errorCallback(error) {
            console.log("error", error);
            setRoleList([]);
        });  
    }

    const roleMoveAction = (event) => {
        let type = event.target.id?.split("_")[0];
        let id = event.target.id?.split("_")[2];

        if(type === "all"){
            let defaultAvailable = false;
            roleList.map((singleRole, singleRoleIndex) => {
                if(singleRole.roleId.toString() === id){
                    selectedRoleList.push(singleRole);
                    roleList.splice(singleRoleIndex, 1);
                }
            });

            // to check any isDefault status
            selectedRoleList.map((singleSelectedRole) => {
                if(singleSelectedRole.isDefault){
                    defaultAvailable = true;
                }else {
                    singleSelectedRole.isDefault = false;
                }
            })

            if(!defaultAvailable){
                selectedRoleList[0].isDefault = true;
            }
        }else{
            selectedRoleList.map((singleSelectedRole, singleSelectedRoleIndex) => {
                if(singleSelectedRole.roleId.toString() === id){
                    roleList.push(singleSelectedRole);
                    selectedRoleList.splice(singleSelectedRoleIndex, 1);
                    // if removing role is default, making first one as default
                    if(singleSelectedRole.isDefault && selectedRoleList[0]){
                        selectedRoleList[0].isDefault = true;
                    }
                }
            });
        }
        setRoleList([...roleList]);
        setSelectedRoleList([...selectedRoleList]);
        props.roleSelectionCallback(selectedRoleList);
    };

    const radioChangeAction = (id, value) => {
        selectedRoleList.map((singleSelectedRole) => {
            singleSelectedRole.isDefault = false;
            if(singleSelectedRole.roleId === id){
                singleSelectedRole.isDefault = true;
            }
        });
        setSelectedRoleList([...selectedRoleList]);
        props.roleSelectionCallback(selectedRoleList);
    }

    return(
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
                <SingleRoleSelection
                    type="all"
                    title={ getLabel({ module: "userManagement", label: "role" }) }
                    tableRowData={ roleList }
                    moveAction={ (event) => { roleMoveAction(event) } }
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <SingleRoleSelection
                    type="assigned"
                    title={ getLabel({ module: "userManagement", label: "assignedRole" }) }
                    tableRowData={ selectedRoleList }
                    moveAction={ (event) => { roleMoveAction(event) } }
                    radioClickAction={ (id, value) => { radioChangeAction(id, value) } }
                />
            </Grid>
        </Grid>
    );
}

export default RoleAssignment;