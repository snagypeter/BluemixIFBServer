'use strict';

module.exports = function (Image) {
	Image.resizeImage = function (filePath, callback) {
		var response = "Failed";

		var fs = require("fs");
		var outputStream = fs.createWriteStream("resize.tmp");
		var gm = require("gm");
		gm(filePath)
			.resize(512, 512)
			.write(outputStream,
				function (error) {
					if (error) {
						console.log("Done with error:" + error);
					}

					var inputStream = fs.createReadStream("resize.tmp");
					var inputFile = Image.createFile(inputStream);
					inputFile.save();
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