/* 
 * Copyright (c) 2017 Peter SOLYOM-NAGY <info@snp.hu>
 */
'use strict';
ifbControllers
	//<editor-fold desc="RegisterController">
	.controller('RegisterController', [
		'$log', '$rootScope', '$scope', 'ifbCommon', 'departmentFactory', 'authFactory', 'personFactory',
		function ($log, $rootScope, $scope, ifbCommon, departmentFactory, authFactory, personFactory) {
			var self = this;

			self.registerModel = {
				email: "",
				firstName: "",
				lastName: "",
				title: "",
				departmentId: "",
				phone: "",
				comment: "",
				imageName: ""
			};
			self.password = "";
			self.errorMessage = "";
			self.departments = [];
			self.defaultPromise = null;

			self.getDepartments = getDepartments;

			self.doRegister = doRegister;
			self.cancel = cancel;

			function getDepartments() {
				departmentFactory.query()
					.$promise
					.then(
						function (departments) {
							self.departments = departments;
						},
						function (error) {
							self.errorMessage = "Failed to get departments " + ifbCommon.getRepoErrorMessage(error);
							self.departments = [];
						});
			}

			function doRegister() {
				$log.info(">doRegister");
				self.errorMessage = "";

				//Register user
				self.defaultPromise = authFactory.register(
					{
						realm: "CFB",
						username: self.registerModel.email,
						email: self.registerModel.email,
						password: self.password
					}
				);
			}

			function cancel() {
				$scope.closeThisDialog("Cancel", 500);
			}

			$rootScope.$on('registration:Successful', function () {
				personFactory.create(self.registerModel)
					.$promise
					.then(
						function (response) {
							$log.info("Responded person: " + JSON.stringify(response));
							self.registerModel = response;
							$scope.closeThisDialog(self.registerModel, 500);
						},
						function (error) {
							self.errorMessage = ifbCommon.getRepoErrorMessage(error);
						});
			});

			self.defaultPromise = getDepartments();
		}])
	//</editor-fold>
	;
