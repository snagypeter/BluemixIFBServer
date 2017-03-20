module.exports = function (app) {
	function runStep() {
		console.log("Adding divisions");

		app.dataSources.MongoDB.automigrate("Division", function (err) {
			if (err) {
				throw err;
			}

			app.models.Division.create([
				{name: "Head Office", id: "995d9a16-377c-4df0-aad7-3e58242558f3"},
				{name: "IT Department", id: "2b4594b2-9719-4e3e-aea4-1fba941e5cb7"},
				{name: "Sales Department", id: "d9f88ae4-ea28-4dd7-bd03-6e2ae580bf1e"}
			], function (err, divisions) {
				if (err) {
					throw err;
				}
			});
		});
	}

	app.migrationScripts.push({
		stepId: 1,
		callback: function () {
			app.testMigration(1, runStep);
		}
	});
};