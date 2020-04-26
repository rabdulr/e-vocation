import React, { useEffect, useState } from 'react';
import moment from 'moment';
import CreateBid from './CreateBid'
import BidList from './BidList'
import {getAllPosts} from './appMethods'

const PostDetail = ({auth, focus, post, createBid, bids, users, route}) => {

  const [ posts, setPosts] = useState({})
  const [filteredBids, setFilteredBids] = useState(bids.filter(bid => bid.postId === post.id))

  useEffect(() => {
    if(!(auth.id)){
        route('#');
    }
  }, []);

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
      { auth.role === 'USER' && auth.id === post.userId && <BidList bids = {filteredBids} users = {users} /> }
    </div>)
}

export default PostDetail