import React, {useState} from 'react';
import {
    Button,
    Grid,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    Slide,
    Typography
  } from '@mui/material';
import { useStyles } from '../../../assets/styles/styles';``
import { PasswordRestStyle } from './PasswordRestStyle';
import { useNavigate } from 'react-router-dom';
import { camelCaseModifier } from '../common/CamelCaseConverter';
import classNames from 'classnames';
import Input from '../common/material/Input';
import {getLabel} from '../shared/localization';
import { http_Request } from '../shared/HTTP_Request';
import { API_URL } from '../shared/API_URLS';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {jwtDecode} from 'jwt-decode';
import Snackbar from "../common/Snackbar";



import maleAvatarRounded from "../../../assets/image/genderAvatar/male-avatar-full-opocity.svg";
import femaleAvatarRounded from "../../../assets/image/genderAvatar/female-avatar-full-opocity.svg";



const Transition = React.forwardRef(function Transition (props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
});

const PasswordRest = (props) => {
    const classes = useStyles();
    const passwordResetClass = PasswordRestStyle();

   
    const {tokenDetail, isPasswordResetModal} = props;

    const [isOpenModal, setIsOpenModal] = useState(isPasswordResetModal);
    const [userDetail, setUserDetail] = useState({});
    const [currentPassword, setCurrentPassword] = useState("");
    const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
    const [isCurrentPasswordError, setIsCurrentPasswordError] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isNewPasswordError, setIsNewPasswordError] = useState(false);

    const [confirmedNewPassword, setConfirmedNewPassword] = useState("");
    const [isConfirmedNewPasswordVisible, setIsConfirmedNewPasswordVisible] = useState(false);
    const [isConfirmedNewPasswordError, setIsConfirmedNewPasswordError] = useState(false);
    
    const [isPasswordMismatchError, setIsPasswordMismatchError] = useState(false);
    const [isResetSucess, setIsResetSucess] = useState(false);

    const [snackText, setSnackText] = React.useState("");
    const [snackVariant, setSnackVariant] = React.useState("");

    
        const navigate = useNavigate();

    React.useEffect(() => {
        getPersonDetail();
      }, []);
    
    const getPersonDetail = () => {
       
        let profileId = JSON.parse(localStorage.getItem("userDetail"))?.profileId;
        http_Request({
            url: API_URL.userManagement.person.INFO_BY_ID.replace("{profileId}", profileId),
            method: "GET",
        },
        function successCallback(response) {
            console.log("response of person", response);
            setUserDetail(response.data);
        },
        function (error) {
            console.log("Error", error);
        },
        { token: tokenDetail });
    };

    const submitAction = () => {
        const passwordformat = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
        let canReset = true;
        if(!currentPassword){
            setIsCurrentPasswordError(true);
            canReset = false;
        }
        if(!newPassword || !newPassword.match(passwordformat)){
            setIsNewPasswordError(true);
            canReset = false;
        }
        if(newPassword !== confirmedNewPassword){
            setIsPasswordMismatchError(true);
            canReset = false;
        }

        if(canReset){
            let savingPayload = {
                username: jwtDecode(tokenDetail).username,
                password: currentPassword,
                newPassword: newPassword,
                newRetypePassword: confirmedNewPassword
            };
            http_Request({
                url: API_URL.RESET_PASSWORD,
                method: "POST",
                bodyData: savingPayload
            },
            function successCallback(response) {
                console.log("response of reset", response);
                localStorage.setItem("jwtToken", tokenDetail);

                const decodeTokenDetail = jwtDecode(tokenDetail);
                const permissionArray = decodeTokenDetail.privilege;
                // define object of permissions
                var permissionObject = {};
                var permissionList = permissionArray.map((singlePermission) => {
                    permissionObject[singlePermission.authority] = true;
                    return(singlePermission.authority);
                });
                
                localStorage.setItem("permissions", JSON.stringify(permissionList));
                localStorage.setItem("permissionObject", JSON.stringify(permissionObject));
                setIsResetSucess(true);
            },
            function (error) {
                console.log("Error", error);
                setSnackVariant("error");
                setSnackText("Temporary Password is Incorrect !");
            }, 
            { token: tokenDetail });
        }
    }

    const resetSnack = () => {
        setSnackText("")
        setSnackVariant("")
    }

    return(
        <>
            <Snackbar text={snackText} variant={snackVariant} reset={resetSnack}/>
            { 
                isResetSucess && !props?.location?.state && 
              
                  navigate("/admin")
            }
            {/* { 
                isResetSucess && props?.location?.state?.prevUrl && (localStorage.getItem("prevPermissions") === localStorage.getItem("permissions")) && 
                <useNavigate to={{pathname: props?.location?.state.prevUrl}}/>
            }
            { 
                isResetSucess && props?.location?.state?.prevUrl && (localStorage.getItem("prevPermissions") !== localStorage.getItem("permissions")) && 
                <useNavigate to={{pathname: "/exotic"}}/>
            } */}
            <Dialog
                open={isOpenModal}
                TransitionComponent={Transition}
                aria-labelledby='payment-modal-dialog-title'
                aria-describedby='payment-modal-dialog-description'
                scroll='body'
                maxWidth='xs'
                fullWidth={true}
                >
                <DialogContent className={ classNames(classes.popupPaper, passwordResetClass.mainWrapper)}>
                    <Grid>
                        <Grid className={passwordResetClass.outLineBox}>
                            <Grid>
                                <img
                                    className={ passwordResetClass.profileImg }
                                    
                                    src={
                                        
                                        userDetail.imagePath ?
                                        API_URL.imageBase + userDetail.imagePath
                                        : 
                                        (userDetail.gender === "Male" ?
                                        maleAvatarRounded
                                        : 
                                        femaleAvatarRounded)
                                    }
                                    height={80}
                                />
                            </Grid>
                            <Box mt={5} mb={2} container display="flex" justifyContent="center">
                                <Typography className={passwordResetClass.nameLabel}>
                                    { camelCaseModifier(userDetail?.firstNameEn) + " " + camelCaseModifier(userDetail?.familyNameEn) }
                                </Typography>
                            </Box>

                            <Grid className={passwordResetClass.inputFieldWrapper}>
                                <Grid className={passwordResetClass.singleInputBlock}>
                                    <Input
                                        id="currentPassword"
                                        name="currentPassword"
                                        variant="outlined"
                                        error={ isCurrentPasswordError }
                                        // className={ userClass.inputClass }
                                        placeholder="Password"
                                        label="Current Password"
                                        autoComplete='off'
                                        value={ currentPassword }
                                        size="small"
                                        onChange={ (e) => { setCurrentPassword(e.target.value); setIsCurrentPasswordError(false); } }
                                        type={ isCurrentPasswordVisible ? "text" : "password" }
                                        helperText={ 
                                            isCurrentPasswordError ?  
                                            getLabel({ module: "userManagement", label: "required" }) + "!"
                                            : 
                                            ""
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                isCurrentPasswordVisible ?
                                                <VisibilityOffIcon 
                                                    className={ classes.clickableBlock }
                                                    onClick={ () => { setIsCurrentPasswordVisible(false) } }
                                                />
                                                :
                                                <VisibilityIcon 
                                                    className={ classes.clickableBlock }
                                                    onClick={ () => { setIsCurrentPasswordVisible(true) } }
                                                />
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid className={passwordResetClass.singleInputBlock}>
                                    <Input
                                        id="newPassword"
                                        name="newPassword"
                                        variant="outlined"
                                        error={ isNewPasswordError }
                                        // className={ userClass.inputClass }
                                        placeholder="Password"
                                        label="New Password"
                                        autoComplete='new-password'
                                        size="small"
                                        value={ newPassword }
                                        onChange={ (e) => { 
                                            setNewPassword(e.target.value); 
                                            setIsNewPasswordError(false); 
                                            setIsPasswordMismatchError(false);
                                        } }
                                        type={ isNewPasswordVisible ? "text" : "password" }
                                        helperText={ 
                                            isNewPasswordError ?  
                                            getLabel({ module: "userManagement", label: "passwordMustContainsMinimumEightCharactersAtLeastOneUppercaseLetterOneLowercaseLetterOneNumberAndOneSpecialCharacter" })
                                            : 
                                            ""
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                isNewPasswordVisible ?
                                                <VisibilityOffIcon 
                                                    className={ classes.clickableBlock }
                                                    onClick={ () => { setIsNewPasswordVisible(false) } }
                                                />
                                                :
                                                <VisibilityIcon 
                                                    className={ classes.clickableBlock }
                                                    onClick={ () => { setIsNewPasswordVisible(true) } }
                                                />
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid className={passwordResetClass.singleInputBlock}>
                                    <Input
                                        id="confirmedNewPassword"
                                        name="confirmedNewPassword"
                                        variant="outlined"
                                        error={ isConfirmedNewPasswordError || isPasswordMismatchError }
                                        // className={ userClass.inputClass }
                                        placeholder="Password"
                                        label="Confirm New Password"
                                        autoComplete='new-password'
                                        size="small"
                                        value={ confirmedNewPassword }
                                        onChange={ (e) => { 
                                            setConfirmedNewPassword(e.target.value); 
                                            setIsConfirmedNewPasswordError(false); 
                                            setIsPasswordMismatchError(false);
                                        } }
                                        type={ isConfirmedNewPasswordVisible ? "text" : "password" }
                                        helperText={ 
                                            isConfirmedNewPasswordError ?  
                                            getLabel({ module: "userManagement", label: "passwordMustContainsMinimumEightCharactersAtLeastOneUppercaseLetterOneLowercaseLetterOneNumberAndOneSpecialCharacter" })
                                            : 
                                            (
                                                isPasswordMismatchError ? 
                                                getLabel({ module: "userManagement", label: "passwordMismatchFound" })
                                                : 
                                                ""
                                            )
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                isConfirmedNewPasswordVisible ?
                                                <VisibilityOffIcon 
                                                    className={ classes.clickableBlock }
                                                    onClick={ () => { setIsConfirmedNewPasswordVisible(false) } }
                                                />
                                                :
                                                <VisibilityIcon 
                                                    className={ classes.clickableBlock }
                                                    onClick={ () => { setIsConfirmedNewPasswordVisible(true) } }
                                                />
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Box mt={4} mb={2}>
                                    <Button 
                                        className={ classNames(classes.largePrimaryBtn, passwordResetClass.submitBtn) }
                                        onClick={ () => submitAction() }
                                    >
                                        Submit
                                    </Button>
                                        
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                </Dialog>
            
        </>
    );
}

export default PasswordRest;