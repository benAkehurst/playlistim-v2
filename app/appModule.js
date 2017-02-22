(function(){

	"use strict";

	var appModule = angular.module("appModule", ["ngRoute",
												 "homepageModule",
												 "loginModule",
												 "registerModule",
												 "profileModule"
												]);

	appModule.config(function($routeProvider){
		
		$routeProvider.when("/", {
			controller:"HomepageController",
			templateUrl:"app/homepageView.html"
		});

		$routeProvider.when("/login", {
			controller:"LoginController",
			templateUrl:"app/loginView.html"
		});

		$routeProvider.when("/register", {
			controller:"RegisterController",
			templateUrl:"app/registerView.html"
		});

		$routeProvider.when("/profile", {
			controller:"ProfileController",
			templateUrl:"app/profileView.html"
		});

		$routeProvider.otherwise({
			redirectTo:"/"
		});	

	});

	appModule.directive("ngPageRights", function(){
		var d = new Date();
		var year = d.getFullYear();
		return {
			template:'<p>&copy; Playlistim ' + year +'</p>'
		};
	});

})();