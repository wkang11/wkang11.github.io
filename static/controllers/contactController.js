(function(){
    'use strict';
    var moduleName = 'contactController.module';
    angular.module(moduleName, []);

    function ContactController($scope){
        'ngInject';
        $scope.message = 'Conttac batman, but number unknow.'
    }

    angular.module(moduleName).controller('contactController', ContactController);
})();
