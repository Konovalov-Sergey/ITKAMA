import React from 'react';
import { connect } from 'react-redux';
import { requestUsers, follow, unfollow } from '../../Redux/users-reducer';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import { compose } from 'redux';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../Redux/users-selector';
import { UserType } from '../../types/types';
import { AppStateType } from '../../Redux/redux-store';

type PropsType = MapStateToPropsType & MapDispathToPropsType & OwnPropsType;

type MapStateToPropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalUsersCount: number,
    users: Array<UserType>
    followingInProgress: Array<number>
};

type MapDispathToPropsType = {
    requestUsers: (currentPage:number, pageSize:number) => void
    follow: (userId: number) => void,
    unfollow: (userId: number) => void
};

type OwnPropsType = {
    pageTitle: string,
};

class UsersContainer extends React.Component<PropsType> {
   
    componentDidMount() {
       this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    };

    onPageChanged = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize);        
    };

    render () {
        return <>
             <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching 
            ? <Preloader /> 
            : null}
            <Users
                totalUsersCount = {this.props.totalUsersCount}
                pageSize = {this.props.pageSize}
                currentPage = {this.props.currentPage}
                onPageChanged = {this.onPageChanged}
                users = {this.props.users}
                //followSuccess = {this.props.follow}
                //unfollowSuccess = {this.props.unfollow}
                //toggleFollowingProgress = {this.props.toggleFollowingProgress}
                followingInProgress = {this.props.followingInProgress}
                follow = {this.props.follow}
                unfollow = {this.props.unfollow}
            />
        </>
     }
 };

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    connect<MapStateToPropsType, MapDispathToPropsType, OwnPropsType, AppStateType>(mapStateToProps, 
        {
            //toggleFollowingProgress,
            //followSuccess, 
            //unfollowSuccess, 
            // setCurrentPage, 
            requestUsers,
            follow,
            unfollow            
        }
    ),
)(UsersContainer);
