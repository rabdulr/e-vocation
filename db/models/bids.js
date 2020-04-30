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
    },
    changeStatus: async({bidderId, postId, bidStatus}) => {
        const SQL = `UPDATE bids SET "bidStatus"=$3 WHERE "bidderId"=$1 AND "postId"=$2 RETURNING *`;
        
        return (await client.query(SQL, [ bidderId, postId, bidStatus ])).rows[0];
    }
}

module.exports = bids;