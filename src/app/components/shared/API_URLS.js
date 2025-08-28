
const ipAddress = "http://localhost:9090"


const imageBase =  "http://localhost:8000";
//v1 bases

const userManagementBase = ipAddress + "/usermgt-service/api/v1";

const authorizeBase = ipAddress + "/authorization-server";

const itemManagmentBase = ipAddress + "/inventory-service/api/v1";





export const API_URL = {
    Login: authorizeBase + "/authnticate",
    RESET_PASSWORD: authorizeBase + "/change-password",
    RESET_REQUEST: authorizeBase + "/reset-password",
    CHECK_USER_VALIDITY: authorizeBase + "/auth-status",
    // Users: {
    //     UserList: {},
    //     UserInfo: {
    //         GET: ehrBase + "/api/v1/users/{userId}",
    //     },
    // },
    userManagement: {
        users: {
            POST: userManagementBase + "/users",
            GETUSERINFO: userManagementBase + "/users/{userId}",
            ADDROLES: userManagementBase + "/users/{userId}/roles",
            REMOVEROLE: userManagementBase + "/users/{userId}/roles",
            GET_USERS: userManagementBase + "/users?pageNo={pageNo}&pageSize={pageSize}",
            EDITUSERS: userManagementBase + "/users/{userId}",
            GETALLUSERSBYNAME: userManagementBase + "/persons/{searchingKey}?personTypeId={searchingType}",
            GET_USERS_BY_NAME_AND_ID: userManagementBase + "/persons/person-type/{personType}/search?keyword={searckKey}",
            GETPERSONOPTIONS: userManagementBase + "/person-types?isSuperAdmin={isSuperAdmin}",
            USER_SEARCH: userManagementBase + "/users/search?pageNo={pageNo}&pageSize={pageSize}&isSuperAdmin={isSuperAdmin}",
            GET_USER_STATS: userManagementBase + "/users/user-stat",
            GET_PERSON_CARD_DETAILS: userManagementBase + "/persons/{personId}/profile-card",
            DELETE_PROFILE_IMAGE: userManagementBase + "/persons/{personId}?personType={personType}",
        },
        roles: {
            POST: userManagementBase + "/roles",
            GETROLES: userManagementBase + "/roles?pageNo={pageNo}&pageSize={pageSize}",
            GETROLEINFO: userManagementBase + "/roles/{roleId}",
            GETUSERSBYROLE: userManagementBase + "/roles/roles/{roleId}/users",
            ADD_PRIV_TOROLE: userManagementBase + "/roles/{roleId}/privileges",
            REMOVE_PRIV_FROMROLE: userManagementBase + "/roles/{roleId}/privileges",
            ADD_USER_TOROLE: userManagementBase + "/users/{userId}/roles",
            REMOVE_USER_FROM_ROLE: userManagementBase + "/users/{userId}/roles",
            ROLE_SEARCH: userManagementBase + "/roles/search?pageNo={pageNo}&pageSize={pageSize}",
            GET_ROLE_STATS: userManagementBase + "/roles/role-stat"
        },
        permissions: {
            GETPERMISSIONS: userManagementBase + "/privileges?pageNo={pageNo}&pageSize={pageSize}",
            PERMISSIONSEARCH: userManagementBase + "/privileges/search?pageNo={pageNo}&pageSize={pageSize}&privilegeName={searchValue}",
        },
        modules: {
            GET_MODULE_DETAILS: userManagementBase + "/modules/permissions/master-module-permissions",
            GET_ROLE_MODULE: userManagementBase + "/modules/permissions/role-module-permissions?roleIds={roleId}",
            CREATE_ROLE_WITH_PERMISSION_TREE: userManagementBase + "/modules/permissions/{roleName}",
            UPDATE_ROLE_WITH_PERMISSION_TREE: userManagementBase + "/modules/permissions/{roleId}"
        },
        validation: {
            PERSONAL_ID: userManagementBase + "/persons/person-identities?idNo={id}",
            LICENSE: userManagementBase + "/doctors/person-licenses?licenseNo={licenseNo}&licenseTypeId={licenseTypeId}",
            MOBILE: userManagementBase + "/persons/person-mobile?countryCode={countryCode}&mobile={mobile}",
            PERSONAL_EMAIL: userManagementBase + "/persons/person-email?email={email}",
            COMPANY_EMAIL: userManagementBase + "/persons/company-email?companyEmail={email}",
            STAFF_ID: userManagementBase + "/persons/staff-id?staffId={id}",
            BANK_ACCOUNT_NUMBER: userManagementBase + '/persons/person-finance/accountNo/validation/{accountNo}'
        },
        // personClinic: {
        //     PUT_UPDATE_PERSON_CLINIC: adminBase + "/person-associations/nurse-clinics/nurses/{personId}", // v-2 Migrated
        //     DELETE_PERSON_CLINIC: adminBase + "/person-associations/nurse-clinics/{personClinicId}", // v-2 Migrated
        // },
        person: {
            INFO_BY_ID: userManagementBase + "/persons/staff-details/{profileId}",
            GET_CLINICAL_STAFF_MEMBERS: userManagementBase + "/persons/clinical-staff-members?staffType={staffType}&isUnit={isUnit}&unitOrClinicId={unitOrClinicId}",
        },
		GET_COUNTY_BY_CITY: userManagementBase + "/cities/{cityId}/countries",
        GET_CITIES: userManagementBase + "/cities"
    },


     non_staff_registration: {
        GET_ALL_PERSON_TYPES: userManagementBase + "/person-types?isSuperAdmin=true",
        GET_ALL_USER_GENERAL_COMPOSITE_DETAILS: userManagementBase + "/composites",
        REGISTER_NON_STAFF_USER: userManagementBase + "/agentCompany/agentUser",
        POST_WITH_SEARCH_GET_ALL_NON_STAFF_USERS: userManagementBase + "/agentCompany/searchAgentUser",
        INACTIVE_NON_STAFF_USER: userManagementBase + "/agentCompany/agent-user-inactive/{agentUserId}",
        UPDATE_NON_STAFF_USER: userManagementBase + "/agentCompany/agentUser/{agentUserId}",
        CREATE_SUPPLIER: userManagementBase + "/persons/supplier",
        SEARCH_SUPPLIER: userManagementBase + "/persons/searchSupplier",
        GET_SUPPLIER_BY_ID: userManagementBase + "/persons/supplier/{personId}",
        UPDATE_SUPPLIER: userManagementBase + "/persons/supplier/{personId}",

        GET_SUPPLIER_BY_COMPANY: userManagementBase + "/persons/supplier/company/{companyId}",

        CREATE_CUSTOMER: userManagementBase + "/persons/customer",
        SEARCH_CUSTOMER: userManagementBase + "/persons/searchCustomer",
        GET_CUSTOMER_BY_ID: userManagementBase + "/persons/customer/{personId}",
        UPDATE_CUSTOMER: userManagementBase + "/persons/customer/{personId}",
    },
    item: {
        CREATE_ITEM: itemManagmentBase + "/item",
        UPDATE_ITEM: itemManagmentBase + "/item/{itemId}",
        SEARCH_ITEM: itemManagmentBase + "/item/search",
        GET_ITEM_BY_ID: itemManagmentBase + "/item/{itemId}",
        GET_ALL_ITEM_BY_COMPANY: itemManagmentBase + "/item/all/{companyId}"

    },
      item_category: {
        CREATE_ITEM_CATEGORY: itemManagmentBase + "/itemCategory",
        UPDATE_ITEM_CAREGORY: itemManagmentBase + "/itemCategory/{itemCategoryId}",
        GET_ALL_ITEM_CATEGORY_BY_COMPANY: itemManagmentBase + "/itemCategory/all/{companyId}",
        SEARCH_ITEM_CATEGORY: itemManagmentBase + "/itemCategory/search",
        GET_ITEM_CATEGORY_BY_ID: itemManagmentBase + "/itemCategory/{itemCategoryId}",
       
       

    },
    stock_location: {
        CREATE_STOCK_LOCATION: itemManagmentBase + "/stockLocation",
        UPDATE_STOCK_LOCATION: itemManagmentBase + "/stockLocation/{stockLocationId}",
        GET_ALL_STOCK_LOCATION_BY_COMPANY: itemManagmentBase + "/stockLocation/all/{companyId}",
        SEARCH_STOCK_LOCATION: itemManagmentBase + "/stockLocation/search",
        GET_STOCK_LOCATION_BY_ID: itemManagmentBase + "/stockLocation/{stockLocationId}",
       
       
    },
    
    batch: {
        CREATE_BATCH: itemManagmentBase + "/batch",
        UPDATE_BATCH: itemManagmentBase + "/batch/{batchId}",
        GET_ALL_BATCHES_BY_COMPANY: itemManagmentBase + "/batch/all/{companyId}",
        SEARCH_BATCH: itemManagmentBase + "/batch/search",
        GET_BATCH_BY_ID: itemManagmentBase + "/batch/{batchId}",
        GET_ALL_BATCHES_BY_ITEM_AND_COMPANY: itemManagmentBase + "/batch/all/item/{itemId}/{companyId}", 
    },
      grn: {
        CREATE_GRN: itemManagmentBase + "/grn",
        UPDATE_GRN: itemManagmentBase + "/grn/{grnId}",
        GET_ALL_GRNS_BY_COMPANY: itemManagmentBase + "/grn/all/{companyId}",
        SEARCH_GRN: itemManagmentBase + "/grn/search",
        GET_GRN_BY_ID: itemManagmentBase + "/grn/{grnId}",

       
    },
     stock: {
        SEARCH_STOCK: itemManagmentBase + "/stock/search",

    }, bom: {
        CREATE_BOM: itemManagmentBase + "/production/bom",
        UPDATE_BOM: itemManagmentBase + "/production/bom/{bomId}",
        GET_ALL_BOMS_BY_COMPANY: itemManagmentBase + "/production/bom/all/{companyId}",
        SEARCH_BOM: itemManagmentBase + "/production/bom/search",
        GET_BOM_BY_ID: itemManagmentBase + "/production/bom/{bomId}",
        GET_BOM_BY_FINISHED_ITEM: itemManagmentBase + "/production/bom/finished/{finishedItemId}",

    },
    
};
