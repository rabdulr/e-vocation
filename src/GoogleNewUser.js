import React, { useEffect, useState } from 'react';

const GoogleNewUser = ({ auth, route, breakpoint, updateUser}) => {
    const [id, setId] = useState('');
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    useEffect(() => {
        setId(auth.id);
        setRole(auth.role);
        setUsername(auth.username);
        setFirstName(auth.firstName);
        setlastName(auth.lastName);
    }, [auth])

    const onSubmit = ({ target }) => {
        event.preventDefault();
        const updatedInfo = {id, role, username, firstName, lastName, address, city, state, zip}
        updateUser(updatedInfo)
        route('#')
    }

    return (
        <div className = { `${ breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' ? 'columnNW' : 'rowNW' }` }>
            <div className = 'columnNW bgAlphaBB marginHalf pad1 border10'>
                <h3 className = 'colorOW widthundred centerText marginHalf'>{ auth.username }</h3>
                <br />
                <h3>Please Finish Setting Up Your Account</h3>
                <form onSubmit = { onSubmit }>
                    <div className = 'rowNW colorOW spaceBetweenRow topMarginHalf'>
                        <div>First Name</div>
                        <input placeholder = 'New First...' className = 'bgDB colorOW borderOW padQuarter' value={firstName} onChange={({target})=> setFirstName(target.value)}/>
                    </div>
                    <div className = 'rowNW colorOW spaceBetweenRow topMarginHalf'>
                        <div>Last Name</div>
                        <input placeholder = 'New Last...' className = 'bgDB colorOW borderOW padQuarter' value={lastName} onChange={({target})=> setlastName(target.value)}/>
                    </div>
                    <div className = 'rowNW colorOW spaceBetweenRow topMarginHalf'>
                        <div>Address</div>
                        <input placeholder = 'New Address...' className = 'bgDB colorOW borderOW padQuarter' value={address} onChange={({target})=> setAddress(target.value)}/>
                    </div>
                    <div className = 'rowNW colorOW spaceBetweenRow topMarginHalf'>
                        <div>City</div>
                        <input placeholder = 'New City...' className = 'bgDB colorOW borderOW padQuarter' value={city} onChange={({target})=> setCity(target.value)}/>
                    </div>
                    <div className = 'rowNW colorOW spaceBetweenRow topMarginHalf'>
                        <div>State</div>
                        <input placeholder = 'New State...' className = 'bgDB colorOW borderOW padQuarter' value={state} onChange={({target})=> setState(target.value)}/>
                    </div>
                    <div className = 'rowNW colorOW spaceBetweenRow topMarginHalf'>
                        <div>Zip Code</div>
                        <input placeholder = 'New Zip...' className = 'bgDB colorOW borderOW padQuarter' value={zip} onChange={({target})=> setZip(target.value)}/>
                    </div>
                    <div className = 'colorOW widthundred topMarginHalf'>
                        <input type = 'submit' value = 'Save Changes' className = 'bgDB colorOW borderOW padQuarter' />
                    </div>
                </form>
            </div>
        </div>
    )
};

export default GoogleNewUser;