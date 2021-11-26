import React from 'react';
import AddPostReduxform from './AddNewPostForm';
import style from './MyPosts.module.css';
import Post from './Post/Post';


class MyPosts extends React.Component {

  
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.State
  }

  render() {

      let posts = this.props.posts.map(post => <Post message={post.message} 
                                                //id={post.id} 
                                                key={post.id}
                                                likesCount={post.likesCount} />)

  // let newPostElement = React.createRef();

  let onAddPost = (values) => {
      this.props.addPost(values.newPostText);
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

}

export default MyPosts;