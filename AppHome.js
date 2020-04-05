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
        <div id = 'container'>
            <main className = 'shink0'>
                <nav id = 'navBar' className = 'rowNW spaceBetweenRow'>
                    <div>logo placeholder</div>
                    <a>Login</a>
                </nav>
                <section className = 'rowNW justifyCenter'>
                    <div></div>
                    <div>This is Actual Content!</div>
                </section>
            </main>
            <footer className = 'shink0 centerText'>
                © 2020 Collaborators: Abdul Rahim • Frazier • Lal • Adema
            </footer>
        </div>
    );
};

export default AppHome;