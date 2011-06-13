var 	mustache = require("./public/lib/mustache"),
		renderer = require("./public/lib/render"),
		http = require('http'),
		express = require('express');

var port = 8000;
var lastTweets = null;

var app = express.createServer();
app.configure(function() {
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
}).listen(port);
console.log("listening on " + port);

app.get('/', function(req, res){
   res.send(renderer.renderTweets(mustache, JSON.parse(lastTweets), 'server'));
});

app.get('/lastTweets.json', function(req, res){
   res.send(lastTweets);
});

/*
 * Regularly refresh tweets
 */

const host = "api.twitter.com"; //"search.twitter.com";
const path = "/1/statuses/public_timeline.json"; //"/search.json?q=valtech";

var twitterClient = http.createClient(80, host);
var getTweets = function() {
	var request = twitterClient.request("GET", path, {"host": host});
	console.log(new Date(), "Request to", host, path);
	request.addListener("response", function(response) {
		console.log(" ", new Date(), "Response from", host, path);
		var body = "";
		response.addListener("data", function(data) {
			body += data;
		});
		response.addListener("end", function() {
			console.log(" ", new Date(), "End response from", host, path);
			lastTweets = body;
		});
	});
	request.end();
	setTimeout(getTweets, 5000);
}
getTweets();
