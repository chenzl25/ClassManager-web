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

// refresh the session,  eh need to be consider 

router.use(tools.refresh);

router.get('/user', function(req, res) {
	res.setHeader('Content-type','application/json');
	var result = {};
	if (req.session.user_data) {
		result.error = false;
		result.message = 'search user successfully';
		result.user_data = req.session.user_data;
	} else {
		result.error = true;
		result.message = "you haven't logined";
		result.user_data = null;
	}
	res.end(JSON.stringify(result));
});

router.get('/user/status', function(req, res) {
	res.setHeader('Content-type','application/json');
	var result = {};
	if (req.session.user_data) {
		result.error = false;
		result.message = 'search user status successfully';
		result.status = req.session.user_data.status;
	} else {
		result.error = true;
		result.message = "you haven't logined";
		result.user_data = null;
	}
	res.end(JSON.stringify(result));
});
router.get('/user/messages', function(req, res) {
	res.setHeader('Content-type','application/json');
	var result = {};
	if (req.session.user_data) {
		result.error = false;
		result.message = 'search user messages successfully';
		result.messages = req.session.user_data.messages;
	} else {
		result.error = true;
		result.message = "you haven't logined";
		result.messages = null;
	}
	res.end(JSON.stringify(result));
});
router.get('/user/homeworks', function(req, res) {
	res.setHeader('Content-type','application/json');
	var result = {};
	if (req.session.user_data) {
		result.error = false;
		result.message = 'search user homeworks successfully';
		result.homeworks = req.session.user_data.homeworks;
	} else {
		result.error = true;
		result.message = "you haven't logined";
		result.homeworks = null;
	}
	res.end(JSON.stringify(result));
});
router.get('/user/relationships', function(req, res) {
	res.setHeader('Content-type','application/json');
	var result = {};
	if (req.session.user_data) {
		result.error = false;
		result.message = 'search user relationships successfully';
		result.relationships = req.session.user_data.relationships;
	} else {
		result.error = true;
		result.message = "you haven't logined";
		result.relationships = null;
	}
	res.end(JSON.stringify(result));
});
router.get('/user/account/:account', function(req, res) {
	res.setHeader('Content-type','application/json');
    var result = {};
    User.s_findByAccount(req.params.account, function(err, data) {
    	if (data) {
	    	if (data.accessible === true) {
	    		result.error = false;
	    		result.message = 'search by account successfully';
	    		result.user_data = data;
	    	} else {
	    		result.error = false;
	    		result.message = 'the account is not accessible ';
	    		result.user_data = null;
	    	}
    	} else {
    		result.error = false;
    		result.message = 'the account does not exists ';
    		result.user_data = null;
    	}
    	res.end(JSON.stringify(result));
    });
});


router.get('/organization/:account', function(req, res) {
	res.setHeader('Content-type','application/json');
    var result = {};
	if (req.session.user_data) {
    	var user_data = req.session.user_data;
    	var account = req.params.account;
    	if (tools.user_in_organization(user_data, account)) {
			Organization.findByAccount(account, function(err,data) {
				result.error = false;
			    result.message = 'search organization successfully';
				result.organization_data = data;
				res.end(JSON.stringify(result));
			});
    	} else {
			result.error = true;
		    result.message = 'you are not in this organization';
			result.organization_data = null;
			res.end(JSON.stringify(result));
    	}
	} else {
		result.error = true;
	    result.message = "you haven't logined";
		result.organization_data = null;
		res.end(JSON.stringify(result));
	}
});
router.get('/organization/:account/homeworks', function(req, res) {
	res.setHeader('Content-type','application/json');
    var result = {};
	if (req.session.user_data) {
    	var user_data = req.session.user_data;
    	var account = req.params.account;
    	if (tools.user_in_organization(user_data, account)) {
			Organization.findByAccount(account, function(err,data_o) {

				result.error = false;
			    result.message = 'search organization homeworks successfully';
				result.homeworks = data_o.homeworks;
				res.end(JSON.stringify(result));
			});
    	} else {
			result.error = true;
		    result.message = 'you are not in this organization';
			result.homeworks = null;
			res.end(JSON.stringify(result));
    	}
	} else {
		result.error = true;
	    result.message = "you haven't logined";
		result.homeworks = null;
		res.end(JSON.stringify(result));
	}
});
router.get('/organization/:account/notices', function(req, res) {
	res.setHeader('Content-type','application/json');
    var result = {};
	if (req.session.user_data) {
    	var user_data = req.session.user_data;
    	var account = req.params.account;
    	if (tools.user_in_organization(user_data, account)) {
			Organization.findByAccount(account, function(err,data_o) {
				result.error = false;
			    result.message = 'search organization notices successfully';
				result.notices = data_o.notices;
				res.end(JSON.stringify(result));
			});
    	} else {
			result.error = true;
		    result.message = 'you are not in this organization';
			result.notices = null;
			res.end(JSON.stringify(result));
    	}
	} else {
		result.error = true;
	    result.message = "you haven't logined";
		result.notices = null;
		res.end(JSON.stringify(result));
	}
});
router.get('/organization/:account/votes', function(req, res) {
	res.setHeader('Content-type','application/json');
    var result = {};
	if (req.session.user_data) {
    	var user_data = req.session.user_data;
    	var account = req.params.account;
    	if (tools.user_in_organization(user_data, account)) {
			Organization.findByAccount(account, function(err,data_o) {
				result.error = false;
			    result.message = 'search organization votes successfully';
				result.votes = data_o.votes;
				res.end(JSON.stringify(result));
			});
    	} else {
			result.error = true;
		    result.message = 'you are not in this organization';
			result.votes = null;
			res.end(JSON.stringify(result));
    	}
	} else {
		result.error = true;
	    result.message = "you haven't logined";
		result.votes = null;
		res.end(JSON.stringify(result));
	}
});
router.get('/organization/:account/members', function(req, res) {
	res.setHeader('Content-type','application/json');
    var result = {};
	if (req.session.user_data) {
    	var user_data = req.session.user_data;
    	var account = req.params.account;
    	if (tools.user_in_organization(user_data, account)) {
			Organization.findByAccount(account, function(err,data_o) {
				result.error = false;
			    result.message = 'search organization members successfully';
				result.members = data_o.members;
				res.end(JSON.stringify(result));
			});
    	} else {
			result.error = true;
		    result.message = 'you are not in this organization';
			result.members = null;
			res.end(JSON.stringify(result));
    	}
	} else {
		result.error = true;
	    result.message = "you haven't logined";
		result.members = null;
		res.end(JSON.stringify(result));
	}
});

