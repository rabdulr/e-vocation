import React, { useEffect, useState } from 'react';

const JobHistory = ({ auth, route, posts, breakpoint }) => {

    useEffect(() => {
        if(!(auth.id)){
            route('#');
        }
    }, [])

    return (
        <div className = { `${ breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' ? 'columnNW' : 'rowNW' }` }>
            <h3>{ auth.username } Job History</h3>
            <h4>Posted Jobs</h4>
            <ul>{
                posts.filter(post => post.userId === auth.id).map(post => {
                    return (
                        <li key = { `job${ post.id }` }>{ post.id }</li>
                    )
                })
            }</ul>
            <h4>Acquired Jobs</h4>
            <ul>{
                posts.filter(post => post.companyId === auth.id).map(post => {
                    return (
                        <li key = { `job${ post.id }` }>{ post.id }</li>
                    )
                })
            }</ul>
        </div>
    )
};

export default JobHistory;