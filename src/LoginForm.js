import React, { useState, useEffect } from 'react';

const LoginForm = ({ credentials, displayLogin }) => {
    //const [hash, setHash] = useState('user'); // may not need this
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className = 'columnNW alignCenter z1 widthundred heighthundred bgAlphaDB frosted'>
            <div className = 'rowNW justifyEnd widthundred'>
                <input type = 'button' onClick = { ({ target }) => displayLogin() } className = 'border50 colorAO bgTransparent topMargin2 rightMarginHalf borderAO padQuarter sixteenPoint' value = ' X '/>
            </div>
            <h2 className = 'colorLB'>Login</h2>
            <form className = 'columnNW borderAO bgBB colorOW pad1 margin1 border5 maxWidth3'>
                <div className = 'rowNW spaceBetweenRow widthundred'>
                    <div>Username: </div>
                    <input className = 'bgLB colorDB borderDB padQuarter' placeholder = 'Type Username...' value = { username } onChange = { ({ target }) => setUsername(target.value) } pattern = '.{3,}' />
                </div>
                <div className = 'rowNW spaceBetweenRow topMargin1 widthundred'>
                    <div>Password: </div><input className = 'bgLB colorDB borderDB padQuarter' type = 'password' placeholder = 'Type Password...' value = { password } onChange = { ({ target }) => { console.log(target.value); setPassword(target.value) }} pattern = '.{8,}' />
                </div>
                <input type = 'submit' className = 'bgDB colorAO borderAO topMargin1 padQuarter' value = 'Log In' />
            </form>
        </div>
    );
};

export default LoginForm;