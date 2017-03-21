var debug       = require('debug')('broadsword-gis-api:models:location');
var mongoose    = require('mongoose');

debug('Initialising model: Location');

debug('Defining schema: Location');
var Loc = new mongoose.Schema({
  name: String,
  description: String,
  x_coordinate: String,
  y_coordinate: String,
  z_coordinate: String
});

debug('Location model exported');
module.exports = mongoose.model('Loc', Loc);
