//var assert = require('assert');
//var locations = require('../../controllers/locations/locations');
//var http_mocks = require('node-mocks-http');
var should = require('should');
var needle 		= require('needle');

describe('Location READ function: ', function() {
  it('Should retreive all Locations: ', function(done)
  {
	needle.get('localhost:3000/locations', function(err, res)
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
