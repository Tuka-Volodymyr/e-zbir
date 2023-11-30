import React from 'react'
import {Navigate, NavLink} from "react-router-dom";


import HeaderCss from './Header.module.css'
import {useDispatch, useSelector} from "react-redux";
const Header = (props) =>{
  const dispatch = useDispatch()


  const Alert = () =>{
    alert("Ця кнопка поки не працює, працює тільки кнопка профілю")
  }

  const setLogin = () =>{
    dispatch({type:'SET_USER_LOGIN', payload: window.localStorage.getItem('login')})
  }

  return (
    <div className={HeaderCss.content}>
      <div className={HeaderCss.rectangle}>
        <h1 className={HeaderCss.logo}>Є-Збір</h1>
        <nav className={HeaderCss.list}>
          <NavLink to='/'>Головна</NavLink>
          <NavLink to='/zbir'>Збори</NavLink>
          <NavLink to='/vol'>Волонтери</NavLink>
        </nav>
        <div className={HeaderCss.iconsBlock}>
          <div className={HeaderCss.searchBtn}>
            <img onClick={Alert} src="/img/search.svg" alt=""/>
          </div>
          <div className={HeaderCss.socialNetworks}>
            <img onClick={Alert} src="/img/facebook.svg" alt=""/>
            <img onClick={Alert} src="/img/twitter.svg" alt=""/>
            <img onClick={Alert} src="/img/telegram.svg" alt=""/>
          </div>
          <div className={HeaderCss.profile}>
            <NavLink onClick={setLogin} to='/login'>
              <img src="/img/user.svg" alt=""/>
            </NavLink>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header
