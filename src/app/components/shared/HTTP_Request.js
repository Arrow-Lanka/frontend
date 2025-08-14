import axios from 'axios';

export const http_Request = (data, successCallback, errorCallback, otherDetails) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json',
        'Content-Type': otherDetails?.contentType || 'application/json',
        'Pragma': 'no-cache',
        'Access-Control-Expose-Headers': "jwt_token"
    };

    // ✅ Only add Authorization header if NOT skipping auth
    if (!otherDetails?.skipAuth) {
        const token = localStorage.getItem('jwtToken') || otherDetails?.token || "";
        headers['Authorization'] = 'Bearer ' + token;
    }

    axios({
        url: data.url,
        method: data.method,
        data: data.bodyData,
        headers: headers,
        responseType: otherDetails?.responseType || 'json'
    })
    .then(function (response) {
        successCallback(response);
    })
    .catch(function (error) {
        errorCallback(error);
    });
};
