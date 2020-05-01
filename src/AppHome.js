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
import JobSearch from './JobSearch';
import JobHistory from './JobHistory';
import PostSearch from './PostSearch';
import PostDetail from './PostDetail';
import LoginForm from './LoginForm';
import SignInForm from './SignInForm';
import Bids from './Bids';
import ChatPage from './ChatPage';
import Contracts from './Contracts';
import GoogleNewUser from './GoogleNewUser'
import Fuse from 'fuse.js';

const AppHome = () => {
    const [users, setUsers] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState({ text: '', status: 200 });
    const [logDisplay, setLogDisplay] = useState({ on: false, form: 'login' });
    const [posts, setPosts] = useState([]);
    const [bids, setBids] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [auth, setAuth] = useState({});
    const [mode, setMode] = useState('');
    const [ searchReturn, setSearchReturn ] = useState([]);
    const [ searchList, setSearchList ] = useState([]);
    const [ searchTerms, setSearchTerms ] = useState([]);     //only for the searchBar
    const [ searchContent, setSearchContent ] = useState([]); //this is the actual search data
    const [ landSearch, setLandSearch ] = useState(false);
    const [params, setParams] = useState(qs.parse(window.location.hash.slice(1)));
    const [breakpoint, setBreakpoint] = useState(window.innerWidth < 641 ? 'sm'
        : window.innerWidth < 769 ? 'md'
        : window.innerWidth < 1025 ? 'lg'
        : window.innerWidth < 2441 ? 'xl'
        : 'xxl' );

    const [socket, setSocket] = useState(null);
    const [tempMessage, setTempMessage]= useState({});

    //workaround for auth
    useEffect(()=>{
        if(auth){
            window.tempAuth = auth;
        }
    }, [auth])

    const [chatMessages, setChatMessages] = useState([]);

    //grab old messages from specific user
    useEffect(()=>{
        if(params.view === "chat"){
            axios.get(`/api/chats/getChats/${auth.id}/${params.id}`)
            .then((chatHistory)=>{
                setChatMessages(chatHistory.data)
            })
        }
    }, [params, auth])

    const addMessage = (message)=>{
        const temp = [...chatMessages]
        temp.push(message)
        setChatMessages(temp)
    }

    const createChatMessage = (message)=>{
        axios.post('/api/chats/createChat', {...message, senderId: auth.id})
        .then(response =>{
            addMessage(response.data)
            socket.emit('message', response.data)

        })
    }

    useEffect(()=>{
        setSocket(io())
    }, [])

    useEffect(()=>{
        if(tempMessage.message){
            addMessage(tempMessage)
            setTempMessage({})
        }
    },[tempMessage])

    useEffect(()=>{
        if(socket){
            socket.on("message",(message)=>{
                if(message.receiverId === window.tempAuth.id){
                    setTempMessage(message)
                }
            })
        }
    },[socket])

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
        if(auth.id){
            axios.get('/api/posts/getAllPosts', headers())
                .then(allPosts => {
                    setPosts(allPosts.data);
                })
                .catch(ex => console.log('AppHome.getAllPosts:', ex))
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

    // useEffect(() => {
    //     if(auth)
    //         initMap();
    // }, [auth]);

    let map;

    const initMap = async () => {
        map = await new google.maps.Map(document.getElementById('map'), {
            center: {'lat': auth.latitude*1 || 35.281440, 'lng': auth.longitude*1 || -120.663700},
            zoom: 13,
            streetViewControl: false
        });
    };

    const dropMarker = async ({title, latitude, longitude, id}) => {
        const location = {'lat': latitude*1, 'lng': longitude*1};
        const contentString = `<a href='#post/${id}'><h4>${title}</h4></a>`
        const infowindow = await new google.maps.InfoWindow({
            'content': contentString
        });
        console.log('location: ', location, 'Map: ', map)
        const marker = await new google.maps.Marker({'position': location, 'map': map, 'title': title});
        marker.addListener('click', function() {
            infowindow.open(map, marker)
        })
    }

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
        .then(user => { setAuth(user.data); console.log(user); setMode(user.data.role !== 'ADMIN' ? user.data.role : 'COMPANY') })
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
        console.log(user)
        const response = await axios.put(`/api/users/${user.id}`, user, headers());
        setAuth(response.data);
    };

    const updateTerms = barVal => {
        setSearchTerms(barVal.split(' ').map(word => word));
        setSearchContent(barVal.split(' ').reduce((acc, word) => {
            if(!acc.includes(word)){
                acc.push(word);
            }
            return acc;
        }, []));
    };

    const submitSearch = (bool) => {
        event.preventDefault();
        //do something with searchContent
        setSearchReturn(result);
        console.log(result)
        if(landSearch !== bool){
            setLandSearch(bool);
        }        
        route('#jobs/search');
      };

    const options = {
        includeScore: true,
        keys: ['title', 'description', 'industry'],
        threshold: 0.7
    };

    const fuse = new Fuse(searchList, options);

    const result = fuse.search(searchTerms.toString()).filter(post => post.item.status === 'Active');

    useEffect(()=> {
        if(posts){
            setSearchList(posts);
        }
    }, [posts]);

    return (
        <div id = 'container'>
            <main className = 'z0 columnNW'>
                { logDisplay.on === true && logDisplay.form === 'login' && <LoginForm displayLogin = { displayLogin } login = { login } toggleForm = { toggleForm } /> }
                { logDisplay.on === true && logDisplay.form === 'sign' && <SignInForm displayLogin = { displayLogin } login = { login } toggleForm = { toggleForm } /> }
                <NavBar displayLogin = { displayLogin } auth = { auth } setAuth = { setAuth } route = { route } breakpoint = { breakpoint } mode = { mode } setMode = { setMode } />
                { window.location.hash === '' && <Landing displayLogin = { displayLogin } route = { route } auth = { auth } mode = { mode } breakpoint = { breakpoint } posts={posts.filter(post => post.status === 'Active')} searchReturn = { searchReturn } setSearchReturn = { setSearchReturn } result = { result } searchList = { searchList } setSearchList = { setSearchList } searchTerms = { searchTerms } setSearchTerms = { setSearchTerms } searchContent = { searchContent } setSearchContent = { setSearchContent } submitSearch = { submitSearch } updateTerms = { updateTerms } landSearch = { landSearch } setLandSearch = { setLandSearch } /> }
                { mode === 'USER' && window.location.hash === '#posts' && <PostSearch auth = { auth } posts = { posts.filter(post => post.userId === auth.id) } route = { route } breakpoint = { breakpoint } createJobPost={ createJobPost }/> }
                { window.location.hash === `#profile/${ auth.id }` && <ProfileHome auth = { auth } mode = { mode } bids = { bids } posts = { posts } setPosts = {setPosts} breakpoint = { breakpoint } route = { route } users = { users } /> }
                { window.location.hash === `#profile/settings/${ auth.id }` && <ProfileSettings auth = { auth } setAuth = { setAuth } breakpoint = { breakpoint } updateUser={updateUser} route = { route } mode = { mode } setMode = { setMode } errorMessage = { errorMessage } setErrorMessage = { setErrorMessage } /> }
                { window.location.hash === `#job-history/${ auth.id }` && <JobHistory auth = { auth } route = { route } posts = { posts } breakpoint = { breakpoint } /> }
                { window.location.hash === '#jobs' && <Jobs auth = { auth } mode = { mode } posts = { posts } setPosts = { setPosts } breakpoint = { breakpoint } bids = { bids } users = { users } route = { route }/> }
                { mode === 'COMPANY' && window.location.hash === '#jobs/search' && <JobSearch auth = { auth } result = { result } searchReturn = { searchReturn }  searchReturn = { searchReturn } setSearchReturn = { setSearchReturn } result = { result } submitSearch = { submitSearch } searchTerms = { searchTerms } setSearchTerms = { setSearchTerms } updateTerms = { updateTerms } setSearchReturn = { setSearchReturn } landSearch = { landSearch } setLandSearch = { setLandSearch } initMap = { initMap } auth = { auth } dropMarker = { dropMarker } />}
                { window.location.hash.includes(`#post/`) && <PostDetail auth = { auth } mode = { mode } createBid = { createBid } bids = { bids } users = { users } route = { route }/>}
                { mode === 'COMPANY' && window.location.hash === '#bids' && <Bids bids = {bids} auth = { auth } breakpoint = { breakpoint } route = { route } posts={ posts } /> }
                { params.view === `chat` && <ChatPage auth = {auth} chatMessages = {chatMessages} createChatMessage = {createChatMessage} route = { route } params = {params} headers = {headers} user = {users.filter(user => user.id === params.id)}/> }
                { window.location.hash.includes('#contracts') && <Contracts contracts={contracts.filter(contract => auth.id === (mode === 'COMPANY' ? contract.bidderId : contract.userId))} auth={auth} users={users} route = { route } /> }
                { window.location.hash === `#google` && <GoogleNewUser auth={auth} breakpoint={breakpoint} updateUser={updateUser} route={route} />}
            </main>
            <footer className = 'centerText'>
                © 2020 Collaborators: Abdul Rahim • Frazier • Lal • Adema  <a href="#view=chat">HelpChat</a>
            </footer>
        </div>
    );
};

export default AppHome;
