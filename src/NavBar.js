import React, { useState, useEffect } from 'react';


const NavBar = ({ auth, setAuth, displayLogin, route, breakpoint }) => {
  const [dropVis, setDropVis] = useState(false);

  const logout = () => {
    window.localStorage.removeItem('token');
    setAuth({});
    route('#');
  };

  return (
    <div>
      <nav id = 'navBar' className = 'rowNW spaceBetweenRow'>
        <a href = '#' onClick = { ({ target }) => { setDropVis(false); route(target.href) } }>Kreg's Least</a>
        { !auth.id && <div onClick = { ({ target }) => { setDropVis(false); displayLogin() } }>Login/Sign Up</div> }
        { auth.id && <a  onClick = { () => setDropVis(!dropVis) }>{ auth.username }</a> }
        { auth.id && <div onClick = { ({ target }) => { setDropVis(false); logout() } }>Log Out</div> }
      </nav>
      { dropVis && <section className = { `columnNW z1 frosted bgAlphaDB colorOW widthundred` }>
        <a href = { `#profile/${ auth.id }` } onClick = { ({ target }) => { setDropVis(!dropVis); route(target.href) } } className = 'bottomBorderOW widthundred centerText padQuarter'>Profile</a>
        <a href = { '#posts' } onClick = { ({ target }) => { setDropVis(!dropVis); route(target.href) } } className = 'bottomBorderOW widthundred centerText padQuarter'>Posts</a>
        <a href = { '#jobs' } onClick = { ({ target }) => { setDropVis(!dropVis); route(target.href) } } className = 'bottomBorderOW widthundred centerText padQuarter'>Jobs</a>
        { auth.role === 'COMPANY' && <a href = { '#bids' } onClick = { ({ target }) => { setDropVis(!dropVis); route(target.href) } } className = 'bottomBorderOW widthundred centerText padQuarter'>Bids</a> }
      </section> }
    </div>
    
  )
}; 

export default NavBar