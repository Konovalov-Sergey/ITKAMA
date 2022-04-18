import React from 'react';
import style from './App.module.css';
import { UsersPage } from './components/Users/UsersPage';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
//import DialogsContainer from './components/Dialogs/DialogsContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import {Login} from './components/Login/Login';
import { connect, Provider } from 'react-redux';
import { logout } from './Redux/auth-reducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { initializeApp } from './Redux/app-reducer';
import Preloader from './components/Common/Preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';
import store, { AppStateType } from './Redux/redux-store';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {initializeApp: ()=> void}

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);

class App extends React.Component<MapPropsType & DispatchPropsType> {

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
                    <Switch>
                        <Route exact path = '/'
                            render = {()=> <Redirect to={"/Profile/"}/> }
                        />
                        <Route 
                            /*exact*/ path='/Dialogs' 
                            render = { ()=> < SuspendedDialogs /> }
                        />          
                        <Route 
                            /*exact*/ path='/Profile/:userId?' 
                            render = { ()=> <SuspendedProfile /> }
                        />
                        <Route 
                            /*exact*/ path='/Users' 
                            render = { () => <UsersPage pageTitle={"Samuraj"} /> }
                        />    
                        <Route 
                            /*exact*/ path='/login' 
                            render = { () => <Login /> }
                        />   
                        <Route path='*' 
                            render = {() => <div>404 NOT FOUND</div>} />
                    </Switch>
                </div>
            </div>        
        );
    };    
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
});

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp, logout}))
    (App);

const SocialNetworkApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>    
    </BrowserRouter>
}

export default SocialNetworkApp