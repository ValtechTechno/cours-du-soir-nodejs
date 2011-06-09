var sys = require("sys"),  
    http = require("http"),
    md5 = require("./jshash-2.2/md5_export"),
    shortener = require("./shortener");



http.createServer(function(request, response) {  

	var url = request.url;
	var param = require('url').parse(url).query;
	console.log("param: " + param);
	if (param){
		var index = param.indexOf('=');
		var urlToShorten = param.substr(index + 1, param.length);
		console.log("urlToShorten: " + urlToShorten);
		var shortened = shortener.shorten(urlToShorten);
		console.log("url shorten: " + shortened);

		response.writeHead(200, {"Content-Type": "text/plain"});  
	    	//response.write(shortened);
response.write("{url: "+ shortened +"}");    
	    	response.end();

	}else{
		console.log("no url to shorten !");
		response.writeHead(200, {"Content-Type": "text/plain"});  
	    	response.write("Hello " + "shortener");  
	    	response.end("Hello " + "shortener");

	}


	

    	
}).listen(8080);  
  


