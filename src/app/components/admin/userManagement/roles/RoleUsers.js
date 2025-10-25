import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel'
import { Dialog, DialogTitle, DialogContent, Slide, Typography } from '@mui/material'
import { Grid, Button, Box } from "@mui/material";
import { useStyles } from "../../../../../assets/styles/styles";
import { RolesStyle } from './RolesStyle';
import classNames from 'classnames';

import { http_Request } from '../../../shared/HTTP_Request';
import { API_URL } from '../../../shared/API_URLS';
import { getLabel } from '../../../shared/localization';
import { useEffect } from 'react';
import Snackbar from '../../../common/Snackbar';
import TableComponent from '../../../common/material/TableComponent'
import ConfirmationModal from '../../../common/ConfirmationModal';

import deleteIcon from "../../../../../assets/image/icons/ehr-delete.svg";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const RoleUsers = (props) => {
    const classes = useStyles();
    const roleClass = RolesStyle();

    const columnData = [
        {
            id: "userId",
            name: getLabel({ module: "userManagement", label: "userId" })
        },
        {
            id: "personType",
            name: getLabel({ module: "userManagement", label: "staffType" })
        },
        {
            id: "username",
            name: getLabel({ module: "userManagement", label: "userName" })
        },
        {
            id: "firstName",
            name: getLabel({ module: "userManagement", label: "firstName" })
        },
        {
            id: "lastName",
            name: getLabel({ module: "userManagement", label: "lastName" })
        },
        {
            id: "phone",
            name: getLabel({ module: "userManagement", label: "mobileNumber" })
        },
        {
            id: "email",
            name: getLabel({ module: "userManagement", label: "email" })
        },
        {
            id: "status",
            name: getLabel({ module: "userManagement", label: "status" }),
            template:{
                type: "twoLineTextFields",
                fieldList: [{
                    id: "status",
                    options: [
                        {
                            id: "status",
                            value: "Active",
                            conditionClass: roleClass.greenChip 
                        },
                        {
                            id: "status",
                            value: "Inactive",
                            conditionClass: roleClass.darkRedChip 
                        }
                    ]
                }]
            }
        },
        {
            id: "action",
            name: getLabel({ module: "userManagement", label: "action" }),
            template: {
                type: "clickableIconBlock",
                columnAlign: "right",
                iconClickAction: ((event) => { userDeleteAction(event) }),
                icons: [
                    {
                        id: "delete",
                        name: getLabel({ module: "userManagement", label: "delete" }),
                        alt: getLabel({ module: "userManagement", label: "delete" }),
                        iconLink: deleteIcon,
                        iconClass: roleClass.pointerClass
                    }
                ]
            },
        },
    ];

    const {isModal, roleInfo} = props;
    const [snackText, setSnackText] = useState("");
    const [snackVariant, setSnackVariant] = useState("");
    const [roleUserList, setRoleUserList] = useState([]);
    const [ isDeleteModal, setIsDeleteModal ] = useState(false); 
    const [ clickedUser, setClickedUser ] = useState({}); 

    useEffect(() => {
        getRoleUserData(roleInfo?.roleId);
    },[roleInfo]);

    const removeUserFromRole = () => {
        http_Request(
        {
            url: API_URL.userManagement.roles.REMOVE_USER_FROM_ROLE.replace("{userId}", clickedUser.userId),
            method: 'DELETE',
            bodyData: [roleInfo.roleId]
        },
        function successCallback(response) {
            console.log("response", response.data);
            setSnackVariant("success");
            setSnackText("User " + clickedUser.username + " is Removed from the Role " + roleInfo?.roleName + " Successfully !");
            getRoleUserData(roleInfo?.roleId);
        },
        function errorCallback(error) {
            console.log("error", error);
        });
    }

    const getRoleUserData = (roleId) => {
        http_Request(
        {
            url: API_URL.userManagement.roles.GETUSERSBYROLE.replace("{roleId}", roleId),
            method: 'GET'
        },
        function successCallback(response) {
            let userList = response.data;
            console.log("userList", userList);
            let modifiedUsersList = userList.map((sinleUser) => {
                return({
                    ...sinleUser,
                    status: sinleUser.enabled ? "Active" : "Inactive"
                })
            });
            setRoleUserList([...modifiedUsersList]);
        },
        function errorCallback(error) {
            console.log("error", error);
        });
    }

    const userDeleteAction = (event) => {
        let userId = event.target.id.split("_")[1];
        roleUserList.map((singleUser) => {
            if(userId.toString() === singleUser.userId.toString()){
                setClickedUser({...singleUser});
            }
        })
        setIsDeleteModal(true);
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
                { getLabel({ module: "userManagement", label: "usersList" }) }
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
                <ConfirmationModal
                    classes={classes}
                    isConfirmationModal={isDeleteModal}
                    closeConfirmationAction={() => {
                        setIsDeleteModal(false);
                    }}
                    modalConfirmAction={() => {
                        setIsDeleteModal(false);
                        removeUserFromRole();
                    }}
                    confirmationModalHeader={ getLabel({ module: "userManagement", label: "deleteUser" }) }
                    confirmationModalContent={ "Are You Sure to Delete the User " + clickedUser.username + " from the Role " + roleInfo?.roleName }
                    noBtnId={ getLabel({ module: "userManagement", label: "cancel" }) }
                    yesBtnId={ getLabel({ module: "userManagement", label: "deleteUser" }) }
                />
                <Grid>
                    <Grid container display="flex" spacing={2}>
                        <Grid item xs={12} sm={12} md={4}>
                            <Typography className={ roleClass.headingLabel }>{ getLabel({ module: "userManagement", label: "roleId" }) }</Typography>
                            <Typography className={ roleClass.valueLabel }>{ roleInfo?.roleId }</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <Typography className={ roleClass.headingLabel }>{ getLabel({ module: "userManagement", label: "roleName" }) }</Typography>
                            <Typography className={ roleClass.valueLabel }>{ roleInfo?.roleName }</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <Typography className={ roleClass.headingLabel }>{ getLabel({ module: "userManagement", label: "description" }) }</Typography>
                            <Typography className={ roleClass.valueLabel }>{ roleInfo?.description }</Typography>
                        </Grid>
                    </Grid>

                    <Box mt={2} mb={2}>
                        {
                            roleUserList.length ?
                            <TableComponent
                                classes={ classes }
                                columns={ columnData }
                                rows={ roleUserList }
                                uniqueField="userId"
                                pageNo={ 0 }
                                pageDataCount={ 0 }
                                isPagination={ false }
                                datatotalCount={ roleUserList.length }
                            />
                            :
                            <Typography className={ classes.textRed }>{ getLabel({ module: "userManagement", label: "noUsersAreAssignedToThisRole" }) }</Typography>
                        }
                    </Box>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default RoleUsers;