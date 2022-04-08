import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Textarea } from '../../Common/FormsControls/FormsControls';
import style from './ProfileInfo.module.css';

const ProfileDataForm = ({profile, handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        <div><button>Save</button></div>

        {error && <div>{error}</div>}

        <div><b>Full name</b>:
            <Field 
                component = {Input} 
                name = {"fullName"}
                validate = {[]}
                placeholder = {"full name"}
            />
        </div>
        <div><b>Looking for a job</b>:
            <Field 
                component = {Input} 
                name = {"lookingForAJob"}
                validate = {[]}
                type = {'checkbox'}
            />
        </div>
        <div><b>About me</b>:
            <Field 
                component = {Textarea} 
                name = {"aboutMe"}
                validate = {[]}
                placeholder = {"About me"}
            />
        </div>        
        
        <div><b>my professional skills</b>:
            <Field 
                component = {Textarea} 
                name = {"lookingForAJobDescription"}
                validate = {[]}
                placeholder = {"professional skills"}
            />
        </div>
        
        <div><b>Contacts</b>:
            {Object.keys(profile.contacts).map(key =>{
                    return <div key={key} className={style.contacts}>
                        <b>{key} :</b>
                        <Field 
                            component = {Input} 
                            name = {"contacts." + key}
                            validate = {[]}
                            placeholder = {key}
                        />
                    </div>
                })
            }
        </div>
    </form>
  }

  const ProfileDataFormRedux = reduxForm({form: 'edit-profile'})(ProfileDataForm)

  export default ProfileDataFormRedux;
  