import React from 'react';
import style from './ProfileInfo.module.css';
import Preloader from './../../Common/Preloader/Preloader';
//import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  };

  return (
    <div className={style.profile}>
        {/* <div className={style.image}>
            <img src="https://nas-national-prod.s3.amazonaws.com/styles/article_hero_inline/s3/apa_2015_kevinrees_279316_annas_hummingbird_kk_1.jpg?itok=1O9su4AC" alt={'img'}/>
        </div> */}
        <div className={style.userPhoto}>
          <img src={props.profile.photos.large} alt={'img'}/>

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