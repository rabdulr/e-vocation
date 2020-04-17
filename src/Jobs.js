import React from 'react';

const Jobs = ({ posts, breakpoint }) => {
    return (
        <div className = { `${ breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' ? 'columnNW' : 'rowNW' }` }>
            Hi
        </div>
    )
};

export default Jobs;