angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Crear Talonario",
        "link": "articles"
    },{
        "title": "Mis Talonarios",
        "link": "talonarios"
    },{
        "title": "Crea tu propio Talón",
        "link": "articles/create"
    }];
    
    $scope.isCollapsed = false;
}]);