import React, { useState, useEffect } from 'react';
import {Posts} from '../db/models/constructors';
import moment from 'moment';
import PostForm from './PostForm';

const PostSearch = ({auth, posts, route, breakpoint, createJobPost}) => {
  const [userId, setUserId] = useState('');
  const [postDisplay, setPostDisplay] = useState(false);

  useEffect(() => {
    if(!(auth.id)){
        route('#');
    }
  }, []);
  
  useEffect(() => {
    if(auth){
      setUserId(auth.id)
    }
  }, [auth])

  const togglePost = () => {
    setPostDisplay(!postDisplay);
  }

  return(
    <div id="PostSearchRoot" className = 'columnNW alignCenter'>
      { postDisplay && < PostForm auth = { auth } createJobPost = { createJobPost } userId = { userId } setUserId = { setUserId } togglePost = { togglePost } /> }
      <div className = { `marginHalf columnNW alignCenter ${ breakpoint === 'sm' ? 'maxWidth4' : '' }` }>
        <input type = 'button' value = 'Post New Job' onClick = { togglePost } className = 'EighteenPoint borderDB colorOW bgBB border15 padQuarter widthundred bottomMargin1' />
        <h2 className = 'colorDB '>Posts</h2>
        <ul className = { `widthundred scrollable ${ breakpoint === 'sm' ? 'maxHeight4 columnNW' : 'maxHeight7 rowWrap justifyStart' }` }>{ 
          posts.map(post => {
            return (
            <li key = { `post${ post.id }` } className = { `colorDB ${ breakpoint === 'sm' ? '' : 'vw3' }` }>
              <a  href = {`#post/${post.id}`} >
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