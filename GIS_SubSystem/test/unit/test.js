var http =  require('http');

var options = {
  host: 'localhost',
  port: 3000,
  path: '/locations'
};

http.get(options, function(res) {
  res.setEncoding('utf8');
  console.log("Got response: " + res.statusCode);

  res.on("data", function(chunk) {
    var body = chunk.toString();
    body = JSON.parse(body);
    console.log(body.data[0]);
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});
