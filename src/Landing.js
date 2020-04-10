import React, { useEffect, useState } from 'react';

const Landing = ({ displayLogin, route }) => {
  return(<div id='LandingRoot' className='rowNW'>
    <div className='marginHalf justifyContent'>
      <h2>Find a Job Near You. Gluten-Free!</h2>
      <p>so many jobs!</p>
      <input type='text' placeholder='search jobs'></input>
    </div>
    <div className='marginHalf'>
      <h2>Find Local Labor without Having Kids!</h2>
      <p>create an offer today</p>
      <button onClick = {() => displayLogin()}>Login</button>
    </div>
  </div>)
}

export default Landing;