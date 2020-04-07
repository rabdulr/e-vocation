const client = require('../client');

const bids = {
    read: async() => {
        return (await client.query('SELECT * FROM bids'));
    },
    create: async({ userId, companyId, proposal, bid }) => {

        const SQL =`INSERT INTO bids ("userId", "companyId", proposal, bid) values ($1, $2, $3, $4) RETURNING *`;

        return (await client.query(SQL, [ userId, companyId, proposal, bid  ])).rows[0];
    }
}

module.exports = bids;