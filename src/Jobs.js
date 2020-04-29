import React, { useEffect, useState } from 'react';
import moment from 'moment';

const Jobs = ({ auth, mode, posts, breakpoint, bids, users, route, result }) => {
    const [filterPosts, setFilterPosts] = useState([])

    useEffect(() => {
        if(!(auth.id)){
            route('#');
        }   
    }, [auth]);

    useEffect(() => {
        if(posts){
            setFilterPosts(posts.filter(post => post.userId === auth.id ))
        }
    }, [posts]);

    return (
        <div className = { `${ breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' ? 'columnNW' : 'rowNW' }` }>
            { mode === 'COMPANY' && <input className = 'marginHalf border10 borderAO bgDB colorOW' type = 'button' value = 'Search' onClick = { () => route('#jobs/search') }/> }
            <h2 className = 'centerText colorDB topMargin1'>Active Jobs</h2>
            <ul className = 'columnNW marginHalf scrollable maxHeight4'>{
                filterPosts.filter(post => post.status === 'Active').map(post => {
                    const contractor = post.acceptedId ? users.find(user => post.acceptedId === user.id) : null;
                    return (
                        <li key = { `post${ post.id }` } className = 'topMargin1 padHalf bgBB colorOW border10'>
                            <h4>{ post.title }</h4>
                            <div className = 'topMarginHalf'>Industry: { post.industry }</div>
                            <div>Asking Price: ${ post.proposedBudget }</div>
                            { post.acceptedId && <div>Contracted Worker: <a href = { `#users/${ post.acceptedId }` }>{ contractor.companyName }</a></div> }
                            <div>Starts: { post.startDate }</div>
                            <div>Ends: { post.endDate }</div>
                            <div>Location: { post.siteAddress }</div>
                            <div className = 'topMarginHalf'>{ post.description }</div>
                            <ul>{
                                bids.filter(bid => bid.postId === post.id).map((bid, idx) => {
                                    const currentBidder = users.find(user => bid.bidderId === user.id)
                                    return (
                                        <li key = { `job${idx}-${ bid.postId }` } className = 'columnNW topMargin1'>
                                            <h4>Bidder { idx + 1 }:</h4>
                                            <div className = 'leftPad1'>{ currentBidder.username } - { currentBidder.companyName }</div>
                                            <div className = 'rowNW spaceBetweenRow leftPad1'>Offer: ${ bid.bid }</div>
                                        </li>
                                    )
                                })
                            }</ul>
                        </li>
                    )
                })
            }</ul>
        </div>
    )
};

export default Jobs;