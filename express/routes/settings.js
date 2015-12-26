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
var users_upload = multer({ 
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'uploads', 'users_images'));
    },
    filename: function (req, file, cb) {
      req.has_real_image = true;
      var tem_image = req.session.user_data.account+'-'+file.fieldname + '-' + Date.now();
      console.log(req.unformat_upload, '!!');
      req.body.image = 'users_images/' + tem_image;
      console.log(req.body.image, '!!');
      cb(null, tem_image);
    }
  }),
  limits: {
    fieldNameSize: 100,
    fileSize: 1024*500,
    files: 1,
    fields: 100
  },
  fileFilter: function  (req, file, cb) {
    if (!req.session.user_data) {
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
   	//{ fieldname: 'image',
    // originalname: 'atplus_green.png',
    // encoding: '7bit',
    // mimetype: 'image/png' }
  }
});

var organizations_upload = multer({ 
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'uploads', 'organizations_images'));
    },
    filename: function (req, file, cb) {
      req.has_real_image = true;
      var tem_image = req.params.account+'-'+file.fieldname + '-' + Date.now();
      req.body.image = 'organizations_images/' +tem_image;
      cb(null, tem_image);
    }
  }),
  limits: {
    fieldNameSize: 100,
    fileSize: 1024*500,
    files: 1,
    fields: 100
  },
  fileFilter: function  (req, file, cb) {
    if (!req.session.user_data) {
      cb(null,false);
    } else {
      console.log(file);
      // if (!/image\/*/.test(file.mimetype)) {
        if (!/image\/*/.test(file.mimetype) && file.mimetype != 'application/octet-stream') {
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

router.get('/user', function(req, res) {
  if (req.session.user_data) {
	  var user_data = req.session.user_data;
	  res.render('settings', {layout: false,
	  												host:config.host,
	  												port:config.port,
		  					  					user_data:user_data});
  }
});

router.post('/user',users_upload.single('image'),function(req,res) {
  console.log(req.body);
  res.setHeader('Content-type','application/json');
  if (req.unformat_upload === true) {
    var result = {};
    result.error = true;
    result.message = 'the file you upload is not a image';
    res.end(JSON.stringify(result));
  }
	if (req.session.user_data) {
		var input = {};
        var result = {};
        input.account = req.body.account || null;
        input.password = req.body.password || null;
        input.name = req.body.name || null;
        input.nick_name = input.name || null;
        input.student_id =req.body.student_id || null;
        input.email = req.body.email || null;
        input.image = req.body.image || null;
        input.gender = req.body.gender || null;
        input.school = req.body.school || null;
        input.age = req.body.age || null;
        input.signature = req.body.signature || null;
        input.accessible = req.body.accessible || null;
        input.qq= req.body.qq || null;
        input.wechat = req.body.wechat|| null;
        input.phone = req.body.phone || null;
    	result = validator.validate_settings_user(input);
    	if (result.error) {
            if (req.has_real_image) {
                fs.unlink(path.join(__dirname, '..', 'uploads', req.body.image), function(err) {
                    if (err) {
                        console.log('rm image failed', err);
                    } else {
                        console.log('rm image successfully');
                    }
                });
            }
            res.end(JSON.stringify(result));    
        } else {
        	var user_data = req.session.user_data;
        	var image_changed = false;
        	var image_before_empty = user_data.image === null ? true : false;
        	if (input.image == user_data.image || input.image === null) {
        		image_changed = false;
        	} else {
        		image_changed = true;
        	}
        	var before_image = user_data.image;
          if (image_changed) {
            user_data.image = input.image;
          }
        	User.findOne({_id:user_data._id}).exec(function(err, data_u) {
            var keys = Object.keys(input);
            var cnt = 0;
            for (var i in keys) {
              if (input[keys[i]] !== null && input[keys[i]] !== data_u[keys[i]]) {
                data_u[keys[i]] = input[keys[i]];
                cnt++;
              }
            }
            if (cnt > 0) {
        		  for (i in data_u.status) {
                if (data_u.status[i].name === 'self') {
                  data_u.status[i].code = Math.random();
                }
              }
            }
            var query = [];
            for (i = 0; i < data_u.relationships.length; i++) {
              query.push({account:data_u.relationships[i].account});
            }
            Organization.find({$or:query}).exec(function(err, datas) {
              if (datas) {
                for (i = 0; i < datas.length; i++) {
                  for (var j = 0; j < datas[i].members.length; j++) {
                    if (datas[i].members[j].account === data_u.account) {
                      datas[i].members[j].student_id = data_u.student_id;
                      datas[i].members[j].image = data_u.image;
                      break;
                    }
                  }
                  datas[i].save(tools.invalid_data_handler);
                }
              }
            });
        		data_u.save(tools.invalid_data_handler());
            req.session.user_data = data_u;
    	    	if (image_changed && !image_before_empty) {
    		    	fs.unlink(path.join(__dirname, '..', 'uploads', before_image), function(err) {
    		    		if (err) {
    		    			console.log('rm image failed by ', user_data.account, err);
    		    		} else {
    		    			console.log('rm image successfully by ', user_data.account);
                  result.message = 'settings successfully';
  				        res.end(JSON.stringify(result));
    		    		}
    		    	});
    	    	} else {
                result.message = 'settings successfully';
    		        res.end(JSON.stringify(result));
    	    	}
        	});
  	    }
	}
});

router.post('/organization/:account', organizations_upload.single('image'),function(req, res) {
  // console.log(req.body);
  res.setHeader('Content-type','application/json');
  if (req.unformat_upload === true) {
    var result = {};
    result.error = true;
    result.message = 'the file you upload is not a image';
    res.end(JSON.stringify(result));
  }
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
  if (!user_in_organization(user_data,organization_account, result)) {
    result.error = true;
    res.end(JSON.stringify(result));
  }
  input.account = req.body.account || null;
  input.password = req.body.password || null;
  input.name = req.body.name || null;
  input.image = req.body.image || null;
  input.school = req.body.school || null;
  result = validator.validate_settings_organization(input);
  if (result.error) {
    if (req.has_real_image) {
        fs.unlink(path.join(__dirname, '..', 'uploads', req.body.image), function(err) {
            if (err) {
                console.log('rm image failed', err);
            } else {
                console.log('rm image successfully');
            }
        });
    }
    res.end(JSON.stringify(result));
  }
  Organization.findOne({account:organization_account}).exec(function(err,data) {
      if (!data) {
        return;
      }
      var image_changed = false;
      var image_before_empty = data.image === null ? true : false;
      if (input.image == data.image || input.image === null) {
        image_changed = false;
      } else {
        image_changed = true;
      }
      var before_image = data.image;
      // if (image_changed) {
      //   data.image = input.image;
      // }
      var keys = Object.keys(input);
      var change_keys = [];
      var cnt = 0;
      for (var i in keys) {
        if(keys[i] == 'image') {
        }
        if (input[keys[i]] !==  null && input[keys[i]] !== data[keys[i]]) {
          data[keys[i]] = input[keys[i]];
          cnt++;
          change_keys.push(keys[i]);
        }
      }
      if (cnt > 0) {
        for (i in data.status) {
          if (data.status[i].name === 'self') {
            data.status[i].code = Math.random();
          }
        }
        var query = [];
        for (i = 0; i< data.members.length; i++) {
          query.push({account:data.members[i].account});
        }
        User.find({$or:query}).exec(function(err, datas) {
          for (var j = 0; j < datas.length; j++) {
            var rel = datas[j].relationships;
            for (var k = 0;k < rel.length; k++) {
              if (rel[k].account === organization_account) {
                for (var m = 0; m < change_keys.length; m++) {
                  if (rel[k][change_keys[m]] !== undefined) {
                    rel[k][change_keys[m]] = input[change_keys[m]];
                  }
                }
                break;
              }
            }
            datas[j].save(tools.invalid_data_handler);
          }
        });
      }
      data.save(tools.invalid_data_handler());
      if (image_changed && !image_before_empty) {
        fs.unlink(path.join(__dirname, '..', 'uploads', before_image), function(err) {
          if (err) {
            console.log('rm image failed by ', user_data.account, err);
          } else {
            console.log('rm image successfully by ', user_data.account);
            result.message = 'settings successfully';
            res.end(JSON.stringify(result));
          }
        });
      } else {
          result.message = 'settings successfully';
          res.end(JSON.stringify(result));
      }
  });
});

function user_in_organization(user, account, result) {
  var ok = false;
  for (var i =0; i < user.relationships.length; i++) {
    if (  user.relationships[i].account === account) {
      if (user.relationships[i].position === 'founder' || 
          user.relationships[i].position === 'manager') {
        return true;
      } else {
        result.message ='you have no enough privilege';
        return false;
      }
    }
  }
  result.message='you are not in this organization';
  return ok;
}
module.exports = router;
