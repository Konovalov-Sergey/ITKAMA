import { AppStateType } from './redux-store';
import { ThunkAction } from "redux-thunk";
import { authApi } from "../API/authAPI";
import { ResultCodesEnum } from "../API/api";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isFetching: false,
    isAuth: false
};

type InitialStateType = typeof initialState

type ActionTypes = SetAuthUserDataActionType

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
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

//actionCreator
type SetAuthUserDataActionPayloadType = {
    id: number|null,
    login: string|null,
    email: string|null,
    isAuth: boolean
};

export type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
};

export const setAuthUserData = (id:number|null, login:string|null, email:string|null, isAuth:boolean):SetAuthUserDataActionType => {
    return {type: SET_USER_DATA, payload:{id, login, email, isAuth}}    
};

//ThunkCreator
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown,  ActionTypes >

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let setLoginData = await authApi.setLogin()
        if (setLoginData.resultCode === ResultCodesEnum.Success) {
            let {id, login, email} = setLoginData.data;
            dispatch(setAuthUserData(id, login, email, true));
        }                
};

export const login = (email:string, password:string, rememberMe:boolean): ThunkType => async (dispatch) => {
    let loginData = await authApi.login(email, password, rememberMe)
        if (loginData.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData())
        }
};

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authApi.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
}

export default authReducer;