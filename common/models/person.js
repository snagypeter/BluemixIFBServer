'use strict';

module.exports = function (Person) {

	Person.testDb = function (documentId, callback) {
		var response = "Image";
		callback(null, response);
	};

	Person.remoteMethod("testDb", {
		accepts: { arg: "documentId", type: "string"},
		returns: {arg: "data", type: "string"}
	});

	Person.myTest = function (cb) {
		var response = "Hello callback";
//		if(true) {
//			var err = new Error("General error");
//			err.status = 501;
//			err.name = "MyError";
//			cb(err);
//		}
		cb(null, response);
	};

	Person.remoteMethod(
		'myTest', {
			http: {
				path: '/myTest',
				verb: 'get',
				status: 200
			},
			returns: {
				arg: 'myTest',
				type: 'string'
			}
		}
	);
};
