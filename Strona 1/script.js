(function(){
	'use strict';
	var test = undefined;
//
angular.module('myUserList', [
'ngRoute'
]);

angular.module('myUserList').directive("promiseEquation", function($q) {
	var deferred = $q.defer();
	return {
		link: function(scope, element, attrs) {
			element.find("button").on("click", function (event) {
				var buttonText = event.target.innerText;
				var equation = scope.equ;
				//Działanie
				if(equation.indexOf(" ")==-1)
				{
					var tab = equation.split("+");
					var tab_ = [];
					var czyn_ = [0,0,0];
					for(var i=0;i<tab.length;i++)
					{
						var t_ = tab[i].split("-");
						if(parseInt(t_.length)>1){
							for(var j=0;j<t_.length-1;j++)
							{
								t_[j+1] = "-"+t_[j+1];																					
							}
						}
						for(var j=0;j<t_.length;j++)
						{							
							if(t_[j].indexOf("x")!=-1 && t_[j].indexOf("x")==0){								
								t_[j] = "1"+t_[j];
							}else if(t_[j].indexOf("x")!=-1 && t_[j].indexOf("x")==1){
								t_[j] = "-1"+t_[j];
							}						
							if(t_[j]!=""){
								tab_.push(t_[j]);
							}					
						}
					}
					for(var k=0;k<tab_.length;k++)
					{						
						if(tab_[k].indexOf("x^2")!=-1){													
							czyn_[2] += parseInt(tab_[k].slice(0,tab_[k].indexOf("x^2")));
						}else if(tab_[k].indexOf("x")!=-1){
							czyn_[1] += parseInt(tab_[k].slice(0,tab_[k].indexOf("x")));
						}else{
							czyn_[0] += parseInt(tab_[k]);
						}
					}
					//delta = b^2 - 4ac
					var delta = czyn_[1]*czyn_[1]-(4*czyn_[2]*czyn_[0]);
					if(delta<0){
						equation = "To równanie nie ma rozwiązań rzeczywistych";
					}else{
						var y = 100000;
						if(delta>0){
							delta = Math.sqrt(delta);
							var x1 = ((-1*czyn_[1]) + delta)/(2*czyn_[2]);
							var x2 = ((-1*czyn_[1]) - delta)/(2*czyn_[2]);		
							x1 = Math.round(x1 * y) / y;
							x2 = Math.round(x2 * y) / y;
							equation = "To równanie ma dwa rozwiązania rzeczywiste x1 = "+x1+" oraz x2 = "+x2;
						}else if(delta==0){
							var x0 = ((-1*czyn_[1]) + 0)/(2*czyn_[2]);							
							equation = "To równanie ma jedno rozwiązanie rzeczywiste x1 = "+Math.round(x0 * y) / y;
						}
					}
				}else{
					equation = "Równanie zawiera białe znaki, proszę je usunąć";
				}
				setTimeout(function(){
					deferred.resolve(equation);
				}, 7000);//opóźnienie o x milisekund
			});
		},
		controller: function ($scope, $element, $attrs){
			this.promise = deferred.promise;					
		}
	}	
});

angular.module('myUserList').directive("promiseResult", function() {
	return {
		require: "^promiseEquation",
		link: function (scope, element, attrs, ctrl) {							
			ctrl.promise
			.then(function (result) {
				if(result=="Nan" || result == null || result == "null"){
					result = "Nieznany błąd";
				}
				//działa
				var x = document.getElementsByClassName("powiadomienie");
				x[0].innerHTML = result;				
				if(window.location.href.indexOf("promise")!=-1){
					$('.powiadomienie').css({opacity: $('.powiadomienie').css('opacity'), visibility: "visible"}).animate({opacity: 0}, 700);													
				}else{
					$('.powiadomienie').css({opacity: $('.powiadomienie').css('opacity'), visibility: "visible"}).animate({opacity: 1}, 700);					
				}
				return " "+result+" ";
			}).then(function (result) {
				element.text(result);
			});			
		}
	}
});
//tu skończyłem - zrobić połączenie z bazą danych
angular.module('myUserList').directive("promiseUser", function($q) {
	var deferred = [$q.defer(), $q.defer()];
	var promises = [deferred[0].promise, deferred[1].promise];
	return {
		link: function (scope, element, attrs) {
			element.find("button").on("click", function (event) {//connect to Database MySQL	
				var result;
				$http.get("users_mysql.php")
				.then(function (response) {result = response.data.records;});			
				setTimeout(function(){
					deferred.resolve(result);
				}, 2000);
			});
		},
		controller: function ($scope, $element, $attrs){
			this.promise = deferred.promise;
		}
	}	
});

angular.module('myUserList').directive("promiseReprint", function() {
	return {
		require: "^promiseUser",
		link: function (scope, element, attrs, ctrl){
			ctrl.promise.then(function (result) {
				scope.user_data_base = result;
				element.text(result);
			}, function (reason) {
				element.text(reason);
			});
		}
	}	
});//dwa promise zrobione

angular.module('myUserList').directive("promiseWorker", function($q) {
	var deferred = [$q.defer(), $q.defer()];
	var promises = [deferred[0].promise, deferred[1].promise];
	return {
		link: function (scope, element, attrs) {
			element.find("button").on("click", function (event) {
				var buttonText = event.target.innerText;
				var buttonGroup = event.target.getAttribute("data-group");
				if(buttonText == "Przerwij"){
					deferred[buttonGroup].reject("Przerwano");
				}else{
					deferred[buttonGroup].resolve(buttonText);
				}
			});
		},
		controller: function ($scope, $element, $attrs){
			this.promise = $q.all(promises).then(function (results) {
				return results.join();
			});
		}
	}	
	/*
	var deferred = $q.defer();
	return {
		link: function(scope, element, attrs) {
			element.find("button").on("click", function (event) {
				var buttonText = event.target.innerText;
				if (buttonText == "Przerwij"){
					deferred.reject("Przerwano");
				}else{
					deferred.resolve(buttonText);
				}
			});
		},
		controller: function ($scope, $element, $attrs){
			this.promise = deferred.promise;
		}
	}*/
});

angular.module('myUserList').directive("promiseObserver", function() {
	return {
		require: "^promiseWorker",
		link: function (scope, element, attrs, ctrl){
			ctrl.promise.then(function (result) {
				element.text(result);
			}, function (reason) {
				element.text(reason);
			});
		}
	}	
	/*
	var deferred = $q.defer();
	return {
		require: "^promiseWorker",
		link: function (scope, element, attrs, ctrl) {
			ctrl.promise
			.then(function (result) {
				return "Sukces (" + result + ")";
			}).then(function (result) {
				element.text(result);alert();
			});
		}
	}*/
});

angular.module('myUserList').config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html"
    })
    .when("/adding", {
        templateUrl : "adding.html"
    })
    .when("/list", {
        templateUrl : "list.html"
    })
    .when("/profil", {
        templateUrl : "profil.html"
    })
	.when("/ajax", {
        templateUrl : "ajax.html"
    })
	.when("/promise", {
        templateUrl : "obietnica.html"
    });
});

