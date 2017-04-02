var debug   = require('debug')('broadsword-gis-api:controllers:location');
var Loc     = require('../../models/location');

debug('Initialising location controller');

debug('Exporting method: create');
module.exports.create = function(req, res, next){
  //var user = req.user;

  var location = new Loc({
    name: req.body.name,
    building: req.body.building,
    lng: req.body.lng,
    lat: req.body.lat,
    level: req.body.level,
	ground: req.body.ground
  });

  location.save(function(err, location){
    debug('Checking for errors');
    if(err) return next(err);
    if(!location) return next(new Error('Location returned empty.'));

    debug('Building JSON:API response');
    var response = {
      data: {
        type: 'locations',
        id: location.id,
        attributes: {
          name: location.name,
          building: location.building,
          lng: location.lng,
          lat: location.lat,
          level: location.level,
		  ground: location.ground
        }
      }
    };

    debug('Sending response (status: 200)');
    res.status(200).send(response);
  });
};

debug('Exporting method: Delete');
module.exports.delete = function(req, res) {
     var location = Loc.model('Loc', Loc);

     location.remove({name: req.body.name}, function(err) {
          if(!err){
               res.send(req.body.name + " has been removed\n");
          }
          else {
               res.send("could not remove " + req.body.name);
          }
     });
}

debug('Exporting method: Update');
module.exports.patch = function(req, res, next) {
     var location = Loc.model('Loc', Loc);

     location.findOneAndUpdate({name : req.body.name}, req.body, function(err, loc) {
          debug('Checking for errors');
          if(err) return next(err);
          if(!location) return next(new Error('could not find location'));

          loc.name = req.body.name || loc.name;
          loc.building = req.body.building || loc.building;
          loc.lng = req.body.lng || loc.lng;
          loc.lat = req.body.lat || loc.lat;
          loc.level = req.body.level || loc.level;
		  loc.ground = req.body.ground || loc.ground;

          loc.save(function(err, loc) {
               if(err) return next(err);
               if(!location) return next(new Error('Location returned empty.'));

               debug('Building JSON:API response');
               var response = {
                 data: {
                   type: 'locations',
                   id: loc.id,
                   attributes: {
                     name: loc.name,
                     building: loc.building,
                     lng: loc.lng,
                     lat: loc.lat,
                     level: loc.level,
					 ground: loc.ground
                   }
                 }
               };

               debug('Sending response (status: 200)');
               res.status(200).send(response);
          });
     });
}

debug('Exporting method: getById');
module.exports.getById = function(req, res, next){
  debug('Extracting location id from params');
  var id = req.params.id;

  debug('Trying to find location with id: ' + id);
  Loc.findOne({'_id': id.toString()}, function(err, location){
    debug('Checking for errors');
    if(err) return next(err);
    if(!location) return next(new Error('Location not found.'));

    debug('Building JSON:API response');
    var response = {
      data: {
        type: 'locations',
        id: location.id,
        attributes: {
          name: location.name,
          building: location.building,
          lng: location.lng,
          lat: location.lat,
          level: location.level,
		  ground: location.ground
        }
      }
    };

    debug('Sending response (status: 200)');
    res.status(200).send(response);
  });
};
