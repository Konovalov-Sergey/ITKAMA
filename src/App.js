import React from 'react';
import style from './App.module.css';
import UsersContainer from './components/Users/UsersContainer';
import Navbar from './components/Navbar/Navbar';
import {Route} from 'react-router-dom';
//import DialogsContainer from './components/Dialogs/DialogsContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { connect } from 'react-redux';
import { logout } from './Redux/auth-reducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { initializeApp } from './Redux/app-reducer';
import Preloader from './components/Common/Preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


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
                        render = { withSuspense(ProfileContainer) }
                    />
                    <Route 
                        /*exact*/ path='/Dialogs' 
                        render = { withSuspense(DialogsContainer) }
                    />          
                    <Route 
                        /*exact*/ path='/Users' 
                        render = { () => <UsersContainer pageTitle={"Samuraj"} /> }
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
