var md5 = require("./jshash-2.2/md5_export"),
    shortener = require("./shortener-lib"),
    express = require('express');

var port = 80;

var app = express.createServer();
app.configure(function() {
	app.use(app.router);
	app.use(express.static(__dirname));
}).listen(port);
console.log("listening on " + port);

app.get('/shorten/:url', function(req, res){
	var urlToShorten = req.params.url;
	console.log("urlToShorten: " + urlToShorten);
	var shortened = shortener.shorten(urlToShorten);
   res.send(shortened);
});

app.get('/', function(req, res){
	res.sendfile(__dirname + '/shortener.html');
});


