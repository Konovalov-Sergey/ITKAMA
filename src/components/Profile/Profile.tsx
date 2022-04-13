import React from 'react';
import style from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../types/types';

type PropsType = {
    savePhoto: (file: File)=> void, 
    isOwner: boolean, 
    profile: ProfileType | null, 
    status: string, 
    updateStatus: (status: string) => void, 
    saveProfile: (profile: ProfileType) => Promise<any>
}

const Profile: React.FC<PropsType> = ({savePhoto, isOwner, profile, status, updateStatus, saveProfile}) => {
return (
    <div className={style.profile}>
        <ProfileInfo 
            savePhoto = {savePhoto}
            isOwner={isOwner}
            profile = {profile} 
            status = {status}
            updateStatus = {updateStatus}
            saveProfile = {saveProfile}
        />
        <MyPostsContainer  />
    </div>
  )
}

export default Profile;