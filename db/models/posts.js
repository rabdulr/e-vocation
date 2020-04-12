const client = require('../client');

const posts = {
    readAll: async() => {
        return (await client.query('SELECT * FROM posts')).rows;
    },
    create: async({ userId, title, description, industry, siteAddress, startDate, endDate, proposedBudget }) => {

        const SQL =`INSERT INTO posts ("userId", title, description, industry, "siteAddress", "startDate", "endDate", "proposedBudget") values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

        return (await client.query(SQL, [ userId, title, description, industry, siteAddress, startDate, endDate, proposedBudget ])).rows[0];
    },
    getPosts: async(userId) => {
        return (await client.query(`SELECT * FROM posts WHERE "userId"=$1`, [userId])).rows;
    }
}

module.exports = posts;