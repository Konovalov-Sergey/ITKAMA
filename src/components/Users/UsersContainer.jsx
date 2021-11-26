import React from 'react';
import { connect } from 'react-redux';
import { followSuccess, unfollowSuccess, setCurrentPage, toggleFollowingProgress, requestUsers, follow, unfollow } from '../../Redux/users-reducer';
import Users from './Users';
import Preloader from './../Common/Preloader/Preloader';
import { compose } from 'redux';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../Redux/users-selector';

class UsersContainer extends React.Component {
   
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    };

    onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize);        
    };

    render () {
        return <>
            {this.props.isFetching 
            ? <Preloader /> 
            : null}
            <Users
                totalUsersCount = {this.props.totalUsersCount}
                pageSize = {this.props.pageSize}
                currentPage = {this.props.currentPage}
                onPageChanged = {this.onPageChanged}
                users = {this.props.users}
                followSuccess = {this.props.follow}
                unfollowSuccess = {this.props.unfollow}
                toggleFollowingProgress = {this.props.toggleFollowingProgress}
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

let mapStateToProps = (state) => {
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
    connect(mapStateToProps, {followSuccess, 
        unfollowSuccess, 
        setCurrentPage, 
        requestUsers,
        follow,
        unfollow,
        toggleFollowingProgress}),
)(UsersContainer);
