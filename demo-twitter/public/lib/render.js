var serverTemplate = "<html>" +
		"<head>" +
			"<link href='css/styles.css' rel='stylesheet' />" +
  		"</head>" +
		"<body>" +
			"<h1 class='fromServer'>Initial tweets (server side)</h1>" +
			"<dialog class='fromServer'>{{#results}}<dt>{{from_user}}{{#user}}{{screen_name}}{{/user}}</dt><dd>{{text}}</dd>{{/results}}</dialog>" +
			"<h1 class='fromClient'>Tweets in real-time (client side)</h1>" +
			"<h2 class='fromClient'></h2>" +
			"<dialog class='fromClient'></dialog>" +
			"<script src='lib/jquery/jquery-1.6.1.js'></script>" +
			"<script src='lib/client.js'></script>" +
			"<script src='lib/mustache.js'></script>" +
			"<script src='lib/render.js'></script>" +
		"</body></html>";

var clientTemplate = "{{#results}}<dt>{{from_user}}{{#user}}{{screen_name}}{{/user}}<dd>{{text}}{{/results}}";

var renderTweets = function(mustache, lastTweets, type) {
	var template = ('server' === type) ? serverTemplate : clientTemplate;
	if (lastTweets['results'] == undefined) lastTweets.results = lastTweets;
	return mustache.to_html(template, lastTweets);
}

exports.renderTweets = renderTweets;
