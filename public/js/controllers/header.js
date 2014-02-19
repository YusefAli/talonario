angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Crear",
        "link": "articles"
    },{
        "title": "Últimos talonarios",
        "link": "talonarios"
    }];

    $scope.registerMenu = [{
        "title": "Crea tu propio Talón",
        "link": "articles/create"
    },{
        "title": "Tús Talonarios",
        "link": "talonarios"
    }];
    
    $scope.isCollapsed = false;
}]);
