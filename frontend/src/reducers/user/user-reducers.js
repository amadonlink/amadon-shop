import { userTypes } from "../../constants/user-Types";


const INITIAL_STATE = {
    user: {},
};

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type){
        case userTypes.USER_REGISTER_REQUEST:
            return{
                loading: true
            }
        case userTypes.USER_REGISTER_SUCCESS:
            return{
                loading: false,
                userInfo: action.payload
            }
        case userTypes.USER_REGISTER_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const userSigninReducer = (state = {}, action) => {
    switch(action.type){
        case userTypes.USER_SIGNIN_REQUEST:
            return{
                loading: true
            }
        case userTypes.USER_SIGNIN_SUCCESS:
            return{
                loading: false,
                userInfo: action.payload
            }
        case userTypes.USER_SIGNIN_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case userTypes.USER_SIGNOUT:
            return {
                // return empty object when user signins out
            }
        default:
            return state;
    }
};

export const userDetailsReducer = (state = { loading: true }, action) =>{
    switch(action.type){
        case userTypes.USER_DETAILS_REQUEST:
            return{
                loading: true
            };
        case userTypes.USER_DETAILS_SUCCESS:
            return{
                loading: false,
                user: action.payload
            };
        case userTypes.USER_DETAILS_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};