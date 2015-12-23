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
// var upload = multer({ 
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, '..', 'uploads', 'users_images'));
//     },
//     filename: function (req, file, cb) {
//       var tem_image = req.body.account+'-'+file.fieldname + '-' + Date.now();
//       req.body.image = 'users_images/' + tem_image;
//       cb(null, tem_image);
//     }
//   }),
//   limits: {
//     fieldNameSize: 100,
//     fileSize: 1024*512,
//     files: 1,
//     fields: 100
//   },
//   fileFilter: function  (req, file, cb) {
//     console.log('file : ',file.originalname, 'has been uploaded. by account : ', req.body.account);
//     cb(null, true);
//    	//{ fieldname: 'image',
//     // originalname: 'atplus_green.png',
//     // encoding: '7bit',
//     // mimetype: 'image/png' }
//   }
// });

router.get('/user', function(req,res) {
  res.render('register_user', {host:config.host,port:config.port});
});

router.post('/user',function(req, res) {
  console.log(req.body);
  res.setHeader('Content-type','application/json');
  var input = {};
  input.account = req.body.account || null;
  input.password = req.body.password || null;
  input.name = req.body.name || null;
  input.nick_name = input.name || null;
  input.student_id =req.body.student_id || null;
  input.email = req.body.email || null;
  // input.image = req.body.image || null;
  input.gender = req.body.gender || null;
  input.school = req.body.school || null;
  input.age = req.body.age || null;
  input.signature = req.body.signature || null;
  input.accessible = req.body.accessible || null;
  input.qq= req.body.qq || null;
  input.wechat = req.body.wechat|| null;
  input.phone = req.body.phone || null;
  input.status = [];
  input.status.push({name:'self', code:Math.random()});
  input.status.push({name:'homeworks', code:Math.random()});
  input.status.push({name:'relationships', code:Math.random()});
  input.status.push({name:'messages', code:Math.random()});
  var result = validator.validate_register_user(input);
  if (result.error) {
    res.end(JSON.stringify(result));
  } else {
    input.password = crypto.createHash('sha1')
                 .update(input.password)
                 .digest('base64');
    User.find({account:input.account})
        .count()
      .exec(function(err,data) {
        if (data === 0) {
          var user = User(input);
          user.save(tools.invalid_data_handler);
          result.message='register successfully';
          res.end(JSON.stringify(result));
        } else {
          
            result.error = true;
            result.message = 'the account has been registered;';
            res.end(JSON.stringify(result));
        }
      });
  }
});


router.get('/organization', function(req, res) {
  console.log(req.body);
  if (req.session.user_data) {
    res.render('register_organization', {host:config.host,port:config.port});
  } else {
    res.render('home', {host:config.host,
                        port:config.port});
  }
});
router.post('/organization', function(req, res) {
  res.setHeader('Content-type','application/json');
  console.log(req.body);
  var user_data = req.session.user_data;
  var result = {};
  if (!req.session.user_data) {
    result.error = true;
    result.message = 'you have not logined';
    res.end(JSON.stringify(result));
  }
  var input = {};
  input.account = req.body.account || null;
  input.password = req.body.password || null;
  input.name = req.body.name || null;
  // input.image = req.body.image || null;
  input.school = req.body.school || null;
  input.members_num = req.body.members_num ? parseInt(req.body.members_num) : 0;
  input.status = [];
  input.status.push({name:'self', code:Math.random()});
  input.status.push({name:'homeworks', code:Math.random()});
  input.status.push({name:'notices', code:Math.random()});
  input.status.push({name:'votes', code:Math.random()});
  input.status.push({name:'members', code:Math.random()});
  input.status.push({name:'joiners', code:Math.random()});
  result = validator.validate_register_organization(input);
  if (result.error) {
    res.end(JSON.stringify(result));
  } else {
    Organization.find({account:input.account})
        .count()
      .exec(function(err,data) {
        if (data === 0) {
          var organization = Organization(input);
          organization.members.push({student_id:user_data.student_id,
                                     account:user_data.account,
                                     position: 'founder',
                                     name: user_data.name,
                                     nick_name:user_data.nick_name});
          User.findOne({account:user_data.account}).exec(function(err, data) {
            data.relationships.push({
              position:"founder",
              account: organization.account,
              name: organization.name
            });
            data.save();
            req.session.user_data = data;
          });
          organization.save(tools.invalid_data_handler);
          result.message = 'register successfully';
          res.end(JSON.stringify(result));
        } else {
          result.error = true;
          result.message = 'the account has been registered;';
          res.end(JSON.stringify(result));
        }
      });
  }
});



// router.post('/test',function(req, res) {
//   var user = User({account:req.body.account, password: req.body.password});
//   User.findOne({account:'14331048'}).exec(function(err,data) {
//     console.log('find');
//     setTimeout(function(){
//     console.log(req.body); 
//     },3000);
//   });
//   console.log('end');
//   res.end('ok');
// });

module.exports = router;