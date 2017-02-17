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
app.use('/', express.static(__dirname + '/build'));

app.get('/test', (req, res) => res.json(pkg));
app.delete('/test', (req, res) => res.send('ciaone'));
app.put('/test', (req, res) => res.json(pkg));
app.post('/test', (req, res) => res.json(pkg));

app.get('/route1', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.all('*', (req, res) => {
  res.send('all');
});


app.listen(8080, () => {
  console.log('Listening on port 8080');
});
