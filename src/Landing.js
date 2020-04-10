import React, { useEffect, useState } from 'react';

const Landing = ({ route })=> {
  return(<div id='LandingRoot' className='rowNW'>
    <div className='marginHalf'>
      <h1>Find a Job Near You. Gluten-Free!</h1>
      <input type='text' placeholder='search jobs'></input>
    </div>
    <div className='marginHalf'>
      <h1>Find Local Labor without Having Kids!</h1>
      <button>login to make a job</button>
    </div>
  </div>)
}

export default Landing