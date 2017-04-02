var debug       = require('debug')('broadsword-gis-api:models:location');
var mongoose    = require('mongoose');

debug('Initialising model: Location');

debug('Defining schema: Location');
var Loc = new mongoose.Schema({
  name: String,
  building: String,
  lng: Number,
  lat: Number,
  level: Number,
  ground: Number
});

debug('Location model exported');
module.exports = mongoose.model('Loc', Loc);
