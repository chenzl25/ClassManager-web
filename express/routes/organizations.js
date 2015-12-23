//built-in

//middleware
var express = require('express');
var router = express.Router();

//self
var config = require('../config');
var User = require('../database/User');
var Organization = require('../database/Organization');

/* GET users listing. */
router.get('/:account', function(req, res) {
  if (req.session.user_data) {
  	  var user_data = req.session.user_data;
      var ok = false;
      for (var i in user_data.relationships) {
        if (user_data.relationships[i].account == req.params.account) {
          ok = true;
        }
      }
      var result = {};
      if (!ok) {
        if (config.web) {
          res.render('redirect', {layout: false,
                                  host:config.host,
                                  port:config.port,
                                  path:'/user',
                                  time:1,
                                  message:'access organization failed'});
        } else {
          result.error = true;
          result.message = 'you are not in this organization;';
          res.end(JSON.stringify(result));
        }
      } else {
        result.error = null;
        result.message = 'access organization successfully;';
        Organization.findOne({account:req.params.account}).exec(function(err, data) {
          result.organization_data = data;
          if (config.web) {
            console.log('!!!!!');
            res.render('organization', {layout: false,
                                        host:config.host,
                                        port:config.port,
                                        organization_data:data});
          } else {
            res.end(JSON.stringify(result));
          }
        });

      }
  } else {
  	res.redirect('../login');
  }
});

module.exports = router;
