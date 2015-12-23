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

router.post('/organization/:account',function(req, res) {
	console.log(req.body);
    res.setHeader('Content-type','application/json');
    var result = {};
    var input = {};
    var user_data = req.session.user_data;
    var account = req.params.account;
    if (!req.session.user_data) {
        result.error = true;
        result.message = 'you have not logined';
        res.end(JSON.stringify(result));
        return;
    }
    if (!tools.user_in_organization(user_data,account)) {
        result.error = true;
        result.message = 'you are not in this organization';
        res.end(JSON.stringify(result));
        return;
    }
    Organization.findByAccount(account, function(err, data_o) {
        if (data_o === null) {
            result.error = true;
            result.message = 'no such organization';
            res.end(JSON.stringify(result));
            return;
        }
        input.vote_id = req.body.vote_id || null;
        input.option_id = req.body.option_id || null;
        var vote = data_o.votes.id(input.vote_id);
        var option = vote.options.id(input.option_id);
        if (input.vote_id === null) {
        	result.message = 'your vote_id is empty';
        } else if (input.option_id === null){
        	result.message = 'your option_id is empty';
        } else if (vote === null) {
        	result.message = 'no such vote in this organization';
        } else if (option === null) {
        	result.message = 'no such option in this vote';
        }
        if (result.message) {
        	result.error = true;
        	res.end(JSON.stringify(result));
        	return;
        }

        //delete the user from the unvotes, if he have not voted
        for (var i = 0; i < vote.unvotes.length; i++) {
			if (vote.unvotes[i].account === user_data.account) {
				option.supporters.push(vote.unvotes[i]);
				vote.unvotes.splice(i,1);
				tools.update_status(data_o, 'votes');
		        data_o.save(tools.invalid_data_handler);
		        result.error = false;
		        result.message = 'vote successfully';
		        res.end(JSON.stringify(result));
				return;
			}
		}

		result.error = true;
		result.message = 'you have voted before';
		res.end(JSON.stringify(result));
    });
});
module.exports = router;