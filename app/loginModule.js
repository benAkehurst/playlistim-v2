(function(){

	"use strict";

	var loginModule = angular.module("loginModule", []);

	loginModule.controller("LoginController", function($scope, $http, $location, $rootScope){

		// POST Request for Login
		$scope.login = function() {

			// These varables are made of the user entered email and password to login
			var loginEmail = $scope.loginEmail;
			var loginPassword = $scope.loginPassword;

			// console.log("From login controller" + "\nEmail: " + loginEmail + "\nPassword: " + loginPassword);

			// Here we make an object of the login and password
			var loginDetails = {
				"email":loginEmail,
				"password":loginPassword
			}

			// console.log("Login Object: " + JSON.stringify(loginDetails));

			// In the http request to the server we send over the user details object
			$http({
				method:"POST",
				url:"/login",
				headers:{ 'Content-Type': 'application/json'  },
				data:loginDetails
			})

			// In response from the server we get a confimation if the user is registered or not
			.then(function(response){
				var status = response.data[0].registered;
				var name = response.data[0].name;
				var id = response.data[0].id;

				// Makes the users name accessable on the whole site
				$rootScope.usersName = name;

				if (status == false){
					$scope.errorWarning = "Please check login details and try again";
				}
			
				else {
					//If the user logs in we set a session token with the users name
					sessionStorage.setItem('user',JSON.stringify(name));
					sessionStorage.setItem('id',id);

					$rootScope.loggedIn = true;

					$location.path("/profile");
				}

			});


		}

	});

})();