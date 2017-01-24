'use strict';
const express = require('express');
const explorer = require('./express-explorer');
const app = new express();
const router = express.Router();
const http = require('http');

app.use('/explorer', explorer);

const getParams = (path) => {
    return [ path, (req, res) => { res.send('ok! ' + path)} ];
};

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

app.use('/rout', router);

/*app.get(...getParams('/appget'));
router.get(...getParams('/routerget'));
app.use('/rirrorarro', router);*/

app.listen(8080, () => {
  console.log('Listening on port 8080');
  http.get('http://localhost:8080/explorer');
});
