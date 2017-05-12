/* 
 * Copyright (c) 2017 Peter SOLYOM-NAGY <info@snp.hu>
 */
"use strict";
ifbControllers
	.controller("ImageUploadController", ["$scope", "$log", "$element", "close", "ifbCommon", "callback", function ($scope, $log, $element, close, ifbCommon, callback) {
			var self = this;

			self.errorMessage = "";
			self.fileUpdated = fileUpdated;
			$scope.fileUpdated = fileUpdated;

			self.upload = upload;
			self.cancel = cancel;
			self.imageFile = {};
			self.imageUploadPromise = null;

			function fileUpdated(element) {
				if (0 < element.files.length) {
					self.imageFile = element.files[0];
					$log.debug(self.imageFile);
				} else {
					self.imageFile = {};
				}
			}

			function upload() {

				self.imageUploadPromise = callback(self.imageFile)
					.then(
						function (response) {
							$log.debug("Callback response:" + JSON.stringify(response));
							if (200 === response.status) {
								$log.info("Image uploaded");
								var response2 = {
									result: "upload",
									data: response
								};
								$element.modal("hide");
								close(response2, 500);
							} else {
								self.errorMessage = response.statusText;
							}
						},
						function (error) {
							$log.debug("Callback error: " + JSON.stringify(error));
							self.errorMessage = ifbCommon.getRepoErrorMessage(error);
						}
					);
			}
			function cancel() {
				$element.modal("hide");
				close({result: "cancel"}, 500);
			}
		}])
	;