import { makeStyles } from "@mui/styles";

export const PermissionsStyle = makeStyles((theme) => ({
    tableBlock: {
        marginTop: "1rem"
    },
    searchInput: {
        background: theme.palette.background.textField,
    },
    spinnerBlock: {
        position: "absolute",
        zIndex: 900
    },    
})) 