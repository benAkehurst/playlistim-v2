(function(){

	"use strict";

	var appModule = angular.module("appModule", ["ngRoute",
												 "homepageModule",
												 "loginModule",
												 "registerModule",
												 "profileModule",
												 "addModule"
												]);

	appModule.config(function($routeProvider){
		
		$routeProvider

		.when("/", {
			controller:"HomepageController",
			templateUrl:"app/homepageView.html"
		})

		.when("/login", {
			controller:"LoginController",
			templateUrl:"app/loginView.html"
		})

		.when("/register", {
			controller:"RegisterController",
			templateUrl:"app/registerView.html"
		})

		.when("/profile", {
			// resolve: {
			// 	"check": function($location, $rootScope){
			// 		if(!$rootScope.loggedIn){
			// 			$location.path("/")
			// 		}
			// 	}
			// },
			controller:"ProfileController",
			templateUrl:"app/profileView.html"
		})

		.when("/add", {
			controller:"AddController",
			templateUrl:"app/addView.html"
		})

		.otherwise({
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