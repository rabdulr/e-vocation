const express = require('express');
const app = express();
const path = require('path');
const db = require("./db");
const jwt = require("jwt-simple");
const models = db.models;

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return next(Error('not authorized'));
  }
  next();
};

const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    const error = Error('not authorized');
    error.status = 401;
    return next(error);
  }
  next();
};

// middleware for adding user info to req, using the user token
app.use((req, res, next) => {
    const token = req.headers.authentication;
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
        .then((token) => res.send({ token }))
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

// added one route to test front-end -H
app.get('/api/getPosts', (req, res, next) => {
  db.getPosts()
    .then(posts => res.send(posts))
    .catch(next)
})

app.use((req, res, next) => {
    const error = { message: `page not found ${req.url} for ${req.method}`, status: 404 };
    next(error);
  });

  app.use((err, req, res, next) => {
    console.log(err.status);
    res.status(err.status || 500).send({ message: err.message });
  });

module.exports = app