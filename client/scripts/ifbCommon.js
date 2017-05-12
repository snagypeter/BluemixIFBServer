/* 
 * Copyright (c) 2017 Peter SOLYOM-NAGY <info@snp.hu>
 */
'use strict';

ifbCommonServices
	.service('ifbCommon', ["_", function (_) {
			var self = this;

			self.getRepoErrorMessage = getRepoErrorMessage;

			function getRepoErrorMessage(error) {
				var ret = "";
				if (!_.isUndefined(error.statusText)) {
					ret = error.statusText + " ";
				}

				if (_.isUndefined(error.data)) {
					if (!_.isUndefined(error.message)) {
						ret += error.message;
					} else {
						ret += JSON.stringify(error);
					}
				} else {
					if (!_.isUndefined(error.data.error)) {
						//Recursion
						ret += getRepoErrorMessage(error.data.error);
					} else {
						if (_.isArray(error.data.details)) {
							ret += error.data.details.join(", ");
						} else {
							ret += error.data.details;
						}
					}
				}

				if (_.isUndefined(ret)) {
					ret = "Unknown error";
				}

				return ret;
			}

			return this;
		}])
	;
