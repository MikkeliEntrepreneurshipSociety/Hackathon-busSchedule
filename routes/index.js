
/*
 * GET web pages.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Mikkeli - region bus routes' });
};

exports.admin = function(req, res){
	  res.render('admin', { title: 'Bus route planner - admin interface' });
};