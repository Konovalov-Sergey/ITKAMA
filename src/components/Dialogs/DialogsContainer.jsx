import React from 'react';
import { sendMessageActionCreator } from '../../Redux/dialog-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
//mport { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    isAuth: state.auth.isAuth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody)=> {
      dispatch(sendMessageActionCreator(newMessageBody))
    }  
  }  
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  //withAuthRedirect,
)(Dialogs);
