const client = require('./client');

const moment = require('moment')

const { authenticate, compare, findUserFromToken, hash } = require("./auth");

const models = { companies, users, posts, bids, contracts } = require('./models');

const { runSeed } = require('./seedData/seeded')

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
            "siteAddress" TEXT,
            "proposedBudget" INT,
            status VARCHAR(25) DEFAULT 'Active'
        );

        CREATE TABLE bids (
            "postId" UUID REFERENCES posts(id),
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

    runSeed();

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
