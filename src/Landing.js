import React, { useEffect, useState } from 'react';

const Landing = ({ displayLogin, auth, route, breakpoint, setBreakpoint }) => {
  return(
    <div id='LandingRoot' className={ `${ breakpoint === 'sm' || breakpoint === 'md' ? 'columnNW' : 'rowNW' }` }>
      <div className='marginHalf justifyContent'>
        <h2>Find a Job Near You. Gluten-Free!</h2>
        <p>so many jobs!</p>
        <input type='text' placeholder='search jobs'></input>
      </div>
      <div className='marginHalf'>
        <h2>Find Local Labor without Having Kids!</h2>
        <div>
          <p>create an offer today</p>
          { !auth.id && <input type = 'button' className = 'bgDB colorOW padQuarter borderLB border5' onClick = {() => displayLogin()} value = 'Login' /> }
          { auth.id && <input type = 'button' className = 'bgDB colorOW padQuarter borderLB border5' onClick = { () => route('#jobs') } value = 'List'/> }
        </div>
        
      </div>
    </div>
  )
}

export default Landing;