var md5 = require("./jshash-2.2/md5_export"),
    shortener = require("./shortener-lib"),
    express = require('express');

var shortUrlsCache = {};

var port = 8000;

var app = express.createServer();
app.configure(function() {
	app.use(app.router);
	app.use(express.static(__dirname));
}).listen(port);

console.log("listening on " + port);

app.get('/shorten/:url', function(req, res){
	var longUrl = req.params.url;
	var shortUrl = shortener.shorten(longUrl);
	shortUrlsCache[shortUrl] = longUrl;
	console.log("Long url [" + longUrl + "] shortened to [" + shortUrl + "]");
   res.send(shortUrl);
});

app.get('/s/:shortUrl', function(req, res){
	var shortUrl = req.params.shortUrl;

	var longUrl = shortUrlsCache[shortUrl];
	if (longUrl) {
		console.log("Short url [" + shortUrl + "] redirects to [" + longUrl + "]");
	   	res.redirect(longUrl);
	} else {
		console.log("Short url [" + shortUrl + "] not found in cache.");
		res.send('Short url not found', 404);
	}
});

app.get('/', function(req, res){
	res.sendfile(__dirname + '/shortener.html');
});
