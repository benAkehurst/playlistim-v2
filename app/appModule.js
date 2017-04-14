(function(){

	"use strict";

	var appModule = angular.module("appModule", ["ngRoute",
												 "ngCookies",
												 "youtube-embed",
												 "homepageModule",
												 "loginModule",
												 "registerModule",
												 "profileModule",
												 "editModule",
												 "playModule"
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
			controller:"ProfileController", 
			templateUrl:"app/profileView.html"
		})

		.when("/edit", {
			controller:"EditController",
			templateUrl:"app/editView.html"
		})

		.when("/play", {
			controller:"PlayController",
			templateUrl:"app/playView.html"
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