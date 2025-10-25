import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { Dialog, DialogTitle, DialogContent, Slide, Typography } from '@mui/material'
import { Grid, Button, Box } from "@mui/material";
import { useStyles } from "../../../../../assets/styles/styles";
import { RolesStyle } from './RolesStyle';
import { Autocomplete } from '@mui/lab';
import classNames from 'classnames';
import Input from '../../../common/material/Input';
import CheckboxField from '../../../common/material/CheckboxField';
// import RoleAssignment from './RoleAssignment';
import { http_Request } from '../../../shared/HTTP_Request';
import { API_URL } from '../../../shared/API_URLS';
import { getLabel } from '../../../shared/localization';
import { useEffect } from 'react';
import Snackbar from '../../../common/Snackbar';
import PermissionSetter from './PermissionSetter';
import { cloneDeep } from 'lodash';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const NewAndEditRole = (props) => {
    const classes = useStyles();
    const roleClass = RolesStyle();

    const {isModal, isEditMode, isViewMode, roleInfo, roleSaveCallback, closeAction} = props;

    const [roleName, setRoleName] = useState("");
    const [newRoleName, setNewRoleName] = useState("");
    const [description, setDescription] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [selectedModuleObj, setSelectedModuleObj] = useState({});
    const [modulesOptions, setModulesOptions] = useState([]);    
    const [isActive, setIsActive] = useState(!isEditMode || roleInfo?.status === "Active");
    const [isSaveAsNew, setIsSaveAsNew] = useState(false);
    const [snackText, setSnackText] = useState("");
    const [snackVariant, setSnackVariant] = useState("");
    const [errorFields, setErrorFields] = useState({});
    const [treeStructure, setTreeStructure] = useState({});

    const resetSnack = () => {
        setSnackText();
        setSnackVariant();
    };

    useEffect(() => {
        if(isEditMode || isViewMode){
            setRoleName(roleInfo.roleName);
            setDescription(roleInfo.description);
        }
        getAllModuleDetail();
    },[]);

    useEffect(() => {
        if((isEditMode || isViewMode) && modulesOptions.length > 0){
            getRoleModuleDetail();
        }
    }, [modulesOptions]);

    const getAllModuleDetail = () => {
        http_Request(
        {
            url: API_URL.userManagement.modules.GET_MODULE_DETAILS,
            method: 'GET'
        },
        function successCallback(response){
            console.log("module response", response.data.treeNodeSet);
            let tempModulesOptions = response?.data?.treeNodeSet?.filter((singleItem) => singleItem).map((singleModule, singleModuleIndex) => {
                return(
                    {
                        id: singleModuleIndex + 1,
                        name: singleModule.label,
                        ...singleModule
                    }
                );
            });
            setModulesOptions([...tempModulesOptions]);
        },
        function errorCallback(error) {
            console.log("error", error);
        });
    }

    // get clicked role's detail
    const getRoleModuleDetail = () => {
        http_Request(
        {
            url: API_URL.userManagement.modules.GET_ROLE_MODULE.replace("{roleId}", roleInfo.roleId),
            method: 'GET'
        },
        function successCallback(response){
            console.log("role module response", response.data);
            let currentRoleModule = response?.data[0] || {};
            modulesOptions.map((singleModule) => {
                if(singleModule.label === currentRoleModule.label){
                    currentRoleModule.name = singleModule.label;
                    currentRoleModule.id = singleModule.id;
                }
            });
            setSelectedModuleObj({...currentRoleModule});
        },
        function errorCallback(error) {
            console.log("error", error);
        });
    }

    const saveUpdateAction = () => {
        let canSave = true;
        if(!isEditMode){
            setErrorFields({ ...errorFields, roleName: !roleName.length, selectedModuleName: !selectedModuleObj.id});
            if(!roleName.length || !selectedModuleObj.id){
                canSave = false;
            }
        }else if(isEditMode){
            if(!roleName.length){
                setErrorFields({ ...errorFields, roleName: !roleName.length});
                canSave = false;
            }
            if(isSaveAsNew && !newRoleName.length){
                setErrorFields({ ...errorFields, newRoleName: true});
                canSave = false;
            }
        }
        if(canSave){
            let requestPayload = {
                roleName: !isSaveAsNew ? roleName : newRoleName,
                modulePermissions:  [treeStructure],
                description: !isSaveAsNew ? description : newDescription,
                status: isActive ? 1 : 0
            };

            if(isEditMode && !isSaveAsNew){
                requestPayload["roleId"] = roleInfo.roleId;
            }

            http_Request({
                url: (isEditMode && !isSaveAsNew) ? 
                    API_URL.userManagement.modules.UPDATE_ROLE_WITH_PERMISSION_TREE.replace("{roleId}", roleInfo.roleId) 
                    : 
                    API_URL.userManagement.modules.CREATE_ROLE_WITH_PERMISSION_TREE.replace("{roleName}", (!isSaveAsNew ? roleName : newRoleName)),
                method: (isEditMode && !isSaveAsNew) ? 'PUT' : 'POST',
                bodyData: requestPayload
            },
            function successCallback(response){
                // to show in snackbar
                let savedRoleName = !isSaveAsNew ? roleName : newRoleName;

                roleSaveCallback(((isEditMode && !isSaveAsNew) ? "editRoleSuccess" : "newRoleSuccess"), savedRoleName);
                closeAction();
            },
            function errorCallback(error) {
                let savedRoleName = !isSaveAsNew ? roleName : newRoleName;
                roleSaveCallback("checkAlreadyExistRole", savedRoleName, error);
                closeAction();
            });
        }
    }

    const modifyTreeStructure = (structure) => {
        if(structure){
            let initialStructure = cloneDeep(structure);
            delete initialStructure.id;
            setTreeStructure(modifySubStructure(initialStructure));
        }
    };

    const modifySubStructure = (subStructure) => {
        if(subStructure){
            if(subStructure.child){
                subStructure["children"] = (subStructure.tempChild?.length > 0) ? subStructure.tempChild : subStructure.child;
            }
            delete subStructure.child;
            delete subStructure.tempChild;
            delete subStructure.renderBlock;
        }


        if (subStructure?.children?.length > 0){
            subStructure.children.map((singleItem) => {
                singleItem = modifySubStructure(singleItem);
            });
        }
        return(subStructure);
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
                { getLabel({module: "userManagement", label: (isEditMode ? "editRole" : (isViewMode ? "roleInfo" : "addRole"))}) }
                <CancelIcon
                    onClick={ () => closeAction() }
                    className={ classNames(classes.dialogCloseBtn, classes.appointmentModalCloseIcon) }
                />
            </DialogTitle>
            <DialogContent className={classes.popupPaper}>
                <Snackbar
                    text={snackText}
                    variant={snackVariant}
                    reset={() => { resetSnack() }}
                />
                <Grid>
                    <Grid container display="flex" spacing={2}>
                        <Grid item xs={3}>
                            <Typography className={ roleClass.addRoleLabel }>{ getLabel({ module: "userManagement", label: "roleName" }) }</Typography>
                            <Input
                                id="roleName"
                                name="roleName"
                                variant="outlined"
                                className={ roleClass.inputClass }
                                onChange={ (e) => { setRoleName(e.target.value); setErrorFields({ ...errorFields, roleName: false }); } }
                                placeholder={ getLabel({ module: "userManagement", label: "roleName" }) }
                                value={ roleName }
                                disabled={ isSaveAsNew || isViewMode }
                                error={ errorFields.roleName }
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className={ roleClass.addRoleLabel }>{ getLabel({ module: "userManagement", label: "description" }) }</Typography>
                            <Input
                                id="description"
                                name="description"
                                variant="outlined"
                                className={ roleClass.inputClass }
                                onChange={ (e) => { setDescription(e.target.value); } }
                                placeholder={ getLabel({ module: "userManagement", label: "description" }) }
                                value={ description }
                                disabled={ isSaveAsNew || isViewMode }
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography className={ roleClass.addRoleLabel }>{ getLabel({ module: "userManagement", label: "module" }) }</Typography>
                            <Box className={ classNames(roleClass.autoCompleteFieldFilter, errorFields.selectedModuleName && roleClass.redBorder) } mr={1} my={1}>
                                <Autocomplete
                                    id='module'
                                    name='module'
                                    value={ selectedModuleObj }
                                    onChange={(event, newValue)=>{
                                        if(!newValue){
                                            setSelectedModuleObj({});
                                        }else{
                                            setSelectedModuleObj(newValue);
                                            setErrorFields({...errorFields, selectedModuleName: false});
                                        }
                                    }}
                                    options={ modulesOptions }
                                    getOptionLabel={(option)=>option["name"] ? option["name"] : ""}
                                    getOptionDisabled={ (option) => option.isDisabled }
                                    getOptionSelected={async (option,value)=>option && value && option.id===value.id }
                                    margin={"none"}
                                    fullWidth
                                    disabled={ isEditMode || isViewMode }
                                    renderInput={(params) => (
                                        <Input
                                            {...params}
                                            margin="none"
                                            variant="outlined"
                                            placeholder={ getLabel({ module: "userManagement", label: "selectModule" }) }
                                            className={ roleClass.inputClass }
                                        />
                                    )}
                                />
                                {/* <Typography className={ classNames( roleClass.errorNotation, classes.textRed) }>*</Typography> */}
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid>
                                <Typography>&nbsp;</Typography>
                                <CheckboxField
                                    id="active"
                                    name="active"
                                    checked={ isActive }
                                    onChange={ (e) => { setIsActive(e.target.checked) } }
                                    disabled={ isViewMode }
                                    label={ getLabel({ module: "userManagement", label: "active" }) }
                                    mainClassName={ roleClass.centerCheckbox }
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    {
                        isEditMode &&               
                        <Grid container display="flex" spacing={2}>
                            <Grid item xs={3} container display="flex" alignItems= 'flex-end'>
                                <Grid>
                                    <CheckboxField
                                        id="isSaveAsNew"
                                        name="isSaveAsNew"
                                        checked={ isSaveAsNew }
                                        onChange={ (e) => { 
                                            setIsSaveAsNew(e.target.checked);
                                            setNewRoleName("");
                                            setNewDescription(""); 
                                            setRoleName(roleInfo.roleName);
                                            setDescription(roleInfo.description);
                                        } }
                                        label={ getLabel({ module: "userManagement", label: "saveAsNew" }) }
                                        mainClassName={ roleClass.centerCheckbox }
                                    />
                                </Grid>
                            </Grid>
                            {/* if it is save as new role */}
                            {
                                isSaveAsNew &&
                                <Grid item xs={3}>
                                    <Typography className={ roleClass.addRoleLabel }>{ getLabel({ module: "userManagement", label: "roleName" }) }</Typography>
                                    <Input
                                        id="newRoleName"
                                        name="newRoleName"
                                        variant="outlined"
                                        className={ roleClass.inputClass }
                                        onChange={ (e) => { setNewRoleName(e.target.value); setErrorFields({ ...errorFields, newRoleName: false }); } }
                                        placeholder={ getLabel({ module: "userManagement", label: "roleName" }) }
                                        value={ newRoleName }
                                        error={ errorFields.newRoleName }
                                    />
                                </Grid>
                            }
                            {/* if it is save as new role */}
                            {
                                isSaveAsNew &&
                                <Grid item xs={4}>
                                    <Typography className={ roleClass.addRoleLabel }>{ getLabel({ module: "userManagement", label: "description" }) }</Typography>
                                    <Input
                                        id="newDescription"
                                        name="newDescription"
                                        variant="outlined"
                                        className={ roleClass.inputClass }
                                        onChange={ (e) => { setNewDescription(e.target.value); } }
                                        placeholder={ getLabel({ module: "userManagement", label: "description" }) }
                                        value={ newDescription }
                                    />
                                </Grid>
                            }
                        </Grid>
                    }
                    <Box mt={2}>
                        <PermissionSetter
                            isViewMode = { isViewMode }
                            selectedModule={ selectedModuleObj }
                            // deleteAction={ () => { setSelectedModuleObj({}); } }
                            passTreeStructureData = { (structure) => { modifyTreeStructure(structure) } }
                        />
                    </Box>
                    
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button
                            className={ classes.outlineMediumSecondary }
                            onClick={ () => closeAction() }
                        >
                            { getLabel({ module: "userManagement", label: (isViewMode ? "back" : "cancel") }) }
                        </Button>
                        { 
                            !isViewMode &&
                            <Button
                                className={ classes.mediumSecondaryBtn }
                                onClick={ () => { saveUpdateAction() } }
                            >
                                { getLabel({ module: "userManagement", label: (isEditMode && !isSaveAsNew ? "Update" : "Save") }) }
                            </Button>
                        }
                    </Box>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default NewAndEditRole;