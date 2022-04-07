import { PostType, ProfileType, PhotosType } from './../types/types';
import { profileApi, usersApi } from "../API/api";
import { Dispatch } from 'redux';
import { AppStateType } from './redux-store';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

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

type ActionTypes = SavePhotoSuccessActionCreatorType
                | SetStatusActionCreatorType
                | SetUserProfileActionCreatorType
                | AddPostActionCreatorType

const profileReducer = (state = initialState, action:ActionTypes): InitialStateType => {
    
    switch(action.type) {
        case ADD_POST: {
            let newPost = {
                id: 4,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                newPostText:'',
                posts: [...state.posts, newPost]
            };            
        }             
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }        
        case SET_STATUS: {
            return {...state, status: action.status}
        }  
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }      
        default:
            return state;
    }
};
//actionCreators
type AddPostActionCreatorType = {
    type: typeof ADD_POST,
    newPostText: string
};
export const addPostActionCreator = (newPostText:string):AddPostActionCreatorType => ({type: ADD_POST, newPostText});

type SetUserProfileActionCreatorType ={
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
};
export const setUserProfile = (profile:ProfileType): SetUserProfileActionCreatorType => {
    return {type: SET_USER_PROFILE, profile}    
};

type SetStatusActionCreatorType = {
    type: typeof SET_STATUS,
    status: string
};
export const setStatus = (status:string):SetStatusActionCreatorType => {
    return {type: SET_STATUS, status}
};

type SavePhotoSuccessActionCreatorType ={
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
};
export const savePhotoSuccess = (photos:PhotosType):SavePhotoSuccessActionCreatorType => {
    return {type: SAVE_PHOTO_SUCCESS, photos}
}

//thunkCreator
type ThunkType = Dispatch<ActionTypes>
type GetAppStateType = () => AppStateType

export const getUserProfile = (userId:number) => {
    return async (dispatch: ThunkType, getState: GetAppStateType) => {
        let response = await usersApi.getProfile(userId)
        dispatch(setUserProfile(response.data))
    }
};
export const getStatus = (userId:number) => {
    return async (dispatch: ThunkType, getState: GetAppStateType) => {
        let response = await profileApi.getStatus(userId)
            dispatch(setStatus(response.data))
    }
};
export const updateStatus = (status:string) => {
    return async (dispatch: ThunkType, getState: GetAppStateType) => {
        let response = await profileApi.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
}

export const savePhoto = (file:any) => {
    return async (dispatch: ThunkType, getState: GetAppStateType) => {
        let response = await profileApi.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }
}

export default profileReducer;