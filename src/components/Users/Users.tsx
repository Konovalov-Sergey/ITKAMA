import React from 'react';
import { UserType } from '../../types/types';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';

type PropsType = {
    currentPage: number,
    pageSize: number,
    totalUsersCount: number,
    users: Array<UserType>,
    followingInProgress: Array<number>,

    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    onPageChanged: (pageNumber: number) => void
}

const Users: React.FC<PropsType> = (props) => {
    return (
        <div>
            <Paginator currentPage = {props.currentPage}
                       onPageChanged = {props.onPageChanged}
                       totalItemsCount = {props.totalUsersCount}
                       pageSize = {props.pageSize}
            />
            <div>
                {props.users.map(u => 
                    <User   user = {u}
                            key = {u.id}
                            followingInProgress = {props.followingInProgress}
                            unfollow = {props.unfollow}
                            follow = {props.follow}
                    />)
                }
            </div>
            
        </div>
    );
}

export default Users;