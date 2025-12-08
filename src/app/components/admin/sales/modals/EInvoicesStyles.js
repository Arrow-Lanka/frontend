import { makeStyles } from "@mui/styles";

export const EInvoicesStyles = makeStyles((theme) => ({
  mainContainer: {
    margin: "0.5rem 1rem 0rem 5.8rem",
    flexGrow: 1,
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      margin: "0.5rem 1rem 0rem 1rem",
    },
  },

  subContainer: {
    backgroundColor: theme.palette.background.textField,
    padding: "1.5rem",
    borderRadius: "0.313rem",
  },

  mainHeader: {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.fontWeight.weight5,
    color: theme.palette.brandPrimary.dark,
    marginLeft:"0.1rem"
  },

  gridMargin:{
    marginBottom:"1.5rem"
  },

  noRecordText: {
    fontSize: theme.typography.fontSize ,
    fontWeight: theme.typography.fontWeight.weight4,
    margin: "1rem 0rem",
    color: theme.palette.reds.dark,
  },

  dateRangeInputField: {
    marginTop: "0",
    marginBottom: "0",
    minWidth: "max-content",
    "& .MuiOutlinedInput-notchedOutline": {
      border: `none`,
    },
  },

  refBorderBlueDev: {
    backgroundColor: theme.palette.background.textField,
    border: `0.15rem solid ${theme.palette.otherColors.dark}`,
    borderRadius: "0.313rem",
    paddingLeft: theme.customSpacing.padding.padding1,
    paddingRight: theme.customSpacing.padding.padding1,
    textAlign: "center",
    "& label + .MuiInput-formControl": {
      marginTop: "0 !important",
    },
    height: "2.5rem !important",
    "&.MuiBox-root": {
      marginLeft: "0 !important",
    },
  },

  calendarField: {
    padding: "0.125rem 0 !important",
  },

  filterBlockSubGrid: {
    margin: "0 0 1rem 0",
  },

  dateRangePickerGrid: {
    minWidth: "fit-content",
  },

  tableColumn: {
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.brandPrimary.contrastText,
  },

  noMarginIcon: {
    marginLeft: "0 !important",
    marginRight: "0 !important",
    height: "1.05rem",
    cursor: "pointer",
  },

  viewIconClass: {
    cursor: "pointer",
    height:"1.2rem",
    marginLeft:"-0.3rem"
  },

  downloadIconClass:{
    cursor: "pointer",
    height:"1.5rem",
  },

  invoiceFile: {
    height: '31.625rem',
    width: '100%',
  },

  invoiceDialogContent:{
    padding:"1.5rem",
    overflowY:"scroll"
  },

  invoiceToolbar:{
    background: theme.palette.lightGray.dark,
    padding:"0.2rem 1rem",
    marginRight:"0.08rem"
  },

  invoiceToolbarTypo:{
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.fontWeight.weight4,
    color: theme.palette.background.textField,
  },

  invoicePrintIcon:{
    paddingTop: "1.3rem"
  },


  /////////////////////////////////////////////////////
  mainWrapperContainer: {
    marginRight: "1rem",
    marginLeft: "5.563rem",
    borderRadius: theme.customSpacing.borderRadius.radius3,
    [theme.breakpoints.down("xs")]: {
      marginLeft: "1rem"
    },
    position: 'relative'
  },
  mainWrapperSubContainer: {
    display: 'flex',
    minHeight: '65vh',
  },
  voucherCardActionArea: {
    minWidth: '50ch',
    minHeight: '15ch'
  },
  deciderPageTitleTypo: {
    fontSize: '1.375rem',
    fontWeight: theme.typography.fontWeight.weight4,
    color: theme.palette.brandPrimary.dark,
    margin: '1.75rem 2rem' 
  },
  voucherCardMainWrapper: {
    margin: '2rem'
  },
  voucherIcon: {
    width: '5ch',
    height: '5ch'
  },

  voucherCardBlue:{
    backgroundColor: theme.palette.tagColorsBg.contrastText,
    boxShadow: 'inset 0 0 0.075rem 0.075rem ' + theme.palette.blue.light,
    borderRadius: theme.customSpacing.borderRadius.radius3,
  },
  voucherCardYellow:{
    backgroundColor: theme.palette.tagColorsBg.lighter,
    boxShadow: 'inset 0 0 0.075rem 0.075rem ' + theme.palette.tagColorsFont?.lighter,
    borderRadius: theme.customSpacing.borderRadius.radius3,
  },
  voucherCardGreen:{
    backgroundColor: theme.palette.tagColorsBg.tooLighter,
    boxShadow: 'inset 0 0 0.075rem 0.075rem ' + theme.palette.lightGreen.dark,
    borderRadius: theme.customSpacing.borderRadius.radius3,
  },
  voucherCardOrange:{
    backgroundColor: theme.palette.tagColorsBg.dark,
    boxShadow: 'inset 0 0 0.075rem 0.075rem ' + theme.palette.reds?.main,
    borderRadius: theme.customSpacing.borderRadius.radius3,
  },
  voucherCardPurple:{
    backgroundColor: theme.palette.tagColorsBg.light,
    boxShadow: 'inset 0 0 0.075rem 0.075rem ' + theme.palette.doughnutCharts.purple,
    borderRadius: theme.customSpacing.borderRadius.radius3,
  },
  voucherCardDarkBlue:{
    backgroundColor: theme.palette.blueChip.tooLiter,
    boxShadow: 'inset 0 0 0.075rem 0.075rem ' + theme.palette.blueChip.dark,
    borderRadius: theme.customSpacing.borderRadius.radius3,
  },
  voucherNameTypo: {
    fontWeight: theme.typography.fontWeight.weight4,
    fontSize: '1.75rem'
  },
  voucherCodeTypo: {
    color: theme.palette.lightGray.main,
    fontWeight: theme.typography.fontWeight.weight4,
    fontSize: theme.typography.fontSize
  },
  voucherNameTypoBlue: {
    color: theme.palette.blue.light
  },
  voucherNameTypoYellow: {
    color: theme.palette.tagColorsFont?.lighter
  },
  voucherNameTypoGreen: {
    color: theme.palette.lightGreen.dark
  },
  voucherNameTypoOrange: {
    color: theme.palette.reds?.main
  },
  voucherNameTypoPurple: {
    color: theme.palette.doughnutCharts.purple
  },
  voucherNameTypoDarkBlue:{
    color: theme.palette.blueChip.dark,
  },
  selectedHospitalActionButtonCard: {
    backgroundColor: theme.palette.otherColors.contrastText,
    color: theme.palette.primary.contrastText,
    boxShadow: 'none'
  },
  voucherSelectionCardContent: {
    borderRadius: theme.customSpacing.borderRadius.radius3
  },
  selectionProceedBtn: {
    margin: '2rem'
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
  deciderActionsWrapper: {
    display: 'flex'
  },
  selectedHospitalCardIcon: {
    '& path': {
      fill: theme.palette.primary.contrastText + ' !important'
    }
  },
  selectedHospitalNameTypo: {
    color: theme.palette.primary.contrastText + ' !important'
  },
  selectedHospitalCodeTypo: {
    color: theme.palette.otherColors.light + ' !important'
  },
  voucherCardMainWrapper: {
    margin: '2rem'
  },
}));
