import React, { useEffect, useState } from 'react';
import moment from 'moment';
import CreateBid from './CreateBid'
import BidList from './BidList'

const PostDetail = ({auth, focus, post, createBid, bids, users}) => {

  const [filteredBids, setFilteredBids] = useState(bids.filter(bid => bid.postId === post.id))

  return (
    <div id = 'PostDetailRoot'>
      <h1>{post.title}</h1>
      <p>{moment(post.datePosted).format('MM/DD/YYYY')}</p>
      <p>{post.description}</p>
      <p>Start date: {moment(post.startDate).format('MM/DD/YYYY')}</p>
      <p>End date: {moment(post.endDate).format('MM/DD/YYYY')}</p>
      <p>Site Address: {post.siteAddress}</p>
      <p>Proposed budget: ${post.proposedBudget}</p>
      { auth.role === 'COMPANY' && <CreateBid post={post} auth={auth} createBid={createBid} bids={filteredBids}/> }
      { auth.role === 'USER' && <BidList bids = {filteredBids} users = {users} /> }
    </div>)
}

export default PostDetail