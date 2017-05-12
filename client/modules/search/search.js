/* 
 * Copyright (c) 2017 Peter SOLYOM-NAGY <info@snp.hu>
 */
'use strict';
ifbControllers
	//<editor-fold desc="SearchController">
	.controller('SearchController', [
		'$log', '$rootScope', '$scope', '_', 'ModalService', 'backendURL', 'ifbCommon', 'departmentFactory', 'authFactory', 'personFactory',
		function ($log, $rootScope, $scope, _, ModalService, backendURL, ifbCommon, departmentFactory, authFactory, personFactory) {
			var self = this;

			self.firstName = "";
			self.lastName = "";
			self.departmentId = "";

			self.departments = [];
			self.persons = [];
			self.errorMessage = "";
			self.defaultPromise = null;

			self.isAuthenticated = isAuthenticated;
			self.hasPersons = hasPersons;
			self.getDepartments = getDepartments;
			self.search = search;
			self.getImage = getImage;
			self.getPersons = getPersons;
			self.showPersonDetails = showPersonDetails;

			function isAuthenticated() {
				return authFactory.isAuthenticated();
			}

			function hasPersons() {
				return 0 < _.size(self.persons);
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

			function search() {
				$log.info(">search()");
				getPersons();
			}

			function getImage(imageName) {
				if ((null !== imageName) && !_.isUndefined(imageName) && ("" !== imageName)) {
					return backendURL + "/Images/persons/download/" + imageName;
				}
				return "images/person.jpg";
			}

			function getPersons() {
				self.errorMessage = "";

				var queryFilter = {
					filter: {
						where: {}
					}
				};
				var queryFilterAnd = [];

				if ("" !== self.firstName) {
					queryFilterAnd.push({firstName: {like: self.firstName}});
				}
				if ("" !== self.lastName) {
					queryFilterAnd.push({lastName: {like: self.lastName}});
				}
				if ("" !== self.departmentId) {
					queryFilterAnd.push({departmentId: self.departmentId});
				}

				if (0 < _.size(queryFilterAnd)) {
					queryFilter.filter.where.and = queryFilterAnd;
				}

				self.defaultPromise = personFactory.query(queryFilter)
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
					},
					function (error) {
						$log.error("Failed to get Departments. " + error);
					}
				);
			}

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
	;
