import { AppStateType, InferActionsTypes } from './redux-store';
import { ThunkAction } from "redux-thunk";
import { authApi } from "../API/authAPI";
import { ResultCodesEnum } from "../API/api";

let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isFetching: false,
    isAuth: false
};

type InitialStateType = typeof initialState


const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'SN/AUTH/SET_USER_DATA': 
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    };      
};

type ActionsTypes = InferActionsTypes<typeof actions>
//actionCreator
export const actions = {
    setAuthUserData: (id:number|null, login:string|null, email:string|null, isAuth:boolean) => ({
        type: 'SN/AUTH/SET_USER_DATA', 
        payload: {id, login, email, isAuth}} as const)
};


//ThunkCreator
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown,  ActionsTypes >

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let setLoginData = await authApi.setLogin()
        if (setLoginData.resultCode === ResultCodesEnum.Success) {
            let {id, login, email} = setLoginData.data;
            dispatch(actions.setAuthUserData(id, login, email, true));
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
            dispatch(actions.setAuthUserData(null, null, null, false))
        }
}

export default authReducer;