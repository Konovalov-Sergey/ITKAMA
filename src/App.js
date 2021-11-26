import React from 'react';
import style from './App.module.css';
import UsersContainer from './components/Users/UsersContainer';
import Navbar from './components/Navbar/Navbar';
import {Route} from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { connect } from 'react-redux';
import { logout } from './Redux/auth-reducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { initializeApp } from './Redux/app-reducer';
import Preloader from './components/Common/Preloader/Preloader';

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp()
    };

    render() {
        if(!this.props.initialized) {
            return <Preloader />
        }
        return (         
            <div className = {style.wrapper} >
                <HeaderContainer /> 
                <Navbar />
                <div className = {style.content} >
                    <Route 
                        /*exact*/ path='/Profile/:userId?' 
                        render = { () => <ProfileContainer /> }
                    />
                    <Route 
                        /*exact*/ path='/Dialogs' 
                        render = { () => <DialogsContainer /> }
                    />          
                    <Route 
                        /*exact*/ path='/Users' 
                        render = { () => <UsersContainer /> }
                    />    
                    <Route 
                        /*exact*/ path='/login' 
                        render = { () => <LoginPage /> }
                    />    
                </div>
            </div>        
        );
    };    
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp, logout}))
    (App);
