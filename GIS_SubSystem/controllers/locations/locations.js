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
          lng: location.lng,
          lat: location.lat,
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
					lng: location.lng,
					lat: location.lat,
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

