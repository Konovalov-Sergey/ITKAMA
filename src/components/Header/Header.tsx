import React from 'react';
import style from './Header.module.css';
import {NavLink} from 'react-router-dom';

export type MapPropsType = {
  isAuth: boolean
  login: string | null
}

export type DispatchPropsType = {
  logout: ()=> void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = ({isAuth, login, logout}) => {
  return (
    <div className={style.header}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBqxQYN-pe-iKCcN2i7zedvXJsUEtIfQf21w&usqp=CAU" alt={'img'}/>
      <div className={style.loginBlock}>
        {isAuth
          ? <div> {login} - <button onClick={logout}>Log out</button> </div> 
          :<NavLink to={'/login'}>Login</NavLink>
        }        
      </div>
    </div>
  )
}

export default Header;
