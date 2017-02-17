'use strict';
const explorer = require('./build/express-explorer');
const express = require('express');
const app = new express();
const fs = require('fs');
const xml = require('xml');
const http = require('http');

const testJSON = {
  "name": "mario",
  "suname": "rossi",
  "age": 17,
  "sons": [
    "marco rossi",
    "paola rossi"
  ]
};

app.use('/explorer', explorer());
app.use('/', express.static(__dirname + '/build'));

app.get('/text', (req, res) => res.send('GET'));
app.delete('/text', (req, res) => res.send('DELETE'));
app.put('/text', (req, res) => res.send('PUT'));
app.post('/text', (req, res) => res.send('POST'));

app.get('/html', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/json', (req, res) => {
  res.json(testJSON);
});

app.get('/xml', (req, res) => {
  res.set('Content-Type', 'text/xml; charset=utf-8');
  fs.readFile(__dirname + '/test.xml', (err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(data);
  });
});

app.all('*', (req, res) => {
  res.send('all');
});


app.listen(8080, () => {
  console.log('Listening on port 8080');
});
