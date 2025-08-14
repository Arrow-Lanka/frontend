import { makeStyles } from "@material-ui/core/styles";

export const DashboardStyles = makeStyles((theme) => ({
    dashboardContainer: {
        marginRight: "1rem",
        marginLeft: "5.563rem",
        [theme.breakpoints.down("xs")]:{
            marginLeft:"1rem"
        },
    },
    clickedWidget:{
        backgroundColor: theme.palette.grey.tooLiter,
        border: `2px solid red`,
        borderRadius:"5px"
    },
    mainCardWarpper: {
        borderRadius:"5px"
    },
    cardWarpper: {
        padding: '0.5rem 1rem 0.35rem 1rem !important',
        cursor: "pointer",
        height: "100%"
    },
    subCardGridWrapper : {
        display:"flex", 
        justifyContent:"center"
    },
    widgetTitle: {
        fontFamily:"Roboto",
        fontWeight:'400',
        fontSize:"20px",
        color:"#5E5E5E"
    },
    widgetDescription: {
        fontFamily:"Roboto", 
        fontWeight:'400',
        fontSize:"12px", 
        color:"#BFBFBF"
    },
    tableContainer:{
        marginTop: "20px"
    },
    tableColumn: {
        position: "sticky",
        top: 0,
        backgroundColor: theme.palette.brandPrimary.contrastText,
    },
    tableColumnBlock: {
        position: "sticky",
        right: 0,
        backgroundColor: theme.palette.brandPrimary.contrastText,
        padding: "11px 16px",
        boxShadow: "0px 4px 4px 0px #999",
        zIndex: 1,
        width: "20%",
        borderLeft: "2px solid",
        borderColor: "#E2E2E2",
      },
      tableIcons:{
        cursor: "pointer"
      },
      actionBlock: {
        position: "sticky",
        right: 0,
        backgroundColor: theme.palette.brandPrimary.contrastText,
        padding: "11px 16px",
        boxShadow: "0px 4px 4px 0px #999",
        zIndex: 1,
        width: "20%",
        borderLeft: "2px solid",
        borderColor: "#E2E2E2",
      },
      searchSection: {
        // height: '3rem'
    },
    containerSpacing: {
        padding: "1rem",
      },
      outLineBtnText: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: theme.typography.fontSize,
        margin: theme.customSpacing.padding.padding2,
        //need color
        color: "white",
      },
      FilterBtn: {
        color: theme.palette.brandPrimary.dark,
        padding: "6px",
        height: " 40px",
        margin: "0.5rem 0  0.625rem 0.9375rem",
        textTransform: "none",
        outline: "none",
        textDecoration: "none",
        border: "2px solid #E1E7F3",
        borderRadius: theme.buttons.borderRadius,
        backgroundColor: "#3ECC77",
        boxShadow: "none !important",
        background: theme.palette.background.textField,
        "&:focus": {
          outline: "none !important",
        },
        "&:hover": {
          backgroundColor: "#3ECC77",
        },
      },
      nonClinicalRegHeaderFilterBtn: {
        margin: `0 0 ${theme.customSpacing.padding.padding2}px`,
        minWidth: "10rem"
      },
      badgeContent: {
        color: "white !important",
        backgroundColor: "red !important",
        width: "25px !important",
        height: "25px !important"
      },
      notificationTypo: {
        fontFamily: "Roboto",
        fontWeight: 500,
        fontSize : "20x",
        fontSize:"18px", 
        display:"flex", 
        justifyContent:"flex-end"
      },
      borderBottom: {
        borderBottom: '1px solid #E1E1E1',
        display:"flex", 
        justifyContent:"space-around", 
        alignItems:"center", padding:"20px", 
        height:"fit-content", 
        borderBottom:"1px solid #E1E1E1"
    },
    fileSize: {
      fontFamily:"Roboto",
      fontWeight:300,
      fontSize:"2px",
      color:"#535353"
    },
    fileName:{
      fontFamily: "Roboto",
      fontSize: "10px",
      fontWeight: 500,
      lineHeight: "11.72px",
      textAlign: "left"
    },
    descrptionContainer: {
      display:"flex",
      margin: "revert-layer",
      paddingLeft: "72px"  
    },
    badgeContainer: {
      "& .MuiBadge-anchorOriginBottomRightCircular": {
        height:"28px",
        width: "28px"
      }
    },
    tableRedChip: {
      padding: "0.3rem 1rem 0.3rem 1rem",
      fontSize: theme.typography.fontSize13,
      color: theme.palette.tagColorsFont.main,
      lineHeight: 1.5,
      backgroundColor: theme.palette.tagColorsBg.main,
      whiteSpace: 'nowrap',
      borderRadius: '1rem',
      display: "flex",
      alignItems: "center",
      minWidth: "5rem",        
      maxWidth: "6rem",
      justifyContent: "center"
  },
  tableGreenChip: {
      fontWeight:theme.typography.fontWeight.weight4,
      fontSize: theme.typography.smallFontSize,
      color: theme.palette.tagColorsFont.tooLiter,
      display: "flex",
      alignItems: "center",
      backgroundColor: theme.palette.tagColorsBg.tooLiter,
      lineHeight: 1.5,
      padding: "0.3rem 1rem 0.3rem 1rem",
      borderRadius: "1rem",
      minWidth: "5rem",        
      maxWidth: "6rem",
      justifyContent: "center"
  },
  searchBarContainer: {
    padding: "1rem",
  },
  clientMainContainer : {
    backgroundColor:"white", 
    marginTop:"12px", 
    // height: "755px",
    marginRight:"12px", 
    padding:"5px"
  },
  headerTypo : {
    fontFamily:"Roboto", 
    fontSize:"22px", 
    fontWeight:400, 
    color:"#5E5E5E", 
    padding:"15px", 
    alignItems:"center"
  },
  searchBoxContainer : {
    display:"flex", 
    justifyContent:"space-between"
  },
  mainContentContainer : {
    backgroundColor:"#FFFFFF", 
    display:"flex",
  },
  reminderGridWrapper : {
    marginTop:"-70px",
    width:"100%"
  },
  donutGridWrapper : {
    backgroundColor:"#FFFFFF", 
    display:"flex", 
    justifyContent:"center", 
    alignItems:"center"
  }

}));
