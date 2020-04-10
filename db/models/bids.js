const client = require('../client');

const bids = {
    readAll: async() => {
        return (await client.query('SELECT * FROM bids'));
    },
    create: async({ postId, userId, companyId, proposal, bid, bidStatus }) => {

        const SQL =`INSERT INTO bids ("postId", "userId", "companyId", proposal, bid, "bidStatus") values ($1, $2, $3, $4, $5, $6) RETURNING *`;

        return (await client.query(SQL, [ postId, userId, companyId, proposal, bid, bidStatus ])).rows[0];
    },
    getBids: async(companyId) => {
        return (await client.query(`SELECT * FROM bids WHERE "companyId"=$1`, [companyId])).rows;
    }
}

module.exports = bids;