'use strict';
const explorer = require('./build/express-explorer');
const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
app.use('/explorer', explorer());
app.use('/', express.static(__dirname + '/build'));
app.use((req, res, next) => {
  console.log(req.body);
  next();
});

app.get('/text', (req, res) => res.send('GET'));
app.head('/text', (req, res) => res.send('HEAD'));
app.delete('/text', (req, res) => res.send('DELETE'));
app.patch('/text', (req, res) => res.send('PUT'));
app.post('/text', (req, res) => res.json(req.body));
app.put('/text', (req, res) => res.send('PUT'));

app.get('/params/:name', (req, res) => res.send(req.params.name));

app.get('/html', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/json', (req, res) => {
  console.log(req);
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

app.get('/error', (req, res) => {
  res.status(500).json({
      "status": "500",
      "source": "/error",
      "title": "The backend responded with an error",
      "detail": "There was an error during the elaboration of your request"
    }
  );
});

app.all('*', (req, res) => {
  res.send('all');
});


app.listen(8080, () => {
  console.log('Listening on port 8080');
});
