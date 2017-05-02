module.exports = function (app) {
	function runStep() {
		console.log("Adding default users");

		app.dataSources.MongoDB.automigrate("User", function (err) {
			if (err) {
				throw err;
			}

			app.models.User.create([
				{realm: "CFB", username: "admin@cfb.com", email: "admin@cfb.com", emailVerified: true, password: "1234"},
				{realm: "CFB", username: "snp@cfb.com", email: "snp@cfb.com", emailVerified: true, password: "1234"}
			], function (err, users) {
				if (err) {
					throw err;
				}
			});
		});
	}

	app.migrationScripts.push({
		stepId: 3,
		callback: function () {
			app.testMigration(3, runStep);
		}
	});
};