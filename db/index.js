const client = require('./client');

const moment = require('moment')
//Create an address site in Posts

const { authenticate, compare, findUserFromToken, hash } = require("./auth");

const models = { companies, users, posts, bids } = require('./models');



const sync = async() => {
    const SQL = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        DROP TABLE IF EXISTS bids;
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

        CREATE TABLE bids (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            "userId" UUID REFERENCES users(id),
            "companyId" UUID REFERENCES companies(id),
            proposal TEXT,
            bid INT
        )
    `;
    await client.query(SQL);

    class Users {
        constructor(firstName, lastName, address, city, state, zip, username, password){
            this.firstName = firstName;
            this.lastName = lastName;
            this.address = address;
            this.city = city;
            this.state = state;
            this.zip = zip;
            this.username = username;
            this.password = password;
        }
    };

    class Companies {
        constructor(companyName, username, address, city, state, zip, industry, firstName, lastName, password){
            this.companyName = companyName;
            this.username = username;
            this.address = address;
            this.city = city;
            this.state = state;
            this.zip = zip;
            this.industry = industry;
            this.firstName = firstName;
            this.lastName = lastName;
            this.password = password;
        }
    }

    //Users using Users constructor
    const jack = await users.create(new Users('Jack', 'Skellington', '123 Halloween', 'Halloween Town', 'CA', '93405', 'Jack', 'Jack'));

    const eva = await users.create(new Users('Eva', 'Winters', '888 Palm', 'San Luis Obispo', 'CA', '93401', 'Eva', 'Eva'));

    const admin = await users.create(new Users('Capstone', 'Admin', 'Local Host', 'Atascadero', 'CA', '93422', 'Admin', 'Admin'));

    //Companies using Companies constructor
    const santa = await companies.create(new Companies('Christmas', 'Christmas', '1 North Pole', 'North Pole', 'AK', '99501', 'TEST', 'Santa', 'Claus', 'Santa'));

    const gordon = await companies.create(new Companies('Hell\'s Kitchen', 'Gordon', '888 Higuera', 'San Luis Obispo', 'CA', '93401', 'TEST', 'Gordon', 'Ramsey', 'Gordon'));

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

    const _bids = {
        bid1: {
            userId: jack.id,
            companyId: santa.id,
            proposal: 'Jolly good! My elves can set a very festive holiday for you! We will do it for free!',
            bid: 0
        },
        bid2: {
            userId: eva.id,
            companyId: gordon.id,
            proposal: 'You have got to be joking. What kind of event is this? Who\'s attending? I need more information',
            bid: 0
        },
        bid3: {
            userId: eva.id,
            companyId: santa.id,
            proposal: 'We can do this for free!',
            bid: 0
        }
    }

    const [ bid1, bid2, bid3 ] = await Promise.all(Object.values(_bids).map(bid => bids.create(bid)));

};

// added one route to test front-end -H
const getPosts = async () => {
    return (await client.query(`SELECT * FROM posts`)).rows
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
