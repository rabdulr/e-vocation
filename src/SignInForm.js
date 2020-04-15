import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignInForm = ({ displayLogin, login, toggleForm }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [companyName, setcompanyName] = useState('');
    const [industry, setIndustry] = useState('');
    const [isCompany, setisCompany] = useState(false);

    const onSubmit = (ev) => {
        ev.preventDefault();
        displayLogin();
        createAccount();
    }

    const createAccount = async() => {
        const info = isCompany ? { firstName, lastName, address, city, state, zip, username, password, companyName, industry }
            : { firstName, lastName, address, city, state, zip, username, password };
        if(isCompany){
            await axios.post('api/companies/createCompany', info);
            login({ username, password });
        }else{
            await axios.post('api/createUser', info);
            login({ username, password });
        }
    };

    return (
        <div className = 'columnNW alignCenter z2 widthundred heighthundred bgAlphaDB frosted'>
            <div className = 'rowNW justifyEnd widthundred'>
                <input type = 'button' onClick = { () => displayLogin() } className = 'border50 colorAO bgTransparent topMargin2 rightMarginHalf borderAO padQuarter sixteenPoint' value = ' X '/>
            </div>
            <h2 className = 'colorLB'>Sign Up</h2>
            <form className = 'columnNW borderAO bgBB colorOW pad1 margin1 border5 maxWidth3 scrollable maxHeight3' onSubmit={ onSubmit }>
                <div className = 'rowNW spaceBetweenRow widthundred'>
                    <div>Company Account: </div>
                    <input type = 'checkbox' onClick = { () => setisCompany(!isCompany) } />
                </div>
                <div className = 'rowNW spaceBetweenRow topMargin1 widthundred'>
                    <div>First Name: </div>
                    <input className = 'bgLB colorDB borderDB padQuarter' placeholder = 'First Name...' pattern = '.{1,}' value = { firstName } onChange = { ({ target }) => setFirstName(target.value) } required/>
                </div>
                <div className = 'rowNW spaceBetweenRow topMargin1 widthundred'>
                    <div>lastName: </div>
                    <input className = 'bgLB colorDB borderDB padQuarter' placeholder = 'Last Name...' pattern = '.{1,}' value = { lastName } onChange = { ({ target }) => setlastName(target.value) } required/>
                </div>
                <div className = 'rowNW spaceBetweenRow topMargin1 widthundred'>
                    <div>Address: </div>
                    <input className = 'bgLB colorDB borderDB padQuarter' placeholder = 'Primary Address...' pattern = '.{1,}' value = { address } onChange = { ({ target }) => setAddress(target.value) } required/>
                </div>
                <div className = 'rowNW spaceBetweenRow topMargin1 widthundred'>
                    <div>City: </div>
                    <input className = 'bgLB colorDB borderDB padQuarter' placeholder = 'City...' pattern = '.{1,}' value = { city } onChange = { ({ target }) => setCity(target.value) } required/>
                </div>
                <div className = 'rowNW spaceBetweenRow topMargin1 widthundred'>
                    <div>State: </div>
                    <input className = 'bgLB colorDB borderDB padQuarter' placeholder = 'State Abreviation...' pattern = '.{2,2}' value = { state } onChange = { ({ target }) => setState(target.value) } required/>
                </div>
                <div className = 'rowNW spaceBetweenRow topMargin1 widthundred'>
                    <div>Zip Code: </div>
                    <input className = 'bgLB colorDB borderDB padQuarter' placeholder = 'Zip Code...' pattern = '.{5,6}' value = { zip } onChange = { ({ target }) => setZip(target.value) } required/>
                </div>
                { isCompany && <div className = 'rowNW spaceBetweenRow topMargin1 widthundred'>
                    <div>Company: </div>
                    <input className = 'bgLB colorDB borderDB padQuarter' placeholder = 'New Company...' pattern = '.{1,}' value = { companyName } onChange = { ({ target }) => setcompanyName(target.value) } required = { isCompany ? true : false }/>
                </div> }
                { isCompany && <div className = 'rowNW spaceBetweenRow topMargin1 widthundred'>
                    <div>Industry: </div>
                    <input className = 'bgLB colorDB borderDB padQuarter' placeholder = 'Primary Industry...' pattern = '.{1,}' value = { industry } onChange = { ({ target }) => setIndustry(target.value) } required = { isCompany ? true: false }/>
                </div> }
                <div className = 'rowNW spaceBetweenRow topMargin1 widthundred'>
                    <div>Username: </div>
                    <input className = 'bgLB colorDB borderDB padQuarter' placeholder = 'New Username...' pattern = '.{3,}' value = { username } onChange = { ({ target }) => setUsername(target.value) } required/>
                </div>
                <div className = 'rowNW spaceBetweenRow topMargin1 widthundred'>
                    <div>Password: </div>
                    <input className = 'bgLB colorDB borderDB padQuarter' type = 'password' placeholder = 'New Password...' pattern = '.{8,}' value = { password } onChange = { ({ target }) => { setPassword(target.value) }} required/>
                </div>
                <input type = 'submit' className = 'bgDB colorAO borderAO topMargin1 padQuarter' value = 'Sign Up' />
                <div className = 'rowNW justifyEnd widthundred'>
                    <div onClick = { () => toggleForm() } className = 'colorAO bgTransparent topMarginHalf'>Login</div>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;