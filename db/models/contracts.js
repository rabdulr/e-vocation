const client = require('../client');

const contracts = {
    readAll: async() => {
        return (await client.query('SELECT * FROM contracts'));
    },
    create: async({ userId, companyId, contract, contractStatus }) => {

        const SQL =`INSERT INTO contracts ("userId", "companyId", contract, "contractStatus") values ($1, $2, $3, $4) RETURNING *`;

        return (await client.query(SQL, [ userId, companyId, contract, contractStatus ])).rows[0];
    }
}

module.exports = contracts;