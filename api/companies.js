const express = require('express');
const router = express.Router();
const {companies} = require('../db/models');

router.get('/api/getCompanies', (req, res, next) => {
  companies.readAll()
    .then(companies => res.send(companies))
    .catch(next)
});

router.post('/createCompany', (req, res, next) => {
  companies.create(req.body)
  .then(user => res.send(user))
  .catch(next);
});

module.exports = {router};