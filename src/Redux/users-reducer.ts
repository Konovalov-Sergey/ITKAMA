import { AppStateType, InferActionsTypes } from './redux-store';
import { UserType } from './../types/types';
import { usersApi } from "../API/api";
import { ThunkAction } from 'redux-thunk';

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
const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch(action.type) {
        case 'FOLLOW': 
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    } 
                    return user
                })
            };
        
        case 'UNFOLLOW': 
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    } 
                    return user
                })
            };
        
        case 'SET_USERS': {
            return {...state, users: action.users}
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case 'TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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
type ActionTypes = InferActionsTypes<typeof actions>;

export const actions = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)
}


//thunkCreators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
            dispatch(actions.toggleIsFetching(true));
            dispatch(actions.setCurrentPage(currentPage));
            let data = await usersApi.getUsers(currentPage, pageSize)
                dispatch(actions.toggleIsFetching(false));
                dispatch(actions.setUsers(data.items));
                dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleFollowingProgress(true, userId));
        let response = await usersApi.followPost(userId)
            if (response.data.resultCode === 0) {
                dispatch(actions.followSuccess(userId));
            }
            dispatch(actions.toggleFollowingProgress(false, userId));
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleFollowingProgress(true, userId));
        let response = await usersApi.followDelete(userId)
            if (response.data.resultCode === 0) {
                dispatch(actions.unfollowSuccess(userId));
            }
            dispatch(actions.toggleFollowingProgress(false, userId));
    }
}

export default usersReducer;