router.get('/organization/:account/homework/:id', function(req, res) {
	res.setHeader('Content-type','application/json');
    var result = {};
	if (req.session.user_data) {
    	var user_data = req.session.user_data;
    	var account = req.params.account;
    	var id = req.params.id;
    	if (tools.user_in_organization(user_data, account)) {
			Organization.findByAccount(account, function(err,data_o) {
				var homework = data_o.homeworks.id(id);
				if (homework) {
					for (var i = 0; i < homework.unlooks.length; i++) {
						if (homework.unlooks[i].account === user_data.account) {
							homework.unlooks.splice(i,1);
							tools.update_status(data_o, 'homeworks');
							break;
						}
					}
					User.findByAccount(user_data.account, function(err, data_u) {
						var user_homework = data_u.homeworks.id(id);
						if (user_homework) {
							user_homework.unlook = false;
							tools.update_status(data_u, 'homeworks');
							data_u.save();
							user_data = data_u;
						}
					});
					data_o.save(tools.invalid_data_handler);
				}
				result.homework = homework;
				if (result.homework) {
					result.error = false;
				    result.message = 'search organization homework successfully';
				} else {
					result.error = true;
				    result.message = 'no such homework';
				}
				res.end(JSON.stringify(result));
			});
    	} else {
			result.error = true;
		    result.message = 'you are not in this organization';
			result.homeworks = null;
			res.end(JSON.stringify(result));
    	}
	} else {
		result.error = true;
	    result.message = "you haven't logined";
		result.homework = null;
		res.end(JSON.stringify(result));
	}
});
router.get('/organization/:account/notice/:id', function(req, res) {
	res.setHeader('Content-type','application/json');
    var result = {};
	if (req.session.user_data) {
    	var user_data = req.session.user_data;
    	var account = req.params.account;
    	var id = req.params.id;
    	if (tools.user_in_organization(user_data, account)) {
			Organization.findByAccount(account, function(err,data_o) {
				var notice = data_o.notices.id(id);
				if (notice) {
					for (var i = 0; i < notice.unlooks.length; i++) {
						if (notice.unlooks[i].account === user_data.account) {
							notice.unlooks.splice(i,1);
							tools.update_status(data_o, 'notices');
							break;
						}
					}
					// User.findByAccount(user_data.account, function(err, data_u) {
					// 	data_u.notices.id(id).unlook = false;
					// 	tools.update_status(data_u, 'notices');
					// 	data_u.save();
					// 	user_data = data_u;
					// });
					data_o.save(tools.invalid_data_handler);
				}
				result.notice = notice;
				if (result.notice) {
					result.error = false;
				    result.message = 'search organization notice successfully';
				} else {
					result.error = true;
				    result.message = 'no such notice';
				}
				res.end(JSON.stringify(result));
			});
    	} else {
			result.error = true;
		    result.message = 'you are not in this organization';
			result.notice = null;
			res.end(JSON.stringify(result));
    	}
	} else {
		result.error = true;
	    result.message = "you haven't logined";
		result.notices = null;
		res.end(JSON.stringify(result));
	}
});

// vote doesn't use unlook
router.get('/organization/:account/vote/:id', function(req, res) {
	res.setHeader('Content-type','application/json');
    var result = {};
	if (req.session.user_data) {
    	var user_data = req.session.user_data;
    	var account = req.params.account;
    	var id = req.params.id;
    	if (tools.user_in_organization(user_data, account)) {
			Organization.findByAccount(account, function(err,data_o) {
				result.vote = data_o.votes.id(id);
				if (result.vote) {
					result.error = false;
				    result.message = 'search organization vote successfully';
				} else {
					result.error = true;
				    result.message = 'no such vote';
				}
				res.end(JSON.stringify(result));
			});
    	} else {
			result.error = true;
		    result.message = 'you are not in this organization';
			result.vote = null;
			res.end(JSON.stringify(result));
    	}
	} else {
		result.error = true;
	    result.message = "you haven't logined";
		result.vote = null;
		res.end(JSON.stringify(result));
	}
});
router.get('/organization/account/:account', function(req, res) {
	res.setHeader('Content-type','application/json');
   Organization.s_findByAccount(req.params.account, function(err, data_o) {
   	if (data_o) {
   		result.error = false;
	    result.message = 'search organization successfully';
		result.organization_data = data_o;
		res.end(JSON.stringify(result));
   	} else {
   		result.error = true;
	    result.message = "the organization doesn't exist";
		result.organization_data = null;
		res.end(JSON.stringify(result));
   	}
   }); 
});

module.exports = router;
