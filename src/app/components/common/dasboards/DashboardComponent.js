import React, { Component } from 'react';

import PermissionChecker from "../../common/PermissionChecker";

import AdminDashboard from '../dasboards/adminDashboardComponent/adminDashboard';


class DashboardComponent extends Component {
 
    constructor(props) {

        super(props);
        this.state = {
            permissionArray: [],
            isPasswordResetModal: false
        }
    }

    componentDidMount() {
        this.setState({ permissionArray: localStorage.getItem("permissions") ? JSON.parse(localStorage.getItem("permissions")) : [] });
        console.log("DashboardComponent mounted with permissions: ", this.state.permissionArray);
    }

    render() {
        return (
            <>
                <PermissionChecker permission={ 1001 }><AdminDashboard landingPage={ "ARROW LANKA" }/></PermissionChecker>
              
            </>
        );
    }
}

export default DashboardComponent;