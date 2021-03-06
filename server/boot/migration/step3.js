module.exports = function (app) {
	function runStep() {
		console.log("Adding default users");

		app.dataSources.MongoDB.automigrate("User", function (err) {
			if (err) {
				throw err;
			}

			app.models.User.create([
				{realm: "CFB", username: "admin@cfb.com", email: "admin@cfb.com", emailVerified: true, password: "1234", id: "5908e19099a0400038dd1d8e"},
				{realm: "CFB", username: "snp@cfb.com", email: "snp@cfb.com", emailVerified: true, password: "1234", id: "5908e19199a0400038dd1d8f"}
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