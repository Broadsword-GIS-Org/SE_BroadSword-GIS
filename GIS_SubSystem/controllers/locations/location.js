var debug   = require('debug')('broadsword-gis-api:controllers:location');
var Loc     = require('../../models/location');

debug('Initialising location controller');

debug('Exporting method: create');
module.exports.create = function(req, res, next){
  //var user = req.user;

  var location = new Loc({
    name: req.body.name,
    description: req.body.description,
    x_coordinate: req.body.x_coordinate,
    y_coordinate: req.body.y_coordinate,
    z_coordinate: req.body.z_coordinate
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
          description: location.description,
          x_coordinate: location.x_coordinate,
          y_coordinate: location.y_coordinate,
          z_coordinate: location.z_coordinate
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
          loc.description = req.body.description || loc.description;
          loc.x_coordinate = req.body.x_coordinate || loc.x_coordinate;
          loc.y_coordinate = req.body.y_coordinate || loc.y_coordinate;
          loc.z_coordinate = req.body.z_coordinate || loc.z_coordinate;

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
                     description: loc.description,
                     x_coordinate: loc.x_coordinate,
                     y_coordinate: loc.y_coordinate,
                     z_coordinate: loc.z_coordinate
                   }
                 }
               };

               debug('Sending response (status: 200)');
               res.status(200).send(response);
          });
     });
}

debug('Exporting method: getByName');
module.exports.getByName = function(req,res, next){
	debug('Extracting location name from params');
	var _name = req.params.name;
	
	debug('Trying to find location with name: ' + _name);
	if(err) return next(err);
    if(!location) return next(new Error('Location not found.'));
	
	    debug('Building JSON:API response');
    var response = {
      data: {
        type: 'locations',
        _name: location.name,
        attributes: {
          name: location.name,
          description: location.description,
          x_coordinate: location.x_coordinate,
          y_coordinate: location.y_coordinate,
          z_coordinate: location.z_coordinate
        }
      }
    };
  
	debug('Sending response (status: 200)');
    res.status(200).send(response);
  });
};




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
          description: location.description,
          x_coordinate: location.x_coordinate,
          y_coordinate: location.y_coordinate,
          z_coordinate: location.z_coordinate
        }
      }
    };

    debug('Sending response (status: 200)');
    res.status(200).send(response);
  });
};
