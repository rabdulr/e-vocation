import React from 'react';
import moment from 'moment'

const PostSearch = ({posts}) => {



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
    </div>
  )
}

export default PostSearch