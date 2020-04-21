const client = require('../client');

const chats ={
    create: async ({senderId, receiverId, message})=>{
        const SQL = 'INSERT INTO chats ("senderId", "receiverId", message) VALUES ($1, $2, $3) returning *';
        return ( await client.query(SQL, [senderId, receiverId, message])).rows[0]
    },
    readAll: async ({senderId, receiverId})=>{
        const SQL = 'SELECT * from Chats WHERE ("senderId" = $1 OR "senderId" = $2) AND ("receiverId" = $1 OR "receiverId" = $2)';
        return(await client.query(SQL, [senderId, receiverId])).rows
    }
}

module.exports = chats;
