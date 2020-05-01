import React, {useState, useEffect} from 'react';
import { Bids } from '../db/models/constructors';


const CreateBid = ({post, auth, createBid, singleBid}) => {
    const [proposal, setProposal] = useState('');
    const [bid, setBid] = useState('');
    const [currentBid, setCurrentBid] = useState({bidStatus: 'false'})

    const onSubmit =  (ev) => {
      ev.preventDefault();
      const newBid = new Bids(post.id, post.userId, auth.id, proposal, bid);
      createBid(newBid);
      setProposal('');
      setBid('');
    };
    
    useEffect(()=>{
      if(singleBid){
        setCurrentBid(singleBid)
      }
    },[singleBid])

    // useEffect(() => {
    //   if(currentBid){
    //     setBidState('true');
    //   }
    // }, [currentBid])

  if(currentBid.bidStatus === "Active"){
    return(
      <div>
        <h3>Status: {currentBid.bidStatus}</h3>
        <p>
          Submitted Proposal: {currentBid.proposal}
        </p>
        <p>
          Bid: {currentBid.bid}
        </p>
      </div>
    )
  } else if(currentBid.bidStatus === "Deleted"){
    return(
      <div>
        <h3>Your bid has been closed.</h3>
      </div>
    )
  } else {
  return(
    <div>
      <form onSubmit={onSubmit} className = 'columnNW bgLB border5 pad1'>
        <div className = 'rowNW spaceBetweenRow'>
          <div className = 'colorDB'>Proposal: </div>
          <textarea placeholder='Proposal' value={ proposal } onChange={ev => setProposal(ev.target.value)} className = 'colorDB bgOW border5 borderDB leftPadHalf'/>
        </div>
        <div className = 'rowNW spaceBetweenRow topMarginHalf'>
          <div className = 'colorDB'>Bid: </div>
          <input type='text' placeholder='proposed bid' value={ bid } onChange={ev => setBid(ev.target.value)} className = 'colorDB bgOW border5 borderDB leftPadHalf'/>
        </div>
        <input type = 'button' className = 'bgBB colorDB borderDB topMarginHalf' value = 'Create New Bid' />
      </form>
    </div>
  )}

}

export default CreateBid;