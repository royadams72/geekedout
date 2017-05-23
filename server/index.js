var express = require('express');
var bodyParser = require('body-parser');
//var cors = require('cors');
var http = require('http');
var path = require('path');
var request = require('request');
var app = express();
var port = process.env.PORT || 3000;
var comicsRoutes = require('./routes/comics');
var moviesRoutes = require('./routes/movies');
var musicRoutes = require('./routes/music');
var gamesRoutes = require('./routes/games');

app.set('port', (port));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});
app.use(bodyParser.urlencoded({extended: true}));
//ROUTES
//Handle specific routes first
app.use('/movies', moviesRoutes);
app.use('/music', musicRoutes);
app.use('/games', gamesRoutes);
app.use('/comics', comicsRoutes);


var server = http.createServer(app).listen(port, function() {
  console.log('Server listening on port ' + port);
});

module.exports = app;
