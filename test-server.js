'use strict';
const explorer = require('./build/express-explorer');
const express = require('express');
const app = new express();
const router = express.Router();
const http = require('http');

app.use('/explorer', explorer());

app.use('/rout', router);

app.get('/test', (req, res) => res.send('test'));
app.delete('/test', (req, res) => res.send('test'));
app.put('/test', (req, res) => res.send('test'));
app.post('/test', (req, res) => res.send('test'));

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
