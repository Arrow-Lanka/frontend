import { makeStyles } from "@mui/styles";

export const UsersStyle = makeStyles((theme) => ({
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
    addBtn: {
        margin: "0 !important",
        height: "100%"
    },
    userModalContainer: {
        marginTop: "1rem"
    },
    addUserLabel: {
        color: theme.palette.grey.light,
        fontWeight: theme.typography.fontWeight.weight2
    },
    userValueLabel: {
        color: theme.palette.grey.light,
        fontWeight: theme.typography.fontWeight.weight4
    },
    centerCheckbox: {
        color: theme.palette.brandPrimary.dark,
        marginBottom: "0 !important"
    },
    moveLeftIcon: {
        transform: "scaleX(-1)",
        paddingRight: "0 !important",
        paddingLeft: "0.2rem !important",
        cursor: "pointer"
    },
    cardPrimary: {
        border: '1px solid rgba(150, 195, 227, 0.3)',
        borderRadius: 5,
        boxShadow: 'none',
        minHeight: '445px',
    },

    cardHeader: {
        color: theme.palette.brandPrimary.dark,
        padding: 12,
        backgroundColor: theme.palette.primary.liter,
    },
    tableContainer: {
        height: "18rem !important"
    },
    tableHeader: {
        position: "sticky",
        top: "0px",
        background: theme.palette.background.textField,
        zIndex: 10
    },
    searchInput: {
        background: theme.palette.background.textField,
    },
    nextLineBlock: {
        marginTop: "1rem"
    },
    hospitalSearchField: {
        background: theme.palette.background.textField,
        "& .MuiInputBase-formControl": {
            paddingBlock: "0.125rem !important"
        }
    },
    modalFieldsTitleTypo:{
        fontSize: '1rem',
        color:"#2E3192",
        fontWeight:400,
        lineHeight:"2.2rem"
    },
}))