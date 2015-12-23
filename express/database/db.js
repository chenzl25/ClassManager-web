//built-in
var config = require('../config');
//middleware
var mongoose = require('mongoose');
//self
var crypto = require('crypto');
var User = require('./User');
var Organization = require('./Organization');

ObjectId = mongoose.Schema.Types.ObjectId;

function init(callback) {

	mongoose.connect(config.url_db, config.options);
	var db = mongoose.connection;

	//error
	db.on('error', function(err) {
		callback(err);
	});
	db.once('open', function () {
		callback(null);
	});
	 //  	console.log('database open successfully');
		// var user = new User({ name: 'Ming',password: 'I could'});
		// var organization = new Organization({name: '9th calss', account:'haha'});
		// organization.homeworks.push({name:'maths', content:'maths is great', deadline:Date.now()});
		// organization.markModified('homeworks');
		// organization.save(invalid_data_]handler);
		// user.save(invalid_data_handler);
		// User.findByName('dylan', function(err, results) {
		// 	for (var i in results) {
		// 		results[i].speak();
		// 	}
		// });
		// Organization.find({})
		// 			.limit(1)
		// 			.exec(function(err, results) {
		// 			 	console.log(results[0].homeworks[0].deadline.getTime());
		// 			 });
}

function invalid_data_handler(err) {
  // err is our ValidationError object
  // err.errors.password is a ValidatorError object
  for (var i in err.errors) {
	  console.log(err.errors[i].message); // prints 'Validator "Invalid password" failed for path password with value `grease`'
	  console.log(err.errors[i].kind);  // prints "Invalid password"
	  console.log(err.errors[i].path);  // prints "password"
	  console.log(err.errors[i].value); // prints "vlue of password"
  }
}

module.exports.init = init;