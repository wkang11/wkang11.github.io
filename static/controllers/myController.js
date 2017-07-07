(function () {
    'use strict';
    var moduleName = "myController.module";

    angular.module(moduleName, ["sharedProperties.module"]);


    function MyController($scope, $http, $location, sharedProperties) {
        'ngInject';
        this.$location = $location;
        $scope.message = 'All image is loadd from ddragon.leagueoflegends.com';
        this.$http = $http;
        this.$scope = $scope;
       
        this.sharedProperties = sharedProperties;
        this.getCurrenGameVersion();
        this.getAllChampionIcons();

    }
    MyController.prototype = {

        getCurrenGameVersion: function () {
            this.sharedProperties.getVersion(function (err, versionData) {
                this.$scope.version = versionData.data[0];
            }.bind(this))
        },

        getAllChampionIcons: function () {
            this.$http({
                method: 'GET',
                url: "/api/champions"
            }).then(function succesCallback(data) {
                console.log(data.data.data);
                
                this.$scope.champions = Object.keys(data.data.data);
                
            }.bind(this))
            
        },

    }



    angular.module(moduleName).controller('myController', MyController);
})();

