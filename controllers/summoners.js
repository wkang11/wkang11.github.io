var request = require('superagent-cache')();
var APIKey = "40876847-d0d6-43d0-9718-16ac33582f61";

exports.findRankedByName = function (req, response) {
	var ID = req.params.ID;
	console.log("Retrieving ranked stats for: " + ID);
	request.get("https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/" + ID + "/entry?api_key=" + APIKey)
		.end(function (err, res) {
			console.log(err);
			if (res.statusCode == 404) {
				return response.sendStatus(res.statusCode);
			} else if (res.statusCode < 400) {
				return response.send(JSON.stringify(res.body));
			} else {
				return response.sendStatus(res.statusCode);
			}
		});
};

exports.findBasicByName = function (req, response) {
	var username = req.params.name;
	console.log("Retrieving basic stats for: " + username);
	request
		.get("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + username + "?api_key=" + APIKey)
		.end(function (err, res) {
			console.log(err);
			if (res == undefined) {
				return response.sendStatus(500);
			} else if (res.statusCode == 404) {
				return response.sendStatus(404);
			} else if (res.statusCode > 400) {
				return response.sendStatus(500);
			} else {
				return response.send(JSON.stringify(res.body));
			}
		});
};

exports.add = function () { };
exports.update = function () { };
exports.delete = function () { };