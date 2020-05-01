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

    //looks for posts that active and equal to auth.id
    //loop over the filtered lists
    //within filtered lists, show the bid

    console.log('Filter posts: ', filterPosts)
    return (
        <div className = { `${ breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' ? 'columnNW' : 'rowNW' }` }>
            { mode === 'COMPANY' && <input className = 'marginHalf border10 borderAO bgDB colorOW' type = 'button' value = 'Search' onClick = { () => route('#jobs/search') }/> }
            <h2 className = 'centerText colorDB topMargin1'>Active Jobs</h2>
            <ul className = 'columnNW marginHalf scrollable maxHeight4'>{
                filterPosts.map( post => {
                    return(
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