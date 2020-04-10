import React, { useState, useEffect } from 'react';


const NavBar = ({ auth, setAuth, displayLogin, route }) => {

  const logout = () => {
    window.localStorage.removeItem('token');
    setAuth({});
  };

  return (
    <nav id = 'navBar' className = 'rowNW spaceBetweenRow'>
      <a href = '#' onClick = { ({ target }) => { route(target.href) } }>Kreg's Least</a>
      { !auth.id && <div onClick = { ({ target }) => displayLogin() }>Login/Sign Up</div> }
      { auth.id && <a href = { `#profile/${ auth.id }` } onClick = { ({ target }) => { route(target.href) } }>{ auth.username }</a> }
      { auth.id && <div onClick = { ({ target }) => logout() }>Log Out</div> }
    </nav>
  )
};

export default NavBar