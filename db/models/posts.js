const client = require('../client');

const posts = {
    readAll: async() => {
        return (await client.query('SELECT * FROM posts')).rows;
    },
    create: async({userId, acceptedId, title, description, industry, address, coord, startDate, endDate, proposedBudget }) => {

        console.log('From DB: ', userId, acceptedId, title, description, industry, address, coord, startDate, endDate, proposedBudget);

        const SQL =`INSERT INTO posts ("userId", "acceptedId", title, description, industry, "siteAddress", latitude, longitude, "startDate", "endDate", "proposedBudget", status) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;

        return (await client.query(SQL, [ userId, acceptedId, title, description, industry, address, coord.lat, coord.lng, startDate, endDate, proposedBudget, 'Active'])).rows[0];
    },
    createSeed: async({userId, acceptedId, title, description, industry, siteAddress, latitude, longitude, startDate, endDate, proposedBudget, status }) => {

        const SQL =`INSERT INTO posts ("userId", "acceptedId", title, description, industry, "siteAddress", latitude, longitude, "startDate", "endDate", "proposedBudget", status) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;

        return (await client.query(SQL, [ userId, acceptedId, title, description, industry, siteAddress, latitude, longitude, startDate, endDate, proposedBudget, status ])).rows[0];
    },
    update: async({ userId, acceptedId, title, description, industry, siteAddress, startDate, endDate, proposedBudget, status}) => {

        const SQL = `
        UPDATE posts
        SET "acceptedId" = $(2), title = $(3), description = $(4), industry = $(5), "siteAddress" = $(6), "startDate" = $(7), "endDate" = $(8), "proposedBudget" = $(9), status = $(10)
        WHERE id = $(1);
        `;

        return (await client.query(SQL, [userId, acceptedId, title, description, industry, siteAddress, startDate, endDate, proposedBudget, status])).rows[0];
    },
    getPosts: async(userId) => {
        return (await client.query(`SELECT * FROM posts WHERE "userId"=$1`, [userId])).rows;
    }
}

module.exports = posts;