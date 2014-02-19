//Setting up route
window.app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
 	when('/articles/:articleId/:articleTitle', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/talonarios/:talonarioId', {
            templateUrl: 'views/talonarios/view.html'
        }).  
        when('/talonarios', {
            templateUrl: 'views/talonarios/list.html'
        }).       
        when('/', {
            templateUrl: 'views/index.html'
        }).
        when('/paypal/OK', {
            templateUrl: 'views/talonarios/paypalOK.html'
        }).
        when('/saveImage', {
            templateUrl: 'views/articles/view.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);
