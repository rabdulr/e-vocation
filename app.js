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

const isLoggedIn = (req, res, next) => {
    if (!req.user) {
      const error = Error("not authorized");
      error.status = 401;
      return next(error);
    }
    next();
  };

app.post("/api/auth", (req, res, next) => {
    db.authenticate(req.body)
      .then((token) => res.send({ token }))
      .catch(() => {
        const error = Error("not authorized");
        error.status = 401;
        next(error);
      });
  });

  app.get("/api/auth", isLoggedIn, (req, res, next) => {
    res.send(req.user);
  });

// error messaging
app.use((req, res, next) => {
    const error = {
        message: `page not found ${req.url} for ${req.method}`,
        status: 404,
    };
    next(error);
});
app.use((err, req, res, next) => {
    console.log(err.status, err.message);
    res.status(err.status || 500).send({ message: err.message });
});

module.exports = app
