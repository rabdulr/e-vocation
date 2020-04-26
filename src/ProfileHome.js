import React, { useEffect, useState } from 'react';
import { runInContext } from 'vm';
import ProfileCalendar from './ProfileCalendar'

const ProfileHome = ({ auth, bids, posts, setPosts, breakpoint, route, setFocus })=>{
  const [list, setList] = useState([]);
  const [events, setEvents] = useState([]);

  // console.log(posts)
  // console.log(auth.id)


  useEffect(() => {
    if(!(auth.id)){
        route('#');
    }
  }, []);

  useEffect(() => {
    setList([...bids]);
  }, []);

  useEffect(() => {
    console.log("starting list: ",list)
  }, [list]);


  return(
    <div className = { `${ breakpoint === 'sm' || breakpoint === 'md' ? 'columnNW alignCenter' : 'rowWrap spaceBetweenRow' } margin1` }>
      <div className = 'columnNW'>
        <h1>{ auth.firstName } { auth.lastName }</h1>
        <div className = 'rowWrap spaceBetweenRow'>
          <input type = 'button' className = 'bgDB colorAO borderLB border5 padQuarter' onClick={ ()=> { setFocus(auth.id); route(`#profile/settings/${ auth.id }`) } } value = 'Edit Profile' />
          <input type = 'button' className = 'bgDB colorAO borderLB border5 padQuarter' onClick={ ()=> route(`#job-history/${ auth.id }`) } value = 'History' />
        </div>
        <ProfileCalendar  auth={auth} posts={posts} setFocus = {setFocus}/>
      </div>
      { list.length > 0 && <div className = 'columnNW'>
        <h3 className = 'topMargin1'>Most Recent { auth.role === 'COMPANY' ? 'Bids' : 'Jobs' }</h3>
        <ul className = 'scrollable maxHeight2 bgLB border5 maxWidth4'>{
          list.filter((item, idx) => idx < 5).map(item => {
            return (
              <li key = { `bid${ Math.ceil(Math.random() * 1000) }${ auth.role === 'COMPANY' ? item.bidderId : item.userId }` } className = 'bgAlphaDB colorLB border10 pad1 marginHalf'>{ auth.role === 'COMPANY' ? item.proposal : item.description }</li>
            )
          })
        }</ul>
      </div> }
      { list.length > 0 && <div className = 'columnNW'>
        <h3>Conversations</h3>
        <ul className = 'scrollable maxHeight2 maxWidth4'>{
          list.reduce((acc, item) => {
            ((auth.role === 'COMPANY') && (item.bidderId === auth.id) && !acc.includes(item.userId)) ? acc.push(item.userId)
            : ((auth.role === 'USER') && (item.userId === auth.id) && !acc.includes(item.bidderId)) ? acc.push(item.bidderId) : ' ';

            console.log(`item.bidder: ${item.bidderId}`)
            console.log(`auth.id: ${auth.id}`)
            console.log("list.acc", acc);
            return acc
          }, []).map(item => {
            return (
              <li key = { `chat${ Math.ceil(Math.random() * 1000) }${ item }` } className = 'bgDB marginHalf padHalf border5'><a href = {`#view=chat&id=${item}` } className = 'colorBB' onClick = { ev => setFocus( item) }>{  item }</a></li>
            )
          })
        }</ul>
      </div> }
    </div>
  )
}

export default ProfileHome
