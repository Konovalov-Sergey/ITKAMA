import React from 'react';
import style from './Dialogs.module.css';
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
//import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import {Textarea} from '../Common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';

const Dialogs = (props) => {
    
    let state = props.dialogsPage;
    
    let dialogElements = state.dialogs
        .map((dialog) => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>);
    
    let messageElements = state.messages
        .map((item) => <Message message={item.message} id={item.id} key={item.id}/>);

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }

   //if (!props.Auth) return <Redirect to='/login' />
    
  return (
    <div className={style.dialogs}>
        <div className={style.dialogItems}>
            {dialogElements}
        </div>
        <div className={style.messages}>
            {messageElements}
        </div>   
        <AddMessageFormRedux onSubmit = {addNewMessage} />
    </div>
  )
}

const maxLength30 = maxLengthCreator(30);

const AddMessageForm = (props) => {
    return (
        <form onSubmit = {props.handleSubmit}>
            <div>
                <Field component = {Textarea} 
                        validate = {[required, maxLength30]}
                        name = {'newMessageBody'} 
                        placeholder = {"enter your message"}/>
            </div>
            <div><button>Send</button></div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'addMessageForm'})(AddMessageForm);

export default Dialogs;