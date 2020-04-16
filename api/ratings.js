const express = require('express');
const router = express.Router();
const {ratings} = require('../db/models');

router.get('/api/ratings/getRatings', (req, res, next) => {
  ratings.readAll()
    .then(ratings => res.send(ratings))
    .catch(next)
});

module.exports = {router};