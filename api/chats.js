const express = require('express');
const router = express.Router();
const {chats} = require('../db/models');

router.get('/getChats', (req, res, next) => {
  chats.readAll()
    .then(chats => res.send(chats))
    .catch(next)
});

router.post('/createChat', (req, res, next) => {
  chats.create(req.body)
  .then(chat => res.send(chat))
  .catch(next);
});

module.exports = {router};
