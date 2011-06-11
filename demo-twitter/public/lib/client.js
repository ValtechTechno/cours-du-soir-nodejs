exports = {};

$(window).load(function() {
	var dialog = $('dialog.fromClient');
	var h2 = $('h2.fromClient');
	var renderLastTweets = function() {
		$.getJSON('/lastTweets.json', function(data) {
			var htmlFragment = exports.renderTweets(Mustache, data, 'client');
			dialog.fadeOut().html(htmlFragment).fadeIn();
			h2.fadeOut().html('Last refresh: ' + new Date()).fadeIn();
		});
		setTimeout(renderLastTweets, 10000);
	};
	setTimeout(renderLastTweets, 10000);
});

