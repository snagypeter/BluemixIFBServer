'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function () {
	//Running migration scripts
	var MAX_INDEXES = 10;
	for (var idx = 0; idx < MAX_INDEXES; ++idx) {
		var items = app.migrationScripts.filter(item => item.stepId === idx);
		for (var idx2 = 0; idx2 < items.length; ++idx2) {
			console.log("Testing migration: " + idx + "," + items[idx2].stepId);
			items[idx2].callback();
		}
	}

	// start the web server
	return app.listen(function () {
		app.emit('started');
		var baseUrl = app.get('url').replace(/\/$/, '');
		console.log('Web server listening at: %s', baseUrl);
		if (app.get('loopback-component-explorer')) {
			var explorerPath = app.get('loopback-component-explorer').mountPath;
			console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
		}
	});
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
app.migrationScripts = [];
app.testMigration = function (stepId, callbackMethod) {
	app.models.Version.findOne(
		{order: "version DESC"},
		function (err, item) {
			if (err) {
				console.log("Error: " + err);
			}
			if ((null === item) || (stepId > item.version)) {
				//First migration
				console.log("Migrating step " + stepId);

				callbackMethod();

				//Last step
				console.log("Store migration step " + stepId);
				app.models.Version.create({version: stepId, migrated: new Date().getTime()});

				console.log("Migration step " + stepId + " done");
			}
		}
	);
};

var bootOptions = {
	appRootDir: __dirname,
	bootDirs: ["boot", "boot/migration"]
};
boot(app, bootOptions, function (err) {
	if (err)
		throw err;

	// start the server if `$ node server.js`
	if (require.main === module) {
		app.start();
	}
});
