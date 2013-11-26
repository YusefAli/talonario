angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Talones",
        "link": "articles"
    }, {
        "title": "Crea tu propio Talón",
        "link": "articles/create"
    }];
    
    $scope.isCollapsed = false;
}]);