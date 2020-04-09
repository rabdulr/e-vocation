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
import SignInForm from './SignInForm';

const headers = () => {
    const token = window.localStorage.getItem('token');
    return {
        headers: {
            authorization: token
        }
    };
};

const AppHome = () => {
    // const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    // const [ratings, setRatings] = useState([]);
    const [logDisplay, setLogDisplay] = useState({ on: false, form: 'login' });
    const [posts, setPosts] = useState([]);
    const [auth, setAuth] = useState({})

    useEffect(() => {
        if(auth.id && auth.role === 'USER') {
            const token = window.localStorage.getItem('token');
            axios.get('/api/getPosts', headers())
                .then(response => setPosts(response.data))
                .catch(ex => console.log(ex))
        }
    }, [auth])

    useEffect(() => {
        if(auth.id && auth.role === 'USER') {
            axios.get('/api/getCompanies', headers())
                .then(response => setCompanies(response.data))
                .catch(ex => console.log(ex))
        }
    }, [auth])

    const displayLogin = () => {
        setLogDisplay({ ...logDisplay, on: !logDisplay.on });
    };

    const toggleForm = () => {
        setLogDisplay({ ...logDisplay, form: (logDisplay.form === 'login' ? 'sign' : 'login') })
    }

    const login = async (credentials) => {
        const token = (await axios.post('/api/auth', credentials)).data.token;
        window.localStorage.setItem('token', token);
        exchangeTokenForAuth();
    };

    const exchangeTokenForAuth = async() => {
        const response = await axios.get('/api/auth', headers());
        setAuth(response.data);
    }

    return (
        <div id = 'container'>
            <main className = 'z0'>
                { logDisplay.on === true && logDisplay.form === 'login' && <LoginForm displayLogin = { displayLogin } login = { login } toggleForm = { toggleForm } /> }
                { logDisplay.on === true && logDisplay.form === 'sign' && <SignInForm displayLogin = { displayLogin } login = { login } toggleForm = { toggleForm } /> }
                <NavBar displayLogin = { displayLogin } auth = { auth } setAuth = { setAuth } />
                { auth.id && <PostSearch posts = {posts} /> }
            </main>
            <footer className = 'shink0 centerText'>
                © 2020 Collaborators: Abdul Rahim • Frazier • Lal • Adema
            </footer>
        </div>
    );
};

export default AppHome;