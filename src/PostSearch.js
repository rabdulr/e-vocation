import React from 'react';
import moment from 'moment'

const PostSearch = ({posts}) => {
<<<<<<< HEAD



  return(
    <div id="PostSearchRoot" className = 'marginHalf'>
      <ul>
        {posts.map((post)=>{
          return <li key={ post.id }>
            <div>
              <h2>{ post.title }</h2>
              <h3>starting on { moment(post.startDate).format('h:mm:ss') }</h3>
            </div>
            <p>{ post.description }</p></li>
        })}
      </ul>
=======
  return(
    <div id="PostSearchRoot" className = 'marginHalf columnNW alignCenter'>
      <h2 className = 'colorDB '>Posts</h2>
      <ul className = 'widthundred'>{ 
        posts.map(post => {
          return (
          <li key = { `post${ post.id }` } className = 'colorDB'>
            <h4 className = 'leftMarginHalf'>{ post.title }</h4>
            <div className = 'borderBB bgLB padHalf border10 marginHalf'>
              <div>{ post.description }</div>
              <div className = 'topMarginHalf'>Asking Price: $<span className = 'colorAO font700'>{ post.proposedBudget }</span></div>
            </div>
          </li>
          )
        })
      }</ul>
>>>>>>> ce3da1fd7fb33ee10a357daa51d691651a83b447
    </div>
  )
}

export default PostSearch