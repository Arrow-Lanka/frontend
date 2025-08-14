import { makeStyles } from '@mui/styles';


export const PasswordRestStyle = makeStyles((theme) => ({
    outLineBox: {
        border: `1px solid ${theme.palette.background.textField}`,
        boxSizing: "border-box",
        boxShadow: `0px 2px 10px ${theme.palette.lightGrey.light}`,
        borderRadius: "5px",
        position: "relative"
    },
    mainWrapper: {
        padding: "3.4375rem 3.75rem 2.875rem 3.3125rem !important"
    },
    nameLabel: {
        color: "#003761",
        fontSize: "18px",
        fontWeight: 700
    },
    profileImg: {
        position: "absolute",
        top: "-2.625rem",
        right: "7.6875rem",
    },
    inputFieldWrapper: {
        padding: "5px 15px"
    },
    singleInputBlock: {
        marginBottom: "0.8rem"
    },
    submitBtn: {
        width: "100%",
        margin: "0 !important"
    }
}));
