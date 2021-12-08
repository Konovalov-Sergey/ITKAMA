import { profileApi, usersApi } from "../API/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        {id: 1, message: 'It`s my first post', likesCount: 0},
        {id: 2, message: 'How are you IT?', likesCount: 5},
        {id: 3, message: 'Thanks I am fine', likesCount: 10},
    ],
    profile: null,
    status: "no pain no gain"
}

const profileReducer = (state = initialState, action) => {
    
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
            return {...state, profile: {...state.profile, photos: action.photos}}
        }      
        default:
            return state;
    }
};
//actionCreators
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});

export const setUserProfile = (profile) => {
    return {type: SET_USER_PROFILE, profile}    
};

export const setStatus = (status) => {
    return {type: SET_STATUS, status}
};

export const savePhotoSuccess = (photos) => {
    return {type: SAVE_PHOTO_SUCCESS, photos}
}

//thunkCreator
export const getUserProfile = (userId) => {
    return async (dispatch) => {
        let response = await usersApi.getProfile(userId)
        dispatch(setUserProfile(response.data))
    }
};
export const getStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileApi.getStatus(userId)
            dispatch(setStatus(response.data))
    }
};
export const updateStatus = (status) => {
    return async (dispatch) => {
        let response = await profileApi.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
}

export const savePhoto = (file) => {
    return async (dispatch) => {
        let response = await profileApi.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }
}

export default profileReducer;