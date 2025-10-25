import React, { useEffect, useState } from 'react';
import { Grid, Button, Box, Avatar, Typography } from "@mui/material";
import TreeView from '../../../common/material/TreeView';

import classNames from 'classnames';
import { useStyles } from "../../../../../assets/styles/styles";
import { RolesStyle } from './RolesStyle';
import CheckboxField from '../../../common/material/CheckboxField';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import cloneDeep from 'lodash/cloneDeep';


const PermissionSetter = (props) => {
    const classes = useStyles();
    const roleClass = RolesStyle(); 

    const [ permissionSetupData, setPermissionSetupData ] = useState({});
    const [ initialPermissionSetupData, setInitialPermissionSetupData ] = useState(cloneDeep({}));
    const [ clickedItem, setClickedItem ] = useState({}); 
    const [ isDeleteModal, setIsDeleteModal ] = useState(false); 

    useEffect(() => {
        setPermissionSetupData(props.selectedModule);
        setInitialPermissionSetupData(props.selectedModule);
    },[props.selectedModule]);

    useEffect(() => {
        props.passTreeStructureData(permissionSetupData);
    }, [permissionSetupData]);

    useEffect(() => {
        setUpDataStucture(permissionSetupData);
    }, [initialPermissionSetupData]);

    const setUpDataStucture = (permissionStructure) => {
        if(permissionStructure.label){
            // to add root block
            permissionStructure["child"] = permissionStructure.children;
            permissionStructure = blockDecider(permissionStructure);
            // to add child blocks
            permissionStructure = childChecker(permissionStructure);
            setPermissionSetupData({...permissionStructure});
        }
    }

    // to add renderblock for all the child item
    const childChecker = (givenItem) => {
        givenItem.child && givenItem.child.map((singleItem) => {
            singleItem["child"] = singleItem.children;
            singleItem = blockDecider(singleItem);
            if(singleItem.child && singleItem.child.length > 0){
                childChecker(singleItem);
            }
        });  
        return givenItem;
    };

    // to decide style classes
    const blockDecider = (childItem) => {
        childItem.renderBlock = (
            <Box display="flex" alignItems="center">
                {
                    childItem?.tempChild?.length > 0 &&
                    <AddCircleOutlineIcon 
                        className={ roleClass.addMinusClass }
                        onClick={ () => { expandCloseAction(childItem, "expand") } }
                    />
                }
                {
                    childItem?.child?.length > 0 &&
                    <IndeterminateCheckBoxIcon 
                        className={ roleClass.addMinusClass}
                        onClick={ () => { expandCloseAction(childItem, "narrow") } }
                    />
                }
                <Box ml={1}>
                    {
                        props.fromCompomponent !== "permissionList" &&
                        <CheckboxField
                            id="selectPermission"
                            name="selectPermission"
                            mainClassName={ roleClass.selectionCheckbox }
                            checked = { childItem.grant ? true : false }
                            disabled = { props.isViewMode }
                            onChange={ (e) => { permissionChangeAction(e, childItem) } }
                        />
                    }
                </Box>
                <Box>
                    <Typography>{ childItem.label }</Typography>
                </Box>
            </Box>
        );
        return(childItem);
    };

    const permissionChangeAction = (event, clickedItem) => {
        let modifiedStructure = permissionClickValidatior(event.target.checked, clickedItem, permissionSetupData);
        setPermissionSetupData({...modifiedStructure});
        setUpDataStucture({...modifiedStructure});
    };

    const permissionClickValidatior = (checkboxValue, clickedItem, structureData) => {
        let childrenOfStructure = structureData?.tempChild?.length > 0 ? structureData?.tempChild : structureData?.child;
        if(structureData.label === clickedItem.label){
            structureData.grant = checkboxValue;
            let modifiedStructureData = structureData;
            // if parent unselect => make childs as unselected
            if(clickedItem?.child?.length > 0 || clickedItem?.tempChild?.length > 0){
                childrenOfStructure.map((singleChildOfClickedItem) => {
                    modifiedStructureData = permissionClickValidatior(checkboxValue, singleChildOfClickedItem, structureData);
                });
            }
            return(modifiedStructureData);
        }else if(structureData?.child?.length > 0 || structureData?.tempChild?.length > 0){
            // to check child is selected  =>  then can select parent as well;
            if(checkboxValue && !structureData.grant && childrenOfStructure.some((singleItem) => (singleItem.label === clickedItem.label))){
                structureData.grant = true;
            }

            // check for child is matching
            for(let index = 0; index < childrenOfStructure.length; index++){
                let checkedStructure = permissionClickValidatior(checkboxValue, clickedItem, childrenOfStructure[index]);
                if(checkedStructure){
                    return (structureData);
                    break;
                }
            };
        }
    };

    const expandCloseAction = (clickedItem, type) => {
        let modifiedData = makeDataForAddMinus(permissionSetupData, clickedItem, type);
        setInitialPermissionSetupData({ ...modifiedData });
        setPermissionSetupData({ ...modifiedData });
    }

    const makeDataForAddMinus = (inputData, clickedOne, type) => {
        if ((inputData.label === clickedOne.label)){
            if(type==="expand"){
                inputData["child"] = cloneDeep(inputData.tempChild);
                inputData["children"] = cloneDeep(inputData.tempChild);
                inputData.tempChild = [];
            }else{
                inputData["tempChild"] = cloneDeep(inputData.child);
                inputData.child = [];
                inputData.children = [];
            }
            return(inputData);
        }else if(inputData.child && inputData.child.length){
            for(let index = 0; index < inputData.child.length; index ++){
                const returnStructure = makeDataForAddMinus(inputData.child[index], clickedOne, type);
                if(returnStructure){
                    return(inputData);
                    break;
                }
            }; 
        }
    }

    return(
        <>
            {/* <ConfirmationModal
                classes={classes}
                isConfirmationModal={isDeleteModal}
                closeConfirmationAction={() => {
                    setIsDeleteModal(false);
                }}
                modalConfirmAction={() => {
                    setIsDeleteModal(false);
                    props.deleteAction();
                }}
                confirmationModalHeader="Delete Module"
                confirmationModalContent="Are You Sure to Delete this Module"
                noBtnId="cancel"
                yesBtnId="deleteModule"
            /> */}
            {
                props.selectedModule?.id &&
                <Grid className={ roleClass.moduleBlock }>
                    <TreeView
                        structureData = { permissionSetupData }
                        hierarchyList = { classNames(roleClass.hierarchyList, props.fromCompomponent === "permissionList" && roleClass.viewHierarchyList) }  
                        listItem = { classNames(roleClass.listItem, props.fromCompomponent === "permissionList" && roleClass.viewListItem) }
                    />
                    {/* {
                        props.fromCompomponent !== "permissionList" &&
                        <img className={ roleClass.deleteIcon } src={deleteIcon} onClick={ () => { setIsDeleteModal(true) } }/>
                    } */}
                </Grid>
            }
        </>
    );
}

export default PermissionSetter;