import React, { useState, useEffect } from 'react';


const NavBar = ({ auth, setAuth, displayLogin }) => {

  const logout = () => {
    console.log(auth);
    setAuth({});
  };

  return (
    <nav id = 'navBar' className = 'rowNW spaceBetweenRow'>
      <div onClick = { ({ target }) => console.log('To Landing Page...') }>Kreg's Least</div>
      { !auth.id && <div onClick = { ({ target }) => displayLogin() }>Login/Sign Up</div> }
      { auth.id && <div onClick = { ({ target }) => console.log('To Profile Page...') }>{ auth.username }</div> }
      { auth.id && <div onClick = { ({ target }) => logout() }>Log Out</div> }
    </nav>
  )
};

export default NavBar