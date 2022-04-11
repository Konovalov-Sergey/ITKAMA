import React from 'react';
import style from './Dialogs.module.css';
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
import AddMessageFormRedux from './AddMessageFormRedux';
//import { Redirect } from 'react-router-dom';


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

export default Dialogs;