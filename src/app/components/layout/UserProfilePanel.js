import React, { Component } from 'react';
import ButtonComponent from '../common/ButtonComponent';
import { Link } from 'react-router-dom';
import "../common/commonStyle.css";
import { getLabel } from '../../utils/localization';

class UserProfilePanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: JSON.parse(localStorage.getItem("userDetail"))
        };
    }

    componentDidMount(){
        const panelElement=document.getElementById('profile-panel'),
            headerUserElement=document.getElementById('header-user-icon'),
            self=this;
        document.addEventListener('click', function(event){
            var targetElement=event.target;
            var isVisible=false;
            if(self.props.isVisible){
                while(targetElement) {
                    if (targetElement.id == panelElement.id || targetElement == headerUserElement ) {
                        isVisible=true;
                        return;
                    }
                    targetElement = targetElement.parentNode;
                };
            }
            
            if(self.props.isVisible){ 
                self.props.changeVisibility(false);
            }
        });
    }

    render() {
        return (
            <div className="profile-panel" id="profile-panel">
                
                <div className="row image-name">
                    <div className="col-lg-3">
                        <img src={require("../../assets/images/profile girl.png")} className="profile-panel-user-img"/>
                    </div>
                    <div className="col-lg-9">
                        <label className="profile-name">{ this.state.userData && this.state.userData.username }</label>
                        {/* <label className="profile-email">nishan.vaihuwara@gmail.com</label> */}
                    </div>
                </div>
                <hr/>
                <div className="profile-tabs">
                    <Link to="#Profile" onClick={()=>{ this.props.changeVisibility(false) }}><div>{ getLabel({module: "auth", label:"my profile"}) }</div></Link >
                    <Link to="#Configuration" onClick={()=>{ this.props.changeVisibility(false) }}><div className="mt-1">{ getLabel({module: "auth", label:"my settings"}) }</div></Link >
                </div>
                <hr/>
                <div className="cancel-btn-class logout-btn">
                    <ButtonComponent
                        buttonClass="btn"
                        buttonLabel={ getLabel({module: "auth", label:"logout"}) }
                        buttonType="button"
                        buttonValue="logout"
                        buttonClickAction={ this.props.logoutButtonClickAction }
                        buttonId="cancelBtn"
                    />
                </div>
                
            </div>
        );
    }

    logoutButtonClickAction(event){
        this.props.changeVisibility(false);
    }
}

export default UserProfilePanel;