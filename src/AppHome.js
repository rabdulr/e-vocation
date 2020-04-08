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
import qs from 'qs';
import axios from 'axios';
// Components
import NavBar from './NavBar'
import PostSearch from './PostSearch'
import LoginForm from './LoginForm';

const AppHome = () => {
    // const [auth, setAuth] = useState({})
    // const [users, setUsers] = useState([]);
    // const [companies, setCompanies] = useState([]);
    // const [ratings, setRatings] = useState([]);
    const [logDisplay, setLogDisplay] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/getPosts')
            .then(response => setPosts(response.data))
            .then(() => console.log(posts))
    }, [])

    const displayLogin = () => {
        setLogDisplay(!logDisplay);
    };

    return (
        <div id = 'container'>
            <main className = 'z0'>
            {logDisplay && <LoginForm credentials = { ['user', 'pass'] } displayLogin = { displayLogin }/> }
                <NavBar displayLogin = { displayLogin } logDisplay = { logDisplay } setLogDisplay = { setLogDisplay }/>
                <PostSearch posts = {posts} />
            </main>
            <footer className = 'shink0 centerText'>
                © 2020 Collaborators: Abdul Rahim • Frazier • Lal • Adema
            </footer>
        </div>
    );
};

export default AppHome;