var express = require('express');
var classpage = express();

classpage.get('/',(request, response) => {
	reponse.send(
		'<h1>Less Toxic</h1>')
});

module.exports = classpage