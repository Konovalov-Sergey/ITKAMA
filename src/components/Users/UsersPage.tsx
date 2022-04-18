import React from 'react';
import { useSelector } from 'react-redux';
import Preloader from '../Common/Preloader/Preloader';
import { getIsFetching } from '../../Redux/users-selector';
import { Users } from './Users';

type PropsType = { pageTitle: string }

export const UsersPage: React.FC<PropsType> = (props) => {

    const isFetching = useSelector(getIsFetching);

    return <>
             <h2>{props.pageTitle}</h2>
            {isFetching ? <Preloader /> : null}
            <Users />
        </>
}
