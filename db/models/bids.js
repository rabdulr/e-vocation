const client = require('../client');

const bids = {
    readAll: async() => {
        return (await client.query('SELECT * FROM bids')).rows;
    },
    create: async({ postId, userId, bidderId, proposal, bid }) => {

        const SQL =`INSERT INTO bids ("postId", "userId", "bidderId", proposal, bid) values ($1, $2, $3, $4, $5) RETURNING *`;

        return (await client.query(SQL, [ postId, userId, bidderId, proposal, bid ])).rows[0];
    },
    getBids: async(bidderId) => {
        return (await client.query(`SELECT * FROM bids, posts WHERE "postId" = id AND "bidderId"=$1`, [bidderId])).rows;
    }
}

module.exports = bids;