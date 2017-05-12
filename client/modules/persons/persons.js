/* 
 * Copyright (c) 2017 Peter SOLYOM-NAGY <info@snp.hu>
 */
'use strict';
ifbControllers
	//<editor-fold defaultstate="collapsed" desc="PersonListController">
	.controller("PersonListController", ["$rootScope", "$log", "ModalService", "backendURL", "ifbCommon", "personFactory", "departmentFactory", "authFactory", function ($rootScope, $log, ModalService, backendURL, ifbCommon, personFactory, departmentFactory, authFactory) {
			var self = this;

			self.departments = [];
			self.persons = [];
			self.errorMessage = "";
			self.defaultPromise = null;

			self.isAuthenticated = isAuthenticated;
			self.getDepartments = getDepartments;
			self.getImage = getImage;
			self.getPersons = getPersons;
			self.showPersonDetails = showPersonDetails;

			function isAuthenticated() {
				return authFactory.isAuthenticated();
			}

			function getDepartments() {
				return departmentFactory.query()
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

			function getImage(imageName) {
				if ((null !== imageName) && !_.isUndefined(imageName) && ("" !== imageName)) {
					return backendURL + "/Images/persons/download/" + imageName;
				}
				return "images/person.jpg";
			}

			function getPersons() {
				self.defaultPromise = personFactory.query()
					.$promise
					.then(
						function (persons) {
							self.persons = persons;
						},
						function (error) {
							self.errorMessage = "Failed to get persons " + ifbCommon.getRepoErrorMessage(error);
							self.persons = [];
						});

				return self.defaultPromise;
			}

			function showPersonDetails(personId) {
				$log.info('showPersonDetails(' + personId + ')');
				ModalService.showModal({
					templateUrl: 'modules/persons/personDetails.html',
					controller: 'PersonDetailsController as ctl',
					inputs: {
						personId: personId,
						editable: false
					}
				}).then(
					function (modal) {
						modal.element.modal();
						modal.close.then(
							function (result) {
								$log.info("Updating list entry");
								var index = _.findIndex(self.persons, {id: result.id});
								if (0 <= index) {
									angular.copy(result, self.persons[index]);
								}
							});
					}
				);
			}

			function queryData() {
				$log.info("Getting Departments");
				self.defaultPromise = self.getDepartments().then(
					function () {
						$log.info("Departments done");
						$log.info("Getting Persons");
						self.defaultPromise = self.getPersons().then(
							function () {
								$log.info("Persons done");
							},
							function (error) {
								$log.error("Failed to get Persons. " + error);
							}
						);
					},
					function (error) {
						$log.error("Failed to get Departments. " + error);
					}
				);
			}

			$log.info("Initiating data");

			if (authFactory.isAuthenticated()) {
				queryData();
			}

			$rootScope.$on('login:Successful', function () {
				queryData();
			});

			$rootScope.$on('logout:Successful', function () {
				self.persons = {};
				self.departments = {};
			});
		}])
	//</editor-fold>

	//<editor-fold defaultstate="collapsed" desc="PersonDetailsController">
	.controller('PersonDetailsController', [
		"$log", "$q", "$element", "ModalService", "close", "backendURL", "ifbCommon", "ifbRepo", "authFactory", "personFactory", "departmentFactory", "personId", "editable",
		function ($log, $q, $element, ModalService, close, backendURL, ifbCommon, ifbRepo, authFactory, personFactory, departmentFactory, personId, editable) {
			var self = this;

			self.person = {};
			self.personImage = "images/person.jpg";
			self.editable = editable;
			self.errorMessage = "";
			self.departments = [];
			self.defaultPromise = null;

			self.getDepartments = getDepartments;
			self.getImage = getImage;
			self.uploadImage = uploadImage;
			self.doUploadImage = doUploadImage;
			self.removeImage = removeImage;
			self.changePassword = changePassword;
			self.doChangePassword = doChangePassword;

			self.save = save;
			self.closeForm = closeForm;
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

			function getImage() {
				if (null !== self.person && (null !== self.person.imageName) && !_.isUndefined(self.person.imageName) && ("" !== self.person.imageName)) {
					return backendURL + "/Images/persons/download/" + self.person.imageName;
				}
				return "images/person.jpg";
			}

			function uploadImage() {
				$log.info(">uploadImage()");
				ModalService.showModal({
					templateUrl: "modules/common/imageUpload.html",
					controller: "ImageUploadController as ctl",
					inputs: {
						callback: doUploadImage
					}
				}).then(
					function (modal) {
						modal.element.modal();
						modal.close
							.then(
								function (response) {
									$log.info("Final response: " + JSON.stringify(response));
									self.person.imageName = response.data.data.imageName;
									self.personImage = self.getImage();
								},
								function (error) {
									self.errorMessage = ifbCommon.getRepoErrorMessage(error);
								});
					});
			}

			function doUploadImage(fileToUpload) {
				$log.info(">doUploadImage()");
				return ifbRepo.uploadImage(fileToUpload)
					.then(
						function (fileEntryResponse) {
							$log.info("fileEntry:" + JSON.stringify(fileEntryResponse));
							return personFactory.get({id: self.person.id})
								.$promise
								.then(
									function (tmpPerson) {
										tmpPerson.imageName = fileEntryResponse.data._id;
										$log.info("tmpPerson:" + JSON.stringify(tmpPerson));
										return personFactory.update(tmpPerson)
											.$promise
											.then(
												function (response) {
													$log.info("Returning 200 to caller");
													return {status: 200, statusText: "OK", data: response};
												},
												function (error) {
													$log.info("Returning error to caller");
													return error;
												}
											);
									},
									function (error) {
										self.errorMessage = ifbCommon.getRepoErrorMessage(error);
									});

						},
						function (error) {
							self.errorMessage = ifbCommon.getRepoErrorMessage(error);
						});
			}

			function removeImage() {
				$log.info(">removeImage()");
				self.person.imageName = "";
				self.personImage = self.getImage();
			}

			function changePassword() {
				$log.info(">changePassword()");
				ModalService.showModal({
					templateUrl: "modules/persons/passwordChange.html",
					controller: "PasswordChangeController as ctl",
					inputs: {
						callback: doChangePassword
					}
				}).then(
					function (modal) {
						modal.element.modal();
						modal.close
							.then(
								function (response) {
									$log.info("Final response: " + JSON.stringify(response));
								},
								function (error) {
									self.errorMessage = ifbCommon.getRepoErrorMessage(error);
								});
					});
			}

			function doChangePassword(oldPassword, newPassword) {
				$log.info(">doChangePassword()");
				//check old password
				return authFactory.tryLogin({username: authFactory.getUsername(), password: oldPassword})
					.$promise
					.then(
						function (response) {
							$log.info("tryLogin: " + JSON.stringify(response));
							return {status: 200, statusText: "doChangePassword OK"};
						},
						function (error) {
							$log.warn("tryLogin: " + JSON.stringify(error));
							throw error;
						}
					);

				//TODO: replace old password with new password
			}

			function save() {
				self.errorMessage = "";
				self.defaultPromise = personFactory.update(self.person)
					.$promise
					.then(
						function (response) {
							self.person = response;
							$element.modal("hide");
							close(self.person, 500);
						},
						function (error) {
							self.errorMessage = ifbCommon.getRepoErrorMessage(error);
						});
			}

			function closeForm() {
				close("CloseForm", 500);
			}

			function cancel() {
				close("Close", 500);
			}

			self.defaultPromise = departmentFactory.query()
				.$promise
				.then(
					function (response) {
						self.departments = response;

						$log.info("executing...");
						self.defaultPromise = personFactory.get({id: personId})
							.$promise
							.then(
								function (response) {
									$log.info("Responded");
									$log.info(JSON.stringify(response));
									//self.person = response.data;
									self.person = response;
									self.personImage = self.getImage();
								},
								function (error) {
									$log.info("Responded");
									$log.info(JSON.stringify(error));
									self.errorMessage = ifbCommon.getRepoErrorMessage(error);
									self.person = [];
								});
						$log.info("called.");
					},
					function (error) {
						self.errorMessage = ifbCommon.getRepoErrorMessage(error);
						self.departments = [];
					});
		}])
	//</editor-fold>

	//<editor-fold defaultstate="collapsed" desc="PasswordChangeController">
	.controller("PasswordChangeController", ["$log", "$element", "close", "ifbCommon", "callback", function ($log, $element, close, ifbCommon, callback) {
			var self = this;

			self.oldPassword = "";
			self.newPassword = "";
			self.defaultPromise = null;


			self.changePassword = changePassword;
			self.closeForm = closeForm;
			self.cancel = cancel;

			function changePassword() {
				$log.info(">changePassword()");
				self.defaultPromise = callback(self.oldPassword, self.newPassword)
					.then(
						function (response) {
							$log.info("Callback response: " + JSON.stringify(response));
							$element.modal("hide");
							close({status: 200, statusText: "OK", data: response}, 500);
						},
						function (error) {
							$log.warn("Callback error: " + JSON.stringify(error));
							self.errorMessage = ifbCommon.getRepoErrorMessage(error);
						}
					);
			}

			function closeForm() {
				close("CloseForm", 500);
			}

			function cancel() {
				close("Close", 500);
			}
		}])
	//</editor-fold>
	;
