const express = require('express');
const app = express();
const path = require('path');
const db = require("./db");
const jwt = require("jwt-simple");
const models = db.models;
const {socketServer} = require('./websockets');
const {isAdmin, isLoggedIn} = require('./middleware');
const api = require('./api');

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// middleware for adding user info to req, using the user token
app.use((req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return next();
    }
    db.findUserFromToken(token)
      .then((auth) => {
        req.user = auth;
        next();
      })
      .catch((ex) => {
        const error = Error("not authorized");
        error.status = 401;
        next(error);
      });
  });

//chats api
app.post('/api/chat', (req,res,next)=>{
    //add stuff here

});

//authentication routes
app.post("/api/auth", (req, res, next) => {
    db.authenticate(req.body)
        .then((token) => {
            res.send({ token })
        })
        .catch((test_err) => {
            console.log("Error from db.authenticate: ",test_err)
            const error = Error("not authorized");
            error.status = 401;
            next(error);
        });
});

Object.keys(models).forEach(key => {
  app.get(`/api/${key}`, isLoggedIn, isAdmin, (req, res, next) => {
    models[key].read({ user: req.user })
      .then(items => res.send(items))
      .catch(next);
  });
  app.post(`/api/${key}`, isLoggedIn, isAdmin, (req, res, next) => {
    models[key].create({ user: req.body })
      .then(items => res.send(items))
      .catch(next);
  });
});

app.get("/api/auth", isLoggedIn, (req, res, next) => {
    res.send(req.user);
});

//can probably dry out later
app.use('/api/contracts', api.contracts.router);

app.use('/api/posts', api.posts.router);

app.use('/api/companies', api.companies.router);

app.use('/api/users', api.users.router);

app.use('/api/bids', api.bids.router);

app.use('/api/ratings', api.ratings.router);

app.use('/api/google', api.google.router);

app.post('/api/createUser', (req, res, next) => {
  models.users.create(req.body)
  .then(user => res.send(user))
  .catch(next);
});

app.use((req, res, next) => {
    const error = { message: `page not found ${req.url} for ${req.method}`, status: 404 };
    next(error);
  });

app.use((err, req, res, next) => {
    console.log(err.status);
    res.status(err.status || 500).send({ message: err.message });
});

module.exports = app
