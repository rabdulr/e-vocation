import React, { useEffect, useState } from 'react';
import { runInContext } from 'vm';
import ProfileCalendar from './ProfileCalendar'


// slice instead of filter on most recent list?
//change key in same to post.id
const ProfileHome = ({ auth, bids, posts, setPosts, breakpoint, route, setFocus, users })=>{
  const [list, setList] = useState([]);

  useEffect(() => {
    if(!(auth.id)){
        route('#');
    }
  }, []);
  
  useEffect(() => {
    auth.role === 'COMPANY' ? setList([...bids]) : setList([...posts]);
  }, [auth, bids, posts]);

  return(
    <div className = { `${ breakpoint === 'sm' || breakpoint === 'md' ? 'columnNW alignCenter' : 'rowWrap spaceBetweenRow' } margin1` }>
      <div className = 'columnNW'>
        <h1>{ auth.firstName } { auth.lastName }</h1>
        <div className = 'rowWrap spaceBetweenRow'>
          <input type = 'button' className = 'bgDB colorAO borderLB border5 fourteenPoint padHalf' onClick={ ()=> { setFocus(auth.id); route(`#profile/settings/${ auth.id }`) } } value = 'Edit Profile' />
          <input type = 'button' className = 'bgDB colorAO borderLB border5 fourteenPoint padHalf' onClick={ ()=> route(`#job-history/${ auth.id }`) } value = 'History' />
        </div>    
      </div>
      <ProfileCalendar  posts = { posts } auth = { auth } setFocus = { setFocus } />
      { list.length > 0 && <div className = 'columnNW'>
        <h3 className = 'topMargin1 bottomMargin1 centerText'>Most Recent { auth.role === 'COMPANY' ? 'Bids' : 'Jobs' }</h3>
        <ul className = 'scrollable maxHeight2 bgLB border5 maxWidth4'>{ 
          list.filter((item, idx) => idx < 5).map(item => {
            return (
              <li key = { `bid${ Math.ceil(Math.random() * 1000) }${ auth.role === 'COMPANY' ? item.companyId : item.userId }` } className = 'bgAlphaDB colorLB border10 pad1 marginHalf'>{ auth.role === 'COMPANY' ? item.proposal : item.description }</li>
            )
          })
        }</ul>  
      </div> }
      { list.length > 0 && <div className = 'columnNW widthundred topMargin1'>
        <h3 className = 'centerText'>Conversations</h3>
        <ul className = 'scrollable widthundred maxHeight2 maxWidth4'>{
          list.filter(item => auth.role === 'COMPANY' ? item.userId !== null : item.acceptedId !== null)
          .reduce((acc, item) => {
            if(!acc.includes(auth.role === 'COMPANY' ? item.userId : item.acceptedId)){
              acc.push(auth.role === 'COMPANY' ? item.userId : item.acceptedId)
            }
            console.log(acc);
            return acc;
          }, [])
          .map(id => {
            console.log(id)
            return (
              <li key = { `chat${ id }` } className = 'bgDB marginHalf centerText padHalf border5'><a href = { `#view=chat&id=${ id }` } className = 'colorBB' onClick = { ev => setFocus(id) }>{ auth.role === 'COMPANY' ? users.find(user => user.id === id).username : users.find(user => user.id === id).companyName }</a></li>
            )
          })
        }</ul>
      </div> }
    </div>
  )
}

export default ProfileHome