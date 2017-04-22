//var assert = require('assert');
//var locations = require('../../controllers/locations/locations');
//var http_mocks = require('node-mocks-http');
var should = require('should');
var needle 		= require('needle');

describe('Location UPDATE function: ', function() {
  it('Should update specified Location: ', function(done)
  {
	var locationData = {
		"room" : "testRoom2",
		"building" : "testBuilding2",
		"lat" : -23.762492,
		"lng" : 28.293438,
		"level" : 2,
		"ground" : 2
	};
	
	needle.patch('localhost:3000/location', locationData, function(err, res)
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
