const express = require('express');
const router = express.Router();
const {contracts} = require('../db/models');

router.get('/getContracts', (req, res, next) => {
    contracts.readAll()
      .then(contracts => res.send(contracts))
      .catch(next)
});

module.exports = {router};