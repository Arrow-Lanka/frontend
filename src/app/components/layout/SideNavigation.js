import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { getLabel } from '../../utils/localization';
import './LayoutStyle.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import EventIcon from '@material-ui/icons/Event';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import FaceIcon from '@material-ui/icons/Face';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ConfirmingModal from '../common/modal/ConfirmingModal';
// import { changesCheckAction } from '../../actions/changesCheckAction';

const drawerWidth = 270;
const theme = createMuiTheme();
const styles = {
    root: {
        background: '#E1E8F3',
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    appBar: {
        background: '#E1E8F3',
        boxShadow: 'none',
        borderBottom: '1px solid #C0C5CC',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
        color: '#222F99',
        // zIndex: '1600',
    },
    drawerPaper: {
        background: '#E1E8F3',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        zIndex: '1500',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        borderRight: 'none',
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        // zIndex: '1',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
}

class SideNavigationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistrationMenu: false,
            clickedTabItem: "dashboard",
            permissionArray: [],
            menuDrawerOpen: false,
            changesConfirmationModal: false,
            clickedLink: "",
            isModalSuceed: false
        }
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.sideTabClick = this.sideTabClick.bind(this);
    }

    componentDidMount() {
        this.setState({ permissionArray: localStorage.getItem("permissions") ? JSON.parse(localStorage.getItem("permissions")) : [] });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="side-navigation">
                { this.state.isModalSuceed && <Redirect to={this.state.clickedLink} />}
                <div className={classes.root} >
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: clsx(classes.drawerPaper, !this.state.menuDrawerOpen && classes.drawerPaperClose),
                        }}
                        open={this.state.menuDrawerOpen}
                        onMouseOver={this.handleDrawerOpen}
                        onMouseLeave={this.handleDrawerClose}
                    >
                        <div className={classes.appBarSpacer} />
                        <Divider />
                        <List component="nav" className="leftside-nav" disablePadding>
                            <Link to={!this.props.isChangesOccured && "/infirma"}>
                                <ListItem button onClick={() => this.sideTabClick("/infirma")}>
                                    <ListItemIcon>
                                        <DesktopWindowsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={ getLabel({ module: "layout", label: "dashboard" }) } />
                                </ListItem>
                            </Link>

                            {
                                this.state.permissionArray.includes("PR_ADD_PATIENT") &&
                                <Link to={!this.props.isChangesOccured && "/infirma/registrationDecider"}>
                                    <ListItem button onClick={() => this.sideTabClick("/infirma/registrationDecider")}>
                                        <ListItemIcon>
                                            <EventIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={ getLabel({ module: "layout", label: "patient registration" }) } />
                                    </ListItem>
                                </Link>
                            }
                            {
                                this.state.permissionArray.includes("VIEW_ADMIN_DASHBOARD") &&
                                <Link to={!this.props.isChangesOccured && "/infirma/doctors/registrationDecider"}>
                                    <ListItem button onClick={() => this.sideTabClick("/infirma/doctors/registrationDecider")}>
                                        <ListItemIcon>
                                            <AssignmentIndIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={ getLabel({ module: "layout", label: "doctor registration" }) } />
                                    </ListItem>
                                </Link>
                            }

                            {
                                this.state.permissionArray.includes("VIEW_ADMIN_DASHBOARD") &&
                                <Link to={!this.props.isChangesOccured && "/infirma/nurses/RegistrationDecider"}>
                                    <ListItem button onClick={() => this.sideTabClick("/infirma/nurses/RegistrationDecider")}>
                                        <ListItemIcon>
                                            <FaceIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={ getLabel({ module: "layout", label: "clinicalStaffRegistration" }) } />
                                    </ListItem>
                                </Link>
                            }

                            {
                                this.state.permissionArray.includes("VIEW_UM") &&
                                <Link to={ !this.props.isChangesOccured && "/infirma/userManagement/users" }>
                                    <ListItem button onClick={ () => this.sideTabClick("/infirma/userManagement") }>
                                        <ListItemIcon>
                                            <GroupAddIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={ getLabel({ module: "layout", label: "user management" }) } />
                                    </ListItem>
                                </Link>
                            }

                            {
                                this.state.permissionArray.includes("VIEW_UM") &&
                                <Link to={!this.props.isChangesOccured && "/infirma/admin/department"}>
                                    <ListItem button onClick={() => this.sideTabClick("/infirma/admin/department")}>
                                        <ListItemIcon>
                                            <SettingsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={ getLabel({ module: "layout", label: "hospitalSetup" }) } />
                                    </ListItem>
                                </Link>
                            }

                            {
                                this.state.permissionArray.includes("VIEW_FRONT_OFF_DASHBOARD") &&
                                <Link to={!this.props.isChangesOccured && "/infirma/AppointmentScheduling"}>
                                    <ListItem button onClick={() => this.sideTabClick("/infirma/AppointmentScheduling")}>
                                        <ListItemIcon>
                                            <DateRangeOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={ getLabel({ module: "layout", label: "appointment scheduling" }) } />
                                    </ListItem>
                                </Link>
                            }
                        </List>
                    </Drawer>
                </div>

                <ConfirmingModal
                    isModal={this.state.changesConfirmationModal}
                    statementLabel="Are you sure to leave this page ?"
                    cancelLabel="Cancel"
                    confirmLabel="Yes"
                    cancelButtonClickAction={() => { this.setState({ changesConfirmationModal: false }) }}
                    confirmButtonClickAction={() => { this.props.changeCheckAction(false); this.setState({ isModalSuceed: true, changesConfirmationModal: false }); setTimeout(() => { this.setState({ isModalSuceed: false }); }, 100); }}
                />

            </div>
        );
    }

    sideTabClick(link) {
        this.setState({ changesConfirmationModal: this.props.isChangesOccured, clickedLink: link });
    }

    handleDrawerOpen = () => {
        this.setState({
            menuDrawerOpen: true,
        });
    }

    handleDrawerClose = () => {
        this.setState({
            menuDrawerOpen: false,
        });
    }
}

const mapStateToProps = (state, ownProps) => {
    return { isChangesOccured: state.isChangesApplied.isChange };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // changeCheckAction: (isChanges) => dispatch(changesCheckAction(isChanges))
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SideNavigationComponent));