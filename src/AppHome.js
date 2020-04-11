//Todo :
/*
    Jobs Tab

    Search Engine or Search Bar (Keywords? Tags?)
*/

import React, { useEffect, useState } from 'react';
import qs from 'qs';
import axios from 'axios';
import moment from 'moment'
// Components
import NavBar from './NavBar'
import Landing from './Landing'
import ProfileHome from './ProfileHome'
import PostSearch from './PostSearch'
import PostDetail from './PostDetail'
import LoginForm from './LoginForm';
import SignInForm from './SignInForm';
import Bids from './Bids'

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
    const [jobs, setJobs] = useState([]);
    const [bids, setBids] = useState([]);
    const [auth, setAuth] = useState({});
    const [focus, setFocus] = useState('');
    const [params, setParams] = useState(qs.parse(window.location.hash.slice(1)));
    const [breakpoint, setBreakpoint] = useState(window.innerWidth < 641 ? 'sm'
        : window.innerWidth < 769 ? 'md'
        : window.innerWidth < 1025 ? 'lg'
        : window.innerWidth < 2441 ? 'xl'
        : 'xxl' );

    useEffect(()=>{
        const socket = io();
        socket.on('message', (message)=>console.log(message))
    }, [])

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
    }, [auth]);

    useEffect(() => {
        if(auth.id && auth.role === 'COMPANY') {
            axios.get('/api/getBids', headers())
                .then(bids => setBids(bids.data))
                .catch(ex => console.log(ex));
        }else{                                      //Edit when Jobs exist
            axios.get('/api/getPosts', headers())
            .then(jobs => setJobs(jobs.data))
            .catch(ex => console.log(ex));
        }
    }, [auth])

    useEffect(() => {
        window.addEventListener('hashchange', () => {
            setParams(qs.parse(window.location.hash.slice(1)));
        })
    }, []);

    const checkBreakPoint = () => {
        //This is intended to allow dynamic style changes based on the screen width.
        const bp = window.innerWidth < 641 ? 'sm'           //mobile
        : window.innerWidth < 769 ? 'md'                    //ipad
        : window.innerWidth < 1025 ? 'lg'                   //ipad Pro
        : window.innerWidth < 2441 ? 'xl'                   //Standard Monitor
        : 'xxl'                                             //Large Monitor
        if(bp !== breakpoint){
            setBreakpoint(bp);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', checkBreakPoint);
    }, [checkBreakPoint]);

    useEffect(() => {
        exchangeTokenForAuth();
    }, []);

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

    const route = hashVal => {
        window.location.hash = hashVal;
    };

    const createJobPost = (post) => {
        axios.post('/api/posts/CreateJobPost', post, headers())
            .then(response => {
                setPosts([response.data, ...posts])
            })
            .catch(ex => console.log(ex))
    }

    return (
        <div id = 'container'>
            <main className = 'z0'>
                { logDisplay.on === true && logDisplay.form === 'login' && <LoginForm displayLogin = { displayLogin } login = { login } toggleForm = { toggleForm } /> }
                { logDisplay.on === true && logDisplay.form === 'sign' && <SignInForm displayLogin = { displayLogin } login = { login } toggleForm = { toggleForm } /> }
                <NavBar displayLogin = { displayLogin } auth = { auth } setAuth = { setAuth } route = { route } breakpoint = { breakpoint }/>
                { window.location.hash === '' && <Landing displayLogin = { displayLogin } route = { route } auth = { auth } breakpoint = { breakpoint }/> }
                { auth.id && window.location.hash === '#posts' && <PostSearch posts = {posts} route = { route } breakpoint = { breakpoint } createJobPost={ createJobPost }/> }
                { window.location.hash === `#profile/${ auth.id }` && <ProfileHome auth = { auth } bids = { bids } jobs = { jobs } breakpoint = { breakpoint }/> }
                { focus && window.location.hash === `#post/${focus}` && <PostDetail auth = {auth} focus = {focus} />}
                { auth.role === 'COMPANY' && window.location.hash === '#bids' && <Bids bids = {bids} auth = { auth } breakpoint = { breakpoint }/> }
            </main>
            <footer className = 'centerText'>
                © 2020 Collaborators: Abdul Rahim • Frazier • Lal • Adema
            </footer>
        </div>
    );
};

export default AppHome;
