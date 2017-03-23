var debug       = require('debug')('broadsword-gis-api:routes:location');
var express     = require('express');
var location    = require('../../controllers/locations/location');

debug('Creating location router');
var router = express.Router();

debug('Adding location route: PUSH / (Description: where location is created)');
router.post('/', location.create); // => PUSH to /create creates a new location.

debug('Adding location route: GET / (Description: where location is retrieved via id)');
router.get('/:id', location.getById); // => GET to /:id

debug('Adding location route: GET / (Description: where location is retrieved via name)');
router.get('/:name', location.getByName); // => GET to /:name

debug('Location router exported');
module.exports = router;
