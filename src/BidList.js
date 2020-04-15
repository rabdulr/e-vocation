import React from 'react';

const BidList = ({bids, companies}) => {

  console.log(bids)
  console.log(companies)

  return(<ul>
    { bids.map(bid=>{
      return(<li key={bid.companyId} className = "borderBB">
        <h3>Bid from {companies.filter(comp => comp.id === bid.companyId)[0].companyName}</h3>
        <p>{bid.proposal}</p>
      </li>)
    }) }
  </ul>)
}

export default BidList