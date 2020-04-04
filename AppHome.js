//Todo :
/*
    Generalize Nav Bar based on-
        -whether someone is logged in
        -how they are logged in (company representative or job poster)

    Login Component and Route

    Jobs Tab

    Profile Page

    Search Engine or Search Bar (Keywords? Tags?)
*/

import React, { useEffect, useState } from 'react';

const AppHome = () => {

    return (
        <div className = 'columnNW'>
            <main>
                <nav id = 'navBar' className = 'rowNW spaceBetweenRow'>
                    <div>logo placeholder</div>
                    <a>Login</a>
                </nav>
            </main>
            <footer>
                © 2020 R. Abdul Rahim • C. Frazier • N. Lal • H. Adema
            </footer>
        </div>
    );
};

export default AppHome;