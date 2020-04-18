import React, { useEffect, useState } from 'react';

const ActiveContracts = ({contracts, ratings, auth, users}) => {
    return (
        <div className = 'colorDB'>
            <h3 className = 'centerText topMargin1'>Contract List</h3>
            <h4 className = 'centerText topMarginHalf'>Active Contracts: { contracts.length }</h4>
            <ul>{
                contracts.map(contract => {
                    const currentContractor = users.find(user => user.id === contract.bidderId)
                    return(
                        <li key={`contract${ contract.id }`} className = 'columnNW'>
                            <div>Title: { contract.title }</div>
                            <div>Contractor: { currentContractor.username } - { currentContractor.companyName }</div>
                            <div>Comment: { contract.contract }</div>
                            <div>Contract Status: { contract.contractStatus }</div>
                        </li>
                    )
                })
            }</ul>
        </div>
    )
};

export default ActiveContracts;