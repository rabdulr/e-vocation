import React from 'react';
import moment from 'moment';
import CreateBid from './CreateBid'
console.log('PostDetail.js')

const PostDetail = ({auth, focus, post, createBid, bids}) => {

  return (
    <div id = 'PostDetailRoot'>
      <h1>{post.title}</h1>
      <p>{moment(post.datePosted).format('MM/DD/YYYY')}</p>
      <p>{post.description}</p>
      <p>Start date: {moment(post.startDate).format('MM/DD/YYYY')}</p>
      <p>End date: {moment(post.endDate).format('MM/DD/YYYY')}</p>
      <p>Site Address: {post.siteAddress}</p>
      <p>Proposed budget: ${post.proposedBudget}</p>
      { auth.role === 'COMPANY' && <CreateBid post={post} auth={auth} createBid={createBid} bids={bids}/> }
    </div>)
}

export default PostDetail