/* 
 * Copyright (c) 2017 Peter SOLYOM-NAGY <info@snp.hu>
 */
'use strict';
ifbControllers
	//<editor-fold desc="LoginController">
	.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'authFactory', function ($scope, ngDialog, $localStorage, authFactory) {

			$scope.loginData = $localStorage.getObject('userinfo', '{}');

			$scope.doLogin = function () {
				if ($scope.rememberMe)
					$localStorage.storeObject('userinfo', $scope.loginData);

				authFactory.login($scope.loginData);

				$scope.closeThisDialog();

			};

			$scope.openRegister = function () {
				ngDialog.open({template: 'modules/register/register.html', /*scope: $scope,*/ className: 'ngdialog-theme-default', controller: "RegisterController as ctl"});
				$scope.closeThisDialog();
			};

		}])
	//</editor-fold>
	;