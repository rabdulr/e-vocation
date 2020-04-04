const client = require('../client');

const posts = {
    read: async() => {
        return (await client.query('SELECT * FROM posts'));
    },
    create: async({ userId, title, description, industry, startDate, endDate, proposedBudget }) => {

        const SQL =`INSERT INTO posts ("userId", title, description, industry, "startDate", "endDate", "proposedBudget") values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

        return (await client.query(SQL, [ userId, title, description, industry, startDate, endDate, proposedBudget ])).rows[0];
    }
}

module.exports = posts;