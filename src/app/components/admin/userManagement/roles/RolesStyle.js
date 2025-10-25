import { makeStyles } from "@mui/styles";

export const RolesStyle = makeStyles((theme) => ({
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
    searchInput: {
        background: theme.palette.background.textField,
    },
    checkboxFilter: {
        backgroundColor: theme.palette.background.textField,
        border: "1px solid " + theme.palette.blue.tooLiter
    },
    blueText: {
        color: theme.palette.brandPrimary.dark,
        marginBottom: "0 !important",
        "& .MuiButtonBase-root": {
            padding: "8px 9px !important"
        }
    },
    orangeText: {
        color: theme.palette.tagColorsFont.lighter,
        marginBottom: "0 !important",
        "& .MuiButtonBase-root": {
            padding: "8px 9px !important"
        }
    },
    redText: {
        color: theme.palette.reds.dark,
        marginBottom: "0 !important",
        "& .MuiButtonBase-root": {
            padding: "8px 9px !important"
        }
    },
    greenText: {
        color: theme.palette.darkGreen.dark,
        marginBottom: "0 !important",
        "& .MuiButtonBase-root": {
            padding: "8px 9px !important"
        }
    },
    dropDownMainClass: {
        "& .MuiInputBase-root": {
            backgroundColor: theme.palette.background.textField,
            height: "40px"
        },
        "& .MuiFormHelperText-root": {
            margin: "0 !important"
        }
    },
    addBtn: {
        margin: "0 !important",
        height: "100%"
    },
    addRoleLabel: {
        color: theme.palette.grey.light,
        fontWeight: theme.typography.fontWeight.weight2
    },
    dropDownMainClass: {
        "& .MuiInputBase-root": {
            backgroundColor: theme.palette.background.textField,
            height: "40px"
        },
        "& .MuiFormHelperText-root": {
            margin: "0 !important"
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
    centerCheckbox: {
        color: theme.palette.brandPrimary.dark,
        marginBottom: "0 !important"
    },

    autoCompleteFieldFilter: {
        marginTop: "0 !important",
        position: "relative",
        backgroundColor: theme.palette.background.textField,
        border: `1px solid ${theme.palette.blue.tooLiter}`,
        borderRadius: '5px',
        // paddingRight: theme.customSpacing.padding.padding2,
        textAlign: 'center',
        minHeight:"2.56rem",
        '& label + .MuiInput-formControl': {
            marginTop: "0 !important"
        },
    
        // paddingInline:"1rem",
        '& .MuiOutlinedInput-notchedOutline':{
            border: `none`,
        },
        '& .MuiInputBase-formControl':{
            padding:"0px 4em 0 0",
        }
    },
    redBorder: {
        border: `1px solid ${theme.palette.reds.dark} !important`
    },
    errorNotation: {
        position: "absolute",
        top: "-2px",
        right: "7px",
        fontWeight: theme.typography.fontWeight.weight4
    },
    selectionCheckbox: {
        marginBottom: "0 !important",
        marginRight: "0 !important"
    },
    moduleBlock: {
        background: theme.palette.background.textField,
        padding: "0.5rem 0.1rem",
        position: "relative",
        border: `1px solid ${theme.palette.lightBlue.light}`,
        borderRadius: "4px"
    },
    hierarchyList: {
        "&:before": {
            top: '-12px !important',
            left: '5px !important'
        }
    },
    viewHierarchyList: {
        "&:before": {
            top: '-1px !important',
        }
    },
    listItem: {
        "&:before": {
            left: "5px !important",
            width: "30px !important",
            top: "13px !important"
        }
    },
    viewListItem: {
        paddingRight: "28px !important",
        paddingLeft: "28px !important",
        "&:before": {
            top: "4px !important"
        }
    },
    addMinusClass:{
        marginLeft: "0.5rem",
        cursor: "pointer",
    },
    deleteIcon: {
        position: "absolute",
        top: "1.1875rem",
        right: "0.8125rem",
        cursor: "pointer"
    },
    headingLabel: {
        color: theme.palette.grey.light,
        fontWeight: theme.typography.fontWeight.weight2
    },
    valueLabel: {
        color: theme.palette.grey.light,
        fontWeight: theme.typography.fontWeight.weight4
    },
})) 