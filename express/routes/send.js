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

router.use(tools.refresh);

router.post('/:receiver_account', function(req, res) {
	console.log(req.body);
    res.setHeader('Content-type','application/json');
    var result = {};
    var input = {};
    var user_data = req.session.user_data;
    var receiver_account = req.params.receiver_account;
    if (!req.session.user_data) {
        result.error = true;
        result.message = 'you have not logined';
        res.end(JSON.stringify(result));
        return;
    }
    User.findByAccount(receiver_account, function(err, data_r) {
    	if (data_r === null) {
    		result.error = true;
            result.message = 'no such user';
            res.end(JSON.stringify(result));
            return;
    	}
    	input.name = 'User Message';
    	input.content = req.body.content || null;
    	input.sender = user_data.account || null;
    	if (input.content === null) {
    		result.error = true;
            result.message = 'the content of the message can not be empty';
            res.end(JSON.stringify(result));
            return;
    	}
    	tools.send_message(receiver_account, input);
    	result.error = false;
        result.message = 'send message successfully';
        res.end(JSON.stringify(result));
    });
});
module.exports = router;