import {REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, USER_LOADED, LOGOUT_SUCCESS} from '../actions/types'


const initialState={
    token: null,
    isAuthenticated:null,
    loading:true,
    user:null
}

export const user = (state=initialState, action) => {
    const {type, payload} = action;
    switch (type){
        case USER_LOADED:
        return {
            ...state,
            user:payload,
            isAuthenticated:true,
            loading:false,
            token: localStorage.getItem('token')
        }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        localStorage.setItem('token',payload.token)
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }

        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false,
                user:null
            }
        case REGISTER_FAIL:
        localStorage.removeItem('token')
        return{
            ...state,
            token:null,
            isAuthenticated:false,
            loading:false,
            user:null
        }
        default:
        return state;
    }
}

