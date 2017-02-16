'use strict';
const explorer = require('./build/express-explorer');
const express = require('express');
const app = new express();
const router = express.Router();
const http = require('http');
const pkg = {
  "name": "mario",
  "suname": "rossi",
  "age": 17,
  "sons": [
    "paolo rossi",
    "paola rossi"
  ]
};

app.use('/explorer', explorer());

app.get('/test', (req, res) => res.json(pkg));
app.delete('/test', (req, res) => res.send('ciaone'));
app.put('/test', (req, res) => res.json(pkg));
app.post('/test', (req, res) => res.json(pkg));

app.use('/rout', router);

[
  '/home',
  '/contacts',
  '/contacts/:id'
].forEach(route => {

  app.get(route, (req, res) => {
    res.send(route);
  });

  app.post(route, (req, res) => {
    res.send(route + 'post');
  });

  router.get(route + 'rrrr', (req, res) => {
    res.send(route + 'rrrr');
  });

  router.post(route + 'rrrr', (req, res) => {
    res.send(route + 'rrrr');
  });
});

router.all('omni', (req, res) => {
  res.send('omni');
});

app.all('*', (req, res) => {
  res.send('all');
});


app.listen(8080, () => {
  console.log('Listening on port 8080');
});
