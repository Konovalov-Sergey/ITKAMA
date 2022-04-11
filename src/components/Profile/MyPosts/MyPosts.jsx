import React, { memo } from 'react';
import AddPostReduxform from './AddNewPostForm';
import style from './MyPosts.module.css';
import Post from './Post/Post';


const MyPosts = React.memo(props => {
  let posts = props.posts.map(post => <Post message={post.message} 
                                                  key={post.id}
                                                  likesCount={post.likesCount} />)

    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    }
      return (
        <div className={style.myPosts}>
            My posts
            <AddPostReduxform onSubmit={onAddPost}/>
            <div className={style.posts}>
                {posts}
            </div>
        </div>
      )
}) 

export default MyPosts;