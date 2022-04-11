import React from 'react';
import { actions } from '../../Redux/dialog-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
//import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    isAuth: state.auth.isAuth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      sendMessage: newMessageBody => {
      dispatch(actions.sendMessageActionCreator(newMessageBody))
    }  
  }  
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  //withAuthRedirect,
)(Dialogs);
