import React from 'react';
import style from './Post.module.css';

type PropsType = {
  message: string
  likesCount: number
}

const Post: React.FC<PropsType> = ({message, likesCount}) => {
  return (
    <div className={style.item}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZNJk0ax-_XRwNM-e84VHSVo_Z1oAdXGWOfQ&usqp=CAU" alt=""/>
       {message}, likes:{likesCount};
    </div>
  )
}

export default Post;