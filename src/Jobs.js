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
            setFilterPosts(posts.filter(post => post.acceptedId === auth.id))
        }
    }, [posts]);

    return (
        <div className = 'columnNW'>
            { mode === 'COMPANY' && <input className = 'marginHalf border10 borderAO bgDB colorOW' type = 'button' value = 'Search' onClick = { () => route('#jobs/search') }/> }
            <h2 className = 'centerText colorDB topMargin1'>Active Jobs</h2>
            <ul className = { `marginHalf scrollable ${ breakpoint === 'sm' ? 'columnNW maxHeight4' : 'rowWrap justifyStart vh62' }` }>{
                filterPosts.filter(post => post.status === 'Active').map(post => {
                    const contractor = post.acceptedId ? users.find(user => post.acceptedId === user.id) : null;
                    return (
                        <li key = { `post${ post.id }` } className = 'topMargin1 padHalf bgBB colorOW border10'>
                            <h4>{ post.title }</h4>
                            <div className = 'topMarginHalf'>Industry: { post.industry }</div>
                            <div>Asking Price: ${ post.proposedBudget }</div>
                            <div>Starts: { moment(post.startDate).format('MM/DD/YYYY') }</div>
                            <div>Ends: { moment(post.endDate).format('MM/DD/YYYY') }</div>
                            <div>Location: { post.siteAddress }</div>
                            <div className = 'topMarginHalf'>{ post.description }</div>
                        </li>

                    )
                })
            }</ul>
        </div>
    )
};

export default Jobs;