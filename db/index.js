const client = require('./client');

const moment = require('moment')

const { authenticate, compare, findUserFromToken, hash } = require("./auth");

const models = { companies, users, posts, bids, contracts } = require('./models');

const { runSeed } = require('./seedData/seeded')

const sync = async() => {
    const SQL = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        DROP TABLE IF EXISTS comments;
        DROP TABLE IF EXISTS ratings;
        DROP TABLE IF EXISTS contracts;
        DROP TABLE IF EXISTS bids;
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS users;

        DROP TABLE IF EXISTS chats;
        DROP TYPE IF EXISTS post_status;

        CREATE TYPE post_status AS ENUM ('Active', 'Ended', 'Pending', 'Completed');


        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            "firstName" VARCHAR(100),
            "lastName" VARCHAR(100),
            "companyName" VARCHAR(100) DEFAULT NULL,
            address VARCHAR(100),
            city VARCHAR(100),
            state VARCHAR(25),
            zip VARCHAR(10),
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            role VARCHAR(20) DEFAULT 'USER',
            CHECK (char_length(username) > 0)
        );

        CREATE TABLE posts (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            "userId" UUID REFERENCES users(id),
            "acceptedId" UUID DEFAULT NULL REFERENCES users(id),
            title VARCHAR(100),
            description TEXT,
            industry TEXT,
            "datePosted" DATE NOT NULL DEFAULT CURRENT_DATE,
            "startDate" DATE,
            "endDate" DATE,
            "siteAddress" TEXT,
            "proposedBudget" INT,
            status post_status
        );

        CREATE TABLE bids (
            "postId" UUID REFERENCES posts(id),
            "userId" UUID REFERENCES users(id),
            "bidderId" UUID REFERENCES users(id),
            proposal TEXT,
            "bidStatus" VARCHAR(25) DEFAULT 'Active',
            bid INT
        );

        CREATE TABLE contracts (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            "userId" UUID REFERENCES users(id),
            "bidderId" UUID REFERENCES users(id),
            "postId" UUID REFERENCEs posts(id),
            contract TEXT,
            "contractStatus" VARCHAR(25)
        );

        CREATE TABLE ratings (
            id UUID REFERENCES contracts(id),
            "idOfRated" UUID,
            rating INT,
            comments TEXT
        );

        CREATE TABLE comments (
            id UUID REFERENCES posts(id),
            "idOfPoster" UUID,
            "datePosted" DATE NOT NULL DEFAULT CURRENT_DATE,
            comment TEXT
        );

        CREATE TABLE chats (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            "senderId" UUID,
            "receiverId" UUID,
            time timestamp NOT NULL DEFAULT NOW(),
            message TEXT
        );

    `;
    await client.query(SQL);

    runSeed();

};

module.exports = {
    sync,
    models,
    authenticate,
    compare,
    findUserFromToken,
    hash
}
