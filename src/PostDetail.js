import React, { useEffect, useState } from 'react';
import moment from 'moment';
import CreateBid from './CreateBid'
import BidList from './BidList'
import {getAllPosts, headers} from './appMethods'
import { isString } from 'util';

const PostDetail = ({auth, mode, createBid, bids, users}) => {

  const [ post, setPost] = useState({})
  const [ filteredBids, setFilteredBids ] = useState([])
  // const [bidStates, setBidStates] = useState([])
  
  const postId = window.location.hash.split('#post/')[1]

  useEffect(()=>{
    getAllPosts(headers)
      .then(gotEEm => setPost(gotEEm.data.filter(suspect => suspect.id === postId)[0]))
  },[])   //API call for POSTS

  useEffect(()=>{
    setFilteredBids(bids.filter(bid => bid.postId === post.id))
  },[post])
  
  useEffect(()=>{
    console.log(filteredBids)
  },[filteredBids])

  return (
    <div id = 'PostDetailRoot'>
      <h1>{post.title}</h1>
      <p>{moment(post.datePosted).format('MM/DD/YYYY')}</p>
      <p>{post.description}</p>
      <p>Start date: {moment(post.startDate).format('MM/DD/YYYY')}</p>
      <p>End date: {moment(post.endDate).format('MM/DD/YYYY')}</p>
      <p>Site Address: {post.siteAddress}</p>
      <p>Proposed budget: ${post.proposedBudget}</p>
      { mode === 'COMPANY' && <CreateBid post={post} auth={auth} createBid={createBid} bids={filteredBids}/> }
      { mode === 'USER' && auth.id === post.userId && <BidList bids = {filteredBids} setBids = {setFilteredBids} users = {users} /> }
    </div>)
}

export default PostDetail