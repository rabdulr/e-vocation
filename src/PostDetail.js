import React, { useEffect, useState } from 'react';
import moment from 'moment';
import CreateBid from './CreateBid'
import BidList from './BidList'
import {getAllPosts, headers} from './appMethods'
import { isString } from 'util';

const PostDetail = ({auth, mode, createBid, bids, users}) => {

  const [ post, setPost] = useState({})
  const [ filteredBids, setFilteredBids ] = useState([])
  const [ singleBid, setSingleBid ] = useState({})
  // const [bidStates, setBidStates] = useState([])

  let postHold = {}

  useEffect(()=>{
    getAllPosts(headers)
      .then(response => postHold = response.data.find(post => post.id === window.location.hash.split('#post/')[1]))
      .then(()=>setPost(postHold))
  },[])   //API call for POSTSdat) console.log(Array.isArray(response.data[0]));
  //.post=>post.id === )[0]

  useEffect(()=>{
    setFilteredBids(bids.filter(bid => bid.postId === post.id))
  },[post, bids])
  
  useEffect(()=>{
    console.log('bids for singles', bids)
    setSingleBid(bids.find(bidz => bidz.postId === post.id && bidz.bidderId === auth.id))
  },[bids, postHold])

  useEffect(()=>{
    console.log( 'singleBid', singleBid)
  },[singleBid])

  return (
    <div id = 'PostDetailRoot'>
      <h1>{post.title}</h1>
      <p>{moment(post.datePosted).format('MM/DD/YYYY')}</p>
      <p>{post.description}</p>
      <p>Start date: {moment(post.startDate).format('MM/DD/YYYY')}</p>
      <p>End date: {moment(post.endDate).format('MM/DD/YYYY')}</p>
      <p>Site Address: {post.siteAddress}</p>
      <p>Proposed budget: ${post.proposedBudget}</p>
      { mode === 'COMPANY' && <CreateBid post={post} auth={auth} createBid={createBid} bids={filteredBids} singleBid = {singleBid} /> }
      { mode === 'USER' && auth.id === post.userId && <BidList bids = {filteredBids} setBids = {setFilteredBids} users = {users} /> }
      { mode === 'USER' && auth.id !== post.userId && <h2>Please switch to Company Mode to make a bid.</h2> }
    </div>)
}

export default PostDetail