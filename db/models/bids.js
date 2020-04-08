const client = require('../client');

const bids = {
    read: async() => {
        return (await client.query('SELECT * FROM bids'));
    },
    create: async({ userId, companyId, proposal, bid, bidStatus }) => {

        const SQL =`INSERT INTO bids ("userId", "companyId", proposal, bid, "bidStatus") values ($1, $2, $3, $4, $5) RETURNING *`;

        return (await client.query(SQL, [ userId, companyId, proposal, bid, bidStatus ])).rows[0];
    }
}

module.exports = bids;