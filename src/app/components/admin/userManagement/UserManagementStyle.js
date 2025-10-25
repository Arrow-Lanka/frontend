import { makeStyles } from "@mui/styles";

export const userManagementStyle = makeStyles((theme) => ({
    mainContainer: {
        margin: '0.5rem 1rem 0rem 5.8rem',
        flexGrow: 1,
        overflow: 'hidden',
        [theme.breakpoints.down('xs')]: {
            margin: '0.5rem 1rem 0rem 1rem'
        }
    },
    totalCountContainer:{
        backgroundColor: theme.palette.background.textField,
        padding: '0.5rem',
        borderTopLeftRadius:"5px",
        borderBottomLeftRadius:"5px",
    },
    totalCountNumber:{
        color: theme.palette.tagColorsFont.tooLighter,
        fontSize: '60px',
        fontWeight: theme.typography.fontWeight.weight6,
        textAlign: 'center',
        marginLeft : '1rem'
    },
    totalCountLabel:{
        color: theme.palette.brandPrimary.dark,
        fontSize: theme.typography.h4.fontSize + 'px',
        fontWeight: theme.typography.fontWeight.weight4,
        // textAlign: 'center',
        marginLeft : '1rem'
    },
    numberBlockCountsContainer: {
        backgroundColor: theme.palette.background.textField,
        padding: '0.5rem',
        borderLeft : '1px solid' + theme.palette.otherColors.dark,
        borderTopRightRadius:"5px",
        borderBottomRightRadius:"5px",
    },
    OrangeNumber:{
        color: theme.palette.tagColorsFont.lighter,
        fontSize: '40px',
        fontWeight: theme.typography.fontWeight.weight6,
        textAlign: 'center',
    },
    blueNumber:{
        color: theme.palette.brandPrimary.dark,
        fontSize: '40px',
        fontWeight: theme.typography.fontWeight.weight6,
        textAlign: 'center',
    },
    redNumber:{
        color: theme.palette.tagColorsFont.main,
        fontSize: '40px',
        fontWeight: theme.typography.fontWeight.weight6,
        textAlign: 'center',
    },
    countsSecondaryLabel:{
        color: theme.palette.otherColors.liter,
        fontSize: theme.typography.fontSize + 'px',
        fontWeight: theme.typography.fontWeight.weight6,
        textAlign: 'center',
    },
    bodyContainer:{
        backgroundColor: theme.palette.primary.tooLiter,
        borderRadius:'5px',
        paddingBottom: '1rem',
        marginTop:'1rem'
    },
    tabContainer:{
        backgroundColor: theme.palette.background.textField,
        borderBottom: '1px solid' + theme.palette.brandPrimary.tooLiter,
    },
    tabLabel: {
        fontSize: theme.typography.h6 + 'px !important' ,
        fontWeight: theme.typography.fontWeight.weight5,  
        height:'max-content',
        outline: 'none',
        textTransform: "none",
    },
    spinnerBlock: {
        position: "absolute",
    },
    singleSection: {
        padding: "1.9375rem 2.625rem",
        width: "100%"
    },
    
}))