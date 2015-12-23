//built-in
var path = require('path');
var crypto = require('crypto');
//middleware
var multer = require('multer');
var express = require('express');
var router = express.Router();
//self
var config = require('../config');
var tools = require('../lib/tools');
var validator = require('../lib/validator');
var User = require('../database/User');
var Organization = require('../database/Organization');

router.get('/organization/:account', function(req, res) {
	res.setHeader('Content-type','application/json');
	var result = {};
	var account = req.params.account;
	var user_data = req.session.user_data;
	if (req.session.user_data) {
		if (tools.user_in_organization(user_data, account)) {
			result.error = true;
			result.message = "you are already in this organization";
			res.end(JSON.stringify(result));
			return;
		}
		Organization.findByAccount(account, function(err, data_o) {
			if (data_o === null) {
				result.error = true;
				result.message = "no such organization";
				result.organization_data = null;
				res.end(JSON.stringify(result));
			} else {
				if (data_o.password !== null) {
					result.error = false;
					result.message = "the organization need password";
					res.end(JSON.stringify(result));
					return;
				}
				User.findByAccount(user_data.account, function(err, data_u) {
					data_u.relationships.push({
						name:data_o.name,
						account:data_o.account,
						position:'member',
						image: data_o.image
					});
					tools.update_status(data_u, 'relationships');
					data_u.save(tools.invalid_data_handler);
					user_data = data_u;
					data_o.members.push({
						position: 'member',
						student_id: data_u.student_id,
						name: data_u.name,
						join_on: Date.now(),
						image: data_u.image,
						account: data_u.account
					});
					tools.update_status(data_o, 'members');
					data_o.save(tools.invalid_data_handler);
					result.error = false;
					result.message = "join organization successfully";
					res.end(JSON.stringify(result));
				});
			}
		});
	} else {
		result.error = true;
		result.message = "you haven't logined";
		result.organization_data = null;
		res.end(JSON.stringify(result));
	}
});
router.post('/organization/:account', function(req, res) {
	res.setHeader('Content-type','application/json');
	var result = {};
	var account = req.params.account;
	var user_data = req.session.user_data;
	var password = req.body.password || null;
	if (password === null) {
		result.error = false;
		result.message = "you haven't given the password";
		res.end(JSON.stringify(result));
		return;
	}
	if (req.session.user_data) {
		if (tools.user_in_organization(user_data, account)) {
			result.error = true;
			result.message = "you are already in this organization";
			res.end(JSON.stringify(result));
			return;
		}
		Organization.findByAccount(account, function(err, data_o) {
			if (data_o === null) {
				result.error = true;
				result.message = "no such organization";
				result.organization_data = null;
				res.end(JSON.stringify(result));
			} else {
				if (data_o.password !== password) {
					result.error = false;
					result.message = "the password you give is wrong";
					res.end(JSON.stringify(result));
					return;
				}
				User.findByAccount(user_data.account, function(err, data_u) {
					data_u.relationships.push({
						name:data_o.name,
						account:data_o.account,
						position:'member',
						image: data_o.image
					});
					tools.update_status(data_u, 'relationships');
					data_u.save(tools.invalid_data_handler);
					user_data = data_u;
					data_o.members.push({
						position: 'member',
						student_id: data_u.student_id,
						name: data_u.nick_name,
						join_on: Date.now(),
						image: data_u.image,
						account: data_u.account
					});
					tools.update_status(data_o, 'members');
					data_o.save(tools.invalid_data_handler);
					result.error = false;
					result.message = "join organization successfully";
					res.end(JSON.stringify(result));
				});
			}
		});
	} else {
		result.error = true;
		result.message = "you haven't logined";
		result.organization_data = null;
		res.end(JSON.stringify(result));
	}
});

module.exports = router;
