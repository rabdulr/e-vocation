import React, { useEffect, useState } from 'react';

const ProfileSettings = ({ auth, route, breakpoint }) => {
    const onSubmit = ({ target }) => {
        event.preventDefault();
    }

    console.log(auth);
    return (
        <div className = { `${ breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' ? 'columnNW' : 'rowNW' }` }>
            <div className = 'columnNW bgAlphaBB marginHalf pad1 border10'>
                <h3 className = 'colorOW widthundred centerText marginHalf'>{ auth.username } Settings</h3>
                <form onSubmit = { onSubmit }>
                    <div className = 'rowNW colorOW spaceBetweenRow topMarginHalf'>
                        <div>First Name</div>
                        <input placeholder = 'New First...' className = 'bgDB colorOW borderOW padQuarter' />
                    </div>
                    <div className = 'rowNW colorOW spaceBetweenRow topMarginHalf'>
                        <div>Last Name</div>
                        <input placeholder = 'New Last...' className = 'bgDB colorOW borderOW padQuarter' />
                    </div>
                    <div className = 'rowNW colorOW spaceBetweenRow topMarginHalf'>
                        <div>Address</div>
                        <input placeholder = 'New Address...' className = 'bgDB colorOW borderOW padQuarter' />
                    </div>
                    <div className = 'rowNW colorOW spaceBetweenRow topMarginHalf'>
                        <div>City</div>
                        <input placeholder = 'New City...' className = 'bgDB colorOW borderOW padQuarter' />
                    </div>
                    <div className = 'rowNW colorOW spaceBetweenRow topMarginHalf'>
                        <div>State</div>
                        <input placeholder = 'New State...' className = 'bgDB colorOW borderOW padQuarter' />
                    </div>
                    <div className = 'rowNW colorOW spaceBetweenRow topMarginHalf'>
                        <div>Zip Code</div>
                        <input placeholder = 'New Zip...' className = 'bgDB colorOW borderOW padQuarter' />
                    </div>
                    <div className = 'rowNW colorOW spaceBetweenRow topMarginHalf'>
                        <div>Change Username</div>
                        <input placeholder = 'New Username...' className = 'bgDB colorOW borderOW padQuarter' />
                    </div>
                    <div className = 'rowNW colorOW spaceBetweenRow topMarginHalf'>
                        <div>Change Password</div>
                        <input placeholder = 'New Password...' className = 'bgDB colorOW borderOW padQuarter' />
                    </div>
                    <div className = 'colorOW widthundred topMarginHalf'>
                        <input type = 'submit' value = 'Save Changes' className = 'bgDB colorOW borderOW padQuarter' />
                    </div>
                    <div className = 'colorOW widthundred topMarginHalf'>
                        <input type = 'button' value = 'Delete Account' className = 'bgDB colorOW borderOW padQuarter' />
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ProfileSettings;