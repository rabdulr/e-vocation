//Todo :
/*
    Job History Page
    Fix Sign Up Form to reflect changes to user data structure
    Formatting For Production on Key Platforms (Chrome > Firefox > Safari > Edge)
    Contract Submission
    Bid Submission - already created, had to change nav bar to see items
    Profile Features
    Settings for users
    Format Search

    Search Engine or Search Bar (Keywords? Tags?)
*/

import React, { useEffect, useState } from 'react';
import qs from 'qs';
import axios from 'axios';
import moment from 'moment'
import { headers, getAllPosts } from './appMethods'
// Components
import NavBar from './NavBar';
import Landing from './Landing';
import ProfileHome from './ProfileHome';
import ProfileSettings from './ProfileSettings';
import Jobs from './Jobs';
import JobHistory from './JobHistory';
import PostSearch from './PostSearch';
import PostDetail from './PostDetail';
import LoginForm from './LoginForm';
import SignInForm from './SignInForm';
import Bids from './Bids';
import ChatPage from './ChatPage';
import Contracts from './Contracts';
import GoogleNewUser from './GoogleNewUser'

const AppHome = () => {
    const [users, setUsers] = useState([]);
    // const [ratings, setRatings] = useState([]);
    const [logDisplay, setLogDisplay] = useState({ on: false, form: 'login' });
    const [posts, setPosts] = useState([]);
    const [bids, setBids] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [auth, setAuth] = useState({});
    const [ratings, setRatings] = useState([]);
    //const [chatBack, setChatBack] = useState('bgOW');
    const [focus, setFocus] = useState('');
    const [params, setParams] = useState(qs.parse(window.location.hash.slice(1)));
    const [breakpoint, setBreakpoint] = useState(window.innerWidth < 641 ? 'sm'
        : window.innerWidth < 769 ? 'md'
        : window.innerWidth < 1025 ? 'lg'
        : window.innerWidth < 2441 ? 'xl'
        : 'xxl' );

    const headers = () => {
        const token = window.localStorage.getItem('token');
        return {
            headers: {
                authorization: token
            }
        };
    };

    useEffect(()=>{
        const socket = io();
        socket.on('message', (message)=>{
            console.log("auth!!!", auth)
            displayChat(message, auth);
        })
        socket.on('history', (messages)=>{
            messages.forEach(message => displayChat(message, auth))
        })
    }, [auth])

    const displayChat = (message, auth)=>{
        if (params.id === "General Chat"){
            const list = document.querySelector('#messages')
            list.innerHTML += `<li class = 'padHalf'> ${message.username}: ${message.message}</li>`;
            //setChatBack(chatBack === 'bgOW' ? 'bgLB' : 'bgOW');
            document.querySelector('#messages').scrollTop = document.querySelector('#messages').scrollHeight;
        }
        else if((params.id === message.senderId) && (auth.id === message.receiverId) ||
            (auth.id === message.senderId) && ( params.id === message.receiverId)){

            const list = document.querySelector('#messages')
            list.innerHTML += `<li class = 'padHalf'> ${message.username}: ${message.message}</li>`;
            //setChatBack(chatBack === 'bgOW' ? 'bgLB' : 'bgOW');
            document.querySelector('#messages').scrollTop = document.querySelector('#messages').scrollHeight;
        }

    }

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if(!auth.id){
            if(token){
                exchangeTokenForAuth();
                return;
            }
            route('#');
        }
    }, [auth]);

    useEffect(() => {
        if(localStorage.getItem('focus')){
            setFocus(localStorage.getItem('focus'))
        }
        console.log('on load '+focus)
    },[])
    
    useEffect(()=>{
        localStorage.setItem('focus', focus)
        console.log('on focus change '+focus)
    },[focus])

    useEffect(() => {
        if(auth.id){
            getAllPosts(setPosts)
            //     axios.get('/api/posts/getAllPosts', headers())
            //         .then(allPosts => setPosts(allPosts.data))
            //         .catch(ex => console.log('AppHome.getAllPosts:', ex))
        }
    }, [auth]);

   useEffect(() => {
        if(auth.id){
            axios.get('/api/users/getUsers', headers())
                .then(response => setUsers(response.data))
                .catch(ex => console.log('AppHome.getUsers:', ex))
        }
    }, [auth]);

    useEffect(() => {
        if(auth.id) {
            axios.get('/api/ratings/getRatings', headers())
                .then(ratings => setRatings(ratings.data))
                .catch(ex => console.log('AppHome.getRatings:', ex))
        }
    }, [auth])

    useEffect(() => {
        if(auth.id) {
            axios.get('/api/bids/getBids', headers())
                .then(bids => setBids(bids.data))
                .catch(ex => console.log('AppHome.getBids:', ex));
        }
    }, [auth]);

    useEffect(() => {
        if(auth.id) {
            axios.get('/api/contracts/getContracts', headers())
                .then(contracts => setContracts(contracts.data))
                .catch(ex => console.log('AppHome.getContracts:', ex))
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
        const response = await axios.get('/api/auth', headers())
        .then(user => setAuth(user.data))
        .catch(ex => console.log('AppHome.exchangeTokenForAuth:', ex));
    }

    const route = hashVal => {
        window.location.hash = hashVal;
    };

    const createJobPost = (post) => {
        axios.post('/api/posts/CreateJobPost', post, headers())
            .then(response => {
                setPosts([response.data, ...posts])
            })
            .catch(ex => console.log('AppHome.CreateJobPost:', ex))
    }

    const createBid = (bid) => {
        axios.post('/api/bids/createBid', bid, headers())
            .then(response => setBids([response.data, ...bids]))
            .catch(ex => console.log('AppHome.createBid:', ex))
    };

    const updateUser = async (user) => {
        const response = await axios.put(`/api/users/${user.id}`, user, headers());
        setAuth(response.data);
    };

    //checking what params i can use for chat
    //console.log("params:", params )
    return (
        <div id = 'container'>
            <main className = 'z0 columnNW'>
                { logDisplay.on === true && logDisplay.form === 'login' && <LoginForm displayLogin = { displayLogin } login = { login } toggleForm = { toggleForm } /> }
                { logDisplay.on === true && logDisplay.form === 'sign' && <SignInForm displayLogin = { displayLogin } login = { login } toggleForm = { toggleForm } /> }
                <NavBar displayLogin = { displayLogin } auth = { auth } setAuth = { setAuth } route = { route } breakpoint = { breakpoint }/>
                { window.location.hash === '' && <Landing displayLogin = { displayLogin } route = { route } auth = { auth } breakpoint = { breakpoint } posts={posts.filter(post => post.status === 'Active')} setFocus={ setFocus }/> }
                { auth.id && window.location.hash === '#posts' && <PostSearch auth = { auth } posts = {posts} route = { route } breakpoint = { breakpoint } createJobPost={ createJobPost } setFocus = {setFocus}/> }
                { window.location.hash === `#profile/${ auth.id }` && <ProfileHome auth = { auth } bids = { bids } posts = { posts } setPosts = {setPosts} breakpoint = { breakpoint } route = { route } setFocus = { setFocus } /> }
                { window.location.hash === `#profile/settings/${ auth.id }` && <ProfileSettings auth = { auth } breakpoint = { breakpoint } updateUser={updateUser} route = { route }/> }
                { window.location.hash === `#job-history/${ auth.id }` && <JobHistory auth = { auth } route = { route } posts = { posts } breakpoint = { breakpoint } /> }
                { window.location.hash === '#jobs' && <Jobs auth = { auth } posts = { posts } setPosts = { setPosts } breakpoint = { breakpoint } bids = { bids } users = { users } route = { route }/> }
                { window.location.hash.includes(`#post/`) && <PostDetail auth = { auth } post = { posts.find(post => post.id === focus) } createBid = { createBid } bids = { bids } users = { users } route = { route }/>}
                { auth.role === 'COMPANY' && window.location.hash === '#bids' && <Bids bids = {bids} auth = { auth } breakpoint = { breakpoint } route = { route } posts={ posts } setFocus={ setFocus }/> }
                { params.view === `chat` && <ChatPage  displayChat = {displayChat} auth = {auth} route = { route } params = {params} headers = {headers}/> }
                { window.location.hash.includes('#contracts') && <Contracts contracts={contracts} ratings={ratings} auth={auth} users={users} route = { route } /> }
                { window.location.hash === `#google` && <GoogleNewUser auth={auth} breakpoint={breakpoint} updateUser={updateUser} route={route} />}
                { window.location.hash === '' && !auth.id && <form method="GET" action={`/api/google`}><input type = 'submit' value = 'Google Log In' /></form> }
            </main>
            <footer className = 'centerText'>
                © 2020 Collaborators: Abdul Rahim • Frazier • Lal • Adema  <a href="#view=chat">HelpChat</a>
            </footer>
        </div>
    );
};

export default AppHome;
