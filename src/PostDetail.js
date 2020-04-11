import React from 'react';
console.log('PostDetail.js')

const PostDetail = ({auth, focus}) => {
  console.log(focus)
  return (<div id = 'PostDetailRoot'>
    <h1>{auth.username}</h1>
    <h2>{focus}</h2>
  </div>)
}

export default PostDetail