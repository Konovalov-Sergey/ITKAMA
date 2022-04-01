import { type } from "os";
import { authApi } from "../API/api";

const SET_USER_DATA = 'SET_USER_DATA';

export type InitialStateType = {
    id: number | null,
    login: string | null,
    email: string | null,
    isFetching: boolean,
    isAuth: boolean
}

let initialState = {
    id: null,
    login: null,
    email: null,
    isFetching: false,
    isAuth: false
};

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch(action.type) {
        case SET_USER_DATA: 
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    };      
};
type SetAuthUserDataActionPayloadType = {
    id: number|null,
    login: string|null,
    email: string|null,
    isAuth: boolean
};

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
};

//actionCreator
export const setAuthUserData = (id:number|null, login:string|null, email:string|null, isAuth:boolean):SetAuthUserDataActionType => {
    return {type: SET_USER_DATA, payload:{id, login, email, isAuth}}    
};

export const getAuthUserData = () => async (dispatch:any) => {
    let response = await authApi.setLogin()
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data;
            dispatch(setAuthUserData(id, login, email, true));
        }                
};

export const login = (email:string, password:string, rememberMe:boolean) => async (dispatch:any) => {
    let response = await authApi.login(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        }
};

export const logout = () => async (dispatch:any) => {
    let response = await authApi.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
}

export default authReducer;