/* 
 * Copyright (c) 2017 Peter SOLYOM-NAGY <info@snp.hu>
 */
'use strict';

ifbCommonServices
	.constant('_', window._)
	.constant('backendURL', 'https://intranet-facebook-for-coursera.mybluemix.net/api')
	.service('ifbNetwork', ['$http', '$q', '_', 'backendURL', function ($http, $q, _, backendURL) {
			var self = this;

			self.doGetQuery = doGetQuery;
			self.doPostQuery = doPostQuery;
			self.doPutQuery = doPutQuery;
			self.getRequestConfig = getRequestConfig;

			function doGetQuery(requestPath) {
				var httpPromise = $http.get(backendURL + requestPath, self.getRequestConfig());
				var responsePromise = $q(function (onSuccess, onError) {
					httpPromise.then(
						function (response) {
							//ifbAuth.getHeaderJWT(response);
							onSuccess(response);
						},
						function (error) {
							onError(error);
						});
				});

				return responsePromise;
			}

			function doPostQuery(requestPath, payload, config) {
				var httpPromise = $http.post(backendURL + requestPath, payload, self.getRequestConfig(config));
				var responsePromise = $q(function (onSuccess, onError) {
					httpPromise.then(
						function (response) {
							//ifbAuth.getHeaderJWT(response);
							onSuccess(response);
						},
						function (error) {
							onError(error);
						});
				});

				return responsePromise;
			}

			function doPutQuery(requestPath, payload, config) {
				var httpPromise = $http.put(backendURL + requestPath, payload, self.getRequestConfig(config));
				var responsePromise = $q(function (onSuccess, onError) {
					httpPromise.then(
						function (response) {
							//ifbAuth.getHeaderJWT(response);
							onSuccess(response);
						},
						function (error) {
							onError(error);
						});
				});

				return responsePromise;
			}

			function getRequestConfig(externalConfig) {
				var config = {
					headers: {}
				};

				//Default content type
				config.headers["Content-Type"] = "application/json;charset=utf-8";
				//var authConfig = ifbAuth.getRequestConfig();
				//_.each(
				//	authConfig.headers,
				//	function (value, key) {
				//		config.headers[key] = value;
				//	}
				//);
				if (!_.isUndefined(externalConfig)) {
					_.each(
						externalConfig.headers,
						function (value, key) {
							config.headers[key] = value;
						}
					);
				}

				return config;
			}

			return this;
		}])
	;