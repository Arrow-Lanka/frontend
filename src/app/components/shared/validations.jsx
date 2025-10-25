import * as React from "react";
import { http_Request } from "./HTTP_Request";
import { API_URL } from "../shared/API_URLS";

/**
|--------------------------------------------------
| Mobile No validations
| @param { string } mobileNo   is the mobile no string
| @param { object } countryData country data of the validating mobile's recipient country 
| @return { boolean } -> true||false
|--------------------------------------------------
*/
export const mobileNumberValidator = (mobileNo,countryData)=>{ 
  //validating mobile matching type string
	if(typeof mobileNo === "string" && countryData?.maxDigit && countryData?.minDigit){
		let maxLength = countryData.maxDigit;
		let minLength = countryData.minDigit;
		//validating the mobile no Number length
		return numberValidator(mobileNo) && !textLengthValidator(mobileNo, maxLength+1) && textLengthValidator(mobileNo, minLength);
	}else{
		return false;
	}
}

// Validation Promise Functions on Formik Registration pages

/**
|--------------------------------------------------
| validation promise for patient's mobile number validation
| Validates with dial code and the mobile
| @return { Promise }   axios promise doesn't work with Yup field level validation
|--------------------------------------------------
*/
export const patientMobileExistValidator = (path, value, parent, message) => new Promise((resolve, reject) => {
  let patientMobileValidationUrl = API_URL.patient.CHECK_MOBILE_EXIST.replace(
    "{mobile}",
    value
  ).replace("{countryCode}", encodeURIComponent(parent?.countryCode || ""));

  //success callback
  const successCallback = (response) => {
    if (response?.data) {
      reject(message)
    } else {
      resolve("")
    }
  }
  //error callback
  const errorCallback = (reason) => {
    resolve("")
  }
  http_Request({ url: patientMobileValidationUrl, method: "GET" }, successCallback, errorCallback)
})
/**
|--------------------------------------------------
| YUP validation promise request for Existing Mobile Number
| @return { Promise }   axios promise doesn't work with Yup field level validation
|--------------------------------------------------
*/
export const staffMobileExistValidator = (path, value, parent, message) => new Promise((resolve, reject) => {
  let mobileNumValidationUrl = API_URL.userManagement.validation.MOBILE.replace(
    "{mobile}",
    value
  ).replace("{countryCode}", encodeURIComponent(parent?.mobileCountryCode || ""));
  //success callback
  const successCallback = (response) => {
    if (response?.data) {
      reject(message)
    } else {
      resolve("")
    }
  }
  //error callback
  const errorCallback = (error) => {
    resolve("")
  }
  http_Request({ url: mobileNumValidationUrl, method: "GET" }, successCallback, errorCallback);
});

/**
|--------------------------------------------------
| validation promise for patient's id number validation
| @return { Promise }   axios promise doesn't work with Yup field level validation
|--------------------------------------------------
*/
export const patientIdentityExistValidator = (path, value, parent, message) => new Promise((resolve, reject) => {
  let patientIDValidationUrl = API_URL.patient.CHECK_ID_EXIST.replace(
    "{identity}",
    value
  );

  //success callback
  const successCallback = (response) => {
    if (response?.data) {
      reject(message)
    } else {
      resolve("")
    }
  }
  //error callback
  const errorCallback = (reason) => {
    resolve("")
  }
  http_Request({ url: patientIDValidationUrl, method: "GET" }, successCallback, errorCallback)
})

/**
|--------------------------------------------------
| validation promise for NIC number validity
| @return { Promise }   axios promise doesn't work with Yup field level validation
|--------------------------------------------------
*/
export const staffIdentityExistValidator = (path, value, parent, message) => new Promise((resolve, reject) => {
  let idValidationURL = API_URL.userManagement.validation.PERSONAL_ID.replace(
    "{id}",
    value
  );
  //success callback
  const successCallback = (response) => {
    if (response?.data) {
      let errorMessage = message;
      reject(errorMessage);
    } else {
      resolve("");
    }
  }
  //error callback
  const errorCallback = (error) => {
    resolve("")
  }
  http_Request({ url: idValidationURL, method: "GET" }, successCallback, errorCallback)
});


