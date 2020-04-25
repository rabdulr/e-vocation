import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Bids = ({bids, route, breakpoint, auth, posts, setFocus }) => {
    const [bidList, setBidList] = useState([]);

    useEffect(() => {
      if(!(auth.id)){
        route('#');
      }
    }, [])
    //Have this set just to make sure we get the info in
    //Might be able to take it out
    useEffect(() => {
        if(bids){
            setBidList(bids)
        }
    }, [bids]);


  return(
    <div id="PostSearchRoot" className = 'marginHalf columnNW alignCenter maxWidth4'>
      <h2 className = 'colorDB '>Bids</h2>
      <ul className = 'widthundred scrollable maxHeight4'>{ 
        bidList.filter(bid => bid.bidderId === auth.id).map(bid => {
          const currentPost = posts.find(post => post.id === bid.postId)
          return (
          <li key = { `post${ bid.postId }` } className = 'colorDB'>
            <a href={`#post/${bid.postId}`} onClick = {()=>{setFocus(bid.postId)}}>
              <h4 className = 'leftMarginHalf colorDB'>{ currentPost.title }</h4>
            </a>
            <div className = 'borderBB bgLB padHalf border10 marginHalf'>
              <div>{ currentPost.description }</div>
              <div className = 'topMarginHalf'>Asking Price: $<span className = 'colorAO font700'>{ currentPost.proposedBudget }</span></div>
              <br />
              Start Date: { moment(currentPost.startDate).format('MM/DD/YYYY') }
              <br />
              End Date: { moment(currentPost.endDate).format('MM/DD/YYYY') }
              <br />
              Site Address: { currentPost.siteAddress }
              <br />
              Status: { currentPost.status }
            </div>
            <div>
                <h4>Current Proposal</h4>
                { bid.proposal }
                <h4>Bid</h4>
                ${ bid.bid }
            </div>
          </li>
          )
        })
      }</ul>
    </div>
  )
}

export default Bids