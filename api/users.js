const express = require('express');
const router = express.Router();
const {users} = require('../db/models');

router.put('/:id', (req, res, next) => {
  console.log(req.body)
    users.updateUser(req.body)
      .then(user => res.send(user).sendStatus(201))
      .catch(next)
});

router.get('/getUsers', (req, res, next) => {
    users.readAll()
    .then(users => res.send(users).sendStatus(201))
    .catch(next);
});

module.exports = {router};