/**
|--------------------------------------------------
| validation promise for Staff Id number validity
| @return { Promise }   axios promise doesn't work with Yup field level validation
|--------------------------------------------------
*/
export const staffIdExistValidator = (path, value, parent, message) => new Promise((resolve, reject) => {
  let staffIdURL = API_URL.userManagement.validation.STAFF_ID.replace(
    "{id}",
    value
  );
  //success callback
  const successCallback = (response) => {
    if (response?.data) {
      let errorMessage = message;
      reject(errorMessage);
    } else {
      resolve("")
    }
  }
  //error callback
  const errorCallback = (error) => {
    resolve("")
  }
  http_Request({ url: staffIdURL, method: "GET" }, successCallback, errorCallback)
});


/**
|--------------------------------------------------
| validation promise for license number validity
| @return { Promise }   axios promise doesn't work with Yup field level validation
|--------------------------------------------------
*/
export const licenseNumberExistValidator = (path, value, formikValues, message) => new Promise((resolve, reject) => {
  let licenseNumValidationUrl = API_URL.userManagement.validation.LICENSE.replace(
    "{licenseNo}",
    value
  ).replace("{licenseTypeId}", formikValues.licenseTypeId);
  //success callback
  const successCallback = (response) => {
    if (response?.data) {
      reject(message)
    } else {
      resolve("")
    }
  }
  //error callback
  const errorCallback = (error) => {
    resolve("")
  }
  http_Request({ url: licenseNumValidationUrl, method: "GET" }, successCallback, errorCallback);
})

/**
|--------------------------------------------------
| validation promise for personal email validity
| @return { Promise }   axios promise doesn't work with Yup field level validation
|--------------------------------------------------
*/
export const personalEmailExistValidator = (path, value, parent, message) => new Promise((resolve, reject) => {
  let personalEmailValidationUrl = API_URL.userManagement.validation.PERSONAL_EMAIL.replace(
    "{email}",
    value
  );
  //success callback
  const successCallback = (response) => {
    if (response?.data) {
      reject(message)
    } else {
      resolve("")
    }
  }
  //error callback
  const errorCallback = (error) => {
    resolve("")
  }
  http_Request({ url: personalEmailValidationUrl, method: "GET" }, successCallback, errorCallback)
})

/**
|--------------------------------------------------
| validation promise for company email validity
| @return { Promise }   axios promise doesn't work with Yup field level validation
|--------------------------------------------------
*/
export const companyEmailExistValidator = (path, value, parent, message) => new Promise((resolve, reject) => {
  let companyEmailValidationUrl = API_URL.userManagement.validation.COMPANY_EMAIL.replace(
    "{email}",
    value
  );
  //success callback
  const successCallback = (response) => {
    if (response?.data) {
      reject(message)
    } else {
      resolve("")
    }
  }
  //error callback
  const errorCallback = (error) => {
    resolve("")
  }
  http_Request({ url: companyEmailValidationUrl, method: "GET" }, successCallback, errorCallback)

});

/**
|--------------------------------------------------
| validation promise for doctor bank account number validity
| @return { Promise }   axios promise doesn't work with Yup field level validation
|--------------------------------------------------
*/
export const doctorBankAccountNumExistValidator = (path, value, parent, message) => new Promise((resolve, reject) => {
  let bankAccountNumberExistValidator = API_URL.userManagement.validation.BANK_ACCOUNT_NUMBER.replace(
    "{accountNo}",
    value
  );
  //success callback
  const successCallback = (response) => {
    if (response?.data) {
      reject(message)
    } else {
      resolve("")
    }
  }
  //error callback
  const errorCallback = (error) => {
    resolve("")
  }
  http_Request({ url: bankAccountNumberExistValidator, method: "GET" }, successCallback, errorCallback)

});

// arabic text validation
export const arabicValidator = (text) => {
    //let arabicRegex = /[\u0621-\u064A ]+$/;
    let arabicRegex = /^[\u0621-\u064A\s\W|_]+$/;
    return arabicRegex.test(text);
}

// email validation
export const emailValidator = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Simple regex for email
  return pattern.test(email);
};


// text length validation
export const textLengthValidator = (text, length, type) => {
  let textLengthValidation  = false;
  let lengthLimit = numberValidator(length)? length : 3;
  if(!type){    
    textLengthValidation = text?.length >= (lengthLimit);
  }else if(type === "lessOrEqual"){
    textLengthValidation = text?.length <= (lengthLimit);  
  }else if(type === "equal"){
    textLengthValidation = text?.length === (lengthLimit);
  }
  return textLengthValidation;
}

// password validation
export const passwordValidator = (text) => {
    const passwordformat = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    return text.match(passwordformat);
}

// is a number validation
export const numberValidator = (number) => {
        return !isNaN(number);
}

