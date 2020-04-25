import React, { useState, useEffect } from 'react';


const NavBar = ({ auth, setAuth, displayLogin, route, breakpoint }) => {
  const [dropVis, setDropVis] = useState(false);

  const logout = () => {
    window.localStorage.removeItem('token');
    setAuth({});
  };

  return (
    <div>
      <nav id = 'navBar' className = 'rowNW spaceBetweenRow'>
        <a href = '#' onClick = { () => setDropVis(false) }><img src = { `./assets/E-Vocation${ breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' ? '-Mobile' : '' }.png` } className = 'vh6' /></a>
        { !auth.id && <div onClick = { () => { setDropVis(false); displayLogin() } }><img src = './assets/Anonymous-Account.png' className = 'vh6' /></div> }
        { auth.id && <a  onClick = { () => setDropVis(!dropVis) }><img src = './assets/Site-Links.png' className = 'vh6' /></a> }
        { auth.id && <a href = { '#' } onClick = { () => { setDropVis(false); logout() } }><img src = './assets/Account.png' className = { `${ breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' ? 'vh6' : 'vh10' }` } /></a> }
      </nav>
      { dropVis && <section className = { `columnNW z1 frosted bgAlphaDB colorOW widthundred` }>
        <a href = { `#profile/${ auth.id }` } onClick = { () => setDropVis(!dropVis) } className = 'bottomBorderOW widthundred centerText padQuarter'>Profile</a>
        { 
        // (auth.role === 'USER' || auth.role === 'ADMIN') && 
        // Making it so that everyone can see everything
        <a href = { '#posts' } onClick = { () => setDropVis(!dropVis) } className = 'bottomBorderOW widthundred centerText padQuarter'>Posts</a> }
        <a href = { '#jobs' } onClick = { () => setDropVis(!dropVis) } className = 'bottomBorderOW widthundred centerText padQuarter'>Jobs</a>
        { 
        // (auth.role === 'COMPANY' || auth.role === 'ADMIN') &&
        // Making it so that everyone can see everything 
        <a href = { '#bids' } onClick = { () => setDropVis(!dropVis) } className = 'bottomBorderOW widthundred centerText padQuarter'>Bids</a> }
        <a href = { '#contracts/active' } onClick = { ({ target }) => setDropVis(!dropVis)} className = 'bottomBorderOW widthundred centerText padQuarter'>Contracts</a>
      </section> }
    </div>
    
  )
}; 

export default NavBar