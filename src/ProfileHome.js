import React, { useEffect, useState } from 'react';

const ProfileHome = ({ auth, bids, jobs })=>{
  const [list, setList] = useState([])
  
  useEffect(() => {
    auth.role === 'COMPANY' ? setList([...bids]) : setList([...jobs]);
    console.log(list);
  }, [])
  return(
    <div className = 'columnNW margin1'>
      <h1>{ auth.username }</h1>
      <div>
        <input type = 'button' className = 'bgDB colorAO borderLB border5 padQuarter' onClick={()=>alert('nothing yet!')} value = 'Edit Profile' />
      </div>
      <h3 className = 'topMargin1'>Most Recent { auth.role === 'COMPANY' ? 'Bids' : 'Jobs' }</h3>
      <ul className = 'scrollable maxHeight2 bgLB border5'>{ 
        list.filter((item, idx) => idx < 5).map(item => {
          return (
            <li key = { `bid${ item.id }` } className = 'bgAlphaDB colorLB border10 pad1 marginHalf'>{ auth.role === 'COMPANY' ? item.proposal : item.description }</li>
          )
        })
      }</ul>
      <div>
        <h3>Conversations</h3>
        <ul className = 'scrollable maxHeight2'>{
          list.reduce((acc, item) => { if(!acc.includes(item)){ acc.push(item) }; return acc }, []).map(item => {
            return (
              <li key = { `chat${ item.id }` } className = 'bgDB marginHalf padHalf border5'><a href = { `#chat${ item.id }` } className = 'colorBB'>User: { item.username }</a></li>
            )
          })
        }</ul>
      </div>
    </div>
  )
}

export default ProfileHome