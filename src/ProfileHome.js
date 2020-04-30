import React, { useEffect, useState } from 'react';
import { runInContext } from 'vm';
import ProfileCalendar from './ProfileCalendar'

// slice instead of filter on most recent list?
//change key in same to post.id

const ProfileHome = ({ auth, mode, bids, posts, setPosts, breakpoint, users, route })=>{
  const [ list, setList ] = useState([]);
  const [ bidList, setBidList ] = useState([]);
  const [ postList, setPostList ] = useState([]);
  const [ events, setEvents ] = useState([]);
  
  useEffect(() => {
    if(!(auth.id)){
        route('#');
    }
  }, []);
  
  useEffect(() => {
    mode === 'COMPANY' ? setList([...bids]) : setList([...posts]);
  }, [mode, bids, posts]);

  useEffect(() => {
    const newList = list.filter(item => mode === 'COMPANY' ? item.bidderId === auth.id : item.userId === auth.id);
    setPostList(newList.length >= 5 ? newList.slice(newList.length - 5, newList.length) : [...newList]);
  }, [mode, posts, bids, list]);

  useEffect(() => {
    setBidList(bids.filter(item => mode === 'COMPANY' ? item.bidderId === auth.id : item.userId === auth.id))
  }, [bids, mode]);

  return(
    <div className = { `${ breakpoint === 'sm' || breakpoint === 'md' ? 'columnNW alignCenter' : 'rowWrap spaceBetweenRow' } margin1` }>
      <div className = 'columnNW'>
        <h1>{ mode === 'COMPANY' ? auth.companyName : `${ auth.firstName } ${ auth.lastName }` }</h1>
        <div className = 'rowWrap spaceBetweenRow'>
          <input type = 'button' className = 'bgDB colorAO borderLB border5 fourteenPoint padHalf' onClick={ ()=> route(`#profile/settings/${ auth.id }`) } value = 'Edit Profile' />
          <input type = 'button' className = 'bgDB colorAO borderLB border5 fourteenPoint padHalf' onClick={ ()=> route(`#job-history/${ auth.id }`) } value = 'History' />
        </div>
      </div>
      <ProfileCalendar  posts = { posts } auth = { auth } />
      { postList.length > 0 && <div className = 'columnNW'>
        <h3 className = 'topMargin1 bottomMargin1 centerText'>Most Recent { mode === 'COMPANY' ? 'Bids' : 'Jobs' }</h3>
        <ul className = 'scrollable maxHeight2 bgLB border5 maxWidth4'>{ 
          postList.map(item => {
            return (
              <li key = { `bid${ Math.ceil(Math.random() * 1000) }${ mode === 'COMPANY' ? item.companyId : item.userId }` } className = 'bgAlphaDB colorLB border10 pad1 marginHalf'>{ mode === 'COMPANY' ? item.proposal : item.description }</li>
            )
          })
        }</ul>  
      </div> }
      { bidList.length > 0 && <div className = 'columnNW widthundred topMargin1'>
        <h3 className = 'centerText'>Conversations</h3>
        <ul className = 'scrollable widthundred maxHeight2 maxWidth4'>{
          bidList.reduce((acc, item) => {
            if(!acc.includes(mode === 'COMPANY' ? item.userId : item.bidderId)){
              acc.push(mode === 'COMPANY' ? item.userId : item.bidderId)
            }
            return acc;
          }, [])
          .map(id => {
            return (
              <li key = { `chat${ id }` } className = 'bgDB marginHalf centerText padHalf border5'><a href = { `#view=chat&id=${ id }` } className = 'colorBB'>{ mode === 'COMPANY' ? users.find(user => user.id === id).username : users.find(user => user.id === id).companyName }</a></li>
            )
          })
        }</ul>
      </div> }
    </div>
  )
}

export default ProfileHome