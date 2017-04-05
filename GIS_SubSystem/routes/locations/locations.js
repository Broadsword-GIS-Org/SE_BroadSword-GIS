var debug       = require('debug')('broadsword-gis-api:routes:locations');
var express     = require('express');
var locations   = require('../../controllers/locations/locations');

debug('Creating locations router');
var router = express.Router();

debug('Adding locations route: GET / (Description: where locations are retrieved)');
router.get('/', locations.get); // => GET to / lists all locations

debug('Adding locations route: GET /getByBuildingName/:building (Description: where locations in a specified building are retrieved)');
router.get('/getByBuildingName/:building', locations.getByBuildingName); // => GET to /:building lists all locations at specified building

debug('Adding location route: GET /getBuildingNames/:building (Description: A distinct list of all building names is retrieved)');
router.get('/getBuildingNames', locations.getBuildingNames); //=> Get to / lists all building names

debug('Locations router exported');
module.exports = router;
