angular.module('mean.articles').controller('ArticlesController', ['$scope', '$routeParams', '$location', 'Global', 'Talonarios', 'Articles', function ($scope, $routeParams, $location, Global, Talonarios, Articles) {
    $scope.global = Global;

    $scope.create = function() {
 			console.log('create....')
        var article = new Articles({
            title: this.title,
            content: this.content
        });
        article.$save(function(response) {
            $location.path("articles/" + response._id);
        });
        this.title = "";
        this.content = "";
        
    };

    $scope.remove = function(article) {
        if (article) {
            article.$remove();

            for (var i in $scope.articles) {
                if ($scope.articles[i] == article) {
                    $scope.articles.splice(i, 1);
                }
            }
        }
        else {
            $scope.article.$remove();
            $location.path('articles');
        }
    };

    $scope.update = function() {
        var article = $scope.article;
        if (!article.updated) {
            article.updated = [];
        }
        article.updated.push(new Date().getTime());

        article.$update(function() {
            $location.path('articles/' + article._id);
        });
    };

    $scope.find = function() {
        Articles.query(function(articles) {
            $scope.userTalons = [];
            $scope.articles = articles;
            $scope.totalPrice = 0;

            //recojo los talonarios del ultimo talon del usuario que esté en estado inicial
            if(Global.user && Global.user.talonario && Global.user.talonario.state ==='INI')
            {
                for (var i in $scope.articles) {
                    for (var j in Global.user.talonario.talones) {
                        if($scope.articles[i]._id === Global.user.talonario.talones[j])
                        {
                            $scope.userTalons.push($scope.articles[i]);
                            $scope.totalPrice = $scope.totalPrice + $scope.articles[i].price;
                        } 
                    }
                }
            }
        });
    };

    $scope.findOne = function() {
        Articles.get({
            articleId: $routeParams.articleId
        }, function(article) {
            $scope.article = article;
        });
    };

    $scope.tags = ["popular","amor","picante","divertido"];
    $scope.filters = { };

    $scope.register = !Global.user;

    
    $scope.addSelectedTalon = function(article){
        $scope.userTalons.push(article);
        if(article.price)
        {
            $scope.totalPrice = $scope.totalPrice + article.price;
        }
    };

    $scope.removeSelectedTalon = function(article){

        $scope.userTalons.splice($scope.userTalons.indexOf(article), 1);
        if(article.price)
        {
            $scope.totalPrice = $scope.totalPrice - article.price;
        }
    };

      
	$scope.crearTalonario = function(){
     	var talonario = new Talonarios({
            talones: $scope.userTalons
        });
        if(Global.user)
        {
            Global.user.talonario=talonario;
        }
        
        console.log("talonario",JSON.stringify(talonario))
        talonario.$save(function(response) {
            $location.path("talonarios/" + response._id);
        });
    };



    $scope.openModal = function(article){

        $scope.userTalons.splice($scope.userTalons.indexOf(article), 1);
        if(article.price)
        {
            $scope.totalPrice = $scope.totalPrice - article.price;
        }
    };



   
}]);
