'use strict';

module.exports = function (Image) {
	Image.resizeImage = function (filePath, callback) {
		var response = "Failed";

		var fs = require("fs");
		var gm = require("gm");
		var grid = require('gridfs-stream');

		var targetStream = fs.createWriteStream("resize.tmp");
		//var gfs
		gm(filePath)
			.resize(512, 512)
			.write(targetStream,
				function (error) {
					if (error) {
						console.log("Done with error:" + error);
					}
				});



		callback(null, response);
	};

	Image.remoteMethod("resizeImage", {
		accepts: {arg: "filePath", type: "string"},
		returns: {arg: "data", type: "string"}
	});

//	Image.testDb = function (imageId, callback) {
//		var response = "Image";
//
//		var containers = Image.getContainers();
//		response += containers;
//		
//		callback(null, response);
//	};
//
//	Image.remoteMethod("testDb", {
//		accepts: { arg: "documentId", type: "string"},
//		returns: {arg: "data", type: "string"}
//	});

};