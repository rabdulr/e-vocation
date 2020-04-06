const client = require('./client');

const moment = require('moment')
//Create an address site in Posts

const { authenticate, compare, findUserFromToken, hash } = require("./auth");

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
            role VARCHAR(20) DEFAULT 'USER',
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
        },
        admin: {
            firstName: 'Capstone',
            lastName: 'Admin',
            address: 'Local Host',
            city: 'Atascadero',
            state: 'CA',
            zip: '93422',
            username: 'Admin',
            password: 'Admin'
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

const [ jack, eva, admin ] = await Promise.all(Object.values(_users).map(user => users.create(user)));
const [ santa, gordon ] = await Promise.all(Object.values(_companies).map(company => companies.create(company)));

await client.query('UPDATE users SET role=$1 WHERE id=$2 RETURNING *', ['ADMIN', admin.id]);

const _posts = {
    item1: {
        userId: jack.id,
        title: 'Create Santa Land',
        description: 'Make Halloween Town into an amazing winter wonderland! We are a bunch of ghouls and monsters who know nothing',
        industry: 'Packaging',
        startDate: new Date('2020-9-20'),
        endDate: new Date('2020-10-25'),
        proposedBudget: 1000,
    },
    item2: {
        userId: eva.id,
        title: 'Cater My Event',
        description: 'I am hosting an event that needs to be catered to 1000 people and the food needs to be excellent. Anything less is a travesty',
        industry: 'Food',
        startDate: new Date('2020-8-31'),
        endDate: new Date('2020-8-31'),
        proposedBudget: 1000000,
    }
}

const [ item1, item2 ] = await Promise.all(Object.values(_posts).map(post => posts.create(post)));

};

// added one route to test front-end -H
const getPosts = async () => {
    return (await client.query(`SELECT * FROM posts`).rows)
}

module.exports = {
    sync,
    models,
    authenticate,
    compare,
    findUserFromToken,
    hash,
    getPosts
}
