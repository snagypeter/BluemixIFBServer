module.exports = function (app) {
	function runStep() {
		console.log("Adding dummy persons");

		app.dataSources.MongoDB.automigrate("Person", function (err) {
			if (err) {
				throw err;
			}

			app.models.Person.create([
				{
					"firstName": "Joseph",
					"lastName": "K. Neumann",
					"departmentId": "995d9a16-377c-4df0-aad7-3e58242558f3",
					"title": "Direct Mobility Specialist",
					"phone": "202-555-0128",
					"email": "jkn@company.com",
					"id": "58d052ca972aa51354ef6ded"
				},
				{
					"firstName": "Ivan",
					"lastName": "K. McCartney",
					"departmentId": "995d9a16-377c-4df0-aad7-3e58242558f3",
					"title": "Human Branding Producer",
					"phone": "202-555-0181",
					"email": "ikm@company.com",
					"id": "58d052ca972aa51354ef6dee"
				},
				{
					"firstName": "Lean",
					"lastName": "J. Goodwin",
					"departmentId": "995d9a16-377c-4df0-aad7-3e58242558f3",
					"title": "District Interactions Analyst",
					"phone": "202-555-0180",
					"email": "ljg@company.com",
					"id": "58d052ca972aa51354ef6def"
				},
				{
					"firstName": "David",
					"lastName": "V. Llanos",
					"departmentId": "995d9a16-377c-4df0-aad7-3e58242558f3",
					"title": "Customer Program Manager",
					"phone": "202-555-0181",
					"email": "dvl@company.com",
					"id": "58d052ca972aa51354ef6df0"
				},
				{
					"firstName": "Jerry",
					"lastName": "E. Perreira",
					"departmentId": "995d9a16-377c-4df0-aad7-3e58242558f3",
					"title": "Chief Directives Administrator",
					"phone": "202-555-0126",
					"email": "jep@company.com",
					"id": "58d052ca972aa51354ef6df1"
				},
				{
					"firstName": "Trisha",
					"lastName": "T. Nicholes",
					"departmentId": "995d9a16-377c-4df0-aad7-3e58242558f3",
					"title": "Corporate Identity Specialist",
					"phone": "202-555-0192",
					"email": "ttn@company.com",
					"id": "58d052ca972aa51354ef6df2"
				},
				{
					"firstName": "Carol",
					"lastName": "T. White",
					"departmentId": "995d9a16-377c-4df0-aad7-3e58242558f3",
					"title": "Forward Group Engineer",
					"phone": "202-555-0177",
					"email": "ctw@company.com",
					"id": "58d052ca972aa51354ef6df3"
				},
				{
					"firstName": "Doris",
					"lastName": "R. Nicholson",
					"departmentId": "995d9a16-377c-4df0-aad7-3e58242558f3",
					"title": "Product Solutions Associate",
					"phone": "202-555-0156",
					"email": "drn@company.com",
					"id": "58d052ca972aa51354ef6df4"
				},
				{
					"firstName": "Marie",
					"lastName": "S. Ortiz",
					"departmentId": "995d9a16-377c-4df0-aad7-3e58242558f3",
					"title": "Product Quality Analyst",
					"phone": "202-555-0114",
					"email": "mso@company.com",
					"id": "58d052ca972aa51354ef6df5"
				},
				{
					"firstName": "Allen",
					"lastName": "J. Wiggins",
					"departmentId": "995d9a16-377c-4df0-aad7-3e58242558f3",
					"title": "Global Data Administrator",
					"phone": "202-555-0108",
					"email": "ajw@company.com",
					"id": "58d052ca972aa51354ef6df6"
				},
				{
					"firstName": "Nikolai",
					"lastName": "Kristiansen",
					"departmentId": "2b4594b2-9719-4e3e-aea4-1fba941e5cb7",
					"title": "District Applications Technician",
					"phone": "202-555-0142",
					"email": "nk@company.com",
					"id": "58d052ca972aa51354ef6df7"
				},
				{
					"firstName": "William",
					"lastName": "Rognli",
					"departmentId": "2b4594b2-9719-4e3e-aea4-1fba941e5cb7",
					"title": "International Configuration Consultant",
					"phone": "202-555-0178",
					"email": "wr@company.com",
					"id": "58d052ca972aa51354ef6df8"
				},
				{
					"firstName": "Daniel",
					"lastName": "Arnesen",
					"departmentId": "2b4594b2-9719-4e3e-aea4-1fba941e5cb7",
					"title": "Principal Brand Designer",
					"phone": "202-555-0165",
					"email": "da@company.com",
					"id": "58d052ca972aa51354ef6df9"
				},
				{
					"firstName": "Tomas",
					"lastName": "Ekeland",
					"departmentId": "2b4594b2-9719-4e3e-aea4-1fba941e5cb7",
					"title": "Regional Branding Engineer",
					"phone": "202-555-0144",
					"email": "te@company.com",
					"id": "58d052ca972aa51354ef6dfa"
				},
				{
					"firstName": "Adrian",
					"lastName": "Nordli",
					"departmentId": "2b4594b2-9719-4e3e-aea4-1fba941e5cb7",
					"title": "Customer Infrastructure Associate",
					"phone": "202-555-0126",
					"email": "an@company.com",
					"id": "58d052ca972aa51354ef6dfb"
				},
				{
					"firstName": "David",
					"lastName": "R. Jensen",
					"departmentId": "2b4594b2-9719-4e3e-aea4-1fba941e5cb7",
					"title": "International Accountability Liason",
					"phone": "202-555-0165",
					"email": "drj@company.com",
					"id": "58d052ca972aa51354ef6dfc"
				},
				{
					"firstName": "Kasper",
					"lastName": "L. Pedersen",
					"departmentId": "2b4594b2-9719-4e3e-aea4-1fba941e5cb7",
					"title": "Investor Branding Developer",
					"phone": "202-555-0126",
					"email": "klp@company.com",
					"id": "58d052ca972aa51354ef6dfd"
				},
				{
					"firstName": "Mette",
					"lastName": "H. Jeppesen",
					"departmentId": "2b4594b2-9719-4e3e-aea4-1fba941e5cb7",
					"title": "Chief Solutions Strategist",
					"phone": "202-555-0190",
					"email": "mhj@company.com",
					"id": "58d052ca972aa51354ef6dfe"
				},
				{
					"firstName": "Natasja",
					"lastName": "M. Lorenzen",
					"departmentId": "2b4594b2-9719-4e3e-aea4-1fba941e5cb7",
					"title": "Investor Mobility Administrator",
					"phone": "202-555-0123",
					"email": "nml@company.com",
					"id": "58d052ca972aa51354ef6dff"
				},
				{
					"firstName": "Nicklas",
					"lastName": "M. Hermansen",
					"departmentId": "2b4594b2-9719-4e3e-aea4-1fba941e5cb7",
					"title": "Global Security Manager",
					"phone": "202-555-0111",
					"email": "nmh@company.com",
					"id": "58d052ca972aa51354ef6e00"
				},
				{
					"firstName": "Mimir",
					"lastName": "S. Mathiasen",
					"departmentId": "2b4594b2-9719-4e3e-aea4-1fba941e5cb7",
					"title": "Senior Interactions Designer",
					"phone": "202-555-0140",
					"email": "msm@company.com",
					"id": "58d052ca972aa51354ef6e01"
				}], function (err, persons) {
				if (err) {
					throw err;
				}
			});
		});
	}

	app.migrationScripts.push({
		stepId: 2,
		callback: function () {
			app.testMigration(2, runStep);
		}
	});
};