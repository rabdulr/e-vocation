const axios = require('axios');

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
  await axios.put('/api/bids/changeStatus', bid, headers())
    .then((gotEEm) => hereYaGo = gotEEm)
    .catch(ex => console.log('appMethods.getAllPosts:', ex))

  return(hereYaGo)
}

module.exports = {
  getAllPosts,
  headers,
  changeBidStatus,
}