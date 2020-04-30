import React from 'react';

const BidList = ({bids, users}) => {

  const Accept = () => {
    alert("//TODO move this bid to the top, call the backEnd, disable other bids, initiate contract?, email bidder?")
  }
  const Message = () => {
    alert("//TODO route to ChatPage between users")
  }
  const Delete = () => {
    alert("//TODO remove bid, set to 'deleted' on backEnd (to prevent a re-bid?)")
  }

  return(<ul className = "rowWrap">
    { bids.map(bid=>{
      console.log("bid?")
      let statusColor = ''
      if(bid.bidStatus === 'Active'){
        statusColor = 'colorG'
      // } else if(bid.bidStatus === 'Accepted') {
      //   statusColor = 'colorDB'
      }
      
      return(<li key={bid.bidderId} className = "borderBB widthundred marginHalf padHalf">
        <div className = "rowNW spaceBetweenRow">
          <h3>Bid from {users.filter(use => use.id === bid.bidderId)[0].companyName}</h3>
          <h4 className = {"topMarginAuto " +statusColor} >{bid.bidStatus}</h4>
        </div> 
        <p>{bid.proposal}</p>
        <div className = "rowNW spaceBetweenRow">
          <button onClick = { ()=>Accept() }>Accept</button>
          <button onClick = { ()=>Message() }>Message</button>
          <button onClick = { ()=>Delete() }>Delete</button>
        </div>
      </li>)
    }) }
  </ul>)
}

export default BidList