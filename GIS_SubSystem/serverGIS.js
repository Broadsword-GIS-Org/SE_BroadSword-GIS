var express = require('express');
var app = express();

/*
app.get('/', function (req, res){
	res.send('Hello world');
});
*/
app.use(express.static(__dirname + "/public"));

app.listen(8190);

console.log('Server running on port 8190');