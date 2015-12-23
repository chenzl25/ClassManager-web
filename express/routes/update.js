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

// for multer init
var notices_upload = multer({ 
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'uploads', 'notices_images'));
    },
    filename: function (req, file, cb) {
        req.has_real_image = true;
        var tem_image = 'notice'+'-'+req.body.name+'-'+file.fieldname + '-' + Date.now();
        req.body.image = 'notices_images/' + tem_image;
        cb(null, tem_image);
    }
  }),
  limits: {
    fieldNameSize: 100,
    fileSize: 1024*512,
    files: 1,
    fields: 100
  },
  fileFilter: function  (req, file, cb) {
    if (!req.session.user_data) {
      cb(null,false);
    } else {
      console.log('file : ',file.originalname, 'has been uploaded. by account : ', req.session.user_data.account);
      cb(null, true);
    }
  }
});

router.use(tools.refresh);

router.post('/user/homework/:id',function(req, res) {
    console.log(req.body);
    res.setHeader('Content-type','application/json');
    var result = {};
    var input = {};
    var user_data = req.session.user_data;
    var id = req.params.id;
    if (!req.session.user_data) {
        result.error = true;
        result.message = 'you have not logined';
        res.end(JSON.stringify(result));
        return;
    }
    User.findByAccount(user_data.account, function(err, data_u) {
        input.uncomplish = req.body.uncomplish;
        if (typeof input.uncomplish !== 'boolean') {
            result.error = true;
            result.message = 'the uncomplish must be Boolean';
            res.end(JSON.stringify(result));
            return;
        }
        var homework = data_u.homeworks.id(id);
        homework.uncomplish = input.uncomplish;
        tools.update_status(data_u, 'homeworks');
        data_u.save(tools.invalid_data_handler);
        result.error = false;
        result.message = 'update homework successfully';
        res.end(JSON.stringify(result));
    });
});

router.post('/user/message/:id',function(req, res) {
    console.log(req.body);
    res.setHeader('Content-type','application/json');
    var result = {};
    var input = {};
    var user_data = req.session.user_data;
    var id = req.params.id;
    if (!req.session.user_data) {
        result.error = true;
        result.message = 'you have not logined';
        res.end(JSON.stringify(result));
        return;
    }
    User.findByAccount(user_data.account, function(err, data_u) {
        input.unlook = req.body.unlook;
        if (typeof input.unlook !== 'boolean') {
            result.error = true;
            result.message = 'the unlook must be Boolean';
            res.end(JSON.stringify(result));
            return;
        }
        var message = data_u.messages.id(id);
        message.unlook = input.unlook;
        tools.update_status(data_u, 'messages');
        data_u.save(tools.invalid_data_handler);
        result.error = false;
        result.message = 'update message successfully';
        res.end(JSON.stringify(result));
    });
});

router.post('/user/organization/:account/member',function(req, res) {
    console.log(req.body);
    res.setHeader('Content-type','application/json');
    var result = {};
    var input = {};
    var user_data = req.session.user_data;
    var organization_account = req.params.account;
    if (!req.session.user_data) {
        result.error = true;
        result.message = 'you have not logined';
        res.end(JSON.stringify(result));
        return;
    }
    if (!tools.user_in_organization(user_data,organization_account)) {
        result.error = true;
        result.message = 'you are not in this organization';
        res.end(JSON.stringify(result));
        return;
    }
    Organization.findByAccount(organization_account, function(err, data_o) {
        if (data_o === null) {
            result.error = true;
            result.message = "no such organization";
            res.end(JSON.stringify(result));
            return;
        }
        input.name = req.body.name || null;
        if (input.name === null) {
            result.error = true;
            result.message = "the name can't be empty";
            res.end(JSON.stringify(result));
            return;
        }
        for (i = 0; i < data_o.members.length; i++) {
            if (data_o.members[i].account === user_data.account) {
                data_o.members[i].name = input.name;
                break;
            }
        }
        tools.update_status(data_o, 'members');
        data_o.save(tools.invalid_data_handler);
        result.error = false;
        result.message = 'update member name successfully';
        res.end(JSON.stringify(result));
    });
});

