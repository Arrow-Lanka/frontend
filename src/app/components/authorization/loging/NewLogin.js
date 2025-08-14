import React, { useState, useEffect } from 'react';
import {jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Grid, LinearProgress, Paper, Checkbox, InputAdornment, InputLabel, FormControl } from '@mui/material';


import { http_Request } from '../../shared/HTTP_Request';
import { API_URL } from '../../shared/API_URLS';
import { newLoginStyle } from './NewLoginStyle';
import { useStyles } from '../../../../assets/styles/styles';
import { getLabel } from '../../shared/localization';
import PasswordRest from '../PasswordRest';


// import { handleHospitalDeciderSelectHospital } from '../../../actions/hospitalDeciderAction';

const NewLogin = (props) => {

    
    //All the states
    const [inputValues, setInputValues] = useState({ userName: '', password: '' })
    const [loginSucess, setLoginSucess] = useState({ isLoginSucess: false, showProgressBar: false, emptyErrorMessage: '' });
    const [values, setValues] = useState({ showPassword: true, passwordType: 'password' })
    const [language, setLanguage] = useState({ isArabic: false });
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [tokenDetail, setTokenDetail] = useState({});
    const [isHospitalSelection, setIsHospitalSelection] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
    
    //Style import's
    const classes = newLoginStyle();
    const commonStyle = useStyles();

    useEffect(() => {
        handleComponentOnMount();
    }, []);

    const handleComponentOnMount = () => {
        setLoginSucess({ ...loginSucess, isLoginSucess: localStorage.getItem("jwtToken") ? true : false });
        localStorage.setItem("language", "en");
    }

    //for identifying user name or password changed and call authenticate without duplicates
    const isFieldPressedEnterRef = React.useRef();
    const isLoginDataChangeRef = React.useRef();

    const handleUserName = (e) => {
        let user = document.getElementById('userName')
        // console.log("useruser",user)
        setInputValues({ ...inputValues, userName: e.target.value });
        handleKeyboardEnterFunction(user);
        isLoginDataChangeRef.current = true;
    }

    const handlePassword = (e) => {
        let pass = document.getElementById('password');
        // console.log(pass,"passpass")
        setInputValues({ ...inputValues, password: e.target.value });
        handleKeyboardEnterFunction(pass);
        isLoginDataChangeRef.current = true;
    }

    const handleLanguage = (e) => {
        localStorage.setItem("language", e.target.id);
        if (e.target.id === "arb") {
            setLanguage({ ...language, isArabic: true });
        } else {
            setLanguage({ ...language, isArabic: false });
        }
    }
    //Listener for the key press enter
    const listener = function (event) {
        if (event.keyCode === 13  && isLoginDataChangeRef.current) {
            event.preventDefault();
            document.getElementById('loginButton').click();
            isFieldPressedEnterRef.current = true;
            isLoginDataChangeRef.current = false;
        }
    }
    //function attaching the event listener
    const handleKeyboardEnterFunction = (e) => {
        if(isFieldPressedEnterRef.current){
            isFieldPressedEnterRef.current = false;
        }
        e.addEventListener('keyup', listener)
    }

    const submitForm = () => {
        
       
         console.log("token", localStorage.getItem("jwtToken"));
        if (inputValues.userName && inputValues.password && !localStorage.getItem("jwtToken")) {
            setLoginSucess({ ...loginSucess, showProgressBar: true, emptyErrorMessage: '' });
            http_Request({
                url: API_URL.Login,
                method: 'POST',
                bodyData: {
                    "username": inputValues.userName,
                    "password": inputValues.password,
                    "deviceType": "WEB"
                }
            }, function (response) {
                console.log(response.data,"response.dataresponse.data")
                setTokenDetail(response.data.jwtToken);
                const decodeTokenDetail = jwtDecode(response.data.jwtToken);
                localStorage.setItem("userDetail", JSON.stringify(decodeTokenDetail));

                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", localStorage.getItem("userDetail"));
                
                // set passwordReset modal show/hide
                setIsResetPassword(decodeTokenDetail.tempPassword === 1 ? true :  false);
                
                if(!decodeTokenDetail.tempPassword){
                    localStorage.setItem("jwtToken", response.data.jwtToken);
                    const permissionArray = decodeTokenDetail.privilege;
                    // define object of permissions
                    var permissionObject = {};
                    var permissionList = permissionArray.map((singlePermission) => {
                        permissionObject[singlePermission.authority] = true;
                        return(singlePermission.authority);
                    });
                    
                    localStorage.setItem("permissions", JSON.stringify(permissionList));
                    localStorage.setItem("permissionObject", JSON.stringify(permissionObject));

                    let appLanguage = localStorage.getItem("language");
                    if(!(appLanguage?.toString && appLanguage.toString())){
                        localStorage.setItem("language", language.isArabic? "arb" : "en")
                    }

                    const loginUserHospitals = (Array.isArray(decodeTokenDetail?.hospitals) && decodeTokenDetail?.hospitals) || [];

                    // hospital decider based on Multiple Hospital allocation to user
                    // hospital admin (enum (personType : 6)) is allocated to only one hospital within system
                    // super admin (enum(personType : 6)) will not have a particular selection of a hospital
                    if(loginUserHospitals?.length>1 && (decodeTokenDetail?.personType !== 6)){
                        setIsHospitalSelection(true);
                    }else{
                        // auto-select first hospital when one hospital is allocated for login user
                        // dispatch(handleHospitalDeciderSelectHospital(loginUserHospitals?.[0]))
                    }
                }
                setTimeout(() => {
                    setLoginSucess({ ...loginSucess, isLoginSucess: true, showProgressBar: false });
                }, 1000);

            }, function (error) {
                console.log("error", error);
                setLoginSucess({ ...inputValues, emptyErrorMessage: getLabel({ module: "Login", label: "Invalid user name or password !" }), showProgressBar: false });
            });
        }
        else if (inputValues.userName && !localStorage.getItem("jwtToken")) {
            setLoginSucess({ ...inputValues, emptyErrorMessage: getLabel({ module: "auth", label: "pleaseEnterPassword" }), showProgressBar: false });
        } else if (inputValues.password && !localStorage.getItem("jwtToken")){
            setLoginSucess({ ...inputValues, emptyErrorMessage: getLabel({ module: "auth", label: "pleaseEnterUsername" }), showProgressBar: false });
        } else if (!inputValues.userName && !inputValues.password) {
            setLoginSucess({ ...inputValues, emptyErrorMessage: getLabel({ module: "auth", label: "pleaseEnterUsernameAndPassword" }), showProgressBar: false });
        } else if(localStorage.getItem("jwtToken")){
            console.log(localStorage.getItem("jwtToken"));
            setLoginSucess({ ...inputValues, emptyErrorMessage: "A User is Already LoggedIn. Please Logout that First", showProgressBar: false });
        }
    }
    //field change
    React.useEffect(()=>{
        if(isFieldPressedEnterRef.current){
            let pass = document.getElementById('password');
            pass.removeEventListener("keyup", listener)
        }
    },[isFieldPressedEnterRef.current])
    //unmount cleanup
    React.useEffect(()=>{
        return () =>{
            let pass = document.getElementById('password');
            if(pass){
                pass.removeEventListener("keyup", listener);
            }
        }
    },[])

    return (
       
        <>
            { 
                !isResetPassword && loginSucess.isLoginSucess  && 
                // <useNavigate to={{pathname: "/exotic"}}/>
                navigate("/alt")
            }
           
            { 
                 !isResetPassword && loginSucess.isLoginSucess  && (localStorage.getItem("prevPermissions") !== localStorage.getItem("permissions")) && 
           navigate("/")
          }

            {/* password resetting module */}
            {
                isResetPassword &&
                <PasswordRest
                    isPasswordResetModal = { isResetPassword }
                    tokenDetail = { tokenDetail }
                />
            }

            {/* hospital decider module
            {
                isHospitalSelection && !isResetPassword && loginSucess?.isLoginSucess  && (
                    <Redirect to={{pathname: '/exotic/hospitalDecider'}} />
                )
            } */}
            <Grid container spacing={0} alignItems="center" alignContent="center" justifyContent="center" className={classes.outerDiv} >
                {
                
                    !isResetPassword &&
                    <Grid container justifyContent="center" alignItems="center" item xs={12}  >
                        <div className={classes.outerPaperMiddle}>
                            <Paper className={classes.paperMiddle}>
                                <Grid container justifyContent="center" item xs={12} spacing={0}>
                                    <Grid >
                                        <Grid   style={{padding:"20px"}}>
                                            <Grid container justifyContent="center">
                                            {loginSucess.emptyErrorMessage &&
                                                <span className={classes.loginValidationMessage}>{loginSucess.emptyErrorMessage}</span>
                                            }
                                            </Grid>
                                            <Grid container justifyContent="center">
                                                <img src={require('../../../../assets/image/altLogo-removebg.png')} alt='Exotic Holiday Logo' className={classes.exoticImage}/>
                                            </Grid>
                                            <Grid container justifyContent="center">
                                                <label className={classes.welcomWordTypo}>{"Welcome"}</label>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container justifyContent="center" item xs={12} spacing={1}  style={{marginTop:"-25px"}}>
                                        <Grid container justifyContent="center" item xs={12}>
                                           <FormControl className={classes.formControl}>
                                                <InputLabel  className={classes.inputLables} htmlFor="standard-adornment-username">User Name</InputLabel>
                                                <Input
                                                    id="userName"
                                                    type={'text'}
                                                    fullWidth="false"
                                                    onChange={handleUserName}
                                                    value={inputValues.userName}
                                                    endAdornment={
                                                    <InputAdornment position="end">
                                                        <img src={require('../../../../assets/image/icons/userName_icon.png')} style={{width:"20px", height:"20px"}}/>
                                                    </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid container justifyContent="center" item xs={12}>
                                           <FormControl className={classes.formControl}>
                                                <InputLabel className={classes.inputLables} htmlFor="standard-adornment-password">Password</InputLabel>
                                                <Input
                                                    id="password"
                                                    value={inputValues.password}
                                                    type={'password'}
                                                    fullWidth="false"
                                                    onChange={handlePassword}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <img src={require('../../../../assets/image/icons/password_icon.png')} style={{width:"20px", height:"20px"}}/>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container justifyContent="center">
                                        <Grid style={{margin:"25px", padding:"25px"}}>
                                            <Button
                                                variant="contained"
                                                id="loginButton"
                                                className={commonStyle.mediumPrimaryBtn}
                                                onClick={submitForm}
                                                disabled={loginSucess.showProgressBar}
                                                style={{cursor:"pointer", zIndex:1}}
                                            >
                                                {"Log In"}
                                            </Button>     
                                            {
                                                loginSucess.showProgressBar &&
                                                <div className={classes.progressBar}>
                                                    <LinearProgress />
                                                </div>
                                            } 
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </div>
                    </Grid>
                }
            </Grid>
        </>
    )
}
export default NewLogin;