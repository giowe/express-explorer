'use strict';
const explorer = require('./build/express-explorer');
const express = require('express');
const app = new express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/explorer', explorer());
app.use('/', express.static(__dirname + '/build'));

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
  res.json({
    name: 'Mario',
    lastname: 'Rossi',
    age: 17,
    sons: [
      'Marco Rossi',
      'Paola Rossi'
    ]
  });
});

app.get('/error', (req, res) => {
  res.status(500).json({
    status: '500',
    source: '/error',
    title: 'The backend responded with an error',
    details: 'There was an error during the elaboration of your request'
  });
});

app.get('/route/subRoute/:param/route/:param2/routre', (req, res) => {
  res.json(req.params);
});

app.all('*', (req, res) => {
  res.send('all');
});


app.listen(8080, () => {
  console.log('Listening on port 8080');
});
