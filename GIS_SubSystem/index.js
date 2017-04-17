var bodyParser        = require('body-parser');
var config            = require('config');
var debug             = require('debug')('broadsword-gis-api:index');
var errors            = require('./middleware/errors');
var express           = require('express');
var location          = require('./routes/locations/location');
var locations         = require('./routes/locations/locations');
var route          = require('./routes/routes/route');
//var routes         = require('./routes/routes/routes');
var mongoose          = require('mongoose');

debug('Dumping config:');
debug(config);

debug('Initialising environment variables');
var mongoHost = config.servers.mongodb.host;
var mongoDatabase = config.servers.mongodb.database;

debug('Connecting to mongo database');
mongoose.connect('mongodb://' + mongoHost + '/' + mongoDatabase);

debug('Creating application');
var app = express();

debug('Adding middleware');

debug('Adding body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));

debug('Adding routes');
debug('Adding route: location');
app.use('/location', location);
debug('Adding route: locations');
app.use('/locations', locations);
debug('Adding route: route');
app.use('/route', route);
//debug('Adding route: routes');
//app.use('/routes', routes);


debug('Adding final middleware');
debug('Adding generic error middleware');
app.use(errors);

debug('Creating server');
app.listen(3000, function(){
  debug('Listening on http://localhost:3000');
});
