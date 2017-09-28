var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3300; // Sets an initial port.

app.use(express.static('app/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var friends = require('./app/data/friends.js');

app.listen(process.env.PORT || 3300);

require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);
