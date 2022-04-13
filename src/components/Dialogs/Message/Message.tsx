import React from 'react';
import style from './Message.module.css';

type PropsType = {
  message: string
  id: number
}

const Message: React.FC<PropsType> = (props) => {
  return (
    <div className={style.message}> 
        {props.message}
    </div>
  )
}

export default Message;