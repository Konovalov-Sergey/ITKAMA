import React from 'react';
import Profile from './Profile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { getStatus, getUserProfile, updateStatus } from '../../Redux/profile-reducer';
//import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {userId = this.props.authorizedUserId};
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
    
    render() {
        return (
            <div>
                <Profile {...this.props} 
                        profile = {this.props.profile}
                        status = {this.props.status} 
                        updateStatus = {this.props.updateStatus} 
                />
            </div>
        )
    }
};

let mapStateToProps = (state) => (
    {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id
    }
);

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    //withAuthRedirect,
)(ProfileContainer);

