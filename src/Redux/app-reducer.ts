import { AppStateType } from './redux-store';
import { getAuthUserData } from "./auth-reducer";
import { Dispatch } from 'redux';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean
};

let initialState: InitialStateType = {
    initialized: false
};

type ActionTypes = InitializedSuccessActionType

//reducer
const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch(action.type) {
        case INITIALIZED_SUCCESS: 
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    };      
};

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS //'INITIALIZED_SUCCESS'
}
//actionCreator
export const initializedSuccess = (): InitializedSuccessActionType => {
    return {type: INITIALIZED_SUCCESS}    
};

//thunkCreators
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(()=>{
            dispatch(initializedSuccess());
        })
    
}

export default appReducer;