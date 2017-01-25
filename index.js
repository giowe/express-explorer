'use strict';
const explorer = require('./src/express-explorer');
const express = require('express');
const app = new express();
const router = express.Router();
const http = require('http');

app.use('/explorer', explorer({view: 'html'}));

const getParams = (path) => {
    return [ path, (req, res) => { res.send('ok! ' + path)} ];
};

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

router.all('/omni', (req, res) => {
  res.send('omni');
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
  //http.get('http://localhost:8080/explorer');
});
