var _       = require('lodash');
var debug   = require('debug')('broadsword-gis-api:controllers:locations');
var Loc     = require('../../models/location');

debug('Initialising locations controller');

debug('Exporting method: get');
module.exports.get = function(req, res, next){
  debug('Trying to find locations');
  Loc.find(function(err, locations){
    debug('Checking for errors');
    if(err) return next(err);
    if(!locations) return next(new Error('Locations not found.'));

    debug('Building JSON:API response');
    var data = [];

    _.forEach(locations, function(location){
      var _data = {
        type: 'locations',
        id: location.id,
        attributes: {
          location_type: location.location_type,
		  room: location.room,
          building: location.building,
          lat: location.lat,
          lng: location.lng,
          level: location.level,
		  ground: location.ground
        }
      };

      data.push(_data);
    });

    var response = {
      data: data
    };

    debug('Sending response (status: 200)');
    res.status(200).send(response);
  });
};

debug('Exporting method: getByBuildingName');
module.exports.getByBuildingName = function(req, res, next) {
	debug('Extracting building name from params');
	var building = req.params.building;
	
	debug('Trying to find locations with building: ' + building);
	Loc.find({'building': building.toString()}, function(err, locations) {
		debug('Checking for errors');
		if(err) return next(err);
		if(!locations) return next(new Error('Location not found.'));
		
		debug('Building JSON:API response');
		var data = [];
		
		_.forEach(locations, function(location) {
			var _data = {
				type: 'locations',
				id: location.id,
				attributes: {
					location_type: location.location_type,
					room: location.room,
					building: location.building,
					lat: location.lat,
					lng: location.lng,
					level: location.level,
					ground: location.ground
				}
			};
			data.push(_data);
		});
		
		var response = {
			data: data
		};
		
		debug('Sending response (status: 200)');
		res.status(200).send(response);
	});
};

debug('Exporting method: getRoute');
module.exports.getRoute = function(req, res, next)
{
	//debug('Extracting building name from Post request fields');
	//var buildingA = req.body.buildingA;
	//var roomA = req.body.roomA;
	//var buildingB = req.body.buildingB;
	//var roomB = req.body.roomB;
	
	debug('Building JSON:API response');
	var data = [];
	
	var _data = {
		type: 'locations',
		id: "1",
		attributes: {
			location_type: "Venue",
			room: "2-27",
			building: "IT",
			lat: -25.755990,
			lng: 28.233137,
			level: 2,
			ground: 2
		}
	};
	data.push(_data);
	_data = "";
	
	_data = {
		type: 'locations',
		id: "2",
		attributes: {
			location_type: "Entrance",
			room: "N\/A",
			building: "IT",
			lat: -25.755869,
			lng: 28.233144,
			level: 2,
			ground: 2
		}
	};
	data.push(_data);
	_data = "";
	
	_data = {
		type: 'locations',
		id: "3",
		attributes: {
			location_type: "Point",
			room: "N\/A",
			building: "N\/A",
			lat: -25.755836,
			lng: 28.233162,
			level: 0,
			ground: 0
		}
	};
	data.push(_data);
	_data = "";
	
	_data = {
		type: 'locations',
		id: "4",
		attributes: {
			location_type: "Point",
			room: "N\/A",
			building: "N\/A",
			lat: -25.755811,
			lng: 28.233266,
			level: 0,
			ground: 0
		}
	};
	data.push(_data);
	_data = "";
	
	_data = {
		type: 'locations',
		id: "5",
		attributes: {
			location_type: "Point",
			room: "N\/A",
			building: "N\/A",
			lat: -25.755712,
			lng: 28.233275,
			level: 0,
			ground: 0
		}
	};
	data.push(_data);
	_data = "";
	
	_data = {
		type: 'locations',
		id: "6",
		attributes: {
			location_type: "Point",
			room: "N\/A",
			building: "N\/A",
			lat: -25.755623,
			lng: 28.233404,
			level: 0,
			ground: 0
		}
	};
	data.push(_data);
	_data = "";
	
	_data = {
		type: 'locations',
		id: "7",
		attributes: {
			location_type: "Point",
			room: "N\/A",
			building: "N\/A",
			lat: -25.755567,
			lng: 28.233193,
			level: 0,
			ground: 0
		}
	};
	data.push(_data);
	_data = "";
	
	_data = {
		type: 'locations',
		id: "8",
		attributes: {
			location_type: "Point",
			room: "N\/A",
			building: "N\/A",
			lat: -25.755528,
			lng: 28.233166,
			level: 0,
			ground: 0
		}
	};
	data.push(_data);
	_data = "";
	
	_data = {
		type: 'locations',
		id: "9",
		attributes: {
			location_type: "Point",
			room: "N\/A",
			building: "N\/A",
			lat: -25.755358,
			lng: 28.233218,
			level: 0,
			ground: 0
		}
	};
	data.push(_data);
	_data = "";
	
	_data = {
		type: 'locations',
		id: "10",
		attributes: {
			location_type: "Entrance",
			room: "N\/A",
			building: "EMB",
			lat: -25.755391,
			lng: 28.233297,
			level: 2,
			ground: 2
		}
	};
	data.push(_data);
	_data = "";
	
	
	var response = {
		data: data
	};
	
	debug('Sending response (status: 200)');
	res.status(200).send(response);
};

debug('Exporting method: getBuildingNames');
module.exports.getBuildingNames = function(req, res, next) {
    debug('Trying to find building names');
    Loc.distinct("building" , function(err, buildings) {
   		debug("Checking for errors");
		if(err) res.send('No buildings found');
		if(!buildings) res.send('No buildings found');

		debug('Building JSON:API response');
		var data = [];

   		var response = {
   			data: buildings
   		};

  		debug('Sending response (status:200)');
   		res.status(200).send(response);
	});
};
