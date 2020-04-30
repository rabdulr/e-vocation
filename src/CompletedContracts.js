import React, { useEffect, useState } from 'react';

const CompletedContracts = ({contracts, auth, users}) => {
    return (
        <div className = 'colorDB'>
            <h3 className = 'centerText topMargin1'>Contract List</h3>
            <h4 className = 'centerText topMarginHalf'>Completed Contracts: { contracts.length }</h4>
            <ul className = 'scrollable vh62'>{
                contracts.map(contract => {
                    const currentContractor = users.find(user => user.id === contract.bidderId)
                    return(
                        <li key={`contract${ contract.id }`} className = 'columnNW bgLB topMargin1'>
                            <h3 className = 'bgDB centerText topMargin1 bottomMargin1 colorAO padQuarter'>{ contract.title }</h3>
                            <div className = 'leftPad1 topPadHalf rightPad1'>Contractor: { currentContractor.username } - { currentContractor.companyName }</div>
                            <div className = 'leftPad1 topPadHalf rightPad1'>Comment: { contract.contract }</div>
                            <div className = 'leftPad1 topPadHalf rightPad1'>Contract Status: { contract.contractStatus }</div>
                            <div className = 'leftPad1 bottomPad1 rightPad1 topPadHalf'> -- Contract Details -- </div>
                        </li>
                    )
                })
            }</ul>
        </div>
    )
};

export default CompletedContracts;