const client = require('./client');

const moment = require('moment')
//Create an address site in Posts

const { authenticate, compare, findUserFromToken, hash } = require("./auth");

const models = { companies, users, posts, bids, contracts } = require('./models');

const { Users, Companies, Posts, Bids, Contracts } = require('./models/constructors')



const sync = async() => {
    const SQL = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        DROP TABLE IF EXISTS contracts;
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
            "proposedBudget" INT,
            status VARCHAR(25) DEFAULT 'Active'
        );

        CREATE TABLE bids (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            "userId" UUID REFERENCES users(id),
            "companyId" UUID REFERENCES companies(id),
            proposal TEXT,
            "bidStatus" VARCHAR(25),
            bid INT
        );
        
        CREATE TABLE contracts (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            "userId" UUID REFERENCES users(id),
            "companyId" UUID REFERENCES companies(id),
            contract TEXT,
            "contractStatus" VARCHAR(25)
        );
        
    `;
    await client.query(SQL);

    //Users using Users constructor
    const jack = await users.create(new Users('Jack', 'Skellington', '123 Halloween', 'Halloween Town', 'CA', '93405', 'Jack', 'Jack'));

    const eva = await users.create(new Users('Eva', 'Winters', '888 Palm', 'San Luis Obispo', 'CA', '93401', 'Eva', 'Eva'));

    const admin = await users.create(new Users('Capstone', 'Admin', 'Local Host', 'Atascadero', 'CA', '93422', 'Admin', 'Admin'));

    await client.query('UPDATE users SET role=$1 WHERE id=$2 RETURNING *', ['ADMIN', admin.id]);

    //Companies using Companies constructor
    const santa = await companies.create(new Companies('Christmas', 'Christmas', '1 North Pole', 'North Pole', 'AK', '99501', 'Packaging', 'Santa', 'Claus', 'Santa'));

    const gordon = await companies.create(new Companies('Hell\'s Kitchen', 'Gordon', '888 Higuera', 'San Luis Obispo', 'CA', '93401', 'Catering', 'Gordon', 'Ramsey', 'Gordon'));

    //Posts using Posts constructor
    const item1 = await posts.create(new Posts(jack.id, 'Create Santa Land', 'Make Halloween Town into an amazing winter wonderland! We are a bunch of ghouls and monsters who know nothing', 'Packaging', new Date('2020-9-20'), new Date('2020-10-25'), 1000));

    const item2 = await posts.create(new Posts(eva.id, 'Cater My Event', 'I am hosting an event that needs to be catered to 1000 people and the food needs to be excellent. Anything less is a travesty', 'Food', new Date('2020-8-31'), new Date('2020-8-31'), 1000000));

    const item3 = await posts.create(new Posts(eva.id, 'Fancy Hot Dogs','Hosting a fashion show. The models have ice to chew. Guests can have fancy hot dogs', 'Food', new Date('2020-7-31'), new Date('2020-7-31'), 10000));

    await client.query('UPDATE posts SET status=$1 WHERE "userId"=$2 RETURNING *', ['Accepted', eva.id]);


    //Bids using Bids constructor
    const bid1 = await bids.create(new Bids(jack.id, santa.id, 'Jolly good! My elves can set a very festive holiday for you! We will do it for free!', 'Active', 0));

    const bid2 = await bids.create(new Bids(eva.id, gordon.id, 'You have got to be joking. What kind of event is this? Who\'s attending? I need more information', 'Active', 50000));

    const bid3 = await bids.create(new Bids(eva.id, gordon.id, 'We can do this for free!', 'Active', 0));

    //Contracts using Contracts constructor
    const contract1 = await contracts.create(new Contracts(eva.id, gordon.id, 'I will cook your damn food.', 'Active'))

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
