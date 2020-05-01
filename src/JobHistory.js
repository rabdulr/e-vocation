import React, { useEffect, useState } from 'react';

const JobHistory = ({ auth, route, posts, breakpoint }) => {
    const [history, setHistory] = useState([])

    useEffect(() => {
        if(!(auth.id)){
            route('#');
        }
    }, [])

    useEffect(() => {
        if(posts) {
            setHistory(posts)
        }
    }, [posts])

    return (
        <div className = { `${ breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' ? 'columnNW' : 'rowNW' }` }>
            <h3>{ auth.username } Job History</h3>
            <h4>Posted Jobs</h4>
            <ul>{
                history.filter(post => post.userId === auth.id).map(post => {
                    return (
                        <li key = { `job${ post.id }` }><a href={`#post/${post.id}`}>{ post.title }</a></li>
                    )
                })
            }</ul>
            <h4>Acquired Jobs</h4>
            <ul>{
                posts.filter(post => post.acceptedId === auth.id).map(post => {
                    return (
                    <li key = { `job${ post.id }` }><a href={`#post/${post.id}`}>{ post.title }</a></li>
                    )
                })
            }</ul>
        </div>
    )
};

export default JobHistory;