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
var nsq 			  = require('nsqjs');
var strToJson 		  = require('parse-json');
var needle 			  = require('needle');

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


debug('Adding final middleware');
debug('Adding generic error middleware');
app.use(errors);

debug('Creating server');
app.listen(3000, function(){
  debug('Listening on http://localhost:3000');
});


/*
//NSQ
debug('Setting up NSQ Bridge');

var reader = new nsq.Reader('gis', 'navup', { lookupdHTTPAddresses : '127.0.0.1:4161', nsqdTCPAddresses : 'localhost:4150' });
reader.connect();

reader.on('error', function(err) {
	if (err) { return console.error(err.message); }
});

reader.on('message', function(msg) {
	//response = msg;
	//var msgStr = msg.body.toString();
	var request = strToJson(msg.body.toString());
	
	if(request.dest != 'Gis') {
		msg.finish();
		return;
	}
	
	var queryType = request.queryType;
	//console.log('Received message [%s] : %s', msg.id, queryType);
	
	switch(queryType) {
		case "addLocation": {
			addLocation(request);
			break;
		}
		case "getLocationById": {
			getLocationById(request);
			break;
		}
		case "getAllLocations": {
			getAllLocations(request);
			break;
		}
		case "getLocsByBuildingName": {
			getLocsByBuildingName(request);
			break;
		}
		case "getRoute": {
			getRoute(request)
			break;
		}
		case "getBuildings": {
			getBuildings(request);
			break;
		}
		case "removeLocation": {
			removeLocation(request);
			break;
		}
		case "updateLocation": {
			updateLocation(request);
			break;
		}
		default: {
			respond(request.src, "Unhandled request, please check if you are using an appropriate queryType");
			break;
		}
	}
	msg.finish();  
});

addLocation = function(reqJSON) {
	var locationData = reqJSON.content;
	
	needle.post('localhost:3000/location', locationData, function(err, res) {
		if (err) { return console.error(err.message); }
		
		//console.log(res.body);
		var response = res.body;
		respond(reqJSON.src, response);
	});
}

getLocationById = function(reqJSON) {
	var loc_id = reqJSON.content.loc_id;
	
	needle.get('localhost:3000/location/'+loc_id, function(err, res) {
		if (err) { return console.error(err.message); }
		
		//console.log(res.body);
		var response = res.body;
		respond(reqJSON.src, respond);
	});
}

removeLocation = function(reqJSON)
{
	var locData = reqJSON.content;
	
	needle.delete('localhost:3000/location', locData, function(err, res) {
		if (err) { return console.error(err.message); }
		
		//console.log(res.body);
		var response = res.body;
		respond(reqJSON.src, response);
	});
}

updateLocation = function(reqJSON)
{
	var locData = reqJSON.content;
	
	needle.patch('localhost:3000/location', locData, function(err, res) {
		if (err) { return console.error(err.message); }
		
		//console.log(res.body);
		var response = res.body;
		respond(reqJSON.src, response);
	});
}

getAllLocations = function(reqJSON) {
	needle.get('localhost:3000/locations', function(err, res) {
		if (err) { return console.error(err.message); }
		
		//console.log(res.body.data);
		var response = res.body.data;
		respond(reqJSON.src, response);
	});
}

getLocsByBuildingName = function(reqJSON) {
	var building = reqJSON.content.building;
	
	needle.get('localhost:3000/locations/getByBuildingName/'+building, function(err, res) {
		if (err) { return console.error(err.message); }
		
		//console.log(res.body.data);
		var response = res.body.data;
		respond(reqJSON.src, response);
	});
}

getRoute = function(reqJSON) {
	var ids = reqJSON.content;
	
	//localhost:3000/route?A=58f50ce59069c90e04ba8a25&B=58f50ce59069c90e04ba8a27
	needle.get('localhost:3000/route?A='+ids.A+'&B='+ids.B, function(err, res) {
		if (err) { return console.error(err.message); }
		
		//console.log(res.body.data);
		var response = res.body.data;
		respond(reqJSON.src, response);
	});
}

getBuildings = function(reqJSON) {
	needle.get('localhost:3000/locations/getBuildingNames', function(err, res) {
		if (err) { return console.error(err.message); }
		
		//console.log(res.body);
		var response = res.body;
		respond(reqJSON.src, response);
	});
}

//respond to query
respond = function(src, msg) {
	var writer = new nsq.Writer('127.0.0.1', 4150);
	writer.connect();
	
	writer.on('ready', function () {
		//var content = strToJson(msg);
		
		var queryType = "response";
		if(src == "Navigation") {
			queryType = "gisRecieveRoutes";
		}
		
		var response = {
			"src"  : "Gis",
			"dest" : src,
			"msgType" : "response",
			"queryType" : queryType,
			"content" : msg
		}
		
		writer.publish(src.toLowerCase(), response, function (err) {
			if(err) { return console.error(err.message); }
			
			//console.log('Message sent successfully');
			writer.close();
		});
	});
}
*/