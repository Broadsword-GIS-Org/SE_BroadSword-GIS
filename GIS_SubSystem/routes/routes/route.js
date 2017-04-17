var debug       = require('debug')('broadsword-gis-api:routes:route');
var express     = require('express');
var route    = require('../../controllers/routes/route');

debug('Creating route router');
var router = express.Router();

debug('Adding route route: GET / (Description: where route is retrieved)');
router.get('/', route.get); // => GET to /:A&:B

debug('Route router exported');
module.exports = router;
