const express = require('express');
const router = express.Router();
const {posts} = require('../db/models');
const axios = require('axios')
try{
  require('dotenv').config('../.env');
}
catch(ex){
  console.log(ex);
}

const key = process.env.GOOGLE_API

const createLocation = async (req) => {
  const address = req.body.address.split(', ').map( item => item.replace(/\s/g, '+')).slice(0, 3).toString().replace(/,/g, ',+');
  return (await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`)).data.results[0].geometry.location
}

router.post('/createJobPost', async (req, res, next) => {
  const coord = await createLocation(req)
    posts.create({...req.body, coord})
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