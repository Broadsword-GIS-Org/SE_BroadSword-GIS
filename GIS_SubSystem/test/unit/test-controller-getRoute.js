//var assert = require('assert');
//var locations = require('../../controllers/locations/locations');
//var http_mocks = require('node-mocks-http');
var should = require('should');
var needle 		= require('needle');

describe('get Route function: ', function() {
  it('Should retreive route from IT 2-27 - EMB Entrance: ', function(done)
  {
	var routeStartEnd = {
		"locationA" : {
			"location_type" : "Venue",
			"room" : "2-27",
			"building" : "IT",
			"lng" : -25.755990,
			"lat" : 28.233137,
			"level" : 2,
			"ground" : 2
		},
		"locationB" : {
			"location_type" : "Entrance",
			"room" : "N\/A",
			"building" : "EMB",
			"lng" : -25.755391,
			"lat" : 28.233297,
			"level" : 2,
			"ground" : 2
		}
	};
	
	needle.post('localhost:3000/locations/getRoute', routeStartEnd, function(err, res)
	{
		if (err) { return console.error(err.message); }
		
		res.statusCode.should.equal(200)
		res.body.should.have.property('data');
		
		// to display body content
		//for(var i=0; i < res.body.data.length; i++) console.log(res.body.data[i]);
		
		done();
	});
	
  });
});
