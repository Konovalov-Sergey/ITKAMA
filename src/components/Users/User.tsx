import React from 'react';
import style from './Users.module.css';
import userPhoto from './../../assets/userPhoto.png';
import {NavLink} from 'react-router-dom';
import { UserType } from '../../types/types';

type PropsType = {
    user: UserType, 
    followingInProgress: Array<number>, 
    unfollow: (userId: number)=> void, 
    follow: (userId: number)=> void
}

const User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (
            <div>
                <div>
                    <div > 
                        <NavLink to = {'/Profile/' + user.id}>
                            <img src={user.photos.small !== null ? user.photos.small : userPhoto} alt={'img'}/>                            
                        </NavLink>
                    </div>
                    <div> 
                        {user.followed
                            ? <button 
                                disabled={followingInProgress.some(id => id === user.id)}
                                onClick = {() => {unfollow(user.id)}}>
                                        Unfollow
                                </button>
                            : <button 
                                disabled={followingInProgress.some(id => id === user.id)}
                                onClick = {() => {follow(user.id)}}>
                                        Follow
                                </button>
                        }                        
                    </div>
                </div>
                <div>
                    <div> 
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </div>
                    <div>
                        <div>user.location.city</div>
                        <div>user.location.country</div>
                    </div>
                </div>
            </div> 
    );
}

export default User;