angular.module('myUserList').controller("myCtrl", function($scope, $http) {
	$scope.message = "";
	//$scope.powiadomienie_hide = false;
	$scope.sex = ["M", "K"];    	
	$http.get("data.json").then(function (response) {
      		$scope.users = response.data;
  	});

	$scope.addUser = function (form) {
		var data = {firstName: form[0], lastName: form[1], sex: form[2]};
		$scope.users.push(data);	
	} 
	$scope.removeUser = function (x) {
        	$scope.users.splice(x, 1);
    	} 
	$scope.changeclass = function(u) {
    		var s='';
		switch(u){
			case 'M': s='male'; break;
			case 'K': s='female'; break;
			default: s='';
		}    		
    		return s;
	}	
	$scope.orderByMe = function(x) {
        	$scope.myOrderBy = x;
	}
	$scope.hide = function(us,m_,f_) {
		var h = false;		
		if(us=='M' && m_ == true) h = true;
		if(us=='K' && f_ == true) h = true;
		return h;
	}
	$scope.loadData = function (){
		$http.get("productData.json").then(function onSuccess(response) {
			console.log("Kod stanu: "+response.status);
			console.log("Typ: "+response.headers("content-type"));
			console.log("Wielkość: "+response.headers("content-length"));			
			$scope.products = response.data;	
		});
	}
		
	
});
//
})();
