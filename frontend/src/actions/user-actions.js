import Axios from 'axios';
import { userTypes } from './../constants/user-Types';

// Api for register users
export const register = (name, email, password) => async (dispatch) => {
    dispatch({
        type: userTypes.USER_REGISTER_REQUEST,
        payload: { email, password },
       });
        try {
            const { data } = await Axios.post('/api/users/register', { name, email, password });
            dispatch({
                type: userTypes.USER_REGISTER_SUCCESS,
                payload: data,
            });
            dispatch({
                type: userTypes.USER_SIGNIN_SUCCESS,
                payload: data,
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (error) {
            const message = error.response && error.response.data.message ? 
            error.response.data.message : error.message;
            dispatch({
                type: userTypes.USER_REGISTER_FAIL,
                payload: message,
            });
        }
}

// Api for signin users
export const signin = (email, password) => async (dispatch) => {
    dispatch({
        type: userTypes.USER_SIGNIN_REQUEST,
        payload: { email, password },
       });
        try {
            const { data } = await Axios.post('/api/users/signin', { email, password });
            dispatch({
                type: userTypes.USER_SIGNIN_SUCCESS,
                payload: data,
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (error) {
            const message = error.response && error.response.data.message ? 
            error.response.data.message : error.message;
            dispatch({
                type: userTypes.USER_SIGNIN_FAIL,
                payload: message,
            })
        }
}

export const signout = () => (dispatch) =>{
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({
        type: userTypes.USER_SIGNOUT
    });
    document.location.href = '/signin';
};

export const userDetails = (userId) => async(dispatch, getState) => {
    dispatch({
        type: userTypes.USER_DETAILS_REQUEST,
        payload: userId
    });
    const {userSignin: {userInfo},} = getState();
   try {
    const { data } = await Axios.get(`/api/users/${userId}`,{
        headers: { Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({
        type: userTypes.USER_DETAILS_SUCCESS,
        payload: data
    })
   } catch (error) {
       const message = error.response && error.response.data.message ? 
       error.response.data.message : error.message;
       dispatch({
            type: userTypes.USER_DETAILS_FAIL,
            payload: message
       })
   }
};