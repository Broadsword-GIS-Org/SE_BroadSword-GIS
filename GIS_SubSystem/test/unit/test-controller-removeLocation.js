//var assert = require('assert');
//var locations = require('../../controllers/locations/locations');
//var http_mocks = require('node-mocks-http');
var should = require('should');
var needle 		= require('needle');

describe('Location DELETE function: ', function() {
  it('Should remove specified Locations: ', function(done)
  {
	var locationData = {
		"room" : "testRoom",
		"building" : "testBuilding"
	};
	
	needle.delete('localhost:3000/location', locationData, function(err, res)
	{
		if (err) { done(); return console.error(err.message); }
		
		res.statusCode.should.equal(200)
		//res.body.should.have.property('data');
		
		// to display body content
		//console.log(res.body);
		
		done();
	});
	
  });
});
