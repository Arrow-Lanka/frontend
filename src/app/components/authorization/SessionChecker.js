import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    DialogContentText,
    Grow
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useStyles } from "../../../assets/styles/styles";

// Grow transition
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
});

const SessionChecker = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    

    const [isSessionAlertModal, setIsSessionAlertModal] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Ensure the component is mounted before rendering modal
        setMounted(true);

        const interval = setInterval(() => {
            if (window.location.pathname === "/") {
                setIsSessionAlertModal(false);
            } else if (!localStorage.getItem("jwtToken")) {
                setIsSessionAlertModal(true);
            }
        }, 1000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);

    const redirectAction = () => {
        setIsSessionAlertModal(false);
        navigate('/');
    };

    return (
        mounted && (
            <Dialog
                open={isSessionAlertModal}
                TransitionComponent={Transition}
                aria-labelledby="session-expired-dialog"
                scroll="body"
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle
                    className={classes.modelHeader}
                    id="session-expired-dialog-title"
                >
                    Session has Expired!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        className={classes.conformationContentText}
                    >
                        Your session has expired. Please log in again.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        className={classes.mainButton}
                        onClick={redirectAction}
                    >
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        )
    );
};

export default SessionChecker;
