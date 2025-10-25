import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel'
import { Dialog, DialogTitle, DialogContent, Slide, Typography } from '@mui/material'
import { Grid, Button, Box } from "@mui/material";
import { useStyles } from "../../../../../assets/styles/styles";
import { UsersStyle } from './UsersStyle';
import classNames from 'classnames';
import { http_Request } from '../../../shared/HTTP_Request';
import { API_URL } from '../../../shared/API_URLS';
import { getLabel } from '../../../shared/localization';
import Snackbar from '../../../common/Snackbar'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ResetPassword = (props) => {
    const classes = useStyles();
    const userClass = UsersStyle();

    const {isModal, userDetails, staffTypeOptions} = props;

    const [snackText, setSnackText] = useState("");
    const [snackVariant, setSnackVariant] = useState("");

    const sendOTPAction = () => {
        let requestData = {
            username: userDetails.username,
            requestedUser: JSON.parse(localStorage.getItem("userDetail"))?.username
        };

        // if(localStorage.userDetail && localStorage.userDetail.username){
        //     requestData["requestedUser"] = JSON.parse(localStorage.getItem("userDetail"))?.username;
        // }

        http_Request(
        {
            url: API_URL.RESET_REQUEST,
            method: 'POST',
            bodyData: requestData
        },
        function successCallback(response) {
            console.log("response", response);
            props.closeAction("requested");
        },
        function errorCallback(error) {
            console.log("error", error);
        });
    }

    const resetSnack = () => {
        setSnackText();
        setSnackVariant();
    };

    return(
        <Dialog
            open={ isModal }
            TransitionComponent={Transition}
            aria-labelledby='payment-modal-dialog-title'
            aria-describedby='payment-modal-dialog-description'
            scroll='body'
            maxWidth='lg'
            fullWidth={true}
        >
            <DialogTitle
                id='payment-modal-dialog-title'
                className={classes.modelHeader}
            >
                { getLabel({ module: "userManagement", label: "passwordReset" }) }
                <CancelIcon
                    onClick={ () => props.closeAction() }
                    className={ classNames(classes.dialogCloseBtn, classes.appointmentModalCloseIcon) }
                />
            </DialogTitle>
            <DialogContent className={classes.popupPaper}>
                <Snackbar
                    text={snackText}
                    variant={snackVariant}
                    reset={() => { resetSnack() }}
                />
                <Grid className={ userClass.userModalContainer }>
                    <Grid container display="flex" justifyContent="space-between" spacing={3}>
                        <Grid item xs={3}>
                            <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "employeeId" }) }</Typography>
                            <Typography className={ userClass.userValueLabel }>{ userDetails.staffId }</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "staffType" }) }</Typography>
                            <Typography className={ userClass.userValueLabel }>{ staffTypeOptions.filter((singlePersonType) => (singlePersonType.id === userDetails.personType ))[0]?.name }</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "email" }) }</Typography>
                            <Typography className={ userClass.userValueLabel }>{ userDetails.email }</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "mobileNumber" }) }</Typography>
                            <Typography className={ userClass.userValueLabel }>{ userDetails.phone }</Typography>
                        </Grid>
                    </Grid>
                    <Grid container className={ userClass.nextLineBlock }>
                        <Grid item xs={9}>
                            <Box></Box>
                            <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "userName" }) }</Typography>
                            <Typography className={ userClass.userValueLabel }>{ userDetails.username }</Typography>
                        </Grid>

                        <Grid item container xs={3}>
                            <Button
                                className={ classNames(classes.mediumSecondaryBtn, classes.fullWidth) }
                                onClick={ () => { sendOTPAction() } }
                            >
                                { getLabel({ module: "userManagement", label: "sendTemporaryPassword" }) }
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default ResetPassword;