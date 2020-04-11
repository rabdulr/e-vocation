import React, { useState, useEffect } from 'react';
import moment from 'moment'

const Bids = ({bids, route, breakpoint, auth}) => {
    const [bidList, setBidList] = useState([]);

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
        bidList.map(bid => {
          return (
          <li key = { `post${ bid.postId }` } className = 'colorDB'>
            <h4 className = 'leftMarginHalf'>{ bid.title }</h4>
            <div className = 'borderBB bgLB padHalf border10 marginHalf'>
              <div>{ bid.description }</div>
              <div className = 'topMarginHalf'>Asking Price: $<span className = 'colorAO font700'>{ bid.proposedBudget }</span></div>
              <br />
              Start Date: { bid.startDate }
              <br />
              End Date: { bid.endDate }
              <br />
              Site Address: { bid.siteAddress }
              <br />
              Status: { bid.status }
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