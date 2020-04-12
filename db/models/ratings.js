const client = require('../client');

const ratings = {
    readAll: async() => {
        return (await client.query('SELECT * FROM ratings')).rows;
    },
    create: async({ id, idOfRated, rating, comments }) => {

        const SQL =`INSERT INTO ratings (id, "idOfRated", rating, comments) values ($1, $2, $3, $4) RETURNING *`;

        return (await client.query(SQL, [ id, idOfRated, rating, comments ])).rows[0];
    },

}

module.exports = ratings;