(function(){

	"use strict";

	var appModule = angular.module("appModule", ["ngRoute",
												 "homepageModule"
												]);

	appModule.config(function($routeProvider){
		
		$routeProvider.when("/", {
			controller:"HomepageController",
			templateUrl:"app/homepageView.html"
		});

		$routeProvider.otherwise({
			redirectTo:"/"
		});	

	});

	appModule.directive("ngPageRights", function(){
		var d = new Date();
		var year = d.getFullYear();
		return {
			template:'<p>&copy; playlistim ' + year +'</p>'
		};
	});

})();