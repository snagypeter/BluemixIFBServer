/* 
 * Copyright (c) 2017 Peter SOLYOM-NAGY <info@snp.hu>
 */
'use strict';

angular.module('companyFace')
	.controller('MenuController', ['$scope', '$location', function ($scope, $location) {
			$scope.isSelected = function (path) {
				return ($location.path() === path);
			};
		}])

	.controller('ProfileController', ["$log", '$scope', '_', 'ModalService', 'ngDialog', 'authFactory', function ($log, $scope, _, ModalService, ngDialog, authFactory) {
			var self = this;

			self.username = "";

			self.isAuthenticated = isAuthenticated;
			self.login = login;
			self.logout = logout;
			self.showProfileDetails = showProfileDetails;

			function isAuthenticated() {
				return authFactory.isAuthenticated();
			}

			function login() {
				ngDialog.open({template: 'modules/login/login.html', scope: $scope, className: 'ngdialog-theme-default', controller: "LoginController"});
			}

			function logout() {
				authFactory.logout();
				self.username = '';
			}

			function showProfileDetails() {
				$log.info('showProfileDetails()');

				var person = authFactory.getUser();
				if (!_.isUndefined(person)) {
					person
						.$promise
						.then(
							function (response) {
								$log.info("Response length: " + response.length);
								$log.info("Response: " + JSON.stringify(response));
								if (0 < response.length) {
									ModalService.showModal(
										{
											templateUrl: 'modules/persons/personDetails.html',
											controller: 'PersonDetailsController as ctl',
											inputs: {
												personId: response[0].id,
												editable: true
											}
										}
									)
										.then(
											function (modal) {
												modal.element.modal();
												/*modal.close.then(
												 function (result) {
												 }
												 );*/
											}
										);
								}
							}
						);
				}

			}
		}])
	;





