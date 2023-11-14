import React from 'react'


import HeaderCss from './Header.module.css'
const Header = (props) =>{
  return (
    <div className={HeaderCss.content}>
      <div className={HeaderCss.rectangle}>
        {/*<span className={HeaderCss.logo}>Logo</span>*/}
        <h1 className={HeaderCss.logo}>LOGO</h1>
      </div>
    </div>
  )
}

export default Header
