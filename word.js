var fs = require("fs");

var FILE = "/usr/share/dict/words";

exports.pickRandomWord  = function() {
	var words = fs.readFileSync(FILE, "utf-8").split("\n");
	var N = words.length;
	var index = parseInt(Math.random() * N);
	var word = words[index];
	return word;
}