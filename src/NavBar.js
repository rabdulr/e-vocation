import React, { useState, useEffect } from 'react';


const NavBar = ({ displayLogin }) => {

  return(<nav id = 'navBar' className = 'rowNW spaceBetweenRow'>
    <div>Kreg's Least</div>
    <div onClick = { ({ target }) => displayLogin() }>Login</div>
  </nav>)
}

export default NavBar