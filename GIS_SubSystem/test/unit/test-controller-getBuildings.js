//var assert = require('assert');
//var locations = require('../../controllers/locations/locations');
//var http_mocks = require('node-mocks-http');
var should = require('should');
var needle 		= require('needle');

describe('Retrieve building names function: ', function() {
  it('Should retreive a list of all available buildings: ', function(done)
  {
	needle.get('localhost:3000/locations/getBuildingNames', function(err, res)
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
