//Articles service used for talonarios REST endpoint
angular.module('mean.articles').factory("Talonarios", ['$resource', function($resource) {
    return $resource('talonarios/:talonarioId', {
        talonarioId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);