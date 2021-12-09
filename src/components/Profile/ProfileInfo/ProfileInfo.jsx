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

  let onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  return (
    <div className={style.profile}>
        <div className={style.userPhoto}>
          <img src={props.profile.photos.large || userPhoto} alt={"myPhoto"}/>
          <div>
            {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
          </div>          
          <ProfileStatusWithHooks status={props.status} updateStatus = {props.updateStatus} />        
          <div><b>About me</b>:{props.profile.aboutMe}</div>
          <div><b>Full name</b>:{props.profile.fullName}</div>
          <div><b>Looking for a job</b>:{props.profile.lookingForAJob ? "yes" : "no"}</div>
          {props.profile.lookingForAJob &&
            <div><b>my professional skills</b>:{props.profile.lookingForAJobDescription}</div>
          }
          <div><b>Description</b>:{props.profile.lookingForAJobDescription}</div>
          <div className={style.contacts}><b>Contacts</b>:
            {Object.keys(props.profile.contacts).map(key =>{
              return <Contacts key={key} 
                              contactTitle={key} 
                              contactValue={props.profile.contacts[key]} 
                    />
            })}
          </div>
        </div>        
    </div>
  )
}

const Contacts = ({contactTitle, contactValue}) =>{
  return <div><b>{contactTitle}</b>: {contactValue} </div>
}

export default ProfileInfo;