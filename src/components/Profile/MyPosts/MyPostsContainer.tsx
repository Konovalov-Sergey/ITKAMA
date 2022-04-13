import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../Redux/profile-reducer';
import { AppStateType } from '../../../Redux/redux-store';
import MyPostsMemo, { DispatchPropsType, MapPropsType } from './MyPosts';


const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  }
};

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>
                        (mapStateToProps, {addPost: actions.addPostActionCreator})(MyPostsMemo);

export default MyPostsContainer;