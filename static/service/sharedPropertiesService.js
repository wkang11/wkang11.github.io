(function () {
    'use strict';
    var moduleName = 'sharedProperties.module';
    angular.module(moduleName, []);
    function SharedPropertiesService($http) {
        'ngInject';

        function getVersion(callback) {
            $http({
                method: 'GET',
                url: "/api/version"
            }).then(function (data) {
                
                callback(null, data);
            }, function(err){callback(err)});
        }

        
        return {
            getVersion: getVersion
        };
    }
    angular.module(moduleName).factory('sharedProperties', SharedPropertiesService);
})();

