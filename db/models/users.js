const client = require('../client');
const { hash } = require("../auth");

const users = {
    readAll: async() => {
        return (await client.query('SELECT * FROM users'));
    },
    create: async({ firstName, lastName, address, city, state, zip, username, password }) => {

        const SQL =`INSERT INTO users ("firstName", "lastName", address, city, state, zip, username, password) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

        return (await client.query(SQL, [firstName, lastName, address, city, state, zip, username, await hash(password)])).rows[0];
    },
}

module.exports = users;
