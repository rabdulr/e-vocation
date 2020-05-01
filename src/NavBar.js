import React, { useState, useEffect } from 'react';


const NavBar = ({ auth, mode, setMode, setAuth, displayLogin, route, breakpoint }) => {
  const [dropVis, setDropVis] = useState(false);

  const logout = () => {
    window.localStorage.removeItem('token');
    setAuth({});
  };

  return (
    <div>
      <nav id = 'navBar' className = 'rowNW spaceBetweenRow'>
        <a href = '#' onClick = { () => setDropVis(false) }><img src = { `./assets/img/E-Vocation${ breakpoint === 'sm' || breakpoint === 'md' ? '-256p-247p' : '-1800p-560p' }.png` } className = 'vh6' /></a>
        { auth.companyName && <div>
          <div>
            <input type = 'button' value = 'User' className = {`${ mode === 'USER' ? 'bgAO colorDB borderAO' : 'bgLB colorAO borderDB' } padHalf topLeft5 bottomLeft5`} onClick = { ({ target }) => setMode(target.value.toUpperCase())  } />
            <input type = 'button' value = 'Company'  className = {`${ mode === 'COMPANY' ? 'bgAO colorDB borderAO' : 'bgLB colorAO borderDB' } padHalf topRight5 bottomRight5`} onClick = { ({ target }) => setMode(target.value.toUpperCase()) } />    
          </div>
        </div> }
        { !auth.id && <div onClick = { () => { setDropVis(false); displayLogin() } }><img src = './assets/img/Anonymous-Account.png' className = 'vh6' /></div> }
        { auth.id && <a  onClick = { () => setDropVis(!dropVis) }><img src = './assets/img/Site-Links.png' className = 'vh6' /></a> }
        { auth.id && <a href = { '#' } onClick = { () => { setDropVis(false); logout() } }><img src = './assets/img/Logout.png' className = 'vh6' /></a> }
      </nav>
      { dropVis && <section className = { `columnNW z1 frosted bgAlphaDB colorOW widthundred` }>
        <a href = { `#profile/${ auth.id }` } onClick = { () => setDropVis(!dropVis) } className = 'bottomBorderOW widthundred centerText padQuarter'>Profile</a>
        { mode === 'USER' && <a href = { '#posts' } onClick = { () => setDropVis(!dropVis) } className = 'bottomBorderOW widthundred centerText padQuarter'>Posts</a> }
        { mode === 'COMPANY' && <a href = { '#jobs' } onClick = { () => setDropVis(!dropVis) } className = 'bottomBorderOW widthundred centerText padQuarter'>Jobs</a> }
        { mode === 'COMPANY' && <a href = { '#bids' } onClick = { () => setDropVis(!dropVis) } className = 'bottomBorderOW widthundred centerText padQuarter'>Bids</a> }
        <a href = { '#contracts/active' } onClick = { ({ target }) => setDropVis(!dropVis)} className = 'bottomBorderOW widthundred centerText padQuarter'>Contracts</a>
      </section> }
    </div>
    
  )
}; 

export default NavBar