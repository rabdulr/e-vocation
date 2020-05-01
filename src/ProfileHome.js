import React, { useEffect, useState } from 'react';
import { runInContext } from 'vm';
import ProfileCalendar from './ProfileCalendar'

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
    const newList = list.filter(item => mode === 'COMPANY' ? item.bidderId === auth.id : item.userId === auth.id).sort((l, r) => {
      return l.startDate > r.startDate ? 1
      : l.startDate === r.startDate ? 0
      : -1
    });
    setPostList(newList.length >= 5 ? newList.slice(newList.length - 5, newList.length) : [...newList]);
  }, [mode, posts, bids, list]);

  useEffect(() => {
    setBidList(bids.filter(item => mode === 'COMPANY' ? item.bidderId === auth.id : item.userId === auth.id))
  }, [bids, mode]);

  return(
    <div className = { `${ breakpoint === 'sm' || breakpoint === 'md' ? 'columnNW alignCenter' : 'columnWrap spaceBetweenRow' } margin1` }>
      <div className = 'columnNW alignCenter bottomMargin1'>
        <h1>{ mode === 'COMPANY' ? auth.companyName : `${ auth.firstName } ${ auth.lastName }` }</h1>
        <div className = { `${ breakpoint === 'sm' || breakpoint === 'md' ? 'rowWrap spaceBetweenRow justifyCenter' : 'rowNW justifyCenter' }` }>
          <input type = 'button' className = 'bgDB colorAO borderLB border5 fourteenPoint padHalf' onClick={ ()=> route(`#profile/settings/${ auth.id }`) } value = 'Edit Profile' />
          <input type = 'button' className = 'bgDB colorAO borderLB border5 fourteenPoint padHalf' onClick={ ()=> route(`#job-history/${ auth.id }`) } value = 'History' />
        </div>
      </div>
      <div className = { `${ breakpoint === 'sm' || breakpoint === 'md' ? 'columnNW' : 'rowNW spaceAroundRow' }` }>
        <ProfileCalendar  posts = { posts } auth = { auth } />
        { postList.length > 0 && <div className = { `columnNW` }>
          <h3 className = 'topMargin1 bottomMargin1 centerText'>Most Recent { mode === 'COMPANY' ? 'Bids' : 'Jobs' }</h3>
          <ul className = { `scrollable bgLB border5 maxWidth4 ${ breakpoint === 'sm' || breakpoint === 'md' ? 'maxHeight2' : 'maxHeight5' }` }>{ 
            postList.map(item => {
              return (
                <li key = { `bid${ Math.ceil(Math.random() * 1000) }${ mode === 'COMPANY' ? item.companyId : item.userId }` } className = 'bgDB colorLB border10 pad1 marginHalf'>
                  <a href = { `#post/${ mode === 'COMPANY' ? item.postId : item.id }` }>{ mode === 'COMPANY' ? posts.find(post => item.postId === post.id).title : item.title }</a>
                  <div className = 'topMargin1'>{ mode === 'COMPANY' ? item.proposal : item.description }</div>
                </li>
              )
            })
          }</ul>  
        </div> }
      </div>
      { bidList.length > 0 && <div className = 'columnNW widthundred topMargin1'>
        <h3 className = 'centerText'>Conversations</h3>
        <ul className = { `scrollable widthundred ${ breakpoint === 'sm' || breakpoint === 'md' ? 'maxHeight2 maxWidth4 columnNW' : 'maxHeight7 rowWrap' }` }>{
          bidList.reduce((acc, item) => {
            if(!acc.includes(mode === 'COMPANY' ? item.userId : item.bidderId)){
              acc.push(mode === 'COMPANY' ? item.userId : item.bidderId)
            }
            return acc;
          }, [])
          .map(id => {
            return (
              <li key = { `chat${ id }` } className = { `bgDB marginHalf centerText padHalf border5 ${ breakpoint === 'sm' || breakpoint === 'md' ? '' : 'vw3' }` }><a href = { `#view=chat&id=${ id }` } className = 'colorBB'>{ mode === 'COMPANY' ? users.find(user => user.id === id).username : users.find(user => user.id === id).companyName }</a></li>
            )
          })
        }</ul>
      </div> }
    </div>
  )
}

export default ProfileHome