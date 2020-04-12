const client = require('../client');

const bids = {
    readAll: async() => {
        return (await client.query('SELECT * FROM bids'));
    },
    create: async({ postId, userId, companyId, proposal, bid }) => {

        const SQL =`INSERT INTO bids ("postId", "userId", "companyId", proposal, bid) values ($1, $2, $3, $4, $5) RETURNING *`;

        return (await client.query(SQL, [ postId, userId, companyId, proposal, bid ])).rows[0];
    },
    getBids: async(companyId) => {
        return (await client.query(`SELECT * FROM bids, posts WHERE "postId" = id AND "companyId"=$1`, [companyId])).rows;
    }
}

module.exports = bids;