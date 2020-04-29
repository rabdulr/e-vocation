import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { headers } from './appMethods';

const ProfileSettings = ({ auth, setAuth, route, breakpoint, updateUser }) => {
    const [id, setId] = useState(auth.id);
    const [role, setRole] = useState(auth.role);
    const [username, setUsername] = useState(auth.username);
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState(auth.firstName);
    const [lastName, setlastName] = useState(auth.lastName);
    const [address, setAddress] = useState(auth.address);
    const [city, setCity] = useState(auth.city);
    const [state, setState] = useState(auth.state);
    const [zip, setZip] = useState(auth.zip);

    useEffect(() => {
        if(!(auth.id)){
            route('#');
        }
    }, []);
    
    const userMode = async ({ target }) => {
        //If there is no companyName, set up company info before allowing the request. There should be a cancel button.
        const response = await axios.put(`api/users/${ auth.id }`, { ...auth, role: target.value.toUpperCase() }, headers())
        setAuth(response.data);
    }

    const onSubmit = ({ target }) => {
        event.preventDefault();
        const updatedInfo = {id, role, username, password, firstName, lastName, address, city, state, zip}
        updateUser(updatedInfo)
    }

    return (
        <div className = { `${ breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' ? 'columnNW' : 'rowNW' }` }>
            <div className = 'columnNW bgAlphaBB marginHalf pad1 border10'>
                <h3 className = 'colorOW widthundred centerText marginHalf'>{ auth.username } Settings</h3>
                <div>
                    <div className = 'rowNW colorOW spaceBetweenRow'>
                        <div>Default Mode:</div>
                        <div>
                            <input type = 'button' value = 'User' className = {`${ auth.role === 'USER' ? 'bgAO colorDB borderAO' : 'bgDB colorAO borderDB' } padHalf topLeft5 bottomLeft5`} onClick = { (ev) => { userMode(ev) } } />
                            <input type = 'button' value = 'Company'  className = {`${ auth.role === 'COMPANY' ? 'bgAO colorDB borderAO' : 'bgDB colorAO borderDB' } padHalf topRight5 bottomRight5`} onClick = { (ev) => { userMode(ev) } } />    
                        </div>
                    </div>
                </div>
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
                    <div className = 'rowNW colorOW spaceBetweenRow topMarginHalf'>
                        <div>Change Username</div>
                        <input placeholder = 'New Username...' className = 'bgDB colorOW borderOW padQuarter' value={username} onChange={({target})=> setUsername(target.value)}/>
                    </div>
                    <div className = 'rowNW colorOW spaceBetweenRow topMarginHalf'>
                        <div>Change Password</div>
                        <input placeholder = 'New Password...' className = 'bgDB colorOW borderOW padQuarter' value={password} onChange={({target})=> setPassword(target.value)}/>
                    </div>
                    <div className = 'colorOW widthundred topMarginHalf'>
                        <input type = 'submit' value = 'Save Changes' className = 'bgDB colorOW borderOW padQuarter widthundred' />
                    </div>
                    <div className = 'colorOW widthundred topMarginHalf'>
                        <input type = 'button' value = 'Delete Account' className = 'bgDB colorOW borderOW padQuarter widthundred' />
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ProfileSettings;