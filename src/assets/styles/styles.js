import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  /**
    |--------------------------------------------------
    | New styles
    |--------------------------------------------------
  */

  mainDev: {
    margin: "0.5rem 0rem 0rem 5.8rem",
  },

  mainWrapper: {
    margin: "0.5rem 1rem 0rem 5.8rem",
  },

  removemargin: {
    margin: "0 !important",
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
  containerSpacing: {
    padding: "1rem",
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
    paddingRight: "0.2rem",
    cursor: "pointer"
  },
  titleTypo: {
    fontSize: theme.typography.h5.fontSize,
    margin: "0rem 1rem",
    fontWeight: "700 !important",
    color: theme.palette.brandPrimary.dark,
  },
  titleTypo2: {
    fontSize: theme.typography.h5.fontSize,
    margin: "1.25rem 0 0rem 0rem",
    fontWeight: "700 !important",
    color: theme.palette.brandPrimary.dark,
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
  eraseIcon: {
    fontSize: "1.5rem",
    color: theme.palette.reds.dark,
    borderRadius: "0.5rem",
    cursor: "pointer",
    width: "1.5rem",
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
    color: theme.palette.brandPrimary.dark,
    fontSize: theme.typography.h6,
    fontWeight: "400 !important",
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
  yellowChip: {
    padding: "2px 10px",
    fontSize: 13,
    color: theme.palette.goldenYellow.main,
    lineHeight: 1.5,
    backgroundColor: theme.palette.goldenYellow.liter,
    borderRadius: 16,
    whiteSpace: "nowrap",
  },
  darkRedChip: {
    padding: "4px 15px 2px",
    fontSize: 13,
    color: theme.palette.reds.dark,
    lineHeight: 1.5,
    backgroundColor: "rgba(244, 5, 5, 0.15)",
    borderRadius: 16,
    whiteSpace: "nowrap",
  },
  blueChip: {
    padding: '2px 15px',
    fontSize: 13,
    color: theme.palette.blueChip.dark,
    lineHeight: 1.5,
    backgroundColor: theme.palette.blueChip.tooLiter,
    borderRadius: 16,
    whiteSpace: 'nowrap',
    width: 'max-content',
    fontWeight: theme.typography.fontWeight.weight4
  },
  redChip: {
    padding: "0.25rem 0.938rem 0.125rem",
    fontSize: 13,
    color: theme.palette.reds.main,
    lineHeight: 1.5,
    backgroundColor: theme.palette.reds.tooLiter,
    borderRadius: 16,
    whiteSpace: "nowrap",
  },
  outlineChip: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "1.6rem",
    padding: "0.3rem 0rem ",
    borderRadius: "15px",
    width: "5rem",
    margin: "0.2rem",
  },
  outlineChipVVIP: {
    border: `2px solid ${theme.palette.reds.dark}`,
  },
  outlineChipVIP: {
    border: `2px solid ${theme.palette.primary.dark}`,
  },
  outlineChipNORMAL: {
    border: `2px solid ${theme.palette.darkGreen.dark}`,
  },
  outlineChipText: {
    fontSize: theme.typography.fontSize,
  },
  outlineChipTextVVIP: {
    color: theme.palette.reds.dark,
  },
  outlineChipTextVIP: {
    color: theme.palette.primary.dark,
  },
  outlineChipTextNORMAL: {
    color: theme.palette.darkGreen.dark,
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
    margin: "0.2rem",
    height: "1.5rem",
    borderRadius: "0.2rem",
    cursor: "pointer",
  },
  greenChipText: {
    fontSize: theme.typography.fontSize,
    marginRight: "0.5rem",
    color: theme.palette.green.dark,
  },
  bigBorderBtn: {
    height: "100%",
    width: theme.buttons.width.medium,
    backgroundColor: theme.palette.common.white,
    border: `2px solid ${theme.palette.primary.lighter}`,
    borderRadius: 5,
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
  },
  secondaryTextMin: {
    fontStyle: "normal",
    fontWeight: "400 !important",
    fontSize: theme.typography.fontSize,
    color: theme.palette.lightGrays.main,
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
  smallPrimaryBtn: {
    width: theme.buttons.width.small,
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
  mediumPrimaryBtn: {
    borderRadius: theme.buttons.borderRadius,
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
    cursor: "pointer"
  },
  largeBlueBtn: {
    borderRadius: theme.buttons.borderRadius,
    width: theme.buttons.width.large,
    backgroundColor: "#2E3192",
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
    cursor: "pointer"
  },
  mediumBluePrintBtn: {
    borderRadius: theme.buttons.borderRadius,
    width: theme.buttons.width.medium,
    backgroundColor: theme.palette.orange.main,
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.orange.main,
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

  smallSecondaryBtn: {
    width: theme.buttons.width.small,
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

  smallPrimaryLightBtn:{
    width: theme.buttons.width.small,
    backgroundColor: theme.palette.primary.lighter,
    color: theme.palette.otherColors.main,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.lighter,
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
    [theme.breakpoints.down('md')]: {
      width: "auto"
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
  smallSaveBtn: {
    width: theme.buttons.width.small,
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
  smallPrintBtn: {
    width: theme.buttons.width.small,
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
  smallAddBtn: {
    width: theme.buttons.width.small,
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
  mediumRegisBtn: {
    width: "215px",
    backgroundColor: theme.palette.peacockBlue.dark,
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: "10px 0",
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
  mediumLightCancelBtn: {
    width: theme.buttons.width.medium,
    backgroundColor: theme.palette.otherColors.dark,
    color: theme.palette.grey.light,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.otherColors.dark,
    },
    "&:focus": {
      outline: "none !important",
    },
  },

  mediumDisableBtn:{
    width: theme.buttons.width.medium,
    backgroundColor: theme.palette.disabledColors.bgColor,
    color: theme.palette.disabledColors.fontColor,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.otherColors.dark,
    },
    "&:focus": {
      outline: "none !important",
    },
    cursor:"default !important"
  },

  smallDisableBtn:{
    width: theme.buttons.width.small,
    backgroundColor: theme.palette.disabledColors.bgColor,
    color: theme.palette.disabledColors.fontColor,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.otherColors.dark,
    },
    "&:focus": {
      outline: "none !important",
    },
    cursor:"default !important"
  },

  blueChipMainBtn: {
    width: theme.buttons.width.medium,
    backgroundColor: theme.palette.blueChip.main,
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.blueChip.main,
    },
    "&:focus": {
      outline: "none !important",
    },
  },

  orangeMainBtn: {
    width: theme.buttons.width.medium,
    backgroundColor: theme.palette.orange.main,
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.orange.main,
    },
    "&:focus": {
      outline: "none !important",
    },
  },


  // not color in style
  smallCancelBtn: {
    width: theme.buttons.width.small,
    backgroundColor: theme.palette.lightGrays.light,
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.lightGrays.light,
    },
    "&:focus": {
      outline: "none !important",
    },
  },

  mediumCancelBtn: {
    width: theme.buttons.width.medium,
    backgroundColor: theme.palette.lightGrays.light,
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.lightGrays.light,
    },
    "&:focus": {
      outline: "none !important",
    },
  },
  mediumCancelWhiteBtn: {
    width: theme.buttons.width.medium,
    backgroundColor: theme.palette.grey.contrastText,
    color: theme.palette.lightGrays.main,
    border: `1px solid ${theme.palette.lightGrey.main}`,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.lightGrays.light,
    },
    "&:focus": {
      outline: "none !important",
    },
  },
  mediumCancelligthGreyBtn: {
    width: theme.buttons.width.medium,
    backgroundColor: theme.palette.grey.contrastText,
    color: theme.palette.lightGrey.main,
    border: `1px solid ${theme.palette.lightGrey.main}`,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.lightGrey.dark,
    },
    "&:focus": {
      outline: "none !important",
    },
  },
  largeCancelBtn: {
    width: theme.buttons.width.large,
    backgroundColor: theme.palette.lightGrays.light,
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.lightGrays.light,
    },
    "&:focus": {
      outline: "none !important",
    },
  },
  mediumSignBtn: {
    width: theme.buttons.width.medium,
    backgroundColor: "#0F52BA",
    color: theme.palette.common.white,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "#0F52BA",
    },
    "&:focus": {
      outline: "none !important",
    },
  },

  // not color in style
  smallAdvanceBtn: {
    width: theme.buttons.width.small,
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
  largeAdvanceBtn: {
    width: theme.buttons.width.large,
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

  // Headings
  h1: {
    fontSize: theme.typography.h1.fontSize,
    color: theme.palette.brandPrimary.dark,
  },
  h2: {
    fontSize: theme.typography.h2.fontSize,
    color: theme.palette.brandPrimary.dark,
  },
  h3: {
    fontSize: theme.typography.h3.fontSize,
    color: theme.palette.brandPrimary.dark,
  },
  h4: {
    fontSize: theme.typography.h4.fontSize,
    color: theme.palette.brandPrimary.dark,
  },
  h5: {
    fontSize: theme.typography.h5.fontSize,
    color: theme.palette.brandPrimary.dark,
  },
  h6: {
    fontSize: theme.typography.h6.fontSize,
    color: theme.palette.brandPrimary.dark,
  },

  // Text Colors
  textGrey: {
    color: `${theme.palette.grey.light} !important`,
    lineHeight: "14px",
  },

  textGreen: {
    color: theme.palette.peacockBlue.dark,
  },

  textPurple: {
    color: theme.palette.purple.lighter,
  },

  textRed: {
    color: theme.palette.reds.dark,
  },
  textBlue: {
    color: theme.palette.brandPrimary.dark,
  },

  textOrange: {
    color: theme.palette.orange.dark,
  },

  textDarkGreen: {
    color: theme.palette.green.dark,
  },

  textLightGreen: {
    color: theme.palette.green.light,
  },

  textPrimary: {
    color: theme.palette.primary.dark,
  },


  /**
     |--------------------------------------------------
     | outlined Buttons Classes
     |--------------------------------------------------
     */

    outlineSmallPrimary: {
      width: theme.buttons.width.small,
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
        outline: "none",
      },
    },

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
      outline: "none",
    },
  },

  outlineMediumSecondary: {
    width: theme.buttons.width.medium,
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.common.white,
    height: theme.buttons.height.medium,
    border: `1px solid ${theme.palette.primary.dark}`,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.common.white,
    },
    "&:focus": {
      outline: "none !important",
    },
    [theme.breakpoints.down('md')]: {
      width: "auto"
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
      outline: "none",
    },
  },

  outlineMediumLightBlue: {
    width: theme.buttons.width.medium,
    color: theme.palette.blue.light,
    height: theme.buttons.height.medium,
    border: `1px solid ${theme.palette.blue.light}`,
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.blue.light,
    },
    "&:focus": {
      outline: "none",
    },
    fontWeight: theme.typography.fontWeight.weight5
  },

  outlineMediumGrey: {
    width: theme.buttons.width.medium,
    color: theme.palette.grey.light,
    height: theme.buttons.height.medium,
    border: `1px solid ${theme.palette.grey.light}`,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
    "&:focus": {
      outline: "none",
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
      outline: "none",
    },
  },

  outlineFilterBtn: {
    width: theme.buttons.width.medium,
    color: theme.palette.brandPrimary.dark,
    height: theme.buttons.height.medium,
    border: `1px solid ${theme.palette.brandPrimary.liter}`,
    // margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.brandPrimary.dark,
    },
    background: theme.palette.background.textField,
    "&:focus": {
      outline: "none !important",
    },
  },

  outlineLightBorderFilterBtn: {
    width: theme.buttons.width.medium,
    color: theme.palette.brandPrimary.dark,
    height: theme.buttons.height.medium,
    border: `2px solid ${theme.palette.otherColors.dark}`,
    // margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.brandPrimary.dark,
    },
    background: theme.palette.background.textField,
    "&:focus": {
      outline: "none !important",
    },
  },

  outlineSmallGrey: {
    width: theme.buttons.width.small,
    color: theme.palette.grey.light,
    height: theme.buttons.height.medium,
    border: `1px solid ${theme.palette.grey.light}`,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
    "&:focus": {
      outline: "none",
    },
  },

  outlineSmallAddBtn: {
    width: theme.buttons.width.small,
    border: `1px solid ${theme.palette.green.dark}`,
    color: theme.palette.green.dark,
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

  outlineMediumAddBtn: {
    width: theme.buttons.width.medium,
    border: `1px solid ${theme.palette.green.dark}`,
    color: theme.palette.green.dark,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.green.light,
    },
    "&:focus": {
      outline: "none !important",
    },
  },

  outlineSmallUpdateBtn: {
    width: theme.buttons.width.small,
    border: `1px solid ${theme.palette.border.darkBlue}`,
    color: theme.palette.border.darkBlue,
    height: theme.buttons.height.medium,
    margin: theme.spacing(1),
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.border.lightBlue,
    },
    "&:focus": {
      outline: "none !important",
    },
  },

  /**
      |--------------------------------------------------
      | vitals styles
      |--------------------------------------------------
      */
  primaryTable: {
    backgroundColor: "#fff",
    padding: "0rem 1rem 0rem 1rem",
    margin: "2rem",
    border: `1px solid ${theme.palette.primary.liter}`,
  },
  vitalsFirstCol: {
    backgroundColor: theme.palette.darkGreen.tooLiter,
  },
  subMainTitle: {
    padding: "0.4rem 0.5rem",
    color: theme.palette.brandPrimary.dark,
    fontSize: theme.typography.fontSize,
  },
  vitalsName: {
    padding: "0.5rem 0.5rem",
    color: theme.palette.brandPrimary.dark,
    fontSize: theme.typography.fontSize,
  },
  subMainTextFirst: {
    borderBottom: `1px solid ${theme.palette.primary.liter}`,
    padding: "0.5rem 0.5rem",
    color: theme.palette.darkGreen.light,
    fontSize: theme.typography.fontSize,
  },
  vitalsValueGrid: {
    borderBottom: `1px solid ${theme.palette.primary.liter}`,
    minWidth: "10rem",
    "&:hover": {
      backgroundColor: theme.palette.darkGreen.tooLiter,
      color: theme.palette.reds.dark,
      boxShadow: `1px 2px ${theme.palette.darkGreen.tooLiter}`,
    },
  },
  vitalsValueText: {
    padding: "0.5rem 0.5rem",
    fontSize: theme.typography.fontSize,
  },
  vitalsNormal: {
    color: theme.palette.darkGreen.light,
    "&:hover": {
      color: theme.palette.darkGreen.dark,
      transform: "scale(1.2)",
    },
  },
  vitalsMax: {
    color: theme.palette.reds.main,
    "&:hover": {
      color: theme.palette.reds.dark,
      transform: "scale(1.2)",
    },
  },
  vitalsMin: {
    color: theme.palette.goldenYellow.dark,
    "&:hover": {
      color: theme.palette.goldenYellow.dark,
      transform: "scale(1.2)",
    },
  },
  NAValue: {
    padding: "0.5rem 0.5rem",
    color: theme.palette.grey.liter,
    fontSize: theme.typography.fontSize,
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
    marginTop: "1.5rem",
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
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#2659B6",
      color: "#fff",
    },
  },

  outlineBtn: {
    color: "#2659B6",
    border: "1px solid #2659B6",
    outline: "none",
    height: "2.25rem",
    // marginRight: "0.9rem",
    textTransform: "none",
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
    marginTop: "0.1rem",
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
  // diagnosis page related
  tabContent: {
    backgroundColor: "rgba(47, 137, 200, 0.04)",
    border: "1px solid rgba(47, 137, 200, 0.2)",
  },

  cardPrimary: {
    border: '1px solid rgba(150, 195, 227, 0.3)',
    borderRadius: 5,
    boxShadow: 'none',
  },

  SearchInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(28)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "35px",
    border: `1px solid ${theme.palette.primary.lighter}`,
    borderRadius: "5px",
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.up("md")]: {
      width: "60ch",
    },
  },

  searchBy: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.brandPrimary.dark,
    zIndex: "1",
  },

  searchFormControl: {
    position: "absolute",
    left: "50px",
    bottom: "0",
    width: "180px",
    zIndex: "1",
    borderRight: `1px solid ${theme.palette.primary.lighter}`,
  },

  noBorderSelect: {
    "&:before": {
      borderColor: theme.palette.primary.lighter,
    },
  },

  inputRoot: {
    width: "100%",
  },

  fullWidth: {
    width: "100%",
  },

  // style of tablecomponent loading spinner
  tableSpinnerClass: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
  },

  tableContainer: {
    backgroundColor: theme.palette.common.white,
    border: "1px solid rgba(150, 195, 227, 0.3)",
    borderRadius: 5,
    // height:"150px"
  },

  tableHead: {
    color: `${theme.palette.brandPrimary.dark} !important`,
  },

  tableHeaderStyle: {
    color: theme.palette.brandPrimary.dark,
    padding: "10px",
    borderBottom: "1px solid #E1E7F3",
  },

  tableCell: {
    padding: "10px",
    color: theme.palette.grey.light,
    borderBottom: "1px solid #E1E7F3",
  },

  iconStyle: {
    height: "1.4rem",
    marginLeft: "0.5rem",
  },

  tableIcon: {
    cursor: "pointer",
  },

  tableBody: {
    color: theme.palette.grey.light,
  },

  removeIcon: {
    color: theme.palette.reds.dark,
    cursor: "pointer"
  },

  FilterBtn: {
    color: theme.palette.brandPrimary.dark,
    padding: "6px 23px",
    margin: "0.5rem 0  0.625rem 0.9375rem",
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    border: "2px solid #E1E7F3",
    borderRadius: theme.buttons.borderRadius,
    backgroundColor: "white !important",
    boxShadow: "none !important",
    background: theme.palette.background.textField,
    "&:focus": {
      outline: "none !important",
    },
  },


  // collaps style
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },

  expandOpen: {
    transform: "rotate(180deg)",
  },

  //Text Color Styles

  textGrey: {
    color: `${theme.palette.grey.light} !important`,
    lineHeight: "14px",
  },
  textGreen: {
    color: theme.palette.peacockBlue.dark,
  },
  textDarkGreen: {
    color: theme.palette.darkGreen.light,
  },
  textRed: {
    color: theme.palette.reds.dark,
  },
  textBlue: {
    color: theme.palette.brandPrimary.dark,
  },

  textLightBlue: {
    color: theme.palette.blue.main,
  },

  textOrange: {
    color: theme.palette.orange.dark,
  },

  textPurple: {
    color: theme.palette.purple.lighter,
  },

  textYellow: {
    color: theme.palette.goldenYellow.light,
  },
  formControlLabel: {
    margin: "0 !important",
    color: theme.palette.primary.dark,
  },

  // letters
  letterPurple: {
    padding: "3px 4px 1px",
    color: theme.palette.purple.lighter,
    border: `1px solid ${theme.palette.purple.lighter}`,
    borderRadius: 3,
    lineHeight: "14px",
  },

  letterBlue: {
    padding: "3px 4px 1px",
    color: theme.palette.blue.light,
    border: `1px solid ${theme.palette.blue.light}`,
    borderRadius: 3,
    lineHeight: "14px",
  },

  letterGreen: {
    padding: "3px 4px 1px",
    color: theme.palette.green.light,
    border: `1px solid ${theme.palette.green.light}`,
    borderRadius: 3,
    lineHeight: "14px",
  },
  letterRed: {
    padding: "3px 4px 1px",
    color: theme.palette.secondary.light,
    border: `1px solid ${theme.palette.secondary.light}`,
    borderRadius: 3,
    lineHeight: "14px",
  },
  letterFillPurple: {
    padding: "3px 4px 1px",
    backgroundColor: theme.palette.purple.lighter,
    border: `1px solid ${theme.palette.purple.lighter}`,
    borderRadius: 3,
    color: theme.palette.common.white,
    lineHeight: "14px",
  },
  letterFillBlue: {
    padding: "3px 4px 1px",
    backgroundColor: theme.palette.blue.light,
    border: `1px solid ${theme.palette.blue.light}`,
    borderRadius: 3,
    color: theme.palette.common.white,
    lineHeight: "14px",
  },
  letterFillRed: {
    padding: "3px 4px 1px",
    backgroundColor: theme.palette.secondary.dark,
    border: `1px solid ${theme.palette.secondary.dark}`,
    borderRadius: 3,
    color: theme.palette.common.white,
    lineHeight: "14px",
  },
  letterFillGreen: {
    padding: "3px 4px 1px",
    backgroundColor: theme.palette.darkGreen.dark,
    border: `1px solid ${theme.palette.darkGreen.dark}`,
    borderRadius: 3,
    color: theme.palette.common.white,
    lineHeight: "14px",
  },
  letterFillOrange: {
    padding: "3px 4px 1px",
    backgroundColor: theme.palette.orange.dark,
    border: `1px solid ${theme.palette.orange.dark}`,
    borderRadius: 3,
    color: theme.palette.common.white,
    lineHeight: "14px",
  },
  firstLetterCaps: {
    textTransform: "capitalize",
    "& .MuiInputBase-input": {
      textTransform: "capitalize",
    }
  },
  clickableBlock: {
    cursor: "pointer"
  },
  containerHeader: {
    background: theme.palette.brandPrimary.dark,
    borderRadius: "5px 5px 0px 0px",
    color: theme.palette.common.white,
    fontWeight: "500",
    fontSize: "16px",
    padding: "0.7rem",
    "&:hover": {
      color: theme.palette.common.white,
    }
  },
  checkBoxContainer: {
    background: theme.palette.common.white,
    borderRadius: "5px",
    padding: "0.7rem 0.7rem 0rem 0.7rem",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    marginBottom: "0.8rem"
  },
  checkBoxLabelBlue: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: theme.typography.fontWeight.weight4,
    fontSize: theme.typography.fontSize,
    color: theme.palette.primary.dark,
  },
  addingElementContainer: {
    backgroundColor: theme.palette.common.white,
    minHeight: "20rem",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  treeViewMainContainer: {
    backgroundColor: theme.palette.common.white,
    width: "100%",
    overflow: "hidden",
    padding: "1rem",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "5px",
    minHeight: "20rem"
  },
  treeContainer: {
    minWidth: "25rem",
    "& .roundIcon": {
      width: 28,
      height: 28,
      backgroundColor: theme.palette.brandPrimary.dark,
      borderRadius: "50%",
      boxShadow: "#003761 0px 0px 0px 3px",
      border: "2px solid white",
      marginLeft: 2,
      padding: 2,
      cursor: "pointer",
      zIndex: "8"
    },
    "& .roundIconUnit": {
      width: 28,
      height: 28,
      backgroundColor: theme.palette.blue.light,
      borderRadius: "50%",
      boxShadow: `${theme.palette.blue.light} 0px 0px 0px 3px`,
      border: "2px solid white",
      marginLeft: 2,
      padding: 2,
      cursor: "pointer",
      zIndex: "8"
    },
    "& .title": {
      color: theme.palette.brandPrimary.dark,
      marginRight: "0.5rem",
      cursor: "pointer"
    },
    "& .activeTitle": {
      color: theme.palette.common.white,
      marginRight: "0.5rem",
      cursor: "pointer"
    },
    "& .roundIconText": {
      color: theme.palette.common.white,
      textAlign: "center"
    },
    "& .chipContainer": {
      minWidth: "10rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "2px 2px 2px 12px",
      marginLeft: -6,
      borderTop: `1px solid ${theme.palette.brandPrimary.dark}`,
      borderRight: `1px solid ${theme.palette.brandPrimary.dark}`,
      borderBottom: `1px solid ${theme.palette.brandPrimary.dark}`,
      borderRadius: "0px 5px 5px 0px"
    },
    "& .activeChipContainer": {
      minWidth: "10rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.palette.blue.light,
      padding: "2px 2px 2px 12px",
      marginLeft: -6,
      borderTop: `1px solid ${theme.palette.brandPrimary.dark}`,
      borderRight: `1px solid ${theme.palette.brandPrimary.dark}`,
      borderBottom: `1px solid ${theme.palette.brandPrimary.dark}`,
      borderRadius: "0px 5px 5px 0px",
      zIndex: "4"
    },
    "& .cancelIcon": {
      marginLeft: 3,
      cursor: "pointer"
    },
    '& .visitDetails': {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    "& .visitDuration": {
      marginLeft: 5
    },
    "& .activeVisitDuration": {
      marginLeft: 5,
      color: theme.palette.common.white,
    }
  },
  // tree styles
  avatarLink: {
    display: 'inline-block',
    textDecoration: 'none !important',
  },
  greenDarkAvatar: {
    backgroundColor: theme.palette.darkGreen.dark,
    border: '1px solid white',
    margin: '2px',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
  },
  greenDarkAvatarWrapper: {
    backgroundColor: theme.palette.darkGreen.dark,
    zIndex: '1',
  },
  blueDarkAvatar: {
    backgroundColor: theme.palette.brandPrimary.dark,
    border: '1px solid white',
    margin: '2px',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
  },
  blueDarkAvatarWrapper: {
    backgroundColor: theme.palette.brandPrimary.dark,
    zIndex: '1',
  },
  blueLightAvatar: {
    backgroundColor: theme.palette.blue.light,
    border: '1px solid white',
    margin: '2px',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
  },
  blueLightAvatarWrapper: {
    backgroundColor: theme.palette.blue.light,
    zIndex: '1',
  },
  blueAvatar: {
    backgroundColor: theme.palette.primary.dark,
    border: '1px solid white',
    margin: '2px',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
  },
  blueAvatarWrapper: {
    backgroundColor: theme.palette.primary.dark,
    zIndex: '1',
  },
  primaryAvatar: {
    backgroundColor: theme.palette.primary.main,
    border: '1px solid white',
    margin: '2px',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
  },
  primaryAvatarWrapper: {
    backgroundColor: theme.palette.primary.main,
    zIndex: '1',
  },
  blueChipAvatar: {
    backgroundColor: theme.palette.blueChip.dark,
    border: '1px solid white',
    margin: '2px',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
  },
  blueChipAvatarWrapper: {
    backgroundColor: theme.palette.blueChip.dark,
    zIndex: '1',
  },
  blueMidAvatar: {
    backgroundColor: theme.palette.blue.dark,
    border: '1px solid white',
    margin: '2px',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
  },
  blueMidAvatarWrapper: {
    backgroundColor: theme.palette.blue.dark,
    zIndex: '1',
  },
  greenLightAvatar: {
    backgroundColor: theme.palette.green.dark,
    border: '1px solid white',
    margin: '2px',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
  },
  greenLightAvatarWrapper: {
    backgroundColor: theme.palette.green.dark,
    zIndex: '1',
  },
  peacockBlueAvatar: {
    backgroundColor: theme.palette.peacockBlue.main,
    border: '1px solid white',
    margin: '2px',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
  },
  peacockBlueAvatarWrapper: {
    backgroundColor: theme.palette.peacockBlue.main,
    zIndex: '1',
  },
  peacockDarkBlueAvatar: {
    backgroundColor: theme.palette.brandPrimary.main,
    border: '1px solid white',
    margin: '2px',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
  },
  peacockDarkBlueAvatarWrapper: {
    backgroundColor: theme.palette.brandPrimary.main,
    zIndex: '1',
  },
  avatarBtn: {
    textTransform: 'capitalize',
    border: `1px solid ${theme.palette.lightGrey.light}`,
    color: theme.palette.brandPrimary.dark,
    padding: '4px 25px',
    minWidth: '120px',
    marginLeft: '-18px',
    justifyContent: 'start !important'
  },
  clickedAvatarBtn: {
      background: theme.palette.brandPrimary.main,
      color: theme.palette.brandPrimary.contrastText,
      "&:hover":{
        background: theme.palette.brandPrimary.light,
        // color: theme.palette.brandPrimary.dark,
        border: `1px solid ${theme.palette.brandPrimary.main}`
      }
  },
  hierarchyList: {
    position: 'relative',
    listStyle: 'none',
    margin: "0 0 0 1em",
    padding: 0,
    "&:before": {
      position: 'absolute',
      left: 0,
      top: '-20px',
      bottom: 0,
      content: "''",
      width: 0,
      display: 'block',
      borderLeft: `1px dashed ${theme.palette.brandPrimary.dark}`,
    },
  },
  listItem: {
    position: 'relative',
    margin: 0,
    padding: "5px 25px",
    lineHeight: "2em",
    "&:before": {
      position: 'absolute',
      left: 0,
      top: '1rem',
      content: "''",
      width: '22px',
      height: 0,
      display: 'block',
      borderTop: `1px dashed ${theme.palette.brandPrimary.dark}`,
      marginTop: "13px"
    },
    "&:last-child:before": {
      background: theme.palette.brandPrimary.contrastText, /* same with body background */
      height: "auto",
      top: "1rem",
      bottom: 0
    }
  },
  snipperClass: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

  },
  displayFlex:{
    display:"flex !important"
  },
  formikCheckbox: {
    marginTop: "1.5rem",
  },
  tableDropDown:{
    "& .MuiInputBase-root":{
      marginBottom:"-0.2rem !important",

    }
  },
  //inactive and active tab button
  inactiveMediumTabBtn: {
    padding: theme.customSpacing.padding.padding4 + "px 0",
    background: theme.palette.lightBlue.lighter,
    color: theme.palette.primary.dark,
    height: theme.buttons.height.medium,
    width: theme.buttons.width.medium,
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    fontWeight: theme.typography.fontWeight.weight4,
    fontSize: theme.typography.h6.fontSize,
    "&:hover": {
        backgroundColor: theme.palette.lightBlue.lighter,
        boxShadow: "0 0 0 1px " +  theme.palette.primary.dark
    },
    "&:focus": {
        outline: "none !important",
    },
  },
  activeMediumTabBtn: {
    padding: theme.customSpacing.padding.padding4 + "px 0",
    background: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    height: theme.buttons.height.medium,
    width: theme.buttons.width.medium,
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    fontWeight: theme.typography.fontWeight.weight5,
    fontSize: theme.typography.h6.fontSize,
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
    },
    "&:focus": {
        outline: "none !important",
    },
  },
  inactiveSmallTabBtn: {
    background: theme.palette.lightBlue.lighter,
    color: theme.palette.primary.dark,
    height: theme.buttons.height.medium,
    width: theme.buttons.width.small,
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    fontWeight: theme.typography.fontWeight.weight4,
    fontSize: theme.typography.h6.fontSize,
    "&:hover": {
        backgroundColor: theme.palette.lightBlue.lighter,
        boxShadow: "0 0 0 1px " +  theme.palette.primary.dark
    },
    "&:focus": {
        outline: "none !important",
    },
    margin: theme.spacing(1),
  },
  activeSmallTabBtn: {
    background: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    height: theme.buttons.height.medium,
    width: theme.buttons.width.small,
    textTransform: "none",
    outline: "none",
    textDecoration: "none",
    fontWeight: theme.typography.fontWeight.weight5,
    fontSize: theme.typography.h6.fontSize,
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
    },
    "&:focus": {
        outline: "none !important",
    },
    margin: theme.spacing(1),
  },
  //country selector with telephone no field
  countrySelectorFlagIcon: {
    width: theme.typography.h6.fontSize,
    margin: "0 0.5rem"
  },
  countryCodeSelectorWrapper: {
    "& fieldset": {
      borderRadius: `${theme.customSpacing.borderRadius.radius3}px 0 0 ${theme.customSpacing.borderRadius.radius3}px`
    }
  },
  countryCodeSelector: {
    backgroundColor: theme.palette.background.textField,
    
  },
  telephoneFieldWrapper: {
    "& fieldset": {
      borderRadius: `0 ${theme.customSpacing.borderRadius.radius3}px ${theme.customSpacing.borderRadius.radius3}px 0`
    }
  },
  telephoneField: {
    "& .MuiInputBase-formControl":{
      backgroundColor: theme.palette.background.textField,
    }
  },
  countryCodeTelephoneLabel:{
    color: theme.palette.primary.dark,
    fontWeight: theme.typography.fontWeight.weight3,
  },
  requiredFieldAsterisk: {
    position:"absolute", 
    right:"0.4rem", 
    top:0, 
    color:theme.palette.reds.dark,
  },
  //outlined form control with label
  labeledFormControlOutlined: {
    backgroundColor: theme.palette.background.textField,
    border: `1px solid ${theme.palette.blue.tooLiter}`,
    borderRadius: theme.customSpacing.borderRadius.radius3,
    paddingInline: theme.customSpacing.padding.padding1,
    paddingBlock: "0 "+ theme.customSpacing.padding.padding1 + "px",
    margin: 0,
    display: 'flex',
    flexBasis: "max-content",
    flexGrow: 1,
    '& label + .MuiInput-formControl': {
        marginTop: "0 !important"
    },
    "&.MuiBox-root": {
        marginLeft: "0 !important"
    }
  },
  labeledFormControlFormLabel: {
    color: theme.palette.primary.dark + " !important",
    fontWeight: theme.typography.fontWeight.weight4,
    fontSize: theme.typography.fontSize,
    width: "fit-content",
    margin: '0 ' + (theme.spacing(1)+1) + "px"
  },
  labeledFormGroupFlexGrow: {
    flexGrow: 1
  },
  //common date picker styles
  multiDatePickerHeader: {
    backgroundColor: theme.palette.primary.main + " !important"
  },
  multiDateSettings: {
    "& .setting":{
      backgroundColor: theme.palette.primary.dark + " !important",
    },
    "& .item":{
      backgroundColor: theme.palette.primary.main + " !important",
    },
    "& .item.active":{
      backgroundColor: theme.palette.blue.dark + " !important",
    },
  },
  datePickerTextField: {
    "& .MuiInputBase-formControl":{
      backgroundColor: theme.palette.background.textField,
    }
  },
  datePickerInputLabel:{
    color: theme.palette.primary.dark,
    fontWeight: theme.typography.fontWeight.weight3,
  },
  datePickerInputAsterisk: {
    position: "absolute",
    right: "0.4rem",
    top: "0.1rem",
    color: theme.palette.reds.dark,
    zIndex: 1,
  },
  //common report modal
  reportIFrameContainer: {
    width: "100%",
    height: '35rem',
    border: "none",
  },
  reportToolbarTypo: {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.fontWeight.weight4,
    color: theme.palette.background.textField,
  },
  reportPrintIcon: {
    paddingTop: "1.3rem"
  },
  reportModalToolbar: {
    background: theme.palette.lightGray.dark,
    padding:"0.2rem 1rem",
    marginRight:"0.08rem"
  },
  // common styles to make Table first or last columns sticky
  stickyTableClass: {
    minWidth: window.innerWidth,
  },
  stickyLastTableColumn: {
    position: "sticky",
    right: "0 !important",
    zIndex: 2,
    background: theme.palette.common.white,
  },
  stickyFirstTableColumn: {
    position: "sticky",
    right: "0 !important",
    zIndex: 2,
    background: theme.palette.common.white,
  },
  conformationContent: {
    display: "flex", 
    alignItems: "center",
    margin: "0.5rem 0"
  },
  conformationQuestionImage: {
    marginRight: "1rem "
  },
  commonModalHeader: {
    borderBottom: `1px solid ${theme.palette.lightBlue.lighter}`,
    color: theme.palette.brandPrimary.dark,
    backgroundColor: theme.palette.primary.tooLiter
  },
  modalContent: {
    backgroundColor: theme.palette.primary.tooLiter
  },
  // common styles for search field with custom popper
  searchFieldCustomPopperContent: {
    border: '1px solid' + theme.palette.border.lightBlue,
    borderRadius: theme.customSpacing.borderRadius.radius3,
    backgroundColor: theme.palette.background.paper,
    overflow: "scroll",
  },
  searchFieldCustomPopperBoxContainer: {
    width: "100%",
    marginTop: "0.25rem",
    border: "solid 1px" + theme.palette.border.lightGrey,
    borderRadius: theme.customSpacing.borderRadius.radius3,
    backgroundColor: theme.palette.brandPrimary.contrastText,
  },
  selectedRow: {
    backgroundColor: "red",
    color: "white" /* You can customize text color */
  },
  tableRowLabel : {
    lineHeight:"10px",
    color:"#003761",
    fontSize:"12px",
  },
  tableRowLabelValue : {
    lineHeight:"10px",
    color:"#5E5E5E",
    fontSize:"12px",
  },
  qtyLable: {
    color:"#003761",
    fontSize:"12px",
    marginTop:"15px",
    marginRight:"2px"
  },
  requiredAsterisk: {
    position: "absolute",
    top: 0,
    right: theme.customSpacing.padding.padding1,
    color: theme.palette.reds.dark
},
pageLoadSpinner: {
  position:'absolute',
  justifyContent:'center',
  alignItems:'center',
  height:'100%',
  zIndex:'9000',
  img: {
      width:'20%',
  }
},
dropDownWidth: {
  "& .MuiFormControl-root": {
      display: "inline-flex",
      padding: 0,
      position: "relative",
      flexDirection: "column",
      width: "126px !important",
  },
},
dropDownClass: {
minWidth: "7rem",
margin: "0 0.625rem 0 0"
},

}));
