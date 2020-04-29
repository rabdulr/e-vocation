const client = require('../client');
const { hash } = require("../auth");

const users = {
    readAll: async() => {
        return (await client.query('SELECT * FROM users')).rows;
    },
    create: async({ firstName, lastName, companyName, address, city, state, zip, latitude, longitude, username, password }) => {

        const SQL =`INSERT INTO users ("firstName", "lastName", "companyName", address, city, state, zip, latitude, longitude, username, password) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;

        return (await client.query(SQL, [firstName, lastName, companyName, address, city, state, zip, latitude, longitude, username, await hash(password)])).rows[0];
    },
    updateUser: async({ firstName, lastName, companyName, address, city, state, zip, role, username, id }) => {

        const SQL =`UPDATE users SET "firstName"=$1, "lastName"=$2, "companyName"=$3, address=$4, city=$5, state=$6, zip=$7, role = $8, username=$9 WHERE id=$10 RETURNING *`;

        return (await client.query(SQL, [firstName, lastName, companyName, address, city, state, zip, role, username, id])).rows[0];
    },
    findUser: async({email}) => {
        return (await client.query(`SELECT * FROM users WHERE username=$1`, [email])).rows[0];
    },
    createGoogleUser: async({ googleId, email, firstName, lastName }) => {

        const SQL = 'INSERT INTO users ("firstName", "lastName", username, "googleId") values ($1, $2, $3, $4) RETURNING *';

        return (await client.query(SQL, [firstName, lastName, email, googleId])).rows[0]
    }
}

module.exports = users;
