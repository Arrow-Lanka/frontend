import React from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    DialogContentText,
    Grow
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { getLabel } from "../shared/localization";
import classNames from "classnames";

import question_icon from "../../../assets/image/icons/question_icon.svg"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
});

function ConfirmationModal(props) {
    const {
        classes,
        isConfirmationModal,
        closeConfirmationAction,
        modalConfirmAction,
        confirmationModalHeader,
        confirmationModalContent,
        maxWidth,
        questionImageVisible,
        isHideYesButton,
        isHideNoButton
    } = props;

    return (
        <>
            <Dialog
                open={isConfirmationModal}
                onClose={closeConfirmationAction}
                TransitionComponent={Transition}
                aria-labelledby="conformation dailog"
                scroll="body"
                maxWidth={ maxWidth || "sm"}
                fullWidth={true}
            >
                <DialogTitle
                    className={classes.modelHeader}
                    id="conformation-dailog-title"
                >
                    {confirmationModalHeader}
                <CancelIcon
                  onClick={closeConfirmationAction}
                  className={classes.dialogCloseBtn}
                />
                </DialogTitle>
                <DialogContent className={classes.conformationContent}>  
                    {questionImageVisible &&
                        <img src={question_icon} className={classes.conformationQuestionImage}/>
                    }
                    <DialogContentText
                        className={classNames(classes.conformationContentText,classes.removemargin)}
                        id="iconformation-dailog-text"
                    >
                        {confirmationModalContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                {!isHideNoButton && (
                    <Button 
                        className={classes.outlineBtn} 
                        onClick={closeConfirmationAction}
                        id={ props.noBtnId ? props.noBtnId : "no" }
                        >
                        { props.noWord ? props.noWord : getLabel({ module: "common", label: "no" }) }
                    </Button>
                )}
                {!isHideYesButton && (
                    <Button
                        className={classes.mainButton}
                        onClick={modalConfirmAction}
                        id={ props.yesBtnId ? props.yesBtnId : "yes" }
                    >
                        { props.yesWord ? props.yesWord : getLabel({ module: "common", label: "yes" }) }
                    </Button>
                )}
                </DialogActions>
            </Dialog>
        </>
    );
}

ConfirmationModal.defaultProps = {
    questionImageVisible: true
}

export default ConfirmationModal;
