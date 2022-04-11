import React from 'react';
import { actions } from '../../Redux/dialog-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
//import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../Redux/redux-store';

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
    //isAuth: state.auth.isAuth
  }
};

export default compose(
  connect(mapStateToProps, {sendMessage: actions.sendMessage}),
  //withAuthRedirect,
)(Dialogs);
