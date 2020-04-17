const client = require('../client');
const { hash } = require("../auth");

const users = {
    readAll: async() => {
        return (await client.query('SELECT * FROM users')).rows;
    },
    create: async({ firstName, lastName, companyName, address, city, state, zip, username, password }) => {

        const SQL =`INSERT INTO users ("firstName", "lastName", "companyName", address, city, state, zip, username, password) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

        return (await client.query(SQL, [firstName, lastName, companyName, address, city, state, zip, username, await hash(password)])).rows[0];
    },
    updateUser: async({ firstName, lastName, companyName, address, city, state, zip, username, id }) => {

        const SQL =`UPDATE users SET "firstName"=$1, lastName"=$2, "companyName"=$3, address=$4, city=$5, state=$6, zip=$7, username=$8 WHERE id=$9 RETURNING *`;

        return (await client.query(SQL, [firstName, lastName, companyName, address, city, state, zip, username, id])).rows[0];
    }
}

module.exports = users;
