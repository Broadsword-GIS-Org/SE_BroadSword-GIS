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
          name: location.name,
          description: location.description,
          x_coordinate: location.x_coordinate,
          y_coordinate: location.y_coordinate,
          z_coordinate: location.z_coordinate
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
