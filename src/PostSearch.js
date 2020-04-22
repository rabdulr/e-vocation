import React, { useState, useEffect } from 'react';
import {Posts} from '../db/models/constructors';
import moment from 'moment';
import PostForm from './PostForm';

const PostSearch = ({auth, posts, route, breakpoint, createJobPost, setFocus}) => {
  const [userId, setUserId] = useState('');
  const [postDisplay, setPostDisplay] = useState(false);

  useEffect(() => {
    if(auth){
      setUserId(auth.id)
    }
  }, [auth])

  const togglePost = () => {
    console.log('PostSearch.togglePost:', postDisplay);
    setPostDisplay(!postDisplay);
  }

  return(
    <div id="PostSearchRoot" className = { `${ breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' ? 'columnNW' : 'rowWrap' }` }>
      { postDisplay && < PostForm auth = { auth } createJobPost = { createJobPost } userId = { userId } setUserId = { setUserId } togglePost = { togglePost } /> }
      <div className = 'marginHalf columnNW alignCenter maxWidth4'>
        <input type = 'button' value = 'Post New Job' onClick = { togglePost } className = 'EighteenPoint borderDB colorDB bgLB border15 padQuarter widthundred bottomMargin1' />
        <h2 className = 'colorDB '>Posts</h2>
        <ul className = 'widthundred scrollable maxHeight4'>{ 
          posts.map(post => {
            return (
            <li key = { `post${ post.id }` } className = 'colorDB'>
              <a  href = {`#post/${post.id}`} onClick = {()=>{setFocus(post.id)}}>
                <h4 className = 'leftMarginHalf colorDB'>{ post.title }</h4>
              </a>
              <div className = 'borderBB bgLB padHalf border10 marginHalf'>
                <div>{ post.description }</div>
                <div className = 'topMarginHalf'>Asking Price: $<span className = 'colorAO font700'>{ post.proposedBudget }</span></div>
              </div>
            </li>
            )
          })
        }</ul>
      </div>
    </div>
  )
}

export default PostSearch