var md5lib = require("./jshash-2.2/md5_export");

var table = new Array('$',',','-','.','0','1','2','3','4','5','6','7','8','9',
':',';','<','=','>','?','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X',
'Y','Z','[',']','_','`','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w',
'x','y','z');

var shorten = function(url){
	var md5 = md5lib.hex_md5(url);
	var shortened = '';
	for (var i = 0; i < 4; i++){
		var hex = md5.substring(i*8, i*8 + 8);
		var intt = parseInt('0x' +hex);
		var charr = table[intt % table.length];
		shortened += charr;
	}
	return shortened;
};

exports.shorten = shorten;
