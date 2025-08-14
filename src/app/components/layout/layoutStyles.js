import { makeStyles } from '@mui/styles';


// drawer width
const drawerWidth = 240;




export const layoutStyles = makeStyles((theme) => ({
    
    

    mainRoot: {
        display: "flex",
    },
    appBarDrawer: {
        
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShiftDrawer: {
        // marginLeft: drawerWidth,
        // width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
        color: "#000",
    },
    appBarIcons: {
        color: "#000",
    },


    hide: {
        display: "none",
    },
    drawerMain: {
        backgroundColor: theme.palette.brandPrimary.dark,
        width: drawerWidth,
        flexShrink: 0,
        overflowY: "visible",
    },
    drawerOpenMain: {
        backgroundColor: theme.palette.brandPrimary.dark,
        width: drawerWidth,
        overflowY: "visible",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerCloseMain: {
        backgroundColor: theme.palette.brandPrimary.dark,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowY: "visible",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbarMain: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: "1rem",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    contentMain: {
        flexGrow: 1,
        backgroundColor: theme.palette.otherColors.dark,
        padding: theme.spacing(1),
    },
    contentShiftMain: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    drawerHeaderMain: {
        display: 'flex',
        alignItems: 'center',
        // padding: ,
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },

    //Mobile drawer
    mobileDrawerMain: {
        width: drawerWidth,
        backgroundColor: theme.palette.brandPrimary.dark,
    },
    openCloseDrawerArrow: {
        marginRight: "-15px",
    },



    listItem: {
        width: "90%",
        borderRadius: "0px 5px 5px 0px",
        color: theme.palette.textColor.main,
        backgroundColor: theme.palette.brandPrimary.dark,
        "&:hover": {
            backgroundColor: theme.palette.brandPrimary.dark,
            color: theme.palette.textColor.main,
        },
    },
    closedListItemActive: {
        display: "flex",
        borderRadius: "0px 5px 5px 0px",
        color: theme.palette.textColor.main,
        width: "3rem",
        justifyContent: "center",
        backgroundColor: theme.palette.primary.dark,
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    closedListItem: {
        display: "flex",
        borderRadius: "0px 5px 5px 0px",
        color: theme.palette.textColor.main,
        width: "3rem",
        justifyContent: "center",
        backgroundColor: theme.palette.brandPrimary.dark,
        "&:hover": {
            backgroundColor: theme.palette.brandPrimary.dark,
        },
    },
    activeListItem: {
        borderRadius: "0px 5px 5px 0px",
        width: "90%",
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.textColor.main,
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.textColor.main,
        },
    },
    listItemCloseIcon: {
        marginRight: "0rem",
        color: theme.palette.textColor.main,
    },
    listItemText: {
        fontWeight: 400,
        fontSize: theme.typography.fontSize,
        fontFamily: theme.typography.fontFamily,
        marginLeft: "2rem"
    },

    appBarProfileImg:{
        height: "3rem",
        width: "3rem",
    },

    appBarProfileName: {
        fontWeight: "bold",
        fontSize: theme.typography.fontSize,
        color: theme.palette.brandPrimary.dark,
        textTransform: "capitalize",
    },
    appBarProfileDesignation: {
        fontWeight: "normal",
        fontSize: theme.typography.smallFontSize,
        color: theme.palette.otherColors.liter,
    },

    languageApptopBar: {
        color: "green",
        margin: "0rem 0.5rem"
    },

    appBarLocalization: {
        fontSize: "2rem",
        margin: "0rem 0rem 0rem 1rem",
    },

    popoverBtn: {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    expandListItemText:{
        fontWeight: "normal",
        fontSize: theme.typography.fontSize,
        fontFamily: theme.typography.fontFamily,
        overflow:"hidden"
    },
    expandListItem: {
        width: "100%" ,
        display: "flex",
        borderRadius: "0px 5px 5px 0px",
        color: theme.palette.textColor.main,
        justifyContent: "flex-start",
        backgroundColor: theme.palette.brandPrimary.dark,
        "&:hover": {
            backgroundColor: theme.palette.brandPrimary.dark,
        },
        overflow: "hidden"
    },
    drawerMainNested: {
        backgroundColor: theme.palette.brandPrimary.dark,
        width: "20rem",
        flexShrink: 0,
        overflowY: "visible",
    },
    drawerOpenMainNested: {
        backgroundColor: theme.palette.brandPrimary.dark,
        width: "20rem",
        overflowY: "visible",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerMenuRightIcon: {
        overflow: "hidden", 
        margin: "0 0.25rem"
    },
    firstLvlExpandedDrawerMenu:{
        padding: "0.5rem 1rem 0.5rem 1.5rem"
    },
    secondLvlExpandedDrawerMenu:{
        padding: "0.5rem 1rem 0.5rem 2.25rem"
    },
    thirdLvlExpandedDrawerMenu:{
        padding: "0.5rem 1rem 0.5rem 3.25rem"
    },
    fourthLvlExpandedDrawerMenu:{
        padding: "0.5rem 1rem 0.5rem 4.25rem"
    },
    drawerMenuListItemWrapper: {
        marginTop: "1rem", 
        overflow:"hidden" 
    },
    drawerMenuItem:{
        marginTop: "1rem",  
    }
}));

