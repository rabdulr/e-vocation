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
        <a href = '#' onClick = { () => setDropVis(false) }>Kreg's Least</a>
        { !auth.id && <div onClick = { () => { setDropVis(false); displayLogin() } }>Login/Sign Up</div> }
        { auth.id && <a  onClick = { () => setDropVis(!dropVis) }>{ auth.username }</a> }
        { auth.id && <a href = { '#' } onClick = { () => { setDropVis(false); logout() } }>Log Out</a> }
      </nav>
      { dropVis && <section className = { `columnNW z1 frosted bgAlphaDB colorOW widthundred` }>
        <a href = { `#profile/${ auth.id }` } onClick = { () => setDropVis(!dropVis) } className = 'bottomBorderOW widthundred centerText padQuarter'>Profile</a>
        { (auth.role === 'USER' || auth.role === 'ADMIN') && <a href = { '#posts' } onClick = { () => setDropVis(!dropVis) } className = 'bottomBorderOW widthundred centerText padQuarter'>Posts</a> }
        <a href = { '#jobs' } onClick = { () => setDropVis(!dropVis) } className = 'bottomBorderOW widthundred centerText padQuarter'>Jobs</a>
        { (auth.role === 'COMPANY' || auth.role === 'ADMIN') && <a href = { '#bids' } onClick = { () => setDropVis(!dropVis) } className = 'bottomBorderOW widthundred centerText padQuarter'>Bids</a> }
      </section> }
    </div>
    
  )
}; 

export default NavBar