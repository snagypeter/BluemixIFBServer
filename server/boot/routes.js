/* 
 * Copyright (c) 2017 Peter SOLYOM-NAGY <info@snp.hu>
 */

module.exports = function (app) {

	app.get('/test', function (req, res, next) {
		res.render('test', {title: 'Test'});
	});
};
