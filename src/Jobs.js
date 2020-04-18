import React from 'react';

const Jobs = ({ posts, breakpoint, bids, users }) => {
    console.log(posts);
    return (
        <div className = { `${ breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' ? 'columnNW' : 'rowNW' }` }>
            <h2 className = 'centerText colorDB topMargin1'>Active Jobs</h2>
            <ul className = 'columnNW marginHalf scrollable maxHeight4'>{
                posts.filter(post => post.status === 'Active').map(post => {
                    return (
                        <li key = { `post${ post.id }` } className = 'topMargin1 padHalf bgBB colorOW border10'>
                            <h4>{ post.title }</h4>
                            <div className = 'topMarginHalf'>Industry: { post.industry }</div>
                            <div>Asking Price: ${ post.proposedBudget }</div>
                            { post.acceptedId && <div>Contracted Worker: <a href = { `#users/${ post.acceptedId }` }>{ post.acceptedId }</a></div> }
                            <div>Starts: { post.startDate }</div>
                            <div>Ends: { post.endDate }</div>
                            <div className = 'topMarginHalf'>{ post.description }</div>
                        </li>
                    )
                })
            }</ul>
        </div>
    )
};

export default Jobs;