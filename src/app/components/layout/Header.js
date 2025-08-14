import React, { Component } from 'react';
import UserProfilePanel from './UserProfilePanel';
import ConfirmingModal from '../common/modal/ConfirmingModal';
import { getLabel } from '../../utils/localization';
import { Redirect, Link } from 'react-router-dom';

import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
// import Link from '@material-ui/core/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ExitToApp from '@mui/icons-material/ExitToApp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { createMuiTheme, withStyles } from '@mui/material/styles';
import { connect } from 'react-redux';
// import ConfirmingModal from '../common/modal/ConfirmingModal';
// import { changesCheckAction } from '../../actions/changesCheckAction';

const drawerWidth = 240;
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
        // zIndex: theme.zIndex.drawer + 1,
        zIndex: '2500',
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
    },
    drawerPaper: {
        background: '#E1E8F3',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        // zIndex: '9999',
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
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        marginLeft: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(9),
        },
    },
    container: {
        padding: theme.spacing(2),
        // paddingBottom: theme.spacing(2),
    },
    fixedHeight: {
        height: 240,
    },
    logoWrapper: {
        flexGrow: 1,
    },
    logo: {
        width: 135,
        height: 43.54
    },
    search: {
        position: 'relative',
        // borderRadius: theme.shape.borderRadius,
        backgroundColor: '#fff',
        marginRight: theme.spacing(2),
        // '&:hover': {
        //     backgroundColor: fade(theme.palette.common.white, 0.25),
        // },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: '#8D95A1',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '16ch',
            '&:focus': {
                width: '25ch',
            },
        },
        border: '1px solid #C0C5CC',
        borderRadius: '5px'
    },
    profileInfo: {
        color: '#222F99',
    },
    widget: {
        // padding: theme.spacing(2),
        color: '#fff',
    },
    opd: {
        backgroundColor: '#459fc1',
    },
}

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuDrawerOpen: false,
            isUserProfilePanel: false,
            isLogoutModal: false,
            isLogout: false,
            changesConfirmationModal: false,
            clickedLink: "",
            isModalSuceed: false,
        }

        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);

        this.userProfClickAction = this.userProfClickAction.bind(this);
        this.changePanelVisibility = this.changePanelVisibility.bind(this);
        this.logoutClickAction = this.logoutClickAction.bind(this);
        this.logoutModalButtonClickAction = this.logoutModalButtonClickAction.bind(this);
        this.cancelModalButtonClickAction = this.cancelModalButtonClickAction.bind(this);
        this.logoClickAction = this.logoClickAction.bind(this);

    }
    render() {

        const { classes } = this.props;

        return (
            <div>
                { this.state.isLogout && <Redirect to="/" />}
                { this.state.isModalSuceed && <Redirect to={this.state.clickedLink} />}
                <AppBar position="fixed" className={clsx(classes.appBar, this.state.menuDrawerOpen && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="Open drawer"
                            onMouseOver={this.handleDrawerOpen}
                            onMouseLeave={this.handleDrawerClose}
                            className={clsx(classes.menuButton, this.state.menuDrawerOpen)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div noWrap className={classes.logoWrapper}>
                            <Link to={!this.props.isChangesOccured && "/infirma"}>
                                <img className={classes.logo} onClick={() => { this.logoClickAction("/infirma") }}
                                    src={
                                        require('../../assets/images/exotic header logo.png')
                                    }
                                    alt="Logo"
                                />
                            </Link>
                        </div>
                        {/* <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon color="disabled" />
                            </div>
                            <InputBase
                                placeholder="Search"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div> */}
                        <Box className={classes.root} alignItems="center">
                            <IconButton color="disabled">
                                <Badge badgeContent={5} color="secondary" className="badge-value">
                                    <NotificationsIcon style={{ fontSize: 30 }} />
                                </Badge>
                            </IconButton>
                            <img src={require('../../assets/images/profile girl.png')} onClick={this.userProfClickAction} className="tbicon" id="header-user-icon" />

                            <IconButton
                                color="disabled"
                                onClick={() => { this.setState({ isLogoutModal: true }) }}
                            >
                                <ExitToApp
                                />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {
                    this.state.isUserProfilePanel &&
                    <UserProfilePanel
                        isVisible={this.state.isUserProfilePanel}
                        changeVisibility={this.changePanelVisibility}
                        logoutButtonClickAction={this.logoutClickAction}
                    />
                }
                <ConfirmingModal
                    isModal={this.state.isLogoutModal}
                    statementLabel={getLabel({ module: "auth", label: "areYouSureYouWantToLogout" })}
                    confirmLabel={getLabel({ module: "auth", label: "ok" })}
                    cancelLabel={getLabel({ module: "auth", label: "cancel" })}
                    cancelButtonClickAction={this.cancelModalButtonClickAction}
                    confirmButtonClickAction={this.logoutModalButtonClickAction}
                />

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

    changePanelVisibility(value) {
        this.setState({ isUserProfilePanel: value });
    }

    userProfClickAction(event) {
        this.setState({ isUserProfilePanel: !this.state.isUserProfilePanel });
    }

    logoutClickAction(event) {
        this.setState({
            isLogoutModal: true,
            isUserProfilePanel: false
        });
    }

    logoutModalButtonClickAction(event) {
        this.setState({ isLogoutModal: false, isModalSuceed: false, clickedLink: "", changesConfirmationModal: false });
        localStorage.clear();
        localStorage.clear();
        setTimeout(() => {
            this.setState({ isLogout: true });
            this.props.changeCheckAction(false)
        }, 600);
    }

    cancelModalButtonClickAction(event) {
        this.setState({ isLogoutModal: false });
    }

    logoClickAction(link) {
        console.log("Link", link)
        this.setState({ changesConfirmationModal: this.props.isChangesOccured, clickedLink: link })
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Header));