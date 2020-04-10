import React, { useEffect, useState } from 'react';

const UserHome = (()=>{
  return(<div>
    <h1>UserHome.js</h1>
    <button onClick={()=>alert('nothing yet!')}>edit profile info </button>
    <ul>
      <li>most recent job</li>
      <li>next most recent job</li>
      <li>less recent job</li>
    </ul>
    </div>)
})

export default UserHome