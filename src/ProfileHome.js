import React, { useEffect, useState } from 'react';
import { runInContext } from 'vm';

const ProfileHome = ({ auth, bids, posts, setPosts, breakpoint, route, setFocus })=>{
  const [list, setList] = useState([]);
  
  useEffect(() => {
    auth.role === 'COMPANY' ? setList([...bids]) : setList([...posts]);
  }, []);

  return(
    <div className = { `${ breakpoint === 'sm' || breakpoint === 'md' ? 'columnNW alignCenter' : 'rowWrap spaceBetweenRow' } margin1` }>
      <div className = 'columnNW'>
        <h1>{ auth.firstName } { auth.lastName }</h1>
        <div className = 'rowWrap spaceBetweenRow'>
          <input type = 'button' className = 'bgDB colorAO borderLB border5 padQuarter' onClick={ ()=> { setFocus(auth.id); console.log('list', list); route(`#profile/settings/${ auth.id }`) } } value = 'Edit Profile' />
          <input type = 'button' className = 'bgDB colorAO borderLB border5 padQuarter' onClick={ ()=> route('#job-history') } value = 'History' />
        </div>  
      </div>
      { list.length > 0 && <div className = 'columnNW'>
        <h3 className = 'topMargin1'>Most Recent { auth.role === 'COMPANY' ? 'Bids' : 'Jobs' }</h3>
        <ul className = 'scrollable maxHeight2 bgLB border5 maxWidth4'>{ 
          list.filter((item, idx) => idx < 5).map(item => {
            return (
              <li key = { `bid${ Math.ceil(Math.random() * 1000) }${ auth.role === 'COMPANY' ? item.companyId : item.userId }` } className = 'bgAlphaDB colorLB border10 pad1 marginHalf'>{ auth.role === 'COMPANY' ? item.proposal : item.description }</li>
            )
          })
        }</ul>  
      </div> }
      { list.length > 0 && <div className = 'columnNW'>
        <h3>Conversations</h3>
        <ul className = 'scrollable maxHeight2 maxWidth4'>{
          list.reduce((acc, item) => { if(!acc.includes(item)){ acc.push(item) }; return acc }, []).map(item => {
            return (
              <li key = { `chat${ Math.ceil(Math.random() * 1000) }${ auth.role === 'COMPANY' ? item.companyId : item.userId }` } className = 'bgDB marginHalf padHalf border5'><a href = { `#chat${ auth.role === 'COMPANY' ? item.companyId : item.userId }` } className = 'colorBB' onClick = { ev => setFocus(auth.role === 'COMPANY' ? item.companyId : item.userId) }>{ auth.role === 'COMPANY' ? item.companyId : item.userId }</a></li>
            )
          })
        }</ul>
      </div> }
    </div>
  )
}

export default ProfileHome