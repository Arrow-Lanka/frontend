import React, { useMemo } from "react";
import { Navigate } from "react-router-dom";
import { http_Request } from "../shared/HTTP_Request";
import { API_URL } from "../shared/API_URLS";
import { useDispatch } from "react-redux";
import { useTheme, withStyles } from "@mui/styles";
import PermissionChecker from "../common/PermissionChecker";
import { permissionValidator } from "../common/permissionValidator"
import clsx from "clsx";
import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Grid,
  Typography,
  useMediaQuery,
  Badge,
  Collapse,
  Avatar
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { getLabel } from "../shared/localization";
import ConfirmationModal from "../common/ConfirmationModal";
// import { changesCheckAction } from "../../actions/changesCheckAction";
import DrawerButton from "./DrawerButton";
import {
  closeArrow,
  openArrow,
  appBarLogOut,
  dashboardSvg,
  patientSvg,
  userManSvg,
  cashierLocSvg,
  resourceSchedulingSvg,
  stockWatchSvg,
  adminButtonSvg,
  batchManagementSvg,
  cashierManagementSvg,
  cashierReportSvgOrange,
  stockWatchSvgOrg,
  departmentSetUpSvgOrg,
  grnSvg,
  stockManagementSvg
} from "./svgIcons";

import maleAvatar from "../../../assets/image/genderAvatar/male-avatar-bg-less.svg";
import femaleAvatar from "../../../assets/image/genderAvatar/female avatar-bg-less.svg";
import { layoutStyles } from "./layoutStyles";
import { useStyles } from "../../../assets/styles/styles";
import { cloneDeep } from "lodash";
import DrawerMenuButton from "./DrawerMenuButton";

// import PopoverMenu from "../profile/popoverMenu/PopoverMenu";
// import ProfileCard from "../profile/profileCard/ProfileCard";


const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: theme.palette.reds.dark,
    marginTop: 5,
    marginRight: 2,
  },
}))(Badge);

