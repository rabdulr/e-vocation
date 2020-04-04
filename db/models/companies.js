const client = require('../client');

const companies = {
    read: async() => {
        return (await client.query('SELECT * FROM companies')).rows;
    },
    create: async({ companyName, username, address, city, state, zip, firstName, lastName, password }) => {

        const SQL =`INSERT INTO companies ("companyName", username, address, city, state, zip, "firstName", "lastName", password) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

        return (await client.query(SQL, [companyName, username, address, city, state, zip, firstName, lastName, password])).rows[0];
    }
}

module.exports = companies;