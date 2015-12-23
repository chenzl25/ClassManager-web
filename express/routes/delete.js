//built-in
var path = require('path');
var crypto = require('crypto');
var fs = require('fs');
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

router.delete('/organization/:account',function(req, res) {
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
    if (!tools.user_is_founder_in_organization(user_data,account)) {
        result.error = true;
        result.message = 'you are not the founder of this organization';
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
        var message_for_founder = {
            name:'Server Message',
            content: 'delete organization '+data_o.name+' successfully',
            sender: '#Server#'
        };
        //this method will update the status for message
        tools.send_message(user_data.account, message_for_founder);
        var message_for_others = {
            name:'Server Message',
            content: data_o.name + ' has been ungrouped by the founder ' + user_data.name,
            sender: '#Server#'
        };
        for (var i = 0; i < data_o.members.length; i++) {
            tools.ungroup(data_o.members[i].account, data_o.account);
            if (data_o.members[i].account !== user_data.account)
                tools.send_message(data_o.members[i].account, message_for_others);
        }

        //delete the image about the organization
        for (i = 0; i < data_o.notices.length; i++) {
            if (data_o.notices[i].image !== null) {
                fs.unlink(path.join(__dirname, '..', 'uploads', data_o.notices[i].image), function(err) {
                    if (err) {
                        console.log('rm image failed by ', user_data.account, err);
                    } else {
                        console.log('rm image successfully by ', user_data.account);
                    }
                });
            }
        }
        if (data_o.image !== null) {
            fs.unlink(path.join(__dirname, '..', 'uploads', data_o.image),function(err) {
                if (err) {
                    console.log('rm image failed by ', user_data.account, err);
                } else {
                    console.log('rm image successfully by ', user_data.account);
                }
            });
        }

        Organization.remove({account:data_o.account})
                    .exec(function(err, result) {
                        if (result.result.ok) {
                            console.log('delete organization successfully');
                        }
                    });
		result.error = false;
		result.message = 'delete organization successfully';
		res.end(JSON.stringify(result));
    });
});
router.delete('/organization/:organization_account/member/:member_account',function(req, res) {
    console.log(req.body);
    res.setHeader('Content-type','application/json');
    var result = {};
    var input = {};
    var user_data = req.session.user_data;
    var organization_account = req.params.organization_account;
    var member_account = req.params.member_account;
    if (!req.session.user_data) {
        result.error = true;
        result.message = 'you have not logined';
        res.end(JSON.stringify(result));
        return;
    }
    if (user_data.account === member_account) {
        result.error = true;
        result.message = 'you can not exclude yourself in this url';
        res.end(JSON.stringify(result));
        return;
    }
    if (!tools.user_is_manager_in_organization(user_data,organization_account)) {
        result.error = true;
        result.message = 'you are not the manager of this organization';
        res.end(JSON.stringify(result));
        return;
    }
    var member_data = null;
    User.findByAccount(member_account,function(err, data) {
        if (err) {
            console.log('error in User.findByAccount ',err);
        } else {
            member_data = data;
            if (member_data === null || !tools.user_in_organization(member_data, organization_account)) {
                result.error = true;
                result.message = 'the member you want to exclude is not in this organization';
                res.end(JSON.stringify(result));
                return;
            }
            if (!tools.user_is_founder_in_organization(user_data,organization_account) && 
                 tools.user_is_manager_in_organization(member_data, organization_account)) {
                result.error = true;
                result.message = 'you have no enough power to exclude this member';
                res.end(JSON.stringify(result));
                return;
            }
            Organization.findByAccount(organization_account, function(err, data_o) {
                if (data_o === null) {
                    result.error = true;
                    result.message = 'no such organization';
                    res.end(JSON.stringify(result));
                    return;
                }
                var message = {
                    name:'Server Message',
                    content: 'you has been excluded from this organization '+ 
                             data_o.name + ' by ' + user_data.name,
                    sender: '#Server#'
                };
                //this method will update the status for message
                tools.send_message(member_account, message);
                tools.exclude(member_account, organization_account);

                result.error = false;
                result.message = 'delete organization member successfully';
                res.end(JSON.stringify(result));
            });
        }
    });
});

router.delete('/organization/:account/homework/:id',function(req, res) {
    console.log(req.body);
    res.setHeader('Content-type','application/json');
    var result = {};
    var input = {};
    var user_data = req.session.user_data;
    var account = req.params.account;
    var id = req.params.id;
    if (!req.session.user_data) {
        result.error = true;
        result.message = 'you have not logined';
        res.end(JSON.stringify(result));
        return;
    }
    if (!tools.user_is_manager_in_organization(user_data,account)) {
        result.error = true;
        result.message = 'you are not the manager of this organization';
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

        var homework = data_o.homeworks.id(id);
        if (homework === null) {
            result.error = true;
            result.message = 'no such homework';
            res.end(JSON.stringify(result));
            return;
        } else {
            homework.remove();
            data_o.save(tools.invalid_data_handler);
        }
        result.error = false;
        result.message = 'delete homework successfully';
        res.end(JSON.stringify(result));
    });
});

router.delete('/organization/:account/notice/:id',function(req, res) {
    console.log(req.body);
    res.setHeader('Content-type','application/json');
    var result = {};
    var input = {};
    var user_data = req.session.user_data;
    var account = req.params.account;
    var id = req.params.id;
    if (!req.session.user_data) {
        result.error = true;
        result.message = 'you have not logined';
        res.end(JSON.stringify(result));
        return;
    }
    if (!tools.user_is_manager_in_organization(user_data,account)) {
        result.error = true;
        result.message = 'you are not the manager of this organization';
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

        var notice = data_o.notices.id(id);
        if (notice === null) {
            result.error = true;
            result.message = 'no such notice';
            res.end(JSON.stringify(result));
            return;
        } else {
            //delete the image of notice
            if (notice.image !== null) {
                fs.unlink(path.join(__dirname, '..', 'uploads', notice.image), function(err) {
                  if (err) {
                    console.log('rm image failed by ', user_data.account, err);
                  } else {
                    console.log('rm image successfully by ', user_data.account);
                  }
                });
            }
            notice.remove();
            data_o.save(tools.invalid_data_handler);
            result.error = false;
            result.message = 'delete notice successfully';
            res.end(JSON.stringify(result));
        }
    });
});

router.delete('/organization/:account/vote/:id',function(req, res) {
    console.log(req.body);
    res.setHeader('Content-type','application/json');
    var result = {};
    var input = {};
    var user_data = req.session.user_data;
    var account = req.params.account;
    var id = req.params.id;
    if (!req.session.user_data) {
        result.error = true;
        result.message = 'you have not logined';
        res.end(JSON.stringify(result));
        return;
    }
    if (!tools.user_is_manager_in_organization(user_data,account)) {
        result.error = true;
        result.message = 'you are not the manager of this organization';
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

        var vote = data_o.votes.id(id);
        if (vote === null) {
            result.error = true;
            result.message = 'no such vote';
            res.end(JSON.stringify(result));
            return;
        } else {
            vote.remove();
            data_o.save(tools.invalid_data_handler);
        }
        result.error = false;
        result.message = 'delete vote successfully';
        res.end(JSON.stringify(result));
    });
});

router.delete('/user/organization/:account',function(req, res) {
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
    if (tools.user_is_founder_in_organization(user_data,account)) {
        result.error = true;
        result.message = 'because you are founder in this organization,'+
                         "you can't quit the organization in this url";
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
        tools.exclude(user_data.account, account);
        result.error = false;
        result.message = 'quit the organization successfully';
        res.end(JSON.stringify(result));
    });
});

module.exports = router;