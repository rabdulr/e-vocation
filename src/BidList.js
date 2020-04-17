import React from 'react';

const BidList = ({bids, users}) => {

  console.log(bids)
  console.log(users)

  return(<ul>
    { bids.map(bid=>{
      return(<li key={bid.bidderId} className = "borderBB">
        <h3>Bid from {users.filter(use => use.id === bid.bidderId)[0].companyName}</h3>
        <p>{bid.proposal}</p>
      </li>)
    }) }
  </ul>)
}

export default BidList