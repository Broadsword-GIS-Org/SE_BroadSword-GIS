var debug       = require('debug')('broadsword-gis-api:routes:location');
var express     = require('express');
var location    = require('../../controllers/locations/location');

debug('Creating location router');
var router = express.Router();

debug('Adding location route: PUSH / (Description: where location is created)');
router.post('/', location.create); // => PUSH to /create creates a new location.

debug('Adding location route: GET / (Description: where location is retrieved via id)');
router.get('/:id', location.getById); // => GET to /:id

debug('Deleting location route: DELETE / (Description: where location is deleted)');
router.delete('/', location.delete); // => DELETE to /delete a location.

debug('Updating location route: PATCH / (Description: where location is updated)');
router.patch('/', location.patch); // => PATCH to /update a location

debug('Location router exported');
module.exports = router;
