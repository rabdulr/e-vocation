const express = require('express');
const router = express.Router();
const {companies, users} = require('../db/models');

router.put('/:id', (req, res, next) => {
  if(req.body.role === 'COMPANY'){
    companies.updateCompany(req.body)
      .then(company => res.send(company).sendStatus(201))
      .catch(next)
  } else {
    users.updateUser(req.body)
      .then(user => res.send(user).sendStatus(201))
      .catch(next)
  }
});

router.get('/getUsers', (req, res, next) => {
    users.readAll()
    .then(users => res.send(users).sendStatus(201))
    .catch(next);
});

module.exports = {router};