var _       = require('lodash');
var debug   = require('debug')('broadsword-gis-api:controllers:route');
var Loc     = require('../../models/location');
const Astar = require('../../helpers/astar');

debug('Initialising location controller');

debug('Exporting method: get');
module.exports.get = function(req, res, next){

  // const n1 = Astar.Node('58e3bd7eefee5b219a565e60', -25.755393, 28.233289);
  // const n2 = Astar.Node('58e3beddefee5b219a565e64', -25.755046, 28.229466);

  // Current DB -- Will change with merge
  const n1 = Astar.Node('58e3bd7eefee5b219a565e60', 28.233289, -25.755393);
  const n2 = Astar.Node('58e3beddefee5b219a565e64', 28.229466, -25.755046);

  var astar = new Astar(findNeighbours);
  var idArray = [];
  astar.search (n1, n2, function (err, result) {
    result.forEach(function (doc) {
      //idArray.push(doc.id);
      console.log(doc.lng + ', ' + doc.lat);
      //console.log(doc.lat + ', ' + doc.lng);
    });
  });




};

const findNeighbours = function (node, next) {
    Loc.find(
        function (err, docs) {
            if (err) return next([]);
            // console.log("entering find");
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

// module.exports.get = function(req, res, next){
//   debug('Extracting location ids from params');
//   var a = req.query.A;
//   var b = req.query.B;
//   var locationA;
//   getFirst(a, function(err, location){
//     if (err) {
//       console.log(err);
//     }
//     locationA = location;
//     console.log(locationA);
//   });
//   // var locationB;
//   //
// };
//
// function getFirst(a, callback){
//   debug('Trying to find location with id: ' + a);
//   Loc.findOne({'_id': a.toString()}, function(err, location){
//     debug('Checking for errors');
//     if(err) return next(err);
//     if(!location) return next(new Error('Location not found.'));
//
//     debug('Building first location');
//     var loc = {
//       data: {
//         type: 'locations',
//         id: location.id,
//         attributes: {
//           name: location.name,
//           building: location.building,
//           lng: location.lng,
//           lat: location.lat,
//           level: location.level,
//           ground: location.ground
//         }
//       }
//     };
//
//     callback(null, loc);
//   });
// };
