import React from 'react';
import style from './Navbar.module.css';
import {NavLink} from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className={style.navbar}>
        <div>
            <NavLink to="/Profile"  
                activeClassName={style.active}>Profile
            </NavLink>
        </div>
        <div>
            <NavLink to="/Dialogs" 
                activeClassName={style.active}>Messages
            </NavLink>
        </div>
        <div>
            <NavLink to="/Users" 
                activeClassName={style.active}>Users
            </NavLink>
        </div>
        <div>
            <NavLink to="">News</NavLink>
        </div>
        <div>
            <NavLink to="">Music</NavLink>
        </div>
        <div>
            <NavLink to="">Settings</NavLink>
        </div>
    </nav>
  )
}

export default Navbar;