'use strict';
const express = require('express');
const explorer = require('./express-explorer')(express);
const app = new express();
const router = express.Router();
const http = require('http');

app.use('/explorer', explorer);

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

 router.get(route + 'r', (req, res) => {
   res.send(route + 'r');
 });
});

app.use('/rout', router);

app.listen(8080, () => {
  console.log('Listening on port 8080');
  console.log('Requiring /explorer');  
  http.get('http://localhost:8080/explorer');
});
