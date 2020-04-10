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
import moment from 'moment'
// Components
import NavBar from './NavBar'
import PostSearch from './PostSearch'

const AppHome = () => {
    // const [auth, setAuth] = useState({})
    // const [users, setUsers] = useState([]);
    // const [companies, setCompanies] = useState([]);
    // const [ratings, setRatings] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/getPosts')
            .then(response => setPosts(response.data))
    }, [])

    useEffect(() => {
        console.log(posts)
    },[posts])

    return (
        <div id = 'container'>
            <main className = 'shink0'>
                <NavBar />
                <section className = 'rowNW justifyCenter margin1'>
                    <div></div>
                    <div>This is Actual Content!</div>
                </section>
                <PostSearch posts = {posts} />
            </main>
            <footer className = 'shink0 centerText'>
                © 2020 Collaborators: Abdul Rahim • Frazier • Lal • Adema
            </footer>
        </div>
    );
};

export default AppHome;