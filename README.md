# Express Expolorer
<div>
	<a href="https://www.npmjs.com/package/express-explorer"><img src='http://img.shields.io/npm/v/express-explorer.svg?style=flat'></a>
	<a href="https://www.npmjs.com/package/express-explorer"><img src='https://img.shields.io/npm/dm/express-explorer.svg?style=flat-square'></a>
  <a href="https://david-dm.org/giowe/express-explorer"><img src='https://david-dm.org/giowe/express-explorer.svg'></a>
	<a href="https://www.youtube.com/watch?v=Sagg08DrO5U"><img src='http://img.shields.io/badge/gandalf-approved-61C6FF.svg'></a>
</div>

Autodiscovering route explorer for every Express.js application.

<img src="http"></img>

## Installation
```
npm install express-explorer
```

## Usage
```
const express = require('express');
const explorer = require('express-explorer');
const app = new express();
  
//settings params is optional and these are default values:
const settings = {
  format: 'html'
};
  
app.use('/explorer', explorer(settings));
```

##Settings
* `format`: `html` (default) or `json`. If param is `html` you will get the explorer panel otherwise all discovered routes are served as a json.
Even if you chose to get the html panel you can require the json format passing the query string `?format=json` to the endpoint you chose for the explorer (ex. `/explorer?format=json`). 
