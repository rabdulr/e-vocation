import React from 'react';
import moment from 'moment'

const PostSearch = ({posts, route, setFocus}) => {
  return(
    <div id="PostSearchRoot" className = 'marginHalf columnNW alignCenter maxWidth4'>
      <h2 className = 'colorDB '>Posts</h2>
      <ul className = 'widthundred scrollable maxHeight4'>{ 
        posts.map(post => {
          return (
          <li key = { `post${ post.id }` } className = 'colorDB'>
            <a  href = {`#post/${post.id}`} onClick = {({target})=>{setFocus(post.id); route(target.href)}}>
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
  )
}

export default PostSearch