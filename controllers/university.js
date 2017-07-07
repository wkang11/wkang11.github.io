var request = require('superagent-cache')();
var APIKey = "896349ec-4ce2-49ed-be1a-b480bf0c7d49";
var Promise = require('promise');

exports.findAllByCode = function(req, response) {
	var code = req.params.code.toUpperCase();
	console.log("Code: " + code);
	var universityList =  {
		"UKC": [
					{"summonerName": "TheBlackSceptre"},
					{"summonerName": "Aloadofbarnacles"},
					{"summonerName": "im kai"},
					{"summonerName": "SomeIncorrectUsername"},
					{"summonerName": "SomeUsername1"},
					{"summonerName": "SomeUsername2"},
					{"summonerName": "SomeUsername3"},
					{"summonerName": "SomeUsername4"},
					{"summonerName": "SomeUsername5"},
					{"summonerName": "SomeUsername6"},
					{"summonerName": "SomeUsername7"},
					{"summonerName": "ORPHIUS"},
					{"summonerName": "SomeUsername9"},
					{"summonerName": "SomeUsername10"},
					{"summonerName": "SomeUsername11"},
					{"summonerName": "SomeUsername12"},
					{"summonerName": "Being"},
					{"summonerName": "SomeUsername14"},
					{"summonerName": "SomeUsername15"},
					{"summonerName": "SomeUsername16"},
					{"summonerName": "SomeUsername17"},
					{"summonerName": "SomeUsername18"},
					{"summonerName": "TheBlackSpectre"}
		]
	}
	console.log("Total JSON from universityList: ");
	console.log(universityList);
	var summonerNameArray = universityList[code];

	var finalUniversityArray = [];
	var IDsToSendToRanked = [];
	var IDsToSendToRankedCounted = [];
	var summonersToSendToBasic = [];

	var counterIds = 0;

	if (universityList.length == 0 || summonerNameArray == 0) {
		return response.sendStatus(400);
	}
 
	var promiseOfIds = new Promise(function(resolve, reject) {
		console.log(summonerNameArray.length/10);

		var lengthOfFirstArray = Math.ceil(summonerNameArray.length/10);
		console.log(lengthOfFirstArray);
 		for (i = 0; i < summonerNameArray.length; i++) {
			console.log("Count: " + i);
			summonersToSendToBasic.push(summonerNameArray[i].summonerName);

			// Every 10 we can send the basic request to RIOT's API 
			if (i % 9 == 0 && i != 0 || i == summonerNameArray.length - 1) {
				console.log("Sending these summoners to basic API call: " + summonersToSendToBasic);
				var URL = "https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/" 
					+ summonersToSendToBasic 
					+ "?api_key=" 
					+ APIKey;

				request
				.get(URL)
				.end(function(err, res) {
					if (res.statusCode != 404 || res.statusCode != 400) {
						console.log(res.body);

						//TODO ~~ Fix this to make it more efficient
						console.log("IDs:");
						for (var username in res.body) {
							console.log(res.body[username].id);
							IDsToSendToRanked.push(res.body[username].id);
						}
					} else {
						console.log(err);
					}
					counterIds++;
					//wait(counterIds, lengthOfFirstArray)
					if(counterIds == lengthOfFirstArray) {
						console.log("Finishing this set of calls, moving on to ranked");
						resolve(IDsToSendToRanked);
					} else {
						console.log("Not sending yet");
					}
				});
				// Clear the Array to start the whole process over again
				summonersToSendToBasic = [];
			}
		}
 	});

	// Here we are assuming that all the IDs are working from the previous call.
	// We will make the university call with all the working IDs from the previous call
	// Only when the list changes will our cache be nullified. 


	//~~ Here we are checking if the call can go through without cutting it up
	promiseOfIds.then(function(ids) {
		if (ids.length <= 40) {
		// Here we send the call to Riot's API
		console.log("The list was below 40");
		console.log("Sending these summoners to ranked API call: " + IDsToSendToRankedCounted);
			var URL = "https://euw.api.pvp.net/api/lol/euw/v2.5/league/by-summoner/" 
				+ ids 
				+ "/entry?api_key=" 
				+ APIKey;
			console.log(URL);

			request
			.get(URL)
			.end(function(err, res) {
				if (res.statusCode != 404 || res.statusCode != 400) {
					console.log(res.body);
					console.log(JSON.stringify(res.body));

					return response.send(JSON.stringify(res.body));
				}
			});
		} else {
			console.log("The list was over 40");
			var lengthOfRankedArray = Math.ceil(ids.length/40);
			var counter = 0;
			for (i = 0; i < ids.length; i++) {
				//TODO - Work out how to nest these, should be fine but what is actually happening? ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
				IDsToSendToRankedCounted.push(ids[i]);

				if (i % 39 == 0 && i != 0 || i == ids.length - 1) {
					// Here we add them to IDsToSendToRankedCounted
					console.log("Sending these summoners to ranked API call: " + IDsToSendToRankedCounted);
					var URL = "https://euw.api.pvp.net/api/lol/euw/v2.5/league/by-summoner/" 
						+ IDsToSendToRankedCounted 
						+ "/entry?api_key=" 
						+ APIKey;
					console.log(URL);

					request
					.get(URL)
					.end(function(err, res) {
						if (res.statusCode != 404 || res.statusCode != 400) {
							console.log(res.body);
							finalUniversityArray.push(res.body);
						} else {
							console.log(err);
						}
						counter++;
						console.log(counter);
						if(counter == lengthOfRankedArray) {
							console.log("Finishing this set of calls, and then returning array");
							console.log("FINAL ARRAY: ");
							console.log(finalUniversityArray);
							return response.send(JSON.stringify(finalUniversityArray));
						} else {
							console.log("Not sending yet");
						}
					});

					IDsToSendToRankedCounted = [];
				}
				
			}	
		}
	});
};