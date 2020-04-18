const client = require('../client');

const chats ={
  post: async ({senderID, receiverId, message})=>{
      const SQL = 'INSERT INTO chats ("senderId", "receiverId", message) VALUES ($1, $2, $3) returning *';
      return ( await client.query(SQL, [senderID, receiverId, message]))
  },
  read: async ({senderID, receiverId})=>{
    const SQL = 'SELECT * WHERE ("senderID" = $1 OR "senderID" = $2) AND ("receiverID" = $1 OR "receiverId" = $2)';
    return(await client.query(SQL, [senderID, receiverId]))
  }
}

module.exports = chats;
