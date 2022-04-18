import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { Input } from '../Common/FormsControls/FormsControls';
import { Redirect } from "react-router-dom";
import { getIsAuth } from '../../Redux/users-selector';
import { login } from '../../Redux/auth-reducer';

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


export const Login: React.FC = (props) => {

    const isAuth = useSelector(getIsAuth);
    const dispatch = useDispatch();

    const onSubmit = (formData: any) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe));
    };

    if (isAuth) {
        return  <Redirect to = {"profile"} />
    }

    return <div>
        <h1> Login </h1>
        <LoginReduxForm onSubmit = {onSubmit}/>
    </div>
};
