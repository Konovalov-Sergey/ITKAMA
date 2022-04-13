import { PostType, ProfileType, PhotosType } from './../types/types';
import { profileApi } from "../API/profileAPI";
import { Dispatch } from 'redux';
import { AppStateType, InferActionsTypes } from './redux-store';
import { FormAction, stopSubmit } from 'redux-form';

let initialState = {
    posts: [
        {id: 1, message: 'It`s my first post', likesCount: 0},
        {id: 2, message: 'How are you IT?', likesCount: 5},
        {id: 3, message: 'Thanks I am fine', likesCount: 10},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: ""
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    
    switch(action.type) {
        case 'SN/PROFILE/ADD_POST': {
            let newPost = {
                id: 4,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };            
        }             
        case 'SN/PROFILE/SET_USER_PROFILE' : {
            return {...state, profile: action.profile}
        }        
        case 'SN/PROFILE/SET_STATUS': {
            return {...state, status: action.status}
        }  
            // case 'SN/PROFILE/DELETE_POST': {
            //     return {...state, posts: state.posts.filter(p => p.id != action.postId)
            // }
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS': {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }      
        default:
            return state;
    }
};
//actionCreators
type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    addPostActionCreator: (newPostText:string) => ({type: 'SN/PROFILE/ADD_POST', newPostText} as const),
    setUserProfile: (profile:ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status:string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    //deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos:PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const)
}

//thunkCreator
type ThunkType = Dispatch<ActionsTypes | FormAction>
type GetAppStateType = () => AppStateType

export const getUserProfile = (userId:number) => {
    return async (dispatch: ThunkType, getState: GetAppStateType) => {
        let data = await profileApi.getProfile(userId)
        dispatch(actions.setUserProfile(data))
    }
};
export const getStatus = (userId:number) => {
    return async (dispatch: ThunkType, getState: GetAppStateType) => {
        let data = await profileApi.getStatus(userId)
            dispatch(actions.setStatus(data))
    }
};
export const updateStatus = (status:string) => {
    return async (dispatch: ThunkType, getState: GetAppStateType) => {
        try {
            let data = await profileApi.updateStatus(status)
            if (data.resultCode === 0) {
                dispatch(actions.setStatus(status))
            
            }
        } catch (error) {
            //
        }
    }
}

export const savePhoto = (file: File) => {
    return async (dispatch: ThunkType, getState: GetAppStateType) => {
        let data = await profileApi.savePhoto(file);
        if (data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(data.data.photos))
        } 
    }
}

export const saveProfile = (profile: ProfileType) => {
    return async (dispatch: any, getState: GetAppStateType) => {
        const userId = getState().auth.id;
        const data = await profileApi.saveProfile(profile);
        
        if (data.resultCode === 0) {
            if (userId != null) {
                dispatch(getUserProfile(userId))
            } else {
                throw new Error("UserId can't be null")
            }
            
        } else {
            dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}));
            return Promise.reject(data.messages[0])
        }
    }
}

export default profileReducer;