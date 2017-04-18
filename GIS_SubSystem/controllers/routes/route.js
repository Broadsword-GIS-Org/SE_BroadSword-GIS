var _       = require('lodash');
var debug   = require('debug')('broadsword-gis-api:controllers:route');
var Loc     = require('../../models/location');
const Astar = require('../../helpers/astar');

debug('Initialising location controller');

debug('Exporting method: get');
module.exports.get = function(req, res, next){
  debug('Extracting location ids from params');

  getFields(req.query, function(locations) {
    var locationA = locations[0];
    var locationB = locations[1];
    const n1 = Astar.Node(locationA.id, locationA.attributes.lat, locationA.attributes.lng);
    const n2 = Astar.Node(locationB.id, locationB.attributes.lat, locationB.attributes.lng);

    var astar = new Astar(findNeighbours);
    var idArray = [];
    astar.search (n1, n2, function (err, result) {
      result.forEach(function (doc) {
        idArray.push(doc.id);
      });
      getResults(idArray, function(results) {
        res.status(200).send(results);
      })
    });
  });
};

const findNeighbours = function (node, next) {
    Loc.find(
        function (err, docs) {
            if (err) return next([]);
            var result = [];
            var noResults = true;
            var distance = 150;
          //  while (noResults == true) {
              _.forEach(docs, function (doc){
                  var secondNode = Astar.Node(doc.id, doc.lat, doc.lng);

                  if (node.distanceTo(secondNode) < distance && secondNode.id != node.id) {
                    // console.log(secondNode.id + ': ' + node.distanceTo(secondNode))
                    result.push(secondNode);
                  }
              });

            //   if (result.length == 0)
            //   {
            //     distance += 100;
            //   }
            //   else {
            //     noResults = false;
            //   }
            // }
            next(result);
        }
    );
}

const getFields = function (params, next) {
  debug('Trying to find locations');
  Loc.find(function(err, locations){
    debug('Checking for errors');
    if (err) next(err);
    debug('Building JSON:API response');
    var data = [];

    _.forEach(locations, function(location){
      if (location.id == params.A || location.id == params.B){
        var _data = {
          id: location.id,
          type: 'locations',
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
      }
    });

    next(data);
  })
};

const getResults = function (ids, next) {
  debug('Trying to find locations');
  Loc.find(function(err, locations){
    debug('Checking for errors');
    if (err) next(err);
    debug('Building JSON:API response');
    var data = [];
    _.forEach(ids, function(id) {
      _.forEach(locations, function(location){
        if (id == location.id) {
          var _data = {
            id: location.id,
            type: 'locations',
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
        }
      });
    });

    var response = {
		  data: data
		};

    next(response);
  })
};
