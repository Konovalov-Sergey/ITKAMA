import React from 'react';
import style from './ProfileInfo.module.css';
import Preloader from './../../Common/Preloader/Preloader';
//import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from './../../../../src/assets/userPhoto.png';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }

  return (
    <div className={style.profile}>
        <div className={style.userPhoto}>
          <img src={props.profile.photos.large || userPhoto} />
          <ProfileStatusWithHooks status={props.status} updateStatus = {props.updateStatus} />
          <div><span>About me: </span>{props.profile.aboutMe}</div>
          <div><span>Name: </span>{props.profile.fullName}</div>
          <div><span>Looking for a job: </span>{props.profile.lookingForAJob}</div>
          <div><span>Description: </span>{props.profile.lookingForAJobDescription}</div>
        </div>        
    </div>
  )
}

export default ProfileInfo;