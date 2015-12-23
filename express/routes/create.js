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
        console.log(req.unformat_upload, '!!');
        req.body.image = 'notices_images/' + tem_image;
        console.log(req.body.image, '!!');
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
    if (!req.session.user_data || req.body.name === undefined || req.body.content === undefined) {
      cb(null,false);
    } else {
      console.log(file);
      if (!/image\/*/.test(file.mimetype)) {
        console.log('not image file has been uploaded by', req.session.user_data.account);
        req.unformat_upload = true;
        cb(null, false);
      } else {
          console.log('file : ',file.originalname, 'has been uploaded. by account : ', req.session.user_data.account);
          cb(null, true);
      }
    }
  }
});

router.use(tools.refresh);

router.post('/organization/:account/homework', function(req, res) {
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
    if (!tools.user_is_manager_in_organization(user_data,account)) {
        result.error = true;
        result.message = 'you have no enough power in this organization';
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
        input.name = req.body.name || null;
        input.content = req.body.content || null;
        // input.deadline = Date(req.body.dealine) || null;
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
        input.unlooks = data_o.members;
        if (input.name === null || input.content === null) {
            result.error = true;
            result.message = "the name and content of the homework cann't be empty ";
            res.end(JSON.stringify(result));
            return;
        }
        data_o.homeworks.push(input);
        data_o.save(tools.invalid_data_handler);
        tools.add_homework_members(data_o,
            data_o.homeworks[data_o.homeworks.length-1]);

        result.error = false;
        result.message = 'create homework successfully';
        res.end(JSON.stringify(result));
    });
});


router.post('/organization/:account/notice', notices_upload.single('image'),function(req, res) {
    console.log(req.body);
    res.setHeader('Content-type','application/json');
    var result = {};
    var input = {};
    var user_data = req.session.user_data;
    var account = req.params.account;
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
    if (!tools.user_is_manager_in_organization(user_data,account)) {
        result.error = true;
        result.message = 'you have no enough power in this organization';
        res.end(JSON.stringify(result));
        handle_wrong_upload();
        return;
    }
    Organization.findByAccount(account, function(err, data_o) {
        if (data_o === null) {
            result.error = true;
            result.message = 'no such organization';
            res.end(JSON.stringify(result));
            handle_wrong_upload();
            return;
        }
        input.name = req.body.name || null;
        input.content = req.body.content || null;
        input.image = req.body.image || null;
        // input.deadline = Date(req.body.dealine) || null;
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
        input.unlooks = data_o.members;
        if (input.name === null || input.content === null) {
            result.error = true;
            result.message = "the name and content of the notice cann't be empty ";
            res.end(JSON.stringify(result));
            return;
        }
        data_o.notices.push(input);
        data_o.save(tools.invalid_data_handler);

        result.error = false;
        result.message = 'create notice successfully';
        res.end(JSON.stringify(result));
    });
});

router.post('/organization/:account/vote', function(req, res) {
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
    if (!tools.user_is_manager_in_organization(user_data,account)) {
        result.error = true;
        result.message = 'you have no enough power in this organization';
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

        input.name = req.body.name || null;
        input.content = req.body.content || null;
        // input.deadline = Date(req.body.dealine) || null;
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
        if (input.name === null || input.content === null) {
            result.error = true;
            result.message = "the name and content of the vote cann't be empty ";
            res.end(JSON.stringify(result));
            return;
        }
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
        for (var i = 0; i < input.options.length; i++) {
            input.options[i] = {name:input.options[i]};
        }
        input.unvotes = data_o.members;
        data_o.votes.push(input);
        data_o.save(tools.invalid_data_handler);

        result.error = false;
        result.message = 'create vote successfully';
        res.end(JSON.stringify(result));
    });
});
module.exports = router;
