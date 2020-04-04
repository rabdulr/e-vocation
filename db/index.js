const client = require('./client');

const models = { companies, users, posts } = require('./models');

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
            industry VARCHAR(100),
            "firstName" VARCHAR(100),
            "lastName" VARCHAR(100),
            password VARCHAR(100) NOT NULL,
            CHECK (char_length(username) > 0)
        );

        CREATE TABLE posts (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            "userId" UUID REFERENCES users(id),
            title VARCHAR(100),
            description TEXT,
            industry TEXT,
            "datePosted" DATE NOT NULL DEFAULT CURRENT_DATE,
            "startDate" DATE,
            "endDate" DATE,
            "proposedBudget" INT

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
        },
        eva: {
            firstName: 'Eva',
            lastName: 'Winters',
            address: '888 Palm',
            city: 'San Luis Obispo',
            state: 'CA',
            zip: '93401',
            username: 'Eva',
            password: 'Eva'
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
            industry: 'Packaging',
            firstName: 'Santa',
            lastName: 'Claus',
            password: 'Santa'
        },
        ramsey: {
            companyName: 'Hell\'s Kitchen',
            username: 'Gordon',
            address: '888 Higuera',
            city: 'San Luis Obispo',
            state: 'CA',
            zip: '93401',
            industry: 'Food',
            firstName: 'Gordon',
            lastName: 'Ramsey',
            password: 'Gordon'
        }
    };

const [ jack, eva ] = await Promise.all(Object.values(_users).map(user => users.create(user)));
const [ santa, gordon ] = await Promise.all(Object.values(_companies).map(company => companies.create(company)));

const _posts = {
    item1: {
        
    }
}

};

module.exports = {
    sync,
    models
}