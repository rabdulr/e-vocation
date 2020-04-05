const express = require('express');
const app = express();
const path = require('path');
const db = require("./db");
const jwt = require("jwt-simple");
const models = db.models;

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.json());

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

    console.log(db)
    db.authenticate(req.body)
        .then((token) => res.send({ token }))
        .catch((test_err) => {
            console.log("Error from db.authenticate: ",test_err)
            const error = Error("not authorized");
            error.status = 401;
            next(error);
        });
});

app.get("/api/auth", (req, res, next) => {
    res.send(req.user);
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
