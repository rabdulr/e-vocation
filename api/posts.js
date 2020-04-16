const express = require('express');
const router = express.Router();
const {posts} = require('../db/models');

router.post('/createJobPost', (req, res, next) => {
    posts.create(req.body)
      .then(post => res.send(post).sendStatus(204))
      .catch(next)
});

router.get('/getPosts', (req, res, next) => {
    posts.getPosts(req.user.id)
      .then(posts => res.send(posts))
      .catch(next)
});

router.get('/getAllPosts', (req, res, next) => {
    posts.readAll()
      .then(posts => res.send(posts))
      .catch(next)
});

module.exports = {router}