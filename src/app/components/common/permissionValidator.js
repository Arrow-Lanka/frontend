export const permissionValidator = (permission) => {
    // get permission object from storage
    let permissionObj = localStorage.getItem("permissionObject") ? JSON.parse(localStorage.getItem("permissionObject")) : {};
    // checking provided permission or permissions is available or not in permissionObject

    let isValidated = true;
    // if we pass single permission

    if(typeof permission === "string" || typeof permission === "number"){
        isValidated = permissionObj[permission.toString()];
    }else{
        // if we pass single permission array
        permission.map((singlePermission) => {
            if(!permissionObj[singlePermission.toString()]){
                isValidated = false;
            }
        })
    }

    return(isValidated ? true : false);
}