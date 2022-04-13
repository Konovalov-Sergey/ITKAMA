import React from 'react';
import {reduxForm,InjectedFormProps, Field} from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import {Textarea} from '../../Common/FormsControls/FormsControls';

export type AddPostFormValuesType = {
  newPostText: string
}

const maxLength = maxLengthCreator(30);

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType>> = (props) => {
  return (
      <form onSubmit = {props.handleSubmit}>
          <div>
              <Field 
                component = {Textarea} 
                name = {"newPostText"}
                validate = {[ required, maxLength ]}
                placeholder = "Post message"
            />
          </div>          
          <div>
              <button>Add Post</button>
          </div>          
      </form>        
  )
}

const AddPostReduxform = reduxForm<AddPostFormValuesType>({form:'ProfileAddNewPostForm'})(AddPostForm)

export default AddPostReduxform