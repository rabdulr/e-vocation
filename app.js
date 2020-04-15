const express = require('express');
const app = express();
const path = require('path');
const db = require("./db");
const jwt = require("jwt-simple");
const models = db.models;
const {socketServer} = require('./websockets');
const {isAdmin, isLoggedIn} = require('./middleware')

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

//authentication routes
app.post("/api/auth", (req, res, next) => {
    db.authenticate(req.body)
        .then((token) => {
            //socketServer().emit('message', {text: 'Socket server test: Welcome!'})
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

app.get('/api/getPosts', (req, res, next) => {
  models.posts.getPosts(req.user.id)
    .then(posts => res.send(posts))
    .catch(next)
});

app.get('/api/getAllPosts', (req, res, next) => {
  models.posts.readAll()
    .then(posts => res.send(posts))
    .catch(next)
})

app.get('/api/getCompanies', (req, res, next) => {
  models.companies.readAll()
    .then(companies => res.send(companies))
    .catch(next)
})

app.post('/api/createUser', (req, res, next) => {
  models.users.create(req.body)
  .then(user => res.send(user))
  .catch(next);
});

app.post('/api/createCompany', (req, res, next) => {
  models.companies.create(req.body)
  .then(user => res.send(user))
  .catch(next);
});

app.get('/api/getBids', (req, res, next) => {
  models.bids.readAll()
    .then(bids => res.send(bids))
    .catch(next)
});

app.post('/api/posts/createJobPost', (req, res, next) => {
  models.posts.create(req.body)
    .then(post => res.send(post).sendStatus(204))
    .catch(next)
});

app.post('/api/bids/createBid', (req, res, next) => {
  models.bids.create(req.body)
    .then(bid => res.send(bid).sendStatus(204))
    .catch(next)
});

app.put('/api/users/:id', (req, res, next) => {
  if(req.body.role === 'COMPANY'){
    models.companies.updateCompany(req.body)
      .then(company => res.send(company).sendStatus(201))
      .catch(next)
  } else {
    models.users.updateUser(req.body)
      .then(user => res.send(user).sendStatus(201))
      .catch(next)
  }
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
