import React, { useState, useEffect } from 'react';
import CompletedContracts from './CompletedContracts';
import ActiveContracts from './ActiveContracts';

const Contracts = ({ contracts, ratings, auth, users, route }) => {
    const [tab, setTab] = useState('Active');

    useEffect(() => {
        if(!(auth.id)){
            route('#');
        }
    }, [])

    const changeTab = (current, href) => {
        if(!(tab === current)){
            setTab(`${ tab === 'Active' ? 'Completed' : 'Active' }`);
        }
        
    }
    
    return(
        <div className = 'marginHalf'>
            <div className = 'rowNW'>
                <a href = { `#contracts/active` } onClick = { () => changeTab('Active') } className = { `borderAO topRight10 topLeft10 padHalf ${ tab === 'Active' ? 'bottomBorderOW bgBB' : 'bottomBorderAO bgDB' }` }>Active</a>
                <a href = { `#contracts/complete` } onClick = { () => changeTab('Completed') } className = { `borderAO topRight10 topLeft10 padHalf ${ tab === 'Completed' ? 'bottomBorderOW bgBB' : 'bottomBorderAO bgDB' }` }>Complete</a>  
            </div>
            <div className = 'columnNW grow1 vh74 borderAO topRight10 bottomRight10 bottomLeft10'>
                { window.location.hash === '#contracts/active' && <ActiveContracts contracts = { contracts.filter(contract => contract.contractStatus === 'Active') } ratings = { ratings } auth = { auth } users = { users } /> }
                { window.location.hash === '#contracts/complete' && <CompletedContracts contracts = { contracts.filter(contract => contract.contractStatus === 'Completed') } ratings = { ratings } auth = { auth } users = { users } /> }
            </div>
        </div>
        
    )
}

export default Contracts