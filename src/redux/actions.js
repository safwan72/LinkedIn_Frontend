import * as actiontypes from "./actionType";
import axios from "axios";
import baseURL from "../components/utils/baseurl";

export const authsuccess = (token) => {
    return {
        type: actiontypes.AUTH_SUCCESS,
        payload: {
            token: token,
        },
    };
};
export const getuserdatasuccess = (id, username, email) => {
    return {
        type: actiontypes.GET_USER_DATA_SUCCESS,
        payload: {
            id: id,
            username: username,
            email: email,
        },
    };
};

// export const profilefetchsuccess = (user_profile) => {
//     return {
//         type: actiontypes.PROFILE_FETCH_SUCCESS,
//         payload: {
//             user_profile: user_profile,
//         },
//     };
// };
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_in");
    return {
        type: actiontypes.LOG_OUT,
    };
};

// export const authLoading = (loading) => {
//     return {
//         type: actiontypes.AUTH_LOADING,
//         payload: loading,
//     };
// };
// export const authloadingFailed = (errmsg) => {
//     return {
//         type: actiontypes.AUTH_FAILED,
//         payload: errmsg,
//     };
// };
// export const appreload = (loadVal) => {
//     return {
//         type: actiontypes.LOADAPP,
//         payload: loadVal,
//     };
// };

export const authcheck = () => (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
        let res = null;
        async function checktoken() {
            const request = await axios.post(`${baseURL}api/auth/checktoken/`, { "token": token })
            res = request?.data
            if (res === false) {
                dispatch(logout());
            }
            else {
                const expirytime = localStorage.getItem("expires_in");
                if (expirytime <= new Date()) {
                    dispatch(logout());
                }
                else {
                    dispatch(authsuccess(token));
                }
            }
        }
        checktoken();


    } else {
        dispatch(logout());
    }
};

// export const fetchprofile = (u_id) => (dispatch) => {
//     dispatch(authLoading(true));

//     const url = `${baseURL}backend/profile/${u_id}/`;


//     axios.get(url)
//         .then((response) => {
//             dispatch(authLoading(false));
//             dispatch(profilefetchsuccess(response?.data));
//         })
//         .catch((error) => {
//             if (error.response) {
//                 // Request made and server responded
//                 console.log(error.response.status);
//                 console.log(error.response.headers);
//             } else if (error.request) {
//                 // The request was made but no response was received
//                 console.log(error.request);
//             } else {
//                 // Something happened in setting up the request that triggered an Error
//                 console.log('Error', error.message);
//             }
//         });
// };

export const getUserData = (token) => (dispatch) => {

    async function checktoken() {
        const request = await axios.post(`${baseURL}api/auth/getuserfromtoken/`, { "token": token })
        if (request.status === 200) {
            dispatch(getuserdatasuccess(request?.data?.id, request?.data?.username, request?.data?.email))
        }
    }
    checktoken();
    // .then((res) => {
    //     // dispatch(authLoading(false));
    //     dispatch(getuserdatasuccess(res.data?.data.id, res.data?.data.username, res.data?.data.email))
    //     // const decoded_token = jwtDecode(response.data?.access || response.data?.tokens?.access);
    //     // localStorage.setItem('token', decoded_token.jti);
    //     // localStorage.setItem('userId', decoded_token.user_id);
    //     // localStorage.setItem('userEmail', decoded_token.email);
    //     // const expirationTime = new Date(decoded_token.exp * 1000);
    //     // localStorage.setItem('expirationTime', expirationTime);
    //     // dispatch(authsuccess(decoded_token.jti, decoded_token.user_id, decoded_token.email));
    // })
    // .catch((error) => {
    //     if (error.response) {
    //         // Request made and server responded
    //         console.log(error.response.status);
    //         console.log(error.response.headers);
    //     } else if (error.request) {
    //         // The request was made but no response was received
    //         console.log(error.request);
    //     } else {
    //         // Something happened in setting up the request that triggered an Error
    //         console.log('Error', error.message);
    //     }
    // });
};