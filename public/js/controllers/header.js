angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Crear Tú Talonario",
        "link": "articles"
    },{
        "title": "Últimos Talonarios",
        "link": "talonarios"
    }];

    $scope.registerMenu = [{
        "title": "Crea tu propio Talón",
        "link": "articles/create"
    }];
    
    $scope.isCollapsed = false;
}]);