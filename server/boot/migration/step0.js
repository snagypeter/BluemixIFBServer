module.exports = function (app) {
	function runStep() {
		console.log("First migration script - nothing to do");
	}

	app.migrationScripts.push({
		stepId: 0,
		callback: function () {
			app.testMigration(0, runStep);
		}
	});
};