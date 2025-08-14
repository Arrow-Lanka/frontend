import { makeStyles } from "@mui/styles";

export const FormCommonStyles = makeStyles((theme) => ({

    dashboardContainer: {
        marginRight: "1rem",
        marginLeft: "5.563rem",
        [theme.breakpoints.down("xs")]:{
            marginLeft:"1rem",
            marginRight: "1rem"
        },
    },
    mainCardContainer:{
        backgroundColor:"white",
        [theme.breakpoints.down("xs")]:{
            minWidth:"44rem",
            marginLeft:"1rem"

        },
    },
    resturantTitleWordTypo:{
        fontSize: theme.typography.fontSize13,
        color:"#2E3192",
        fontSize:"1.2rem",
        fontWeight:500,
        lineHeight:"3rem"
    },
    mediumAddBtn: {
        width: theme.buttons.width.medium,
        backgroundColor: theme.palette.primary.main,
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
      addBtn: {
        margin: "0 !important",
        height: "100%"
    },
    greenChip: {
        padding: "2px 10px",
        fontSize: 13,
        color: theme.palette.darkGreen.dark,
        lineHeight: 1.5,
        backgroundColor: theme.palette.darkGreen.tooLiter,
        borderRadius: 16,
        whiteSpace: "nowrap",
        width:"max-content",
        fontWeight:"500"
    },
    darkRedChip: {
        padding: "4px 15px 2px",
        fontSize: 13,
        color: theme.palette.reds.dark,
        lineHeight: 1.5,
        backgroundColor: "rgba(244, 5, 5, 0.15)",
        borderRadius: 16,
        whiteSpace: "nowrap",
        width:"max-content",
        fontWeight:"500"
    },
    pointerClass: {
        cursor: "pointer"
    },
    tableBlock: {
        marginTop: "1rem"
    },
    addResturantTypoLabel: {
        fontSize: '15px',
        color:"#2E3192",
        fontWeight:400,
        lineHeight:"2.2rem"
    },
    width: {
        width: "90%"
    },
    addResturantPageDropdown: {
        width: "95% !important",
        "& .MuiOutlinedInput-root": {
          backgroundColor: theme.palette.background.textField,
        },
        [theme.breakpoints.down("xs")]:{
            width: "100% !important"
        }
    },
    inputClass: {
        backgroundColor: theme.palette.background.textField,
        "& .MuiOutlinedInput-input": {
            padding: "11.4px 14px"
        },

        "& .Mui-disabled": {
            backgroundColor: theme.palette.disabledColors.bgColor,
            color: theme.palette.disabledColors.fontColor,
        }
    },
    paginationStyle: {
        '& .MuiPaginationItem-textPrimary.Mui-selected':{
            color:"#ffff",
            backgroundColor:"#F7941DD6",
            borderRadius:"3px"
        }
    },

    ///////////////////////////////////////////////
    buttonsContainer:{
        position: "relative", 
        bottom: 0, 
        alignSelf: "flex-end",
        marginRight:"15px"
    },
    greenButtonEnabled: {
        width: theme.buttons.width.medium,
        backgroundColor: theme.palette.green.dark,
        color: theme.palette.common.white,
        height: theme.buttons.height.medium,
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
    inquriesWordTypo:{
        fontFamily: "Inter",
        color:"#101828",
        height:"26.92px",
        fontWeight: 600
    },
    FilterBtn: {
        color: "#344054",
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
    pointerClass:{
        cursor:  "pointer",
        width:"18px",
        height:"18px"
    },
    paginationStyle: {
        '& .MuiPaginationItem-textPrimary.Mui-selected':{
            color:"#ffff",
            backgroundColor:"#F7941DD6",
            borderRadius:"3px"
        }
    },
    fieldsLableTypo:{
        fontSize: '15px',
        color:"#2E3192",
        fontWeight:400,
        lineHeight:"2.2rem"
    },
    addGuidePageDropdown: {
        width: "86% !important",
        "& .MuiOutlinedInput-root": {
          backgroundColor: theme.palette.background.textField,
        },
        [theme.breakpoints.down("xs")]:{
            width: "100% !important"
        }
      },
      startDatePickerFilter: {
        "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
            transform: `translate(0.675rem, -0.375rem) scale(0.75)`
        },
        "& .MuiInputLabel-outlined":{
            transform: `translate(0.675rem, 0.675rem) scale(1)`
        },
        "&  .MuiInputBase-fullWidth":{
            width: '75%'
        }
    },
    formInputField: {
        minWidth: "18rem",
        "& .MuiInputBase-formControl": {
            backgroundColor: theme.palette.primary.contrastText,
        },
        "& #cashPrice-helper-text, #payerPrice-helper-text, #maxDiscount-helper-text, #cashPriceWithDiscount-helper-text, #payerPriceWithDiscount-helper-text": {
            color: theme.palette.reds.dark,
            marginInline: 0,
            fontSize: theme.typography.fontSize
        },
        position: "relative"
    },
    formInputFieldDisabled: {
        minWidth: "18rem",
        "& .MuiInputBase-formControl": {
            backgroundColor: theme.palette.primary.contrastText,
        },
        "& #cashPrice-helper-text, #payerPrice-helper-text, #maxDiscount-helper-text, #cashPriceWithDiscount-helper-text, #payerPriceWithDiscount-helper-text": {
            color: theme.palette.reds.dark,
            marginInline: 0,
            fontSize: theme.typography.fontSize
        },
        position: "relative",
        backgroundColor: "#EAECF0"
    },
    buttonSetGrid:{
        display:"flex", 
        justifyContent:"flex-end",
        marginTop:"30px",
        [theme.breakpoints.down("xs")]:{
            display:"flex", 
            justifyContent:"flex-start",
            alignItems: "center",
        },
    },
    outlineCancelBtn: {
        color: theme.palette.grey.liter,
        width: theme.buttons.width.medium,
        fontWeight: 400,
        margin: theme.spacing(1),
        height: theme.buttons.height.medium,
        backgroundColor: theme.palette.background.textField,
        border: `1px solid ${theme.palette.grey.liter}`,
        textTransform: "none",
        boxShadow: 'none',
        outline: "none",
        textDecoration: "none",
        whiteSpace: 'nowrap',
        "&:hover": {
            color: theme.palette.grey.liter,
        },
    },
    outlineSendInquiryBtn: {
        color: "#FFFFFF",
        width: theme.buttons.width.medium,
        fontWeight: 400,
        margin: theme.spacing(1),
        height: theme.buttons.height.medium,
        backgroundColor: "#73BA42",
        border: `1px solid ${theme.palette.grey.liter}`,
        textTransform: "none",
        boxShadow: 'none',
        outline: "none",
        textDecoration: "none",
        whiteSpace: 'nowrap',
        "&:hover": {
            color: "#FFFFFF",
            background:"#73BA42"
        },
    },
    mainInquiryContainer:{
        backgroundColor:"white",
        minWidth:"98rem",
        width:"90%",
        [theme.breakpoints.down("xs")]:{
            minWidth:"44rem",
            marginLeft:"1rem"

        },
    },
    addGuideWordTypo:{
        fontSize: theme.typography.fontSize13,
        color:"#2E3192",
        fontSize:"1.2rem",
        fontWeight:500,
        lineHeight:"3rem"
    },
    greenChip: {
        padding: "2px 10px",
        fontSize: 13,
        color: theme.palette.darkGreen.dark,
        lineHeight: 1.5,
        backgroundColor: theme.palette.darkGreen.tooLiter,
        borderRadius: 16,
        whiteSpace: "nowrap",
        width:"max-content",
        fontWeight:"500"
    },
    darkRedChip: {
        padding: "4px 15px 2px",
        fontSize: 13,
        color: theme.palette.reds.dark,
        lineHeight: 1.5,
        backgroundColor: "rgba(244, 5, 5, 0.15)",
        borderRadius: 16,
        whiteSpace: "nowrap",
        width:"max-content",
        fontWeight:"500"
    },
    creationModalDropdown: {
        "& .MuiOutlinedInput-root": {
          backgroundColor: theme.palette.background.textField,
        },
        width:""
      },
    outlineCancelInquiryBtn: {
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
    searchComponent: {
        "& .MuiOutlinedInput-root": {
          backgroundColor: theme.palette.background.textField,
          border: `0.063rem solid ${theme.palette.primary.lighter}`,
          borderRadius: "0.3rem",
          color: theme.palette.brandPrimary.dark + "!important",
          fontSize: theme.typography.fontSize,
          fontWeight: theme.typography.fontWeight.weight4,
          height: "2.6rem",
          width:"15rem"
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: `none`,
        },
      },
      addRoomWordTypo:{
        fontSize: theme.typography.smallFontSize10,
        color:"#0486FE",
        fontSize:"1.2rem",
        fontWeight:500,
        lineHeight:"3rem"
    },
    amenitiesSearchAutoCom: {
        width: '100%',
        margin: "1rem 0 2rem 0",
        "& fieldset": {
            border: "none"
        }
    },
    hotelDetailsContainer: {
        // marginRight: "1rem",
        // marginLeft: "5.563rem",
        [theme.breakpoints.down("xs")]:{
            marginLeft:"1rem",
            marginRight: "1rem"
        },
    },
    outlinelightgreenBtn: {
        color: "#FFFFFF",
        width: theme.buttons.width.small,
        fontWeight: 400,
        margin: theme.spacing(1),
        height: theme.buttons.height.small,
        backgroundColor: "#1ABC9C",
        border: `1px solid #1ABC9C`,
        textTransform: "none",
        boxShadow: 'none',
        outline: "none",
        textDecoration: "none",
        whiteSpace: 'nowrap',
        "&:hover": {
            color: "#FFFFFF",
            background:"#1ABC9C"
        },
    },
    outlineDarkgreenBtn: {
        color: "#FFFFFF",
        width: theme.buttons.width.small,
        fontWeight: 400,
        margin: theme.spacing(1),
        height: theme.buttons.height.small,
        backgroundColor: "#298089",
        border: `1px solid #298089`,
        textTransform: "none",
        boxShadow: 'none',
        outline: "none",
        textDecoration: "none",
        whiteSpace: 'nowrap',
        "&:hover": {
            color: "#FFFFFF",
            background:"#298089"
        },
    },
    outlineligntGreenBtn: {
        color: "#FFFFFF",
        width: theme.buttons.width.medium,
        fontWeight: 400,
        margin: theme.spacing(1),
        height: theme.buttons.height.medium,
        backgroundColor: "#9CF8D2",
        border: "1px solid #9CF8D2",
        textTransform: "none",
        boxShadow: 'none',
        outline: "none",
        textDecoration: "none",
        whiteSpace: 'nowrap',
        "&:hover": {
            color: "#FFFFFF",
            background:"#9CF8D2"
        },
    },
    toolTipWordTypo:{
        fontFamily: "Roboto",
        fontSize: "15px"

    },
    requiredAsterisk: {
        position: "absolute",
        top: 0,
        right: theme.customSpacing.padding.padding1,
        color: theme.palette.reds.dark
    },
    collectionModalFieldBox: {
        background:theme.palette.primary.contrastText,
        // borderBottom:"none",
        border:"1px solid ".concat(theme.palette.border.grey),
        borderRadius:theme.customSpacing.borderRadius.radius3,
        backgroundColor: theme.palette.primary.tooLiter,
    },
    inputFieldClass: {
        margin: "0.5rem 0",
        "& input": {
            padding: "2px 8px !important",
            height: "2.25rem"
        },
        '& .MuiInputBase-formControl':{
            padding:"0 !important",
            backgroundColor: theme.palette.background.textField,
        },
        '& .Mui-disabled': {
            backgroundColor: theme.palette.genderColorMain.unknownBg
        },
        "& .MuiFormHelperText-contained":{
            backgroundColor: "transparent !important",
            margin: "0.25rem 0 !important"
        }
    },
    
}))