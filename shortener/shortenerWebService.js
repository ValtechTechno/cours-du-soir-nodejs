var sys = require("sys"),  
    http = require("http"),
    md5 = require("./jshash-2.2/md5_export"),
    shortener = require("./shortener"),
    express = require('express');

var port = 8000;

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
