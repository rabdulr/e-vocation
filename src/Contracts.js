import React, { useState, useEffect } from 'react';

const Contracts = ({contracts, ratings, auth}) => {
    return(
        <div>
            <h3>Number of Contracts: { contracts.length }</h3>
            <p>
                <h3>Contract List</h3>
            </p>
            <ul>
                {
                    contracts.map(contract => {
                        return(
                            <li>
                                
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Contracts