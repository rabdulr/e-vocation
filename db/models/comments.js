const client = require('../client');

const comments = {
    readAll: async() => {
        return (await client.query('SELECT * FROM comments')).rows;
    },
    create: async({ id, idOfPoster, comment }) => {

        const SQL =`INSERT INTO comments (id, "idOfPoster", comment) values ($1, $2, $3) RETURNING *`;

        return (await client.query(SQL, [ id, idOfPoster, comment ])).rows[0];
    },

}

module.exports = comments;