import React, { ChangeEvent, useState } from 'react';
import style from './ProfileInfo.module.css';
import Preloader from '../../Common/Preloader/Preloader';
//import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from './../../../../src/assets/userPhoto.png';
import ProfileDataFormRedux from './ProfileDataForm';
import { ContactsType, ProfileType } from '../../../types/types';

type PropsType = {
  profile: ProfileType | null, 
  savePhoto: (file: File) => void, 
  isOwner: boolean, 
  status: string, 
  updateStatus: (status: string) => void, 
  saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({profile, savePhoto, isOwner, status, updateStatus, saveProfile}) => {

  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />
  }

  let onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData: ProfileType) => {
    saveProfile(formData)
      .then(()=>{setEditMode(false)
    })
  }
  
  return (
    <div className={style.profile}>
        <div className={style.userPhoto}>
          <img src={profile.photos.large || userPhoto} alt={"myPhoto"}/>
          <div>
            {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
          </div> 
          {editMode 
            ? <ProfileDataFormRedux initialValues={profile} profile={profile} onSubmit={onSubmit}/> 
            : <ProfileData profile={profile} isOwner={isOwner} goToEditMode = {() => {setEditMode(true)}} />}   
                
          <ProfileStatusWithHooks status={status} updateStatus = {updateStatus} />               
        </div>        
    </div>
  )
};

type ProfileDataPropsType = {
  profile: ProfileType, 
  isOwner: boolean, 
  goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
  return <div>
    {isOwner && <div><button onClick={goToEditMode}>Edit</button></div> }
    
    <div><b>Full name</b>:{profile.fullName}</div>
    <div><b>Looking for a job</b>:{profile.lookingForAJob ? "yes" : "no"}</div>
    <div><b>About me</b>:{profile.aboutMe}</div>
    {profile.lookingForAJob &&
      <div><b>my professional skills</b>:{profile.lookingForAJobDescription}</div>
    }
    <div className={style.contacts}><b>Contacts</b>:
      {Object.keys(profile.contacts).map(key =>{
        return <Contacts key={key} 
                        contactTitle={key} 
                        contactValue={profile.contacts[key as keyof ContactsType]} 
              />
      })}
    </div>
  </div>
}

type ContactsPropsType = {
  contactTitle: string, 
  contactValue: string | null
}
const Contacts: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) =>{
  return <div><b>{contactTitle}</b>: {contactValue} </div>
}

export default ProfileInfo;