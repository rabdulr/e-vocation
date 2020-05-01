import React, {useState, useEffect} from 'react';
import { changeBidStatus, createContract } from './appMethods'

const BidList = ({bids, users, setBids}) => {

  let newness = {}

  const Accept = async(bid) => {
    bid.bidStatus = "Active"
    await createContract(bid)
      .then(returnedBid => setBids(bids.map( bid => {
        if(bid.id === returnedBid.id) {
          return returnedBid
        } else {
          return
        }
      })))
    alert("Your offer has become a Contract!")
  }
  const Message = () => {
    alert("//TODO route to ChatPage between users")
  }
  const Delete = async(bid) => {
    if(confirm('The Bidder will not be able to re-bid on your post. Proceed?')){
      bid.bidStatus = 'Deleted'
      // console.log(bid)
      await changeBidStatus(bid).then(newness => setBids(bids.map(bid => {
        if(bid.bidderId === newness.bidderId){
          return(newness)
        } else {
          return bid
        }
      })))
    }
  }

  return(<ul className = "rowWrap">
    { bids.map(bid=>{
      let statusColor = ''
      if(bid.bidStatus === 'Active'){
        statusColor = 'colorG'
      // } else if(bid.bidStatus === 'Accepted') {
      //   statusColor = 'colorDB'
        return(<li key={bid.bidderId} className = "borderBB widthundred marginHalf padHalf">
          <div className = "rowNW spaceBetweenRow">
            <h3>Bid from {users.filter(use => use.id === bid.bidderId)[0].companyName}</h3>
            <h4 className = {"topMarginAuto " +statusColor} >{bid.bidStatus}</h4>
          </div>
          <p>{bid.proposal}</p>
          <div className = "rowNW spaceBetweenRow">
            <button onClick = { ()=>Accept(bid) }>Accept</button>
            <button onClick = { ()=>window.location.href= `#view=chat&id=${ bid.bidderId }`}> Message</button>
            <button onClick = { ()=>Delete(bid) }>Delete</button>
          </div>
        </li>)
      }
    })}
  </ul>)
}

export default BidList
