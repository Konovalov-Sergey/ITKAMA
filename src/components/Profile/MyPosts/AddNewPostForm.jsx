import React from 'react';
import {reduxForm, Field} from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import {Textarea} from '../../Common/FormsControls/FormsControls';

const maxLength = maxLengthCreator(10);

const AddNewPostForm = (props) => {
  return (
      <form onSubmit = {props.handleSubmit}>
          <Field component = {Textarea} 
                name={'newPostText'} 
                validate = {[ required, maxLength ]}
                placeholder = {'Post message'}/>
          <div>
              <button>Add Post</button>
          </div>          
      </form>        
  )
}

const AddPostReduxform = reduxForm({form:'ProfileAddNewPostForm'})(AddNewPostForm)

export default AddPostReduxform