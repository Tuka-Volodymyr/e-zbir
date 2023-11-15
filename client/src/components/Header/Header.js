import React from 'react'
import {NavLink} from "react-router-dom";


import HeaderCss from './Header.module.css'
const Header = (props) =>{
  return (
    <div className={HeaderCss.content}>
      <div className={HeaderCss.rectangle}>
        {/*<span className={HeaderCss.logo}>Logo</span>*/}
        <h1 className={HeaderCss.logo}>LOGO</h1>
        <nav className={HeaderCss.list}>
          <NavLink to='/main'>Головна</NavLink>
          <NavLink to='/col'>Збори</NavLink>   
          <NavLink to='/vol'>Волонтери</NavLink>
        </nav>
        <nav className='HeaderCss.piclist'>
          <img src="" alt="" />
        </nav>

      </div>
    </div>
  );
};

export default Header
