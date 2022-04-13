import React from 'react';
import { Redirect } from 'react-router-dom';

type PropsType = {
    isAuth: boolean
}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    function RedirectComponent(props: WCP & PropsType) {        
        if (!props.isAuth) return <Redirect to={"/login"} />
        return <WrappedComponent {...props}/>        
    }
    return RedirectComponent;
}