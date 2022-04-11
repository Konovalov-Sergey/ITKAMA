import { getAuthUserData } from "./auth-reducer";
import { InferActionsTypes } from "./redux-store";

let initialState = {
    initialized: false
};

export type InitialStateType = typeof initialState

export type ActionTypes = InferActionsTypes<typeof actions>

//reducer
const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch(action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS': 
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    };      
};

//actionCreator
export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}

//thunkCreators
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(()=>{
            dispatch(actions.initializedSuccess());
        })
    
}

export default appReducer;