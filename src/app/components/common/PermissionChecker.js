import React, { useEffect, useState } from 'react';

const PermissionChecker = (props) => {
    const { permission, children } = props;
    const [ permissionObj, setPermissionObj ] = useState({});
    
    useEffect(() => {
        setPermissionObj(localStorage.getItem("permissionObject") ? JSON.parse(localStorage.getItem("permissionObject")) : {});
    }, []);

    let isValidated = true;
    // if we pass single permission
    if(typeof permission === "string" || typeof permission === "number"){
        isValidated = permissionObj[permission.toString()];
    }
    else{
        // if we pass single permission array
        permission.map((singlePermission) => {
            if(!permissionObj[singlePermission.toString()]){
                isValidated = false;
            }
        })
    }

    return(isValidated ? props.children : null);

};

export default PermissionChecker;