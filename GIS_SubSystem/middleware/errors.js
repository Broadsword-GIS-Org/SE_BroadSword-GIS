var debug             = require('debug')('broadsword-gis-api:middleware:errors');
var express           = require('express');

debug('Initialising application');
var app = express();

debug('Initialising errors custom middleware');

debug('Defining error handler');
module.exports = function(err, req, res, next){
  debug(err);

  var response = {
    errors: [
      {
        status: 404, // This needs to be retrieved from Error Type, custom class?
        title: 'Internal server error.',
        detail: 'Please consult the console.'
      }
    ]
  };

  if(err){
    response = {
      errors: [
        {
          status: 404, // This needs to be retrieved from Error Type, custom class?
          title: 'An error occurred.',
          detail: 'Fields cannot be emoty'
        }
      ]
    }
  };

  res.status(404).send(response);
};
