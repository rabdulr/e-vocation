const client = require('../client');
const { hash } = require("../auth");

const users = {
    readAll: async() => {
        return (await client.query('SELECT * FROM users')).rows;
    },
    create: async({ firstName, lastName, address, city, state, zip, username, password }) => {

        const SQL =`INSERT INTO users ("firstName", "lastName", address, city, state, zip, username, password) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

        return (await client.query(SQL, [firstName, lastName, address, city, state, zip, username, await hash(password)])).rows[0];
    },
    updateUser: async({ firstName, lastName, address, city, state, zip, username, id }) => {

        const SQL =`UPDATE users SET "firstName"=$1, "lastName"=$2, address=$3, city=$4, state=$5, zip=$6, username=$7 WHERE id=$8 RETURNING *`;

        return (await client.query(SQL, [firstName, lastName, address, city, state, zip, username, id])).rows[0];
    }
}

module.exports = users;
