//Todo :
/*
    Generalize Nav Bar based on-
        -whether someone is logged in
        -how they are logged in (company representative or job poster)
*/

import React, { useEffect, useState } from 'react';

const AppHome = () => {

    return (
        <div>
            <main>
                <nav>
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