var debug       = require('debug')('broadsword-gis-api:models:location');
var mongoose    = require('mongoose');

debug('Initialising model: Location');

debug('Defining schema: Location');

var Loc = new mongoose.Schema({
  location_type: {
  		 type: String, 
  		 required: true
  },

  room: {
  	 	 type: String,
  	 	 required: true
  },

  building: {
  		 type: String,
  		 required: true
  }, 
  
  lat: {
  		 type: Number, 
  		 required: true
  },
  
  lng: {
  		 type: Number,
  		 required: true
  },

  level: {
  		 type: Number, 
  		 required: true
  },

  ground: {
  		 type: Number,
  		 required: true
  }
});


debug('Location model exported');
module.exports = mongoose.model('Loc', Loc);
