const express = require('express');
const router = express.Router();
const {chats} = require('../db/models');

router.get('/getChats/:senderId/:receiverId', (req, res, next) => {
  chats.readAll(req.params)
    .then(chats => res.send(chats))
    .catch(next)
});
console.log("3")
router.post('/createChat', (req, res, next) => {
  console.log("4")
  console.log("req.body:", req.body)
  chats.create(req.body)
  .then(chat => res.send(chat))
  .catch(next)
});

module.exports = {router};
