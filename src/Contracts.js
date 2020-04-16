import React, { useState, useEffect } from 'react';

const Contracts = ({contracts, ratings, auth, companies}) => {
    return(
        <div>
            <h3>Number of Contracts: { contracts.length }</h3>
            <h3>Contract List</h3>
            <ul>
                {
                    contracts.map(contract => {
                        return(
                            <li key={contract.id}>
                                Title: { contract.title }
                                <br />
                                Contractor: { contract.companyId }
                                <br />
                                Comment: { contract.contract}
                                <br />
                                Contract Status: { contract.contractStatus }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Contracts