router.post('/organization/:account/member/:id',function(req, res) {
    console.log(req.body);
    res.setHeader('Content-type','application/json');
    var result = {};
    var input = {};
    var user_data = req.session.user_data;
    var organization_account = req.params.account;
    var id = req.params.id;
    if (!req.session.user_data) {
        result.error = true;
        result.message = 'you have not logined';
        res.end(JSON.stringify(result));
        return;
    }
    if (!tools.user_is_manager_in_organization(user_data,organization_account)) {
        result.error = true;
        result.message = 'you have not enough power in this organization';
        res.end(JSON.stringify(result));
        return;
    }
    Organization.findByAccount(organization_account, function(err, data_o) {
        if (data_o === null) {
            result.error = true;
            result.message = "no such organization";
            res.end(JSON.stringify(result));
            return;
        }
        input.name = req.body.name || null;
        input.position = req.body.position || null;
        if (input.name === null && input.position === null) {
            result.error = true;
            result.message = "the name and the position cann't be both empty";
            res.end(JSON.stringify(result));
            return;
        } else if (input.position === 'founder') {
            result.error = true;
            result.message = "you cann't update a member to founder";
            res.end(JSON.stringify(result));
            return;
        }
        if (!tools.user_is_founder_in_organization(user_data,organization_account) && input.position === 'manager') {
            result.error = true;
            result.message = 'you have not enough power in this organization to let others be managers';
            res.end(JSON.stringify(result));
            return;
        }
        var member = data_o.members.id(id);
        if (member === null) {
            result.error = true;
            result.message = "no such id in the members";
            res.end(JSON.stringify(result));
            return;
        } else if (member.account === user_data.account) {
            result.error = true;
            result.message = "you cann't update yourself here";
            res.end(JSON.stringify(result));
            return;
        }
        if (input.name !== null) {
            member.name = input.name;
        }
        if (input.position !== null) {
            member.position = input.position;
            User.findByAccount(member.account, function(err, data_u) {
                for (var i = 0; i < data_u.relationships.length; i++) {
                    if (data_u.relationships[i].account === organization_account) {
                        data_u.relationships[i].position = input.position;
                        break;
                    }
                }
                tools.update_status(data_u, 'relationships');
                data_u.save(tools.invalid_data_handler);
            });
        }
        tools.update_status(data_o, 'members');
        data_o.save(tools.invalid_data_handler);
        result.error = false;
        result.message = 'update member successfully';
        res.end(JSON.stringify(result));
    });
});

router.post('/organization/:account/notice/:id',notices_upload.any(),function(req, res) {
    console.log(req.body);
    res.setHeader('Content-type','application/json');
    var result = {};
    var input = {};
    var user_data = req.session.user_data;
    var organization_account = req.params.account;
    var id = req.params.id;
    function handle_wrong_upload() {
        if (req.has_real_image) {
            tools.delete_image(req.body.image, function(err) {
                if (err) {
                    console.log('rm image failed', err);
                } else {
                    console.log('rm image successfully');
                }
            });
        }
    }
    if (!req.session.user_data) {
        result.error = true;
        result.message = 'you have not logined';
        res.end(JSON.stringify(result));
        return;
    }
    if (!tools.user_is_manager_in_organization(user_data,organization_account)) {
        result.error = true;
        result.message = 'you have not enough power in this organization';
        res.end(JSON.stringify(result));
        handle_wrong_upload();
        return;
    }
    Organization.findByAccount(organization_account, function(err, data_o) {
        if (data_o === null) {
            result.error = true;
            result.message = "no such organization";
            res.end(JSON.stringify(result));
            handle_wrong_upload();
            return;
        }
        input.name = req.body.name || null;
        input.content = req.body.content || null;
        if (req.body.deadline) {
            var deadline = parseInt(req.body.deadline);
            input.deadline = new Date(deadline);
            if (input.deadline.getTime === NaN) {
                    result.error = true;
                    result.message = "illeagal deadline";
                    res.end(JSON.stringify(result));
                    handle_wrong_upload();
                    return;
            }
        } else {
            input.deadline = null;
        }
        if (input.name === null && input.content === null &&
            req.has_real_image === undefined && req.deadline === null) {
            result.error = true;
            result.message = "the name ,the content, deadline, and the image cann't be empty at the same time";
            res.end(JSON.stringify(result));
            handle_wrong_upload();
            return;
        }
        
        var notice = data_o.notices.id(id);
        if (notice === null) {
            result.error = true;
            result.message = "no such id in the notices";
            res.end(JSON.stringify(result));
            handle_wrong_upload();
            return;
        }
        if (input.name !== null) {
            notice.name = input.name;
        }
        if (input.content !== null) {
            notice.content = input.content;
        }
        if (input.deadline !== null) {
            notice.deadline = input.deadline;
        }
        if (req.has_real_image) {
            if (notice.image !== null) {
                tools.delete_image(notice.image, function(err) {
                    if (err) {
                        console.log('rm image failed', err);
                    } else {
                        console.log('rm image successfully');
                    }
                });
            }
            notice.image = req.body.image;
        }
        notice.unlooks = data_o.members;
        tools.update_status(data_o, 'notices');
        data_o.save(tools.invalid_data_handler);
        result.error = false;
        result.message = 'update notice successfully';
        res.end(JSON.stringify(result));
    });
});

