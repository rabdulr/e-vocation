const express = require('express');
const router = express.Router();
const {bids} = require('../db/models');

router.get('/getBids', (req, res, next) => {
  bids.readAll()
    .then(bids => res.send(bids))
    .catch(next)
});

router.post('/createBid', (req, res, next) => {
  bids.create(req.body)
    .then(bid => res.send(bid).sendStatus(204))
    .catch(next)
});

module.exports = {router};