const Main = (props) => {
  /**
    |--------------------------------------------------
    | redux integration 
    |--------------------------------------------------
    */
  const dispatch = useDispatch();

  // const isChangesOccured = useSelector(
  //   (state) => state.isChangesApplied.isChange
  // );
  const isChangesOccured = true;
  /**
     |--------------------------------------------------
    | material ui styles and use theme
    |--------------------------------------------------
    */
  const classes = layoutStyles();
  const commonclasses = useStyles();
  const theme = useTheme();

  /**
     |--------------------------------------------------
    | drawer open and close state and functions
    |--------------------------------------------------
    */
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  /**
     |--------------------------------------------------
    | Responsiveness  
    |--------------------------------------------------
    */
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const matches2 = useMediaQuery(theme.breakpoints.up("md"));

  // React.useEffect(() => {
  //   setOpen(true);
  // }, [matches]);

  /**
     |--------------------------------------------------
    | set active tab
    |--------------------------------------------------
    */
  const [active, setActive] = React.useState(
    window.location.pathname.toString().replace("/main/", "")
  );

  const [appTopbarMenuState, setAppTopbarMenuState] = React.useState(null);

  const handleClick = (event) => {
    setAppTopbarMenuState(event.currentTarget);
  };

  const handleClose = () => {
    setAppTopbarMenuState(null);
  };

  /**
     |--------------------------------------------------
    | state for handle permission and others drawer
    |--------------------------------------------------
    */

  const [permissionArray, setPermissionArray] = React.useState([]);
  const [changesConfirmationModal, setChangesConfirmationModal] = React.useState(false);
  const [clickedLink, setClickedLink] = React.useState("");
  const [isModalSucceed, setIsModalSucceed] = React.useState(false);
  const [userDetail, setUserDetail] = React.useState({});
  const [isCashierCloseSession, setIsCashierCloseSession] = React.useState(false);
  const [userProfilePicture, setUserProfilePicture] = React.useState('');

  /**
    |--------------------------------------------------
    | billing summary details - To confirm whether billing user has an active session
    |--------------------------------------------------
  */
  // const { billingSummaryData } = useSelector(
  //   (state) => state.billingLocationSummaryDetailsReducer
  // );

  React.useEffect(() => {
    getPersonDetail();

    setPermissionArray(
      localStorage.getItem("permissions")
        ? JSON.parse(localStorage.getItem("permissions"))
        : []
    );
  }, []);

  const getPersonDetail = () => {
    let profileId =
      JSON.parse(localStorage.getItem("userDetail")) &&
      JSON.parse(localStorage.getItem("userDetail")).profileId;
    http_Request(
      {
        url: API_URL.userManagement.person.INFO_BY_ID.replace(
          "{profileId}",
          profileId
        ),
        method: "GET",
      },
      function successCallback(response) {
        console.log("response of person", response);
        getProfilePicture(response?.data?.personId, response?.data?.staffType);
        setUserDetail(response.data);
      },
      function (error) {
        console.log("Error", error);
      }
    );
  };

  // get user profile picture
  const getProfilePicture = (personId, personType) => {
    let selectedURL = personType && personType === 'DOCTOR' ? API_URL.doctors.registration.GET_DOCTOR_IMAGE :
      personType === 'NURSE' ? API_URL.nurse.updateDetails.GET_IMAGE_BY_PERSON_ID :
        API_URL.nonClinicalStaffRegistration.updateDetails.GET_IMAGE_BY_PERSON_ID;

    personId && personType && (
      http_Request(
        {
          url: selectedURL.replace("{personId}", personId),
          method: "GET",
        },
        function successCallback(response) {
          if (response?.status === 200 || response?.status === 201) {
            const imageContent = response?.data;
            const previewFile = new Blob([imageContent], { type: "image/*" });
            const imageURL = imageContent && URL.createObjectURL(previewFile);
            setUserProfilePicture(imageURL);
          }
        },
        function (error) {
          console.log("Error", error);
          setUserProfilePicture('');
        },
        {
          responseType: "blob"
        }
      )
    )
  }

  const sideTabClick = (link) => {
    setChangesConfirmationModal(isChangesOccured);
    setClickedLink(link);
  };
  const sideTabLogOut = (link) => {
    setChangesConfirmationModal(isChangesOccured);
    // setClickedLink(link);
  };

  /**
     |--------------------------------------------------
    |app top bar state and function
    |--------------------------------------------------
    */

  const [isLogoutModal, setIsLogoutModal] = React.useState(false);
  const [isLogout, setIsLogout] = React.useState(false);

  const cancelModalButtonClickAction = () => {
    setIsLogoutModal(false);
  };

  const logoutModalButtonClickAction = () => {
    setIsLogoutModal(false);
    setIsModalSucceed(false);
    setIsCashierCloseSession(false);
    setClickedLink("");
    setChangesConfirmationModal(false);
    const prevPermissions = cloneDeep(localStorage.getItem("permissions"));
    localStorage.clear();
    localStorage.setItem("prevPermissions", prevPermissions);
    setTimeout(() => {
      setIsLogout(true);
      // dispatch(changesCheckAction(false));
    }, 50);
  };

  /**
  |--------------------------------------------------
  | popover state and functions
  |--------------------------------------------------
  */
  const [anchorElPopover, setAnchorElPopover] = React.useState(null);

  const handleClickPopover = (event) => {
    setAnchorElPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorElPopover(null);
  };

  const openPopover = Boolean(anchorElPopover);
  const idPopover = openPopover ? "app-top-simple-popover" : '';

  /**
  |-----------------------------------------------------
  | Profile Card Popover state and functions
  |-----------------------------------------------------
  */
  const [profileCardPopover, setProfileCardPopover] = React.useState(null);

  const handleClickProfileCard = (event) => {
    setProfileCardPopover(event.currentTarget);
  };

  const handleCloseProfileCard = () => {
    setProfileCardPopover(null)
  };

  const openProfileCardPopover = Boolean(profileCardPopover);
  const profileCardIDPopover = openProfileCardPopover ? "profile-card-popover" : '';






  /**
  |--------------------------------------------------
  | Admin Drawer State and functions
  |--------------------------------------------------
  */
  const [adminDrawerStates, dispatchAdminDrawerStates] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'closeAdminDrawer':
        return { isAdminDrawerOpen: false }
      case 'openAdminDrawer':
        return { isAdminDrawerOpen: true }
      default:
        break;
    }
  }, { isAdminDrawerOpen: false })



  /**
  |--------------------------------------------------
  | Admin Drawer State and functions
  |--------------------------------------------------
  */
  const [inventoryDrawerStates, dispatchInventoryDrawerStates] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'closeInventoryDrawer':
        return { isInventoryDrawerOpen: false }
      case 'openInventoryDrawer':
        return { isInventoryDrawerOpen: true }
      default:
        break;
    }
  }, { isInventoryDrawerOpen: false })



  /**
  |--------------------------------------------------
  | Logged In User's Hospitals
  |--------------------------------------------------
  */
  const userHospitals = useMemo(() => {
    let loggedInUserDetail = localStorage.getItem('userDetail') && JSON.parse(localStorage.getItem('userDetail'));
    let loggedInUserHospitals = (Array.isArray(loggedInUserDetail?.hospitals) && loggedInUserDetail.hospitals) || []
    return loggedInUserHospitals;
  }, [])

  /**
     |--------------------------------------------------
    | side bar navigation button
    |--------------------------------------------------
    */

  const dashboardDrawerBtn = (
    <Grid
      container
      style={{ marginTop: "1rem" }}
      onClick={() => sideTabClick("/alt/dashboard")}
    >
      <DrawerButton
        id='dashboardDrawerBtn'
        classes={classes}
        open={open}
        active={active}
        setActive={setActive}
        subTitle={getLabel({ module: "layout", label: "dashboard" })}
        linkPath={!isChangesOccured && "/alt/dashboard"}
        selectButton={"/alt/dashboard"}
        drawerIcon={dashboardSvg}
      />
    </Grid>
  );


  const adminPageDrawerMenuBtn = (
    <DrawerMenuButton
      id='adminPageDrawerBtn'
      classes={classes}
      open={open}
      isNestedDrawerOpen={adminDrawerStates?.isAdminDrawerOpen}
      subTitle={"Admin"}
      drawerIcon={resourceSchedulingSvg}
      onDrawerButtonClick={
        () => adminDrawerStates?.isAdminDrawerOpen ?
          dispatchAdminDrawerStates({ type: "closeAdminDrawer" })
          :
          dispatchAdminDrawerStates({ type: "openAdminDrawer" })
      }
      mobileOpen={mobileOpen}
    />
  )

  const inventoryPageDrawerMenuBtn = (
    <DrawerMenuButton
      id='inventoryPageDrawerBtn'
      classes={classes}
      open={open}
      isNestedDrawerOpen={inventoryDrawerStates?.isInventoryDrawerOpen}
      subTitle={"Inventory"}
      drawerIcon={cashierManagementSvg}
      onDrawerButtonClick={
        () => inventoryDrawerStates?.isInventoryDrawerOpen ?
          dispatchInventoryDrawerStates({ type: "closeInventoryDrawer" })
          :
          dispatchInventoryDrawerStates({ type: "openInventoryDrawer" })
      }
      mobileOpen={mobileOpen}
    />
  )

  const itemPageDrawerBtn = (
    <Grid
      container
      style={{ marginTop: "1rem" }}
      onClick={() => sideTabClick("/alt/admin/item")}
    >
      <DrawerButton
        id='itemPageDrawerBtn'
        classes={classes}
        open={open}
        active={active}
        setActive={setActive}
        subTitle={"Item Management"}
        linkPath={!isChangesOccured && "/alt/admin/item"}
        selectButton={"/alt/admin/item"}
        drawerIcon={cashierReportSvgOrange}
        nestedPadding={"0.5rem 0.5rem 0.5rem 2.25rem"}

      />
    </Grid>
  );



  const supplierPageDrawerBtn = (
    <Grid
      container
      style={{ marginTop: "1rem" }}
      onClick={() => sideTabClick("/alt/admin/supplier")}
    >
      <DrawerButton
        id='supplierPageDrawerBtn'
        classes={classes}
        open={open}
        active={active}
        setActive={setActive}
        subTitle={"Supplier Management"}
        linkPath={!isChangesOccured && "/alt/admin/supplier"}
        selectButton={"/alt/admin/supplier"}
        drawerIcon={adminButtonSvg}
        nestedPadding={"0.5rem 0.5rem 0.5rem 2.25rem"}

      />
    </Grid>
  );

  const customerPageDrawerBtn = (
    <Grid
      container
      style={{ marginTop: "1rem" }}
      onClick={() => sideTabClick("/alt/admin/customer")}
    >
      <DrawerButton
        id='customerPageDrawerBtn'
        classes={classes}
        open={open}
        active={active}
        setActive={setActive}
        subTitle={"Customer Management"}
        linkPath={!isChangesOccured && "/alt/admin/customer"}
        selectButton={"/alt/admin/customer"}
        drawerIcon={adminButtonSvg}
        nestedPadding={"0.5rem 0.5rem 0.5rem 2.25rem"}

      />
    </Grid>
  );


  const stockLocationDrawerBtn = (
    <Grid
      container
      style={{ marginTop: "1rem" }}
      onClick={() => sideTabClick("/alt/admin/stock-location")}
    >
      <DrawerButton
        id='stockLocationDrawerBtn'
        classes={classes}
        open={open}
        active={active}
        setActive={setActive}
        subTitle={"Stock Location Management"}
        linkPath={!isChangesOccured && "/alt/admin/stock-location"}
        selectButton={"/alt/admin/stock-location"}
        drawerIcon={departmentSetUpSvgOrg}
        nestedPadding={"0.5rem 0.5rem 0.5rem 2.25rem"}

      />
    </Grid>
  );

  const batchPageDrawerBtn = (
    <Grid
      container
      style={{ marginTop: "1rem" }}
      onClick={() => sideTabClick("/alt/admin/batch")}
    >
      <DrawerButton
        id='batchPageDrawerBtn'
        classes={classes}
        open={open}
        active={active}
        setActive={setActive}
        subTitle={"Batch Management"}
        linkPath={!isChangesOccured && "/alt/admin/batch"}
        selectButton={"/alt/admin/batch"}
        drawerIcon={stockWatchSvgOrg} // or use a different icon if you want
        nestedPadding={"0.5rem 0.5rem 0.5rem 2.25rem"}
      />
    </Grid>
  );

  const grnPageDrawerBtn = (
    <Grid
      container
      style={{ marginTop: "1rem" }}
      onClick={() => sideTabClick("/alt/admin/grn")}
    >
      <DrawerButton
        id='grnPageDrawerBtn'
        classes={classes}
        open={open}
        active={active}
        setActive={setActive}
        subTitle={"GRN Management"}
        linkPath={!isChangesOccured && "/alt/admin/grn"}
        selectButton={"/alt/admin/grn"}
        drawerIcon={grnSvg} // Use an appropriate icon
        nestedPadding={"0.5rem 0.5rem 0.5rem 2.25rem"}
      />
    </Grid>
  );

  const stockPageDrawerBtn = (
    <Grid
      container
      style={{ marginTop: "1rem" }}
      onClick={() => sideTabClick("/alt/admin/stock")}
    >
      <DrawerButton
        id='stockPageDrawerBtn'
        classes={classes}
        open={open}
        active={active}
        setActive={setActive}
        subTitle={"Stock Management"}
        linkPath={!isChangesOccured && "/alt/admin/stock"}
        selectButton={"/alt/admin/stock"}
        drawerIcon={stockManagementSvg} // Use an appropriate icon
        nestedPadding={"0.5rem 0.5rem 0.5rem 2.25rem"}
      />
    </Grid>
  );



  const loggedInUserDetail = localStorage.getItem('userDetail');
  const isUserAdminPerson = useMemo(() => {
    let isLoggedInUserAdmin = true
    try {
      let loggedInUserPersonType = loggedInUserDetail && JSON.parse(loggedInUserDetail)?.personType;
      if (loggedInUserPersonType !== 6) {
        isLoggedInUserAdmin = false;
      }
    } catch (err) { }
    return isLoggedInUserAdmin
  }, [loggedInUserDetail])

  return (
    <>

      <ConfirmationModal
        classes={commonclasses}
        isConfirmationModal={changesConfirmationModal}
        closeConfirmationAction={() => {
          setChangesConfirmationModal(false);
        }}
        modalConfirmAction={() => {
          // dispatch(changesCheckAction(false));
          setIsModalSucceed(true);
          setChangesConfirmationModal(false);
          setTimeout(() => setIsModalSucceed(false), 50);
        }}
        confirmationModalHeader="Move to Another Page"
        confirmationModalContent="Are you sure want to leave this page?"
        noBtnId="redirectCancel"
        yesBtnId="redirectPage"
      />

      <ConfirmationModal
        classes={commonclasses}
        isConfirmationModal={isLogoutModal}
        closeConfirmationAction={cancelModalButtonClickAction}
        modalConfirmAction={logoutModalButtonClickAction}
        confirmationModalHeader={getLabel({ module: "auth", label: "confirmLogout" })}
        confirmationModalContent={getLabel({ module: "auth", label: "areYouSureYouWantToLogout" }) + " ?"}
        yesWord={getLabel({ module: "auth", label: "yes" })}
        noWord={getLabel({ module: "auth", label: "cancel" })}
        noBtnId="cancel"
        yesBtnId="logout"
      />

      <ConfirmationModal
        classes={commonclasses}
        isConfirmationModal={isCashierCloseSession}
        closeConfirmationAction={() => setIsCashierCloseSession(false)}
        modalConfirmAction={logoutModalButtonClickAction}
        confirmationModalHeader={getLabel({ module: "auth", label: "confirmLogout" })}
        confirmationModalContent={getLabel({ module: "auth", label: "cashierLogoutConfirmation" })}
        yesWord={getLabel({ module: "auth", label: "yes" })}
        noWord={getLabel({ module: "auth", label: "cancel" })}
        noBtnId="cancel"
        yesBtnId="logout"
      />

      <div className={classes.mainRoot}>
        {isLogout && <Navigate to="/" />}
        {isModalSucceed && <Navigate to={clickedLink} />}
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={(theme) => ({
            backgroundColor: "#fff",
            zIndex: !open ? theme.zIndex.drawer + 1 : theme.zIndex.drawer + 100,
          })}
          className={clsx(classes.appBarDrawer, {
            [classes.appBarShiftDrawer]: open && matches,
          })}
        >

          <Toolbar>
            <Hidden smUp implementation="css">
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: false,
                })}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Grid container alignItems="center">
              <Grid item xs={3}>
                {/* {logoSvgAppBar} */}
                <div>
                  <img
                    src={require("../../../assets/image/altLogo.png")}
                    className="innoHealth-logo-colored" alt="exotic logo"
                    style={{ height: '40px', width: '100px' }}
                  />
                </div>
              </Grid>
              <Grid
                item
                container
                justifyContent="flex-end"
                alignItems="center"
                //  xs={!matches ? 12 : 9}
                xs={9}
                spacing={3}
              >
                {matches2 && (
                  <Grid
                    item
                    className={commonclasses.clickableBlock}
                    aria-describedby={profileCardIDPopover}
                    onClick={handleClickProfileCard}
                  >
                    <Avatar
                      className={classes.appBarProfileImg}
                      src={
                        userProfilePicture
                          ? userProfilePicture
                          : userDetail.gender === "Male"
                            ? femaleAvatar
                            : maleAvatar
                      }
                    />
                  </Grid>
                )}
                {matches2 && (
                  <Grid item>
                    <Typography className={classes.appBarProfileName}>

                      {JSON.parse(localStorage.getItem("userDetail")) && JSON.parse(localStorage.getItem("userDetail")).username}
                      {userDetail.firstNameEn &&
                        userDetail.familyNameEn &&
                        userDetail.firstNameEn + " " + userDetail.familyNameEn}
                    </Typography>
                    <Typography className={classes.appBarProfileDesignation}>

                      {JSON.parse(localStorage.getItem("userDetail")) && JSON.parse(localStorage.getItem("userDetail")).personTypeName}
                    </Typography>
                  </Grid>
                )}

                <Grid
                  item
                  id="logout"
                  onClick={() => {
                    if (permissionValidator(5000)) {
                      setIsCashierCloseSession(true);
                    } else {
                      setIsLogoutModal(true);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {appBarLogOut}
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            className={clsx(permissionValidator(26) ? classes.drawerMainNested : classes.drawerMain, {
              [permissionValidator(26) ? classes.drawerOpenMainNested : classes.drawerOpenMain]: open,
              [classes.drawerCloseMain]: !open,
            })}
            classes={{
              paper: clsx({
                [permissionValidator(26) ? classes.drawerOpenMainNested : classes.drawerOpenMain]: open,
                [classes.drawerCloseMain]: !open,
              }),
            }}
            onMouseOver={handleDrawerOpen}
            onMouseLeave={handleDrawerClose}
          >
            <div className={classes.toolbarMain}></div>
            <Grid container justifyContent="flex-end">
              <div className={classes.openCloseDrawerArrow}>
                {open ? (
                  <div onClick={handleDrawerClose}>{closeArrow}</div>
                ) : (
                  <div onClick={handleDrawerOpen}>{openArrow}</div>
                )}
              </div>
            </Grid>

            <div style={{ marginTop: "1rem", overflowY: "auto" }}>
              {dashboardDrawerBtn}
              <PermissionChecker
                permission={1000}
              >
                {adminPageDrawerMenuBtn}
                <Collapse in={adminDrawerStates?.isAdminDrawerOpen} timeout={"auto"} unmountOnExit>

                  <PermissionChecker
                    permission={1001}
                  >
                    {supplierPageDrawerBtn}
                  </PermissionChecker>

                  <PermissionChecker
                    permission={1001}
                  >
                    {customerPageDrawerBtn}
                  </PermissionChecker>

                  <PermissionChecker
                    permission={1001}
                  >
                    {stockLocationDrawerBtn}
                  </PermissionChecker>


                </Collapse>
                {inventoryPageDrawerMenuBtn}
                <Collapse in={inventoryDrawerStates?.isInventoryDrawerOpen} timeout={"auto"} unmountOnExit>
                  <PermissionChecker
                    permission={1001}
                  >
                    {itemPageDrawerBtn}
                  </PermissionChecker>


                  <PermissionChecker permission={1001}>
                    {batchPageDrawerBtn}
                  </PermissionChecker>

                  <PermissionChecker permission={1001}>
                    {grnPageDrawerBtn}
                  </PermissionChecker>

                   <PermissionChecker permission={1001}>
                    {stockPageDrawerBtn}
                  </PermissionChecker>

                </Collapse>
              </PermissionChecker>

            </div>
          </Drawer>
        </Hidden>

        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              // paper: classes.drawerPaper,
              paper: classes.mobileDrawerMain,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div style={{ marginTop: "3rem" }}>
              {dashboardDrawerBtn}

              {/* <PermissionChecker
                permission={24}
              >
                {userMangDrawerBtn}
              </PermissionChecker> */}

              {(!!(userHospitals?.length > 1) && !(permissionValidator(56) || permissionValidator(57)) && !isUserAdminPerson) && hospitalDeciderDrawerBtn}
            </div>
          </Drawer>
        </Hidden>

        <main
          className={clsx(classes.contentMain, {
            [classes.contentShiftMain]: open,
          })}
        >
          <div className={classes.drawerHeaderMain} />
          <div className={classes.mainContainer}>{/* {props.children} */}</div>
        </main>
      </div>
    </>
  );
};

export default Main;
