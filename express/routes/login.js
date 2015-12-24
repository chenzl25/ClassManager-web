//built-in
var path = require('path');
var crypto = require('crypto');
//middleware
var express = require('express');
var router = express.Router();
//self
var config = require('../config');
var User = require('../database/User');
var Organization = require('../database/Organization');
var validator = require('../lib/validator');


router.get('/user', function(req,res) {
  res.render('login',{host:config.host,port:config.port});
});

router.post('/user', function(req,res) {
	console.log(req.body);
	console.log('cookie', req.session.cookie);
	res.setHeader('Content-type','application/json');
	var input = {};
	input.account = req.body.account || null;
	input.password = req.body.password || null;
	var result = validator.validate_login_user(input);
	if (result.error) {
        res.end(JSON.stringify(result));
	} else {
		input.password = crypto.createHash('sha1')
	  						 .update(input.password)
	  						 .digest('base64');
	  	User.findOne({account:input.account,password:input.password})
	  		.exec(function(err, data) {
	  			if (data) {
					req.session.user_data = data;
		  			if (config.web) {
						res.redirect('../users');
			        } else {
			        	req.session.user_data = data;
			  			result.message = 'login successfully';
			  			result.user_data = data;
			  			data.status = [];
			  			data.status.push({name:'self',code:Math.random()});
			  			data.status.push({name:'homeworks', code:Math.random()});
			  			data.status.push({name:'relationships', code:Math.random()});
			  			data.save();
			  			result.user_status = data.status;
			            res.end(JSON.stringify(result));
			        }
	  			} else {
	  				result.error = true;
		        	result.message = 'the password is not correct;';
		            res.end(JSON.stringify(result));
	  			}
	  		});
	}
});

module.exports = router;