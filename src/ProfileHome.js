import React, { useEffect, useState } from 'react';
import { runInContext } from 'vm';

const ProfileHome = ({ auth, bids, jobs, breakpoint })=>{
  const [list, setList] = useState([])
  
  useEffect(() => {
    auth.role === 'COMPANY' ? setList([...bids]) : setList([...jobs]);
  }, [])
  return(
    <div className = { `${ breakpoint === 'sm' || breakpoint === 'md' ? 'columnNW alignCenter' : 'rowWrap spaceBetweenRow' } margin1` }>
      <div className = 'columnNW'>
        <h1>{ auth.firstName } { auth.lastName }</h1>
        <div className = 'rowWrap spaceBetweenRow'>
          <input type = 'button' className = 'bgDB colorAO borderLB border5 padQuarter' onClick={ ()=> route('#profile/settings') } value = 'Edit Profile' />
          <input type = 'button' className = 'bgDB colorAO borderLB border5 padQuarter' onClick={ ()=> route('#job-history') } value = 'History' />
        </div>  
      </div>
      { list.length && <div className = 'columnNW'>
        <h3 className = 'topMargin1'>Most Recent { auth.role === 'COMPANY' ? 'Bids' : 'Jobs' }</h3>
        <ul className = 'scrollable maxHeight2 bgLB border5 maxWidth4'>{ 
          list.filter((item, idx) => idx < 5).map(item => {
            return (
              <li key = { `bid${ item.id }` } className = 'bgAlphaDB colorLB border10 pad1 marginHalf'>{ auth.role === 'COMPANY' ? item.proposal : item.description }</li>
            )
          })
        }</ul>  
      </div> }
      { list.length && <div className = 'columnNW'>
        <h3>Conversations</h3>
        <ul className = 'scrollable maxHeight2 maxWidth4'>{
          list.reduce((acc, item) => { if(!acc.includes(item)){ acc.push(item) }; return acc }, []).map(item => {
            return (
              <li key = { `chat${ item.id }` } className = 'bgDB marginHalf padHalf border5'><a href = { `#chat${ item.id }` } className = 'colorBB'>User: { item.username }</a></li>
            )
          })
        }</ul>
      </div> }
    </div>
  )
}

export default ProfileHome