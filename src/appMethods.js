console.log('appMethods.js')

// const {setPosts} = require('./AppHome');
const axios = require('axios');
// import qs from 'qs';

const headers = () => {
  const token = window.localStorage.getItem('token');
  return {
      headers: {
          authorization: token
      }
  };
};

const getAllPosts = async() => {
  let sendIt = []

  await axios.get('/api/posts/getAllPosts', headers())
    .then((response) => sendIt = response)
    .catch(ex => console.log('appMethods.getAllPosts:', ex))

  return (sendIt)
}

const changeBidStatus = async(bid) => {
  let hereYaGo = []
  console.log('bid', bid)
  await axios.put('/api/bids/changeStatus', bid, headers())
    .then((gotEEm) => hereYaGo = gotEEm)
    .catch(ex => console.log('appMethods.getAllPosts:', ex))
  
  console.log('hereYaGo', hereYaGo)
  return(hereYaGo)
}

module.exports = {
  getAllPosts,
  headers,
  changeBidStatus,
}