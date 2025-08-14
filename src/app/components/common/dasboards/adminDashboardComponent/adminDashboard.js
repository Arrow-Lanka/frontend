import React, { Component } from 'react';
import '../dashboardStyles.css';
import './adminDashboard.css';

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="admin-dashboard-main-div">
                <img src={require("../../../../../assets/image/altLogo-removebg.png")} className="landing-page-logo" alt="Exotic logo" style={{ height: '150px', width: '250px' }} />
                <label className="admin-landing-page-line-one">
                    WELCOME TO
                </label>
                <br />
                <label className="admin-landing-page-line-two">
                    { this.props.landingPage }
                </label>
            </div>
        );
    }
}

export default AdminDashboard;
