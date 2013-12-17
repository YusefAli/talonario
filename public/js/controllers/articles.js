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
        	
            $scope.articles = articles;
            if (Global.user.talonario) {
            	$scope.userTalons = Global.user.talonario.talones;
        		}
        		else {
            	$scope.userTalons = [];
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

    
     $scope.addSelectedTalon = function(article){
            $scope.userTalons.push(article);
	        };
	        
	  $scope.crearTalonario = function(){
     	  var talonario = new Talonarios({
            talones: $scope.userTalons
        });
        console.log("talonario",JSON.stringify(talonario))
        talonario.$save(function(response) {
            $location.path("talonarios/" + response._id);
        });
     };
   
}]);