router.post('/organization/:account/homework/:id',function(req, res) {
    console.log(req.body);
    res.setHeader('Content-type','application/json');
    var result = {};
    var input = {};
    var user_data = req.session.user_data;
    var organization_account = req.params.account;
    var id = req.params.id;
    if (!req.session.user_data) {
        result.error = true;
        result.message = 'you have not logined';
        return;
    }
    if (!tools.user_is_manager_in_organization(user_data,organization_account)) {
        result.error = true;
        result.message = 'you have not enough power in this organization';
        handle_wrong_upload();
        return;
    }
    Organization.findByAccount(organization_account, function(err, data_o) {
        if (data_o === null) {
            result.error = true;
            result.message = "no such organization";
            handle_wrong_upload();
            return;
        }
        input.name = req.body.name || null;
        input.content = req.body.content || null;
        if (req.body.deadline) {
            var deadline = parseInt(req.body.deadline);
            input.deadline = new Date(deadline);
            if (input.deadline.getTime === NaN) {
                    result.error = true;
                    result.message = "illeagal deadline";
                    res.end(JSON.stringify(result));
                    handle_wrong_upload();
                    return;
            }
        } else {
            input.deadline = null;
        }
        if (input.name === null && input.content === null & input.deadline === null) {
            result.error = true;
            result.message = "the name ,the content, and the deadline cann't be empty at the same time";
            res.end(JSON.stringify(result));
            return;
        }
        var homework = data_o.homeworks.id(id);
        if (input.name) {
            homework.name = input.name;
        }
        if (input.content) {
            homework.content = input.content;
        }
        if (input.deadline) {
            homework.deadline = input.deadline;
        }
        homework.unlooks = data_o.members;
        //update every members homework
        for (var i = 0; i < data_o.members.length; i++) {
            User.findByAccount(data_o.members[i].account, function(err, data_m) {
                var homework_m = data_m.homeworks.id(homework.id);
                homework_m.name = homework.name;
                homework_m.content = homework.content;
                homework_m.deadline = homework.deadline;
                homework_m.uncomplish = true;
                homework_m.unlook = true;
                tools.update_status(data_o, 'homeworks');
                data_m.save(tools.invalid_data_handler);
            });
        }

        tools.update_status(data_o, 'homeworks');
        data_o.save(tools.invalid_data_handler);
        result.error = false;
        result.message = 'update homework successfully';
        res.end(JSON.stringify(result));
    });
});

router.post('/organization/:account/vote/:id',function(req, res) {
    console.log(req.body);
    res.setHeader('Content-type','application/json');
    var result = {};
    var input = {};
    var user_data = req.session.user_data;
    var organization_account = req.params.account;
    var id = req.params.id;
    if (!req.session.user_data) {
        result.error = true;
        result.message = 'you have not logined';
        return;
    }
    if (!tools.user_is_manager_in_organization(user_data,organization_account)) {
        result.error = true;
        result.message = 'you have not enough power in this organization';
        handle_wrong_upload();
        return;
    }
    Organization.findByAccount(organization_account, function(err, data_o) {
        if (data_o === null) {
            result.error = true;
            result.message = "no such organization";
            handle_wrong_upload();
            return;
        }
        input.name = req.body.name || null;
        input.content = req.body.content || null;
        if (req.body.options) {
            try {
                input.options = JSON.parse(req.body.options);
                if (input.options instanceof Array === false) {
                    throw Error('your options is not a legal string-like Array');
                }
            } catch (e) {
                console.log(e);
                result.error = true;
                result.message = 'your options is not a legal string-like Array';
                res.end(JSON.stringify(result));
                return;
            }
        }
        if (req.body.deadline) {
            var deadline = parseInt(req.body.deadline);
            input.deadline = new Date(deadline);
            if (input.deadline.getTime === NaN) {
                    result.error = true;
                    result.message = "illeagal deadline";
                    res.end(JSON.stringify(result));
                    handle_wrong_upload();
                    return;
            }
        } else {
            input.deadline = null;
        }
        if (input.name === null && input.content === null & input.deadline === null) {
            result.error = true;
            result.message = "the name ,the content, and the deadline cann't be empty at the same time";
            res.end(JSON.stringify(result));
            return;
        }
        var vote = data_o.votes.id(id);
        if (input.name) {
            vote.name = input.name;
        }
        if (input.content) {
            vote.content = input.content;
        }
        if (input.deadline) {
            vote.deadline = input.deadline;
        }
        if (input.options) {
            for (var i = 0; i < input.options.length; i++) {
                if (input.options[i]._id&& input.options[i].name) {
                    var option = vote.options.id(input.options[i]._id);
                    if (option !== null) {
                        option.name = input.options[i].name;
                    } else {
                        result.error = true;
                        result.message = "some _id of the  options you post is illeagal";
                        res.end(JSON.stringify(result));
                        return;
                    }
                } else {
                    result.error = true;
                    result.message = "the options you post is illeagal";
                    res.end(JSON.stringify(result));
                    return;
                }
            }
        }
        vote.unlooks = data_o.members;
        tools.update_status(data_o, 'votes');
        data_o.save(tools.invalid_data_handler);
        result.error = false;
        result.message = 'update vote successfully';
        res.end(JSON.stringify(result));
    });
});

module.exports = router;
