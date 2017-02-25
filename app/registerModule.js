(function(){

	"use strict";

	var registerModule = angular.module("registerModule", []);

	registerModule.controller("RegisterController", function($scope, $http, $location){

		// This function is used to register a new user
		$scope.register = function(){
			
			// Here we access the values that the user enters
			var email = $scope.registerEmail;
			var password = $scope.registerPassword;
			
			// console.log("From register controller" + "\nName: " + name + "\nEmail: " + email + "\nPassword: " + password);
			
			// Here we make an object out of the user details
			var newUser = {
				"email":email,
				"password":password
			}

			// We use this method to send the user object to the server
			$http({
				  method  : 'POST',
				  url     : '/register',
				  headers : { 'Content-Type': 'application/json'  },
				  data    : newUser

			})

			// After the user registers, the page redirects to the login page
			.then(function(response){
				$location.path("/login");
			});
		}
		
	});

})();