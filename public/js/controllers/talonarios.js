angular.module('mean.articles').controller('TalonariosController', ['$scope', '$routeParams', '$location', 'Global', 'Talonarios', function ($scope, $routeParams, $location, Global, Talonarios) {
    $scope.global = Global;

    $scope.create = function() {
        var talonario = new Talonarios({
            talones: this.talones
        });
        talonario.$save(function(response) {
            $location.path("talonarios/" + response._id);
        });

        this.title = "";
        this.content = "";
    };

    $scope.remove = function(talonario) {
        talonario.$remove();  

        for (var i in $scope.talonarios) {
            if ($scope.talonarios[i] == talonario) {
                $scope.talonarios.splice(i, 1);
            }
        }
    };

    $scope.update = function() {
        var talonario = $scope.talonario;
        if (!talonario.updated) {
            talonario.updated = [];
        }
        talonario.updated.push(new Date().getTime());

        talonario.$update(function() {
            $location.path('talonarios/' + talonario._id);
        });
    };

    $scope.find = function() {
        Talonarios.query(function(talonarios) {
            $scope.talonarios = talonarios;
        });
    };

    $scope.findOne = function() {
        Talonarios.get({
            talonarioId: $routeParams.talonarioId
        }, function(talonario) {
            $scope.talonario = talonario;
        });
    };
    
    $scope.checkItems = function () {
   	var i;
  		for (i = 0; i < arr_to_be_checked; i++) {
    		data[arr_to_be_checked[i]].checked = true;
  		} 
	};

    $scope.openPayPalWindow = function (talonarioId){
        //var url ="https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XZ76JHXAGBCSE";
        
        var url ="https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=A64UZTVC8HQ6G&lc=ES&item_name=Talonario%20Impreso&item_number="+talonarioId+"&amount=10%2e00&currency_code=EUR&button_subtype=services&bn=PP%2dBuyNowBF%3abtn_buynowCC_LG%2egif%3aNonHosted";
         $scope.openBackWindow(url,"paypal")
      };

    $scope.openBackWindow = function (url,title){
        console.log('create....')
        console.log(url);
        var popupWindow = window.open(url,title,'scrollbars=1,height=650,width=1050');
        if($.browser.msie){
            popupWindow.blur();
            window.focus();
        }else{
           blurPopunder();
        }
      };

    function blurPopunder() {
            var winBlankPopup = window.open("about:blank");
            if (winBlankPopup) {
                winBlankPopup.focus();
                winBlankPopup.close()
            }
    };
    
}]);