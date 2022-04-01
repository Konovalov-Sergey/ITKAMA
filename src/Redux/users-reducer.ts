import { UserType } from './../types/types';
import { usersApi } from "../API/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> //array of users id
};

export type InitialStateType = typeof initialState;

//reducer
const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch(action.type) {
        case FOLLOW: 
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    } 
                    return user
                })
            };
        
        case UNFOLLOW: 
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    } 
                    return user
                })
            };
        
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {...state, 
                    followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
                }
        }
        
        default:
            return state;
    }        
};
//actionCreators
type FollowSuccessActionCreatorType = {
    type: typeof FOLLOW,
    userId: number
};
export const followSuccess = (userId: number): FollowSuccessActionCreatorType => {
    return {type: FOLLOW, userId}    
};

type UnfollowSuccessActionCreatorType = {
    type: typeof UNFOLLOW,
    userId: number
};
export const unfollowSuccess = (userId: number): UnfollowSuccessActionCreatorType => {
    return {type: UNFOLLOW, userId}    
};
type SetUsersActionCreatorType = {
    type: typeof SET_USERS,
    users: Array<UserType>
};
export const setUsers = (users: Array<UserType>): SetUsersActionCreatorType => {
    return {type: SET_USERS, users}    
};
type SetCurrentPageActionCreatorType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
};
export const setCurrentPage = (currentPage: number): SetCurrentPageActionCreatorType => {
    return {type: SET_CURRENT_PAGE, currentPage}    
};
type SetTotalUsersCountActionCreatorType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
};
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionCreatorType => {
    return {type: SET_TOTAL_USERS_COUNT, totalUsersCount}    
};
type ToggleIsFetchingActionCreatorType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
};
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionCreatorType => {
    return {type: TOGGLE_IS_FETCHING, isFetching}    
};
type ToggleFollowingProgressActionCreatorType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
};
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionCreatorType => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}    
};

//thunkCreators

export const requestUsers = (currentPage: number, pageSize: number) => {
    return async (dispatch: any) => {
            dispatch(toggleIsFetching(true));
            dispatch(setCurrentPage(currentPage));
            let data = await usersApi.getUsers(currentPage, pageSize)
                dispatch(toggleIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount))
    }
}
export const follow = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(toggleFollowingProgress(true, userId));
        let response = await usersApi.followPost(userId)
            if (response.data.resultCode === 0) {
                dispatch(followSuccess(userId));
            }
            dispatch(toggleFollowingProgress(false, userId));
    }
}

export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(toggleFollowingProgress(true, userId));
        let response = await usersApi.followDelete(userId)
            if (response.data.resultCode === 0) {
                dispatch(unfollowSuccess(userId));
            }
            dispatch(toggleFollowingProgress(false, userId));
    }
}

export default usersReducer;