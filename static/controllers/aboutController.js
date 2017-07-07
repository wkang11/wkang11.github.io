(function () {
    'use strict';
    var moduleName = 'aboutController.module';
    angular.module(moduleName, ["sharedProperties.module"]);

    function AboutController($scope, $http, $location, sharedProperties) {
        'ngInject';
        this.$location = $location;
        this.$scope = $scope;
        this.$http = $http;
        this.$scope.message = 'Search Summoner Information Below';
        this.$scope.doesSummonerExist = true;
        this.sharedProperties = sharedProperties;
        
        this.getCurrenGameVersion();

        this.$scope.getSummonerData = this.getSummonerData.bind(this);
    }

    AboutController.prototype = {
        getCurrenGameVersion: function () {
            this.sharedProperties.getVersion(function (err, versionData) {
                this.$scope.currentGameVersion = versionData.data[0];
            }.bind(this))
        },

        getBasicInfo: function (callback) {
            // var pathArray = this.$location.path().split('/:');
            var userInGameName = this.$scope.summoner.name;
            this.$http({
                method: 'GET',
                url: "/api/summoner/basic/" + userInGameName
            }).then(function succesCallback(data) {
                this.$scope.doesSummonerExist = true;
                for (var key in data.data) {
                    this.$scope.summoner = {
                        "id": data.data[key].id,
                        "name": data.data[key].name,
                        "iconId": data.data[key].profileIconId,
                        "revData": data.data[key].revisionDate,
                        "summonerLevel": data.data[key].summonerLevel
                    };
                }
                callback();
            }.bind(this))

        },

        getSummonerData: function () {
            this.getBasicInfo(function () {
                var ID = this.$scope.summoner.id;
                this.$http({ method: "GET", url: "/api/summoner/info/" + ID })
                    .then(function succesCallback(data) {
                        console.log(data);
                        this.$scope.summoner.areaName = data.data[ID][0].name;
                        this.$scope.summoner.queue = data.data[ID][0].queue;
                        this.$scope.summoner.rank = data.data[ID][0].tier;
                        this.$scope.summoner.division = data.data[ID][0].entries[0].division;                        
                        this.$scope.summoner.rankPoint = data.data[ID][0].entries[0].leaguePoints; 
                        console.log(this.$scope.summoner);
                    }.bind(this))
            }.bind(this));

        },
    }

    angular.module(moduleName).controller('aboutController', AboutController);

})();

