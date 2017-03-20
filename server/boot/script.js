module.exports = function (app) {
	var MongoDB = app.dataSources.MongoDB;

//	MongoDB.automigrate('Customer', function (err) {
//		if (err) {
//			throw (err);
//		}
//		var Customer = app.models.Customer;
//
//		Customer.create([
//			{username: 'Admin', email: 'admin@admin.com', password: '1234'},
//			{username: 'muppala', email: 'muppala@ust.hk', password: '1234'},
//			{username: 'falco', email: 'falco@ust.hk', password: '1234'}
//		], function (err, users) {
//			if (err) {
//				throw (err);
//			}
//			var Role = app.models.Role;
//			var RoleMapping = app.models.RoleMapping;
//
//			var ObjectID = RoleMapping.getDataSource().connector.getDefaultIdType();
//			RoleMapping.defineProperty('principalId', {type: ObjectID});
//
//			//create the admin role
//			Role.create({
//				name: 'admin'
//			}, function (err, role) {
//				if (err) {
//					//throw (err);
//				}
//				//make admin
//				role.principals.create({
//					principalType: RoleMapping.USER,
//					principalId: users[0].id
//				}, function (err, principal) {
//					if (err) {
//						throw (err);
//					}
//				});
//			});
//		});
//	});
};