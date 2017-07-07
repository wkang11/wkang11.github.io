    angular.module('main', [])
    .controller('controller-div', function($scope, $http) {
        $scope.doesSummonerExist = true;         

        var pathArray = window.location.pathname.split('/');
        var levelLocation = pathArray[2];

        // This is the basic API call
        // This is called for very summoner, and it has a cache of 15mins
        $http({
            method: 'GET',
            url: "/api/summoner/basic/" + levelLocation
        }).then(function succesCallback(data) {
            console.log("Data received from basic call: ");
            console.log(data.data);
            $scope.doesSummonerExist = true;         

            for (var key in data.data) {
                $scope.summoner = {
                    "id": data.data[key].id, 
                    "name": data.data[key].name,
                    "iconId": data.data[key].profileIconId,
                    "revData": data.data[key].revisionDate,
                    "summonerLevel": data.data[key].summonerLevel
                };
            };


            // Here we can do another call for champion masteries
            // As we know the player exists so no wasted calls

            // $http({
            //     method: 'GET',
            //     url: '/api/summoner/mastery/' + data.data[key].id
            // }).then(function success)



            // This is the ranked call
            // This is only called in the event of the summoner existing
            // i.e first call succeeding. 

            $http({
                method: 'GET',
                url: "/api/summoner/ranked/" + data.data[key].id
            }).then(function succesCallback(rankedData) {
                console.log("Data received from ranked call: \n");
                console.log(rankedData.data[data.data[key].id]);
                // Sets the boolean ranked to true;
                $scope.doesRankingExist = true;

                // We're assuming there are rankings for this person
                if (rankedData.data[data.data[key].id][0].queue == "RANKED_SOLO_5x5") {
                    if (rankedData.data[data.data[key].id][0].entries[0].miniSeries != undefined) {
                        $scope.soloqDoesMiniEntryExist = true;
                        $scope.soloqrankingminiseries = {
                            "target": rankedData.data[data.data[key].id][0].entries[0].miniSeries.target,
                            "wins": rankedData.data[data.data[key].id][0].entries[0].miniSeries.wins,
                            "losses": rankedData.data[data.data[key].id][0].entries[0].miniSeries.losses,
                            "progress": rankedData.data[data.data[key].id][0].entries[0].miniSeries.progress
                        }
                    }
                    $scope.rankingsoloq = {
                        "name": rankedData.data[data.data[key].id][0].name,
                        "tier": rankedData.data[data.data[key].id][0].tier,
                        "queue": rankedData.data[data.data[key].id][0].queue,
                        "division": rankedData.data[data.data[key].id][0].entries[0].division,
                        "LP": rankedData.data[data.data[key].id][0].entries[0].leaguePoints
                    };
                }

            }, function errorCallback(data) {
                $scope.rankingsoloq = {
                    "ranking": "Unranked"
                };
                if (data.status == 404) {
                    console.log("ERROR CODE: " + data.status + ". No ranked stats for given ID");
                    // Sets the boolean ranked to false
                    $scope.doesRankingExist = false;
                } else if (data.status == 500) {
                    console.log("ERROR CODE: " + data.status + ". Internal server error");
                    window.location = "/error";
                } else if (data.status > 400) {
                    console.log("ERROR CODE: " + data.status + ". Something different went wrong");
                    window.location = "/error";
                } 
            });


        }, function errorCallback(data) {
            if (data.status == 404){
                // Sets the boolean summoner to false
                $scope.doesSummonerExist = false;
            } else if (data.status == 500) {
                console.log("ERROR CODE: " + data.status + ". Internal server error");
                window.location = "/error";
            }
        });
    })

    .controller('university-controller-div', function($scope, $http) {
        var pathArray = window.location.pathname.split('/');
        var universityCode = pathArray[2];
        $scope.universityCode = universityCode;
        console.log(universityCode);
        $http({
            method: 'GET',
            url: "/api/university/code/" + universityCode
        }).then(function succesCallback(data) {
            $scope.doesUniversityExist = true;

            // Comment these lines to out to return the object to the front end rather than an array
            // For ease of use, I am returning an array, removing the IDs from the equation to make things easier to display
            var array = [];
            angular.forEach(data.data, function(element) {
              array.push(element);
            });
            console.log(array);


            // ~~TODO~~
            // Make this more efficient/Look nicer 
            // This calculates an individual ranking for each person based on their soloq scores.
            // This is to make sorting on the front end a lot easier as you can't sort by soloq yet
            console.log("Adding internal rankings to array");
            for (i = 0; i < array.length; i++) {
                var totalScore = 0;
                console.log(array[i][0]);
                var name = array[i][0].entries[0].playerOrTeamName
                var tier = array[i][0].tier
                var division = array[i][0].entries[0].division
                var lp = array[i][0].entries[0].leaguePoints

                switch (tier) {
                    case 'BRONZE': totalScore += 1000
                    break;

                    case 'SILVER': totalScore += 2000
                    break;

                    case 'GOLD': totalScore += 3000
                    break;

                    case 'PLATINUM': totalScore += 4000
                    break;

                    case 'DIAMOND': totalScore += 5000
                    break;

                    case 'MASTERS': totalScore += 10000
                    break;

                    case 'CHALLENGER': totalScore += 20000
                    break;

                    default: console.log("Error in totalling internal rankings (TIER) for university player");
                }

                switch (division) {
                    case 'V': totalScore += 0
                    break;

                    case 'IV': totalScore += 200
                    break;

                    case 'III': totalScore += 400
                    break;

                    case 'II': totalScore += 600
                    break;

                    case 'I': totalScore += 800
                    break;

                    default: console.log("Error in totalling internal rankings (DIVISION) for university player");
                }

                totalScore += lp;

                console.log("Final internal ranking score for [" + name + "] was [" + totalScore + "]");
                array[i].internalRanking = totalScore;

                // Change Tier from 'DIAMOND' to 'Diamond'
                array[i][0].tier = capitalise(tier);

                console.log(array[i]);
            }

            $scope.allRankingData = array;
        }, function errorCallback(data) {
            console.log("Error call back");
            console.log(data);
        });
    });

function capitalise(string) {
    var newString = string.toLowerCase();
    return newString.charAt(0).toUpperCase()  + string.slice(1).toLowerCase();
}