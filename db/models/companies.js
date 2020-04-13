const client = require('../client');
const { hash } = require("../auth");

const companies = {
    readAll: async() => {
        return (await client.query('SELECT * FROM companies')).rows;
    },
    create: async({ companyName, username, address, city, state, zip, industry, firstName, lastName, password }) => {

        const SQL =`INSERT INTO companies ("companyName", username, address, city, state, zip, industry, "firstName", "lastName", password) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;

        return (await client.query(SQL, [companyName, username, address, city, state, zip, industry, firstName, lastName, await hash(password)])).rows[0];
    },
    updateCompany: async({ id, firstName, lastName, address, city, state, zip, username }) => {

        const SQL = `UPDATE companies SET "firstName"=$1, "lastName"=$2, address=$3, city=$4, state=$5, zip=$6, username=$7 WHERE id=$8 RETURNING *`

        return (await client.query(SQL, [firstName, lastName, address, city, state, zip, username, id])).rows[0]
    }
}

module.exports = companies;
