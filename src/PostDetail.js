import React, { useEffect, useState } from 'react';
import moment from 'moment';
import CreateBid from './CreateBid'
import BidList from './BidList'
import {getAllPosts} from './appMethods'
import { isString } from 'util';

const PostDetail = ({auth, createBid, bids, users}) => {

  const [ post, setPost] = useState({})
  const [ postId, setPostId] = useState(window.location.hash.split('#post/')[1])
  const [filteredBids, setFilteredBids] = useState({})

  // useEffect(() => {
  //   if(!(auth.id)){
  //       route('#');
  //   }
  // }, []);

  useEffect(()=>{
    getAllPosts()
      .then(gotEEm => setPost(gotEEm.data.filter(suspect => suspect.id === postId)[0]))
  },[postId])   //API call for POSTS

  useEffect(()=>{
    setFilteredBids(bids.filter(bid => bid.postId === post.id))
  },[postId])

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