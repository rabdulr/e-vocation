const client = require('../client');

const contracts = {
    readAll: async() => {
        return (await client.query(`SELECT posts.id, posts."userId", contracts."bidderId", posts.title, contracts."contractStatus", contracts.contract FROM posts, contracts WHERE posts.id = contracts."postId"`)).rows;
    },
    create: async({ userId, bidderId, postId, contract, contractStatus }) => {

        const SQL =`INSERT INTO contracts ("userId", "bidderId", "postId", contract, "contractStatus") values ($1, $2, $3, $4, $5) RETURNING *`;

        return (await client.query(SQL, [ userId, bidderId, postId, contract, contractStatus ])).rows[0];
    }
}

module.exports = contracts;