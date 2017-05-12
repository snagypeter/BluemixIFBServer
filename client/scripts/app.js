'use strict';

var ifbCommonServices = angular.module("ifbCommonServices", []);
var ifbControllers = angular.module("ifbControllers", []);

// Declare app level module which depends on views, and components
angular.module('companyFace', ['ui.router', 'angularModalService', 'cgBusy', 'ifbCommonServices', 'ifbControllers', 'ngResource', 'ngDialog'])
	.constant('_', window._)
	.constant('baseURL', 'http://localhost:3000')
	.config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('app', {
				url: '/',
				views: {
					'header': {
						templateUrl: 'views/header.html'
					},
					'content': {
						templateUrl: 'modules/persons/personList.html',
						controller: 'PersonListController as ctl'
					},
					'footer': {
						templateUrl: 'views/footer.html'
					}
				}
			})
			.state('app.search', {
				url: 'search',
				views: {
					'content@': {
						templateUrl: 'views/search.html',
						controller: 'SearchController as ctl'
					}
				}
			});

		$urlRouterProvider.otherwise('/');
	});
