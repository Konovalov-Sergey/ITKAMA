import React from 'react';
import style from './Post.module.css';

const Post = (props) => {
  return (
    <div className={style.item}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZNJk0ax-_XRwNM-e84VHSVo_Z1oAdXGWOfQ&usqp=CAU" alt=""/>
       {props.message}, likes:{props.likesCount};
    </div>
  )
}

export default Post;