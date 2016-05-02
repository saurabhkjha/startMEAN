var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var http = require('http');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var config = require(__dirname + '/config/config.js');
var app = express();
app.set('port', process.env.PORT || 3002);
//app.use(express.logger());
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
//app.set('views', __dirname + '/views');
//app.set('view engine', 'html');
//app.set('view options', { layout: false });
app.use(methodOverride());
app.use(passport.initialize());
app.use(express.Router());
app.use(express.static(path.join(__dirname, '../build')));


var Account = require(__dirname + '/models/account');

passport.use(Account.createStrategy());
mongoose.connect(config.mongo_url);
require(__dirname + '/routes')(app, passport);
app.listen(app.get('port'), function() {
    console.log(("Express server listening on port " + app.get('port')));
});