/* 
 * Copyright (c) 2017 Peter SOLYOM-NAGY <info@snp.hu>
 */
'use strict';

ifbCommonServices
	.factory('$localStorage', ['$window', function ($window) {
			return {
				store: function (key, value) {
					$window.localStorage[key] = value;
				},
				get: function (key, defaultValue) {
					return $window.localStorage[key] || defaultValue;
				},
				remove: function (key) {
					$window.localStorage.removeItem(key);
				},
				storeObject: function (key, value) {
					$window.localStorage[key] = JSON.stringify(value);
				},
				getObject: function (key, defaultValue) {
					return JSON.parse($window.localStorage[key] || defaultValue);
				}
			};
		}])
	.service('ifbRepo', ['ifbNetwork', function (ifbNetwork) {
			//<editor-fold defaultstate="collapsed" desc="Image methods">
			this.uploadImage = function (file) {
				//See https://www.tutorialspoint.com/angularjs/angularjs_upload_file.htm
				var fd = new FormData();
				fd.append("file", file);

				return ifbNetwork.doPostQuery(
					"/Images/persons/upload",
					fd,
					{
						transformRequest: angular.identity,
						headers: {"Content-Type": undefined}
					}
				);
			};
			//</editor-fold>

			return this;
		}])
	.factory("personFactory", ["$resource", "backendURL", function ($resource, backendURL) {
			return $resource(backendURL + "/Persons/:id", null, {
				"update": {
					method: "PUT"
				}
			});

		}])
	.factory("departmentFactory", ["$resource", "backendURL", function ($resource, backendURL) {
			return $resource(backendURL + "/Divisions/:id", null, {
				"update": {
					method: "PUT"
				}
			});

		}])
	.factory("userFactory", ["$resource", "backendURL", function ($resource, backendURL) {
			return $resource(backendURL + "/Users/:id", null, {
				"update": {
					method: "PUT"
				}
			});

		}])
	.factory("authFactory", [
		"$log", "$rootScope", "$resource", "backendURL", "$http", "$localStorage", "ngDialog", "personFactory",
		function ($log, $rootScope, $resource, backendURL, $http, $localStorage, ngDialog, personFactory) {
			var authFac = {};

			var TOKEN_KEY = 'Token';
			var isAuthenticated = false;
			var username = '';
			var authToken = undefined;

			function loadUserCredentials() {
				var credentials = $localStorage.getObject(TOKEN_KEY, '{}');
				if (credentials.username != undefined) {
					useCredentials(credentials);
				}
			}

			function storeUserCredentials(credentials) {
				$localStorage.storeObject(TOKEN_KEY, credentials);
				useCredentials(credentials);
			}

			function useCredentials(credentials) {
				isAuthenticated = true;
				username = credentials.username;
				authToken = credentials.token;

				// Set the token as header for your requests!
				$http.defaults.headers.common['x-access-token'] = authToken;
			}

			function destroyUserCredentials() {
				authToken = undefined;
				username = '';
				isAuthenticated = false;
				$http.defaults.headers.common['x-access-token'] = authToken;
				$localStorage.remove(TOKEN_KEY);
			}

			authFac.login = function (loginData) {
				$log.debug("try to login");
				return $resource(backendURL + "/Users/login")
					.save(loginData,
						function (response) {
							$log.debug("Success: " + JSON.stringify(response));
							storeUserCredentials({username: loginData.username, token: response.id});
							$rootScope.$broadcast('login:Successful');
						},
						function (error) {
							$log.debug("Failure: " + JSON.stringify(error));
							isAuthenticated = false;

							var message = '\
								<div class="ngdialog-message">\
								<div><h3>Login Unsuccessful</h3></div>' +
								'<div><p>' + error.data.error.message + '</p><p>' +
								error.data.error.name + '</p></div>' +
								'<div class="ngdialog-buttons">\
									<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
								</div>';

							ngDialog.openConfirm({template: message, plain: 'true'});
						}
					);
			};

			authFac.tryLogin = function (loginData) {
				$log.debug(">tryLogin()");
				return $resource(backendURL + "/Users/login")
					.save(loginData,
						function (response) {
							$log.debug("Login try success: " + JSON.stringify(response));
							return {status: 200, statusText: "OK"};
						},
						function (error) {
							$log.debug("Login try failure: " + JSON.stringify(error));
							return error;
						}
					);
			};

			authFac.logout = function () {
				$resource(backendURL + "/Users/logout").get(function (response) {
				});
				destroyUserCredentials();
				$rootScope.$broadcast('logout:Successful');
			};

			authFac.register = function (registerData) {

				return $resource(backendURL + "/Users")
					.save(registerData,
						function (response) {
							authFac.login(
								{
									username: registerData.username,
									password: registerData.password
								}
							)
								.$promise
								.then(function (response2) {
									if (registerData.rememberMe) {
										$localStorage.storeObject('userinfo',
											{
												username: registerData.username,
												password: registerData.password
											}
										);
									}

									$rootScope.$broadcast('registration:Successful');
								});
						},
						function (response) {

							$log.warn(JSON.stringify(response));

							var message = '\
								<div class="ngdialog-message">\
								<div><h3>Registration Unsuccessful</h3></div>' +
								'<div><p>' + response.data.error.message +
								'</p><p>' + response.data.error.name + '</p></div>';

							ngDialog.openConfirm(
								{
									template: message,
									plain: 'true'
								}
							);

						}

					);
			};

			authFac.isAuthenticated = function () {
				return isAuthenticated;
			};

			authFac.getUsername = function () {
				return username;
			};

			authFac.getUser = function () {
				var username = this.getUsername();
				if (undefined !== username) {
					var filter = {
						filter: {
							where: {
								email: username
							}
						}
					};
					return personFactory.query(filter);
				}
				return undefined;
			};

			loadUserCredentials();

			return authFac;
		}])
	;
