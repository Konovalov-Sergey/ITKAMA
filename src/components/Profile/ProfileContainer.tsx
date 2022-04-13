import React from 'react';
import Profile from './Profile';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {connect} from 'react-redux';
import { getStatus, getUserProfile, updateStatus, savePhoto, saveProfile} from '../../Redux/profile-reducer';
//import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../Redux/redux-store';
import { ProfileType } from '../../types/types';

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchType = {
    getUserProfile: (userId: number) => void, 
    getStatus: (userId: number) => void,
    updateStatus: (status: string) => void, 
    savePhoto: (file: File) => void, 
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {userId: string}

type PropsType = MapPropsType & MapDispatchType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {userId = this.props.authorizedUserId};
        this.props.getUserProfile(userId as number);
        this.props.getStatus(userId as number);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }        
    }
    
    render() {
        return (
            <div>
                <Profile {...this.props} 
                        isOwner={!this.props.match.params.userId}
                        profile = {this.props.profile}
                        status = {this.props.status} 
                        updateStatus = {this.props.updateStatus} 
                        savePhoto = {this.props.savePhoto}
                />
            </div>
        )
    }
};

let mapStateToProps = (state: AppStateType) => (
    {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id
    }
);

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    //withAuthRedirect,
)(ProfileContainer);

