
import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import CancelIcon from '@mui/icons-material/Cancel'
import { Dialog, DialogTitle, DialogContent, Slide, Typography, TextField } from '@mui/material'
import { Grid, Button, Box } from "@mui/material";
import classNames from 'classnames';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete } from "@mui/lab"
//commons and class imports
import { useStyles } from "../../../../../assets/styles/styles";
import { UsersStyle } from './UsersStyle';
import DropDown from '../../../common/DropDown';
import Input from '../../../common/material/Input';
import CheckboxField from '../../../common/material/CheckboxField';
import RoleAssignment from './RoleAssignment';
import SelectionAutoComplete from '../../../common/SelectionAutoComplete';
import { http_Request } from '../../../shared/HTTP_Request';
import { API_URL } from '../../../shared/API_URLS';
import { getLabel } from '../../../shared/localization';
import Snackbar from '../../../common/Snackbar'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const NewAndUpdateUser = (props) => {
    const classes = useStyles();
    const userClass = UsersStyle();

    const {isModal, isEditMode, userDetails, staffTypeOptions} = props;

    const [personType, setPersonType] = useState("default");
    const [selectedPersonTypeOption, setSelectedPersonTypeOption] = useState(null);
    const [personTypeOptions, setPersonTypeOptions] = useState([]);
    const [isPersonTypeError, setIsPersonTypeError] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [isUserNameError, setIsUserNameError] = useState(false);
    // const [password, setPassword] = useState("");
    // const [isPasswordError, setIsPasswordError] = useState(false);
    // const [confirmedPassword, setConfirmedPassword] = useState("");
    // const [isConfirmedPasswordError, setIsConfirmedPasswordError] = useState(false);
    // const [isPasswordMismatchError, setIsPasswordMismatchError] = useState(false);
    // const [isTemporaryPassword, setIsTemporaryPassword] = useState(false);
    const [roleSearchKey, setRoleSearchKey] = useState("");
    const [employeeSearchKey, setEmployeeSearchKey] = useState("");
    const [employeeOptionsList, setEmployeeOptionsList] = useState([]);
    const [isActive, setIsActive] = useState( !isEditMode || userDetails.enabled);
    const [isSearchNotDoneIssue, setIsSearchNotDoneIssue] = useState(false);
    const [selectedRoleList, setSelectedRoleList] = useState([]);
    const [snackText, setSnackText] = useState("");
    const [snackVariant, setSnackVariant] = useState("");
    const [selectedPersonId, setSelectedPersonId] = useState();
    const [hospitalList, setHospitalList] = useState(
        {
            options: [],
            isLoading: false
        }
    )
    const [selectedHospital, setSelectedHospital] = useState("");
    const [personTypeOfSelectedPerson, setPersonTypeOfSelectedPerson] = useState(userDetails?.personType);
    // const [isPasswordVisibile, setIsPasswordVisibile] = useState(false);
    // const [isConfirmedPasswordVisibile, setIsConfirmedPasswordVisibile] = useState(false);

    // const passwordformat = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    
    /**
    |--------------------------------------------------
    | Redux Integrations
    |--------------------------------------------------
    */
   // const { hospitalDetails } = useSelector((state) => state.hospitalDetailsReducer);

    /**
    |--------------------------------------------------
    | Effect on mounted
    |--------------------------------------------------
    */
    useEffect(() => {
        // getPersonTypeOptions();
        if(isEditMode){
            setSelectedRoleList(userDetails.roles.map((singleRole) => {
                if(singleRole?.roleId?.toString() === userDetails?.defaultRole?.toString()){
                    singleRole["isDefault"] = true;
                }
                return(singleRole);
            }));
        }

        // set person types (don't mutate props) and normalize ids to strings
        const normalizedOptions = [
            { id: "default", name: "Please Select" },
            ...((staffTypeOptions || []).map(o => ({ ...o, id: o?.id != null ? String(o.id) : o.id, name: o?.name ?? o?.label ?? o?.value })))
        ];
        setPersonTypeOptions(normalizedOptions);

        // set initial selected option: prefer userDetails.personType when editing
        const initialMatchId = isEditMode ? String(userDetails?.personType ?? "default") : "default";
        const initialOption = normalizedOptions.find(opt => String(opt.id) === String(initialMatchId)) || normalizedOptions[0];
        setSelectedPersonTypeOption(initialOption);
        setPersonType(String(initialOption?.id ?? "default"));

        setHospitalList(prev=>({
            ...prev,
            isLoading: true
        }))
        //get hospital list
        getHospitalsList()
    },[]);

    /**
    |--------------------------------------------------
    | Effect on hospital details and user details
    |--------------------------------------------------
    */
    useEffect(()=>{
        let foundHospitalDetail = hospitalList?.options && hospitalList.options.find(
            singleHospital => singleHospital?.hospitalId === userDetails?.hospitalId
        );
        foundHospitalDetail && setSelectedHospital(foundHospitalDetail)
    },[userDetails?.hospitalId, hospitalList?.options])

    /**
    |--------------------------------------------------
    | Effect on Employee search
    |--------------------------------------------------
    */
    useEffect(() => {
        if(employeeSearchKey.length > 2 && personType !== "default"){
            employeeSearchAction(employeeSearchKey);
        }else if(employeeSearchKey.length <= 2){
            setEmployeeOptionsList([]);
        }
        setIsSearchNotDoneIssue(false);
    }, [employeeSearchKey])

    /**
    |--------------------------------------------------
    | Save / Update user action
    |--------------------------------------------------
    */
    const saveUpdateAction = () => {
        let canSave = true; 
        if(!isEditMode){
            if(!firstName || !lastName || !mobileNumber || !email){
                setIsSearchNotDoneIssue(true);
                setIsPersonTypeError(personType === "default");
                canSave = false;
            }
            if(!userName || userName.length < 5){
                setIsUserNameError(true);
                canSave = false;
            }
            if(personTypeOfSelectedPerson === 6 && !selectedHospital?.hospitalId){
                setSnackVariant("error");
                setSnackText(getLabel({ module: "userManagement", label: "pleaseSelectAHospital" }));
                canSave = false;
            }
        }

        if(canSave){
            let savingData = {
                personId: selectedPersonId,
                firstName: firstName,
                lastName: lastName,
                username: userName,
                email: email,
                phone: mobileNumber,
                roles: selectedRoleList.map((singleRole) => singleRole.roleId),
                enabled: isActive ? 1 : 0,
                hospitalId: hospitalDetails?.hospitalId
            };

            selectedRoleList.map((singleRole) => {
                if(singleRole.isDefault){
                    savingData["defaultRole"] = singleRole.roleId;
                }
            })

            if(personTypeOfSelectedPerson === 6){
                savingData["hospitalId"] = selectedHospital?.hospitalId;
            }

            !isEditMode && (
                http_Request(
                {
                    url: API_URL.userManagement.users.POST,
                    method: 'POST',
                    bodyData: savingData
                },
                function successCallback(response) {
                    console.log("response", response);
                    props.closeAction("saved", userName);
                },
                function errorCallback(error) {
                    setSnackVariant("error");
                    setSnackText(getLabel({ module: "userManagement", label: "UserIsAlreadyCreatedForThisPersonOrSameUserName" }));
                })
            )

            if(isEditMode){
                let removedRoleList = [];
                let addedRoleList = [];

                userDetails.roles.map((singleUserAssignedRole) => {
                    if(!selectedRoleList.some((singleSelectedRole) => (singleUserAssignedRole?.roleId?.toString() === singleSelectedRole?.roleId?.toString()))){
                        removedRoleList.push(singleUserAssignedRole);
                    }
                });
                selectedRoleList.map((singleSelectedRole) => {
                    if(!userDetails?.roles?.some((singleUserAssignedRole) => (singleUserAssignedRole?.roleId?.toString() === singleSelectedRole?.roleId?.toString()))){
                        addedRoleList.push(singleSelectedRole);
                    }
                }); 

                let editRequestPayload = { 
                    enabled: isActive ? 1 : 0,
                    addedRoles: addedRoleList.map((singleAddedRole) => singleAddedRole.roleId),
                    deletedRoles: removedRoleList.map((singleRemovedRole) => parseInt(singleRemovedRole.roleId)),
                };
                if(personTypeOfSelectedPerson === 6){
                    editRequestPayload["hospitalId"] = selectedHospital?.hospitalId;
                }
                let tempDefaultRoleId;
                if(selectedRoleList?.length > 0){
                    selectedRoleList.map((singleRole) => {
                        if(singleRole.isDefault){
                            tempDefaultRoleId = parseInt(singleRole.roleId);
                        }
                    });
                    editRequestPayload["defaultRole"] = tempDefaultRoleId;
                }

                http_Request(
                {
                    url: API_URL.userManagement.users.EDITUSERS.replace('{userId}', userDetails.userId),
                    method: 'PUT',
                    bodyData: editRequestPayload,
                },
                function successCallback(response) {
                    console.log("response", response);
                    props.closeAction("saved", userDetails.username);
                },
                function errorCallback(error) {
                    console.log("error", error);
                });
            }
        }
    }

    /**
    |--------------------------------------------------
    | Employee Search action
    |--------------------------------------------------
    */
    const employeeSearchAction = (searchingKey) => {
        http_Request(
        {
            url: API_URL.userManagement.users.GET_USERS_BY_NAME_AND_ID.replace("{personType}", personType).replace("{searckKey}", searchingKey),
            method: 'GET'
        },
        function successCallback(response) {
            setEmployeeOptionsList(response.data.map((singleEmployee) => {
                return({
                    ...singleEmployee,
                    employeeName: singleEmployee.staffId + " " + singleEmployee.firstNameEn + " " + singleEmployee.familyNameEn
                });
            }));
        },
        function errorCallback(error) {
            setEmployeeOptionsList([]);
        });
    }

    /**
    |--------------------------------------------------
    | Set data fields when search callback
    |--------------------------------------------------
    */
    const employeeSectingAction = (e, selected) => {
        selected?.firstNameEn && setFirstName(selected.firstNameEn);
        selected?.familyNameEn && setLastName(selected.familyNameEn);
        selected?.mobile && setMobileNumber(selected.mobile);
        selected?.companyEmail && setEmail(selected.companyEmail);
        selected?.personId && setSelectedPersonId(selected.personId);
        personType && setPersonTypeOfSelectedPerson(personType);
    }

    // Handle staff type dropdown changes robustly (accepts native event or option object)
    const handlePersonTypeChange = (e, optionValue) => {
        // when DropDown passes selected option object (Autocomplete-like)
        if(optionValue && typeof optionValue === "object" && optionValue.id !== undefined){
            setSelectedPersonTypeOption(optionValue);
            setPersonType(String(optionValue.id));
        } else {
            // when native select passes event with target.value (primitive id)
            const valueFromEvent = e?.target?.value ?? optionValue ?? "";
            const matched = personTypeOptions.find(opt => String(opt.id) === String(valueFromEvent));
            setSelectedPersonTypeOption(matched || null);
            setPersonType(String(valueFromEvent ?? ""));
        }
        setEmployeeSearchKey("");
        setIsPersonTypeError(false);
    };

    /**
    |--------------------------------------------------
    | Reset Snack
    |--------------------------------------------------
    */
    const resetSnack = () => {
        setSnackText();
        setSnackVariant();
    };

    /**
    |--------------------------------------------------
    | Search for Hospital List 
    |--------------------------------------------------
    */
    const getHospitalsList = () => {
        // implementation omitted in sample
    }

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
                { isEditMode ? getLabel({ module: "userManagement", label: "editUser" }) : getLabel({ module: "userManagement", label: "addUser" }) }
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
                    {
                        isEditMode &&
                        <Box container display="flex" justifyContent="space-between" mb={3}>
                            <Grid item>
                                <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "staffType" }) }</Typography>
                                <Typography className={ userClass.userValueLabel }>{ personTypeOptions.filter((singlePersonType) => (singlePersonType.id === userDetails.personType ))[0]?.name }</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "employeeId" }) }</Typography>
                                <Typography className={ userClass.userValueLabel }>{ userDetails.staffId }</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "firstName" }) }</Typography>
                                <Typography className={ userClass.userValueLabel }>{ userDetails.firstName }</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "lastName" }) }</Typography>
                                <Typography className={ userClass.userValueLabel }>{ userDetails.lastName }</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "userName" }) }</Typography>
                                <Typography className={ userClass.userValueLabel }>{ userDetails.username }</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "email" }) }</Typography>
                                <Typography className={ userClass.userValueLabel }>{ userDetails.email }</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "mobileNumber" }) }</Typography>
                                <Typography className={ userClass.userValueLabel }>{ userDetails.phone }</Typography>
                            </Grid>
                        </Box>
                    }

                    {
                        !isEditMode &&
                        <Grid container display="flex" spacing={2}>
                            <Grid item xs={3}>
                                <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "staffType" }) }</Typography>
                                <DropDown
                                    id="staffType"
                                    name="staffType"
                                    variant="outlined"
                                    // pass option object when DropDown supports it, otherwise pass primitive id
                                    value={ selectedPersonTypeOption ?? personType }
                                    handleChange={ handlePersonTypeChange }
                                    optionData={ personTypeOptions }
                                    formControlClass={ userClass.dropDownMainClass }
                                    size="small"
                                    error={ isPersonTypeError }
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "employee" }) }</Typography>
                                <SelectionAutoComplete
                                    dataList={ employeeOptionsList }
                                    autoCompleteId="searchEmployee"
                                    classes={{
                                        root: userClass.inputClass
                                    }}
                                    autoCompleteDisplayName = { "employeeName" }
                                    autoCompleteSize="small"
                                    autoCompleteVariant="outlined"
                                    autoCompleteDropdownValue={true}
                                    inputChange={ (e) => { 
                                        setEmployeeSearchKey(e?.target?.value ? e.target.value : "");
                                        setIsPersonTypeError(e?.target?.value && personType === "default"); 
                                    } }
                                    inputValue={ employeeSearchKey }
                                    dropdownCallback={ (e, selected) => employeeSectingAction(e, selected) }
                                    placeholder={ getLabel({ module: "userManagement", label: "enterEmployee" }) }
                                    startIcon={ <SearchIcon/> }
                                    error={ isSearchNotDoneIssue }
                                />
                            </Grid>
                        </Grid>
                    }
                    <Grid container display="flex" spacing={2}>
                        {
                            !isEditMode &&
                            <Grid item xs={3}>
                                <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "firstName" }) }</Typography>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    variant="outlined"
                                    className={ userClass.inputClass }
                                    placeholder={ getLabel({ module: "userManagement", label: "firstName" }) }
                                    value={ firstName }
                                    disabled={true}
                                />
                            </Grid>
                        }
                        {
                            !isEditMode &&
                            <Grid item xs={3}>
                                <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "lastName" }) }</Typography>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    variant="outlined"
                                    className={ userClass.inputClass }
                                    placeholder={ getLabel({ module: "userManagement", label: "lastName" }) }
                                    value={ lastName }
                                    disabled={true}
                                />
                            </Grid>
                        }
                        {
                            !isEditMode &&
                            <Grid item xs={3}>
                                <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "mobileNumber" }) }</Typography>
                                <Input
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    variant="outlined"
                                    className={ userClass.inputClass }
                                    placeholder={ getLabel({ module: "userManagement", label: "mobileNumber" }) }
                                    value={ mobileNumber }
                                    disabled={true}
                                />
                            </Grid>
                        }
                        {
                            !isEditMode &&
                            <Grid item xs={3}>
                                <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "email" }) }</Typography>
                                <Input
                                    id="email"
                                    name="email"
                                    variant="outlined"
                                    className={ userClass.inputClass }
                                    placeholder={ getLabel({ module: "userManagement", label: "email" }) }
                                    value={ email }
                                    disabled={true}
                                />
                            </Grid>
                        }
                        {
                            !isEditMode &&
                            <Grid item xs={3}>
                                <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "userName" }) }</Typography>
                                <Input
                                    id="userName"
                                    name="userName"
                                    variant="outlined"
                                    error={ isUserNameError }
                                    className={ userClass.inputClass }
                                    placeholder={ getLabel({ module: "userManagement", label: "userName" }) }
                                    value={ userName }
                                    onChange={ (e) => { setUserName(e.target.value); setIsUserNameError(false) } }
                                />
                            </Grid>
                        }
                        {personTypeOfSelectedPerson === 6 && (
                            <Grid item xs={3}>
                                <Typography className={ userClass.addUserLabel }>{ getLabel({ module: "userManagement", label: "hospital" }) }</Typography>
                                <Autocomplete
                                    id='Hospital'
                                    name='Hospital'
                                    value={selectedHospital||""}
                                    getOptionSelected={ (option, value)=> option && value && option.hospitalId===value.hospitalId}
                                    onChange={(event, newValue) => {
                                        setSelectedHospital(newValue || null);
                                    }}
                                    options={(hospitalList?.options)||[]}
                                    getOptionLabel={(option)=>option["hospitalName"]?option["hospitalName"]:""}
                                    getOptionDisabled={(option)=>!!option.isDisabled}
                                    margin={"none"}
                                    placeholder={ getLabel({ module: "userManagement", label: "hospital" }) }
                                    fullWidth
                                    renderInput={(params) => (
                                        <Input
                                            {...params}
                                            variant="outlined"
                                            placeholder={ getLabel({ module: "userManagement", label: "hospital" }) }
                                            className={userClass.hospitalSearchField}
                                        />
                                    )}
                                    loading={hospitalList?.isLoading}
                                />
                            </Grid>
                        )}
                        <Grid item xs={6} container display="flex" alignItems= 'flex-end'>
                            <Grid>
                                <CheckboxField
                                    id="active"
                                    name="active"
                                    checked={ isActive }
                                    onChange={ (e) => { setIsActive(e.target.checked) } }
                                    label={ getLabel({ module: "userManagement", label: "active" }) }
                                    mainClassName={ userClass.centerCheckbox }
                                    disabled = { JSON.parse(localStorage.getItem("userDetail"))?.profileId === userDetails.personId }
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Input
                                id="search"
                                name="search"
                                variant="outlined"
                                className={ userClass.inputClass }
                                InputProps={{
                                    endAdornment: (
                                        <SearchIcon/>
                                    ),
                                }}
                                placeholder={ getLabel({ module: "userManagement", label: "searchForRole" }) }
                                value={ roleSearchKey }
                                onChange={ (e) => { setRoleSearchKey(e.target.value) } }
                            />
                        </Grid>
                    </Grid>

                    <Box mt={2} className={ userClass.roleSection }>
                        <Grid container display="flex">
                            <RoleAssignment
                                searchKey={ roleSearchKey }
                                roleSelectionCallback={ (roleList) => { setSelectedRoleList([...roleList]) } }
                                initialRoleList = { isEditMode ? userDetails.roles.map((singleRole) => ({ roleId: singleRole.roleId, roleName: singleRole.roleName, status: singleRole.status, isDefault: userDetails?.defaultRole?.toString() ===  singleRole?.roleId?.toString()})) : [] }
                            />
                        </Grid>
                    </Box>
                    
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button
                            className={ classes.outlineMediumSecondary }
                            onClick={ () => props.closeAction() }
                        >
                            { getLabel({ module: "userManagement", label: "cancel" }) }
                        </Button>
                        <Button
                            className={ classes.mediumSecondaryBtn }
                            onClick={ () => { saveUpdateAction() } }
                        >
                            { getLabel({ module: "userManagement", label: isEditMode ? "update" : "save" }) }
                        </Button>
                    </Box>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default NewAndUpdateUser;
