import React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { login } from '../../Redux/auth-reducer';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { Input } from '../Common/FormsControls/FormsControls';
import { Redirect } from "react-router-dom";
import { AppStateType } from '../../Redux/redux-store';

const maxLength = maxLengthCreator(40);

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>> = (props) => {
    return (
        <form onSubmit = {props.handleSubmit}>
            <div>
                <Field component={Input} 
                       placeholder={'Email'} 
                       name = {"email"}
                       validate = {[ required, maxLength ]}
                />
            </div>
            <div>
                <Field component={Input} 
                       placeholder={"password"} 
                       name = {"password"}
                       validate = {[ required, maxLength ]}
                       //type = {"password"}
                />
            </div>
            <div>
                <Field component={Input}
                       type = {'checkbox'}
                       name = {"rememberMe"} 
                />
                remember me
            </div>
            <div><button>LOGIN</button></div>
        </form>
    )
} 
// form: 'login' название формы
const LoginReduxForm = reduxForm<LoginFormValuesType>({form: 'login'})(LoginForm)

type MapStateToPropsType = {isAuth: boolean}

type MapDispatchToPropsType = {
    login: (email:string, password:string, rememberMe:boolean) => void
}



const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return  <Redirect to = {"profile"} />
    }

    return <div>
        <h1> Login </h1>
        <LoginReduxForm onSubmit = {onSubmit}/>
    </div>
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);