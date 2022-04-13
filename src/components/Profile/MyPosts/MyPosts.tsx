import React, { memo } from 'react';
import { PostType } from '../../../types/types';
import AddPostReduxform, { AddPostFormValuesType } from './AddNewPostForm';
import style from './MyPosts.module.css';
import Post from './Post/Post';

export type MapPropsType = { posts: Array<PostType> }
export type DispatchPropsType = { addPost: (newPostText: string)=> void }
type PropsType = MapPropsType & DispatchPropsType

const MyPosts: React.FC<PropsType> = props => {
  let posts = props.posts.map(post => <Post message={post.message} 
                                                  key={post.id}
                                                  likesCount={post.likesCount} />)

    let onAddPost = (values: AddPostFormValuesType) => {
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
}

const MyPostsMemo = React.memo(MyPosts)

export default MyPostsMemo;