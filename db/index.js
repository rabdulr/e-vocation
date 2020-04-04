const client = require('./client');
const { authenticate, compare, findUserFromToken, hash } = require("./auth");

const models = { companies, users } = require('./models');
console.log(users.create)

const sync = async() => {
    const SQL = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS ratings;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS companies;

        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            "firstName" VARCHAR(100),
            "lastName" VARCHAR(100),
            address VARCHAR(100),
            city VARCHAR(100),
            state VARCHAR(25),
            zip VARCHAR(10),
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            CHECK (char_length(username) > 0)
        );

        CREATE TABLE companies (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            "companyName" VARCHAR(100),
            username VARCHAR(100) NOT NULL UNIQUE,
            address VARCHAR(100),
            city VARCHAR(100),
            state VARCHAR(25),
            zip VARCHAR(10),
            "firstName" VARCHAR(100),
            "lastName" VARCHAR(100),
            password VARCHAR(100) NOT NULL,
            CHECK (char_length(username) > 0)
        );
    `;
    await client.query(SQL);

    const _users = {
        jack: {
            firstName: 'Jack',
            lastName: 'Skellington',
            address: '123 Halloween',
            city: 'Halloween Town',
            state: 'CA',
            zip: '93405',
            username: 'Jack',
            password: 'Jack'
        }
    };

    const _companies = {
        santa: {
            companyName: 'Christmas',
            username: 'Christmas',
            address: '1 North Pole',
            city: 'North Pole',
            state: 'AK',
            zip: '99501',
            firstName: 'Santa',
            lastName: 'Claus',
            password: 'Santa'
        }
    };

const jack = await users.create(_users.jack)
const santa = await companies.create(_companies.santa)
console.log(jack, santa);

};

module.exports = {
    sync,
    models
}
