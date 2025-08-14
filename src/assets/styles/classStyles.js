import { makeStyles } from "@material-ui/core/styles";

export const useStyles = (theme) => ({
  /**
    |--------------------------------------------------
    | New styles
    |--------------------------------------------------
    */
  mainDev: {
    margin: "0.5rem 0rem 0rem 5rem",
  },
  mainContainer: {
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.primary.tooLiter,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
    // padding: theme.spacing(2),
    //minHeight: "30rem",
  },
  contentDev: {
    backgroundColor: theme.palette.primary.tooLiter,
    padding: theme.spacing(2),
    minHeight: "28rem",
  },
  titleDev: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  wizardDiv: {
    backgroundColor: theme.palette.background.paper,
  },
  wizardIconCon: {
    width: "95%",
    overflow: "scroll",
  },
  popupPaper: {
    backgroundColor: theme.palette.primary.tooLiter,
  },

  primaryIcon: {
    fontSize: theme.typography.h3.fontSize,
    color: theme.palette.brandPrimary.dark,
  },
  titleTypo: {
    fontSize: theme.typography.h5.fontSize,
    margin: "0rem 1rem",
  },

  iconBtnPrimary: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.peacockBlue.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
    textTransform: "none",
    outline: "none",
    marginRight: "0.9rem",
    "&:hover": {
      backgroundColor: theme.palette.peacockBlue.dark,
    },
  },
  btnIconPrimary: {
    color: theme.palette.common.white,
  },
  addIcon: {
    fontSize: "1.5rem",
    color: theme.palette.primary.dark,
    borderRadius: "0.5rem",
    marginLeft: "1rem",
    marginTop: "0.5rem",
    cursor: "pointer",
  },
  deleteIcon: {
    fontSize: "1.5rem",
    color: theme.palette.reds.dark,
    borderRadius: "0.5rem",
    marginLeft: "1rem",
    marginTop: "0.5rem",
    cursor: "pointer",
  },
  summaryDev: {
    backgroundColor: theme.palette.background.paper,
    margin: "0rem 1rem",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    overflow: "scroll",
  },
  primaryIconMain: {
    fontSize: theme.typography.h5,
    color: theme.palette.brandPrimary.main,
    marginRight: theme.spacing(1),
  },
  secondaryIconMin: {
    fontSize: theme.typography.fontSize,
    color: theme.palette.primary.light,
    marginRight: theme.spacing(1),
  },
  primaryTitle: {
    color: theme.palette.primary.dark,
    fontSize: theme.typography.h6,
  },
  summaryTitleDev: {
    marginTop: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.primary.liter}`,
  },
  anonymousName: {
    fontSize: theme.typography.fontSize,
    color: theme.palette.primary.dark,
  },
  primaryChip: {
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.primary.tooLiter,
    height: "1.6rem",
    padding: "0.3rem 0rem 0.3rem 0.4rem",
    borderRadius: "15px",
    width: "8rem",
    margin: "0.2rem",
  },
  primaryChipIcon: {
    fontSize: "1.1rem",
    marginRight: "0.5rem",
    color: theme.palette.primary.dark,
  },
  primaryChipText: {
    fontSize: theme.typography.fontSize,
    marginRight: "0.5rem",
    color: theme.palette.primary.dark,
  },
  greenChip: {
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.green.tooLiter,
    height: "1.6rem",
    padding: "0.3rem 0rem 0.3rem 0.4rem",
    borderRadius: "15px",
    width: "8rem",
    margin: "0.2rem",
  },
  outlineChip: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `2px solid ${theme.palette.reds.dark}`,
    // backgroundColor: theme.palette.green.tooLiter,
    height: "1.6rem",
    padding: "0.3rem 0rem ",
    borderRadius: "15px",
    width: "5rem",
    margin: "0.2rem",
  },
  outlineChipText: {
    fontSize: theme.typography.fontSize,
    color: theme.palette.reds.dark,
  },
  greenChipIcon: {
    fontSize: "1.1rem",
    marginRight: "0.5rem",
    color: theme.palette.green.dark,
  },
  greyIcon: {
    backgroundColor: theme.palette.grey.liter,
    display: "flex",
    alignItems: "center",
    padding: "0.3rem",
    margin: "0.3rem",
    height: "1.5rem",
    borderRadius: "0.2rem",
    cursor: "pointer",
  },
  greenChipText: {
    fontSize: theme.typography.fontSize,
    marginRight: "0.5rem",
    color: theme.palette.green.dark,
  },
  secondaryTextMin: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: theme.typography.fontSize,
    color: theme.palette.grey.liter,
  },
  secondaryTextDark: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: theme.typography.fontSize,
    color: "#364457",
  },
  tableMainIcon: {
    color: theme.palette.brandPrimary.dark,
    fontSize: theme.typography.h2.fontSize,
  },
  tableTitle: {
    color: theme.palette.brandPrimary.dark,
    fontSize: theme.typography.h4.fontSize,
  },
  loadingScreen: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  /**
    |--------------------------------------------------
    | Contained Buttons Classes   
    |--------------------------------------------------
    */
  mediumPrimaryBtn: {
    width: theme.buttons.width.medium,
    backgroundColor: theme.palette.brandPrimary.dark,
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.brandPrimary.dark,
    },
    "&:focus": {
      outline: "none !important",
    },
  },
  largePrimaryBtn: {
    width: theme.buttons.width.large,
    backgroundColor: theme.palette.brandPrimary.dark,
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.brandPrimary.dark,
    },
    "&:focus": {
      outline: "none !important",
    },
  },

  mediumSecondaryBtn: {
    width: theme.buttons.width.medium,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "&:focus": {
      outline: "none !important",
    },
  },

  largeSecondaryBtn: {
    backgroundColor: theme.palette.primary.dark,
    width: theme.buttons.width.large,
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "&:focus": {
      outline: "none !important",
    },
  },

  mediumSaveBtn: {
    width: theme.buttons.width.medium,
    backgroundColor: theme.palette.peacockBlue.dark,
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.peacockBlue.dark,
    },
    "&:focus": {
      outline: "none !important",
    },
  },

  largeSaveBtn: {
    width: theme.buttons.width.large,
    backgroundColor: theme.palette.peacockBlue.dark,
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.peacockBlue.dark,
    },
    "&:focus": {
      outline: "none !important",
    },
  },

  addPrintBtn: {
    width: theme.buttons.width.medium,
    backgroundColor: theme.palette.reds.main,
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.reds.main,
    },
    "&:focus": {
      outline: "none !important",
    },
  },

  largeAddPrintBtn: {
    width: theme.buttons.width.large,
    backgroundColor: theme.palette.reds.main,
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.reds.main,
    },
    "&:focus": {
      outline: "none !important",
    },
  },

  mediumAddBtn: {
    width: theme.buttons.width.medium,
    backgroundColor: theme.palette.green.dark,
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.green.dark,
    },
    "&:focus": {
      outline: "none !important",
    },
  },
  largeAddBtn: {
    width: theme.buttons.width.large,
    backgroundColor: theme.palette.green.dark,
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.green.dark,
    },
    "&:focus": {
      outline: "none !important",
    },
  },
  // not color in style
  mediumCancelBtn: {
    width: theme.buttons.width.medium,
    backgroundColor: theme.palette.grey.liter,
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.grey.liter,
    },
    "&:focus": {
      outline: "none !important",
    },
  },

  // not color in style
  mediumAdvanceBtn: {
    width: theme.buttons.width.medium,
    backgroundColor: theme.palette.peacockBlue.main,
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.peacockBlue.main,
    },
    "&:focus": {
      outline: "none !important",
    },
  },

  /**
   |--------------------------------------------------
   | outlined Buttons Classes   
   |--------------------------------------------------
   */

  outlineMediumPrimary: {
    width: theme.buttons.width.medium,
    color: theme.palette.brandPrimary.dark,
    height: theme.buttons.height.medium,
    border: `1px solid ${theme.palette.brandPrimary.dark}`,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.brandPrimary.dark,
    },
    "&:focus": {
      outline: "none !important",
    },
  },

  outlineMediumSecondary: {
    width: theme.buttons.width.medium,
    color: theme.palette.primary.dark,
    height: theme.buttons.height.medium,
    border: `1px solid ${theme.palette.primary.dark}`,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
    "&:focus": {
      outline: "none !important",
    },
  },

  outlineMediumSave: {
    width: theme.buttons.width.medium,
    color: theme.palette.peacockBlue.dark,
    height: theme.buttons.height.medium,
    border: `1px solid ${theme.palette.peacockBlue.dark}`,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.peacockBlue.dark,
    },
    "&:focus": {
      outline: "none !important",
    },
  },

  outlineMediumAdd: {
    width: theme.buttons.width.medium,
    color: theme.palette.green.dark,
    height: theme.buttons.height.medium,
    border: `1px solid ${theme.palette.green.dark}`,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.green.dark,
    },
    "&:focus": {
      outline: "none !important",
    },
  },

  /**
    |--------------------------------------------------
    | Appointment scheduling styles
    |--------------------------------------------------
    */

  appSchedulingPatientGrid: {
    width: "100%",
    margin: "25px 43px 0 0",
    padding: "20px",
  },

  /**
    |--------------------------------------------------
    | Old styles don't use
    |--------------------------------------------------
    */
  submitBtn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    outline: "none",
    margin: "1rem",
    textDecoration: "none",
    padding: "0.5rem 2rem",
    height: "2.3rem",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  btnSuccess: {
    backgroundColor: "red",
  },
  divider: {
    margin: "0.5rem 1rem 1rem 0rem",
  },
  btnContainer: {
    backgroundColor: "#6e80c4",
    margin: "1rem",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#6e80c4",
    },
  },
  btnOutline: {
    border: "1px solid #6e80c4",
    color: "#6e80c4",
    margin: "1rem",
  },
  mediumTitle: {
    margin: "0.5rem -1rem -1rem 1rem",
    fontWeight: "500",
    color: "#5C5C5C",
  },
  modelHeader: {
    background: theme.palette.brandPrimary.dark,
    color: "#fff",
    // borderBottom: "2px solid #000",
    "&:hover": {
      color: "#fff",
    },
  },
  mainContainerGrid: {
    width: "100%",
    display: "grid",
    gridGap: "10px",
    marginTop: "2rem",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "auto ",
    },
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "auto auto",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "auto auto auto auto ",
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "19% 19% 19% 19% 19%",
    },
  },

  gridSubContainer: {
    backgroundColor: "#F4F9FF",
    borderRadius: "0.5rem",
    padding: "0.5rem",
    gridColumnStart: 3,
    gridColumnEnd: 5,
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridGap: "5px",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "auto ",
      gridColumnStart: 1,
      gridColumnEnd: 3,
    },
  },
  hijriDatePicker: {
    backgroundColor: "#fff",
    padding: "0.3rem",
    outline: "none",
    border: "none",
    borderBottom: "1px solid #000",
  },
  tabStyle: {
    color: "#2659B6",
  },
  errorTab: {
    background: "linear-gradient(to right, #ff416c, #ff4b2b)",
    color: "#fff",
  },

  summaryWhitContainer: {
    backgroundColor: "#FFF",
    padding: "0.3rem",
    borderRadius: "0.2rem",
  },
  mainButton: {
    backgroundColor: "#2659B6",
    color: "#fff",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "#2659B6",
      color: "#fff",
    },
  },

  outlineBtn: {
    color: "#2659B6",
    border: "1px solid #2659B6",
    outline: "none",
    marginRight: "0.9rem",
    "&:hover": {
      color: "#2659B6",
    },
  },
  conformationContentText: {
    color: "#000",
  },
  textType3: {
    fontSize: "12px",
    //  color:"#364457"
  },
  textType4: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "15px",
    color: "#364457",
  },
  textType5: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    color: "#8D95A2",
  },
  textType6: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    color: "#364457",
  },
  textType7: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    color: "#FF2E00",
  },
  dialogCloseBtn: {
    float: "right",
    marginTop: "0.5rem",
    cursor: "pointer",
  },
  dialogSaveBtn: {
    color: "#2659B6",
    border: "1px solid #2659B6",
    outline: "none",
    marginRight: "0.9rem",
  },
  tableListItemIcon: {
    margin: "10px 10px 10px 10px",
  },

  addNewDetailsIcon: {
    border: "1px solid #28a745",
    height: "2.3rem",
    width: "2.3rem",
    color: "#28a745",
    borderRadius: "0.5rem",
    marginLeft: "0.2rem",
    cursor: "pointer",
  },
  removeDetailsIcon: {
    border: "1px solid #CACFD2 ",
    height: "2.3rem",
    width: "2.3rem",
    color: "#CACFD2 ",
    borderRadius: "0.5rem",
    marginLeft: "1rem",
    cursor: "pointer",
  },
  registraionSubContainer: {
    backgroundColor: "#F9FCFF",
  },

  FilterBtn: {
    color: theme.palette.brandPrimary.dark,
    padding: "6px 23px",
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    border: "2px solid #E1E7F3",
    borderRadius: theme.buttons.borderRadius,
    backgroundColor: "white !important",
    boxShadow: "none !important",
    "&:focus": {
      outline: "none !important",
    },
  },

  tableHeaderStyle: {
    color: theme.palette.brandPrimary.dark,
    padding: "10px",
    borderBottom: "1px solid #E1E7F3",
    position: "sticky",
    top: "0",
    backgroundColor: theme.palette.primary.contrastText,
    zIndex: "1000",
  },

  tableCell: {
    padding: "10px",
    color: theme.palette.grey.light,
    borderBottom: "1px solid #E1E7F3",
  },

  iconStyle: {
    marginRight: "8px",
  },

  tableIcon: {
    cursor: "pointer",
  },

  twoLineTextFieldsClass: {
    fontWeight: theme.typography.fontWeight.weight2,
  },

  maleName: {
    color: theme.palette.genderColor.maleColor,
    fontWeight: theme.typography.fontWeight.weight5,
    fontSize: "14px",
  },

  femaleName: {
    color: theme.palette.genderColor.femaleColor,
    fontWeight: theme.typography.fontWeight.weight5,
    fontSize: "14px",
  },

  unknownName: {
    color: theme.palette.grey.dark,
    fontWeight: theme.typography.fontWeight.weight5,
    fontSize: "14px",
  },

  femaleChip: {
    color: theme.palette.genderColor.femaleColor,
    fontWeight: theme.typography.fontWeight.weight3,
    backgroundColor: theme.palette.genderColor.femaleBg,
    fontSize: "14px",
  },

  maleChip: {
    color: theme.palette.genderColor.maleColor,
    fontWeight: theme.typography.fontWeight.weight3,
    backgroundColor: theme.palette.genderColor.maleBg,
    fontSize: "14px",
  },

  tabCamelCase: {
    textTransform: "none"
  },
  clickableBlock: {
    cursor: "pointer"
  },
  smallSpace: {
    marginRight:"2px"
  },
});
