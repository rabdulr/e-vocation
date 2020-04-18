import React, { useEffect, useState } from 'react';

const ActiveContracts = ({contracts, ratings, auth, users}) => {
    return (
        <div className = 'colorDB'>
            <h3 className = 'centerText topMargin1'>Contract List</h3>
            <h4 className = 'centerText topMarginHalf'>Active Contracts: { contracts.length }</h4>
            <ul className = 'scrollable vh62'>{
                contracts.map(contract => {
                    const currentContractor = users.find(user => user.id === contract.bidderId)
                    return(
                        <li key={`contract${ contract.id }`} className = 'columnNW bgLB topMargin1'>
                            <h3 className = 'bgDB centerText topMargin1 bottomMargin1 widthundred colorAO padQuarter'>{ contract.title }</h3>
                            <div className = 'leftPad1 topPadHalf'>Contractor: { currentContractor.username } - { currentContractor.companyName }</div>
                            <div className = 'leftPad1 topPadHalf'>Comment: { contract.contract }</div>
                            <div className = 'leftPad1 topPadHalf'>Contract Status: { contract.contractStatus }</div>
                            <div className = 'leftPad1 bottomPad1 topPadHalf'> -- Contract Details -- </div>
                        </li>
                    )
                })
            }</ul>
        </div>
    )
};

export default ActiveContracts;