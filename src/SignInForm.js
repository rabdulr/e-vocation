import React, { useState, useEffect } from 'react';

const SignInForm = ({ displayLogin, login, toggleForm }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = ({ target }) => {
        event.preventDefault();
        console.log("I'm a submission!")
    }
    return (
        <div className = 'columnNW alignCenter z1 widthundred heighthundred bgAlphaDB frosted'>
            <div className = 'rowNW justifyEnd widthundred'>
                <input type = 'button' onClick = { () => displayLogin() } className = 'border50 colorAO bgTransparent topMargin2 rightMarginHalf borderAO padQuarter sixteenPoint' value = ' X '/>
            </div>
            <h2 className = 'colorLB'>Sign Up</h2>
            <form className = 'columnNW borderAO bgBB colorOW pad1 margin1 border5 maxWidth3' onSubmit={ onSubmit }>
                <div className = 'rowNW spaceBetweenRow widthundred'>
                    <div>Username: </div>
                    <input className = 'bgLB colorDB borderDB padQuarter' placeholder = 'New Username...' pattern = '.{3,}' value = { username } onChange = { ({ target }) => setUsername(target.value) }  />
                </div>
                <div className = 'rowNW spaceBetweenRow topMargin1 widthundred'>
                    <div>Password: </div>
                    <input className = 'bgLB colorDB borderDB padQuarter' type = 'password' placeholder = 'New Password...' pattern = '.{8,}' value = { password } onChange = { ({ target }) => { setPassword(target.value) }} />
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