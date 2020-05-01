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
  },[]) 

  useEffect(()=>{
    setFilteredBids(bids.filter(bid => bid.postId === post.id))
  },[post, bids])
  
  useEffect(()=>{
    setSingleBid(bids.find(bidz => bidz.postId === post.id && bidz.bidderId === auth.id))
  },[bids, postHold])

  useEffect(()=>{
    
  },[singleBid])

  return (
    <div id = 'PostDetailRoot' className = 'margin1'>
      <h1 className = 'centerText'>{post.title}</h1>
      <div className = 'bgDB colorOW margin1 pad1 border5'>
        <p>{moment(post.datePosted).format('MM/DD/YYYY')}</p>
        <p>{post.description}</p>
        <p>Start date: {moment(post.startDate).format('MM/DD/YYYY')}</p>
        <p>End date: {moment(post.endDate).format('MM/DD/YYYY')}</p>
        <p>Site Address: {post.siteAddress}</p>
        <p className = 'rowNW'><div>Proposed budget: $</div><div className = 'colorAO'>{post.proposedBudget}</div></p>  
      </div>
      
      { mode === 'COMPANY' && <CreateBid post={post} auth={auth} createBid={createBid} bids={filteredBids} singleBid = {singleBid} /> }
      { mode === 'USER' && auth.id === post.userId && <BidList bids = {filteredBids} setBids = {setFilteredBids} users = {users} /> }
      { mode === 'USER' && auth.id !== post.userId && <h2>Please switch to Company Mode to make a bid.</h2> }
    </div>)
}

export default PostDetail