//var assert = require('assert');
var location = require('../../controllers/locations/location');
var should = require('should');
var http_mocks = require('node-mocks-http');

function buildResponse() {
  return http_mocks.createResponse({eventEmitter: require('events').EventEmitter})
};

describe('Location CREATE function: ', function() {
  it('Should Create Location: ', function(done){
    var res = buildResponse();
    var req = http_mocks.createRequest({
      method: 'POST',
      url: '/',
      body: {
        name: 'test',
        description: 'testDesc',
        x_coordinate: 43,
        y_coordinate: 23,
        z_coordinate: 33
      }
    });

    location.create(req, res);
      console.log(res);
      res.statusCode.should.equal(200)
      //res._getData().should.have.property('name', 'test');
      done();
  });
});
