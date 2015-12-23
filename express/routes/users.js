//built-in

//middleware
var express = require('express');
var router = express.Router();

//self
var config = require('../config');
var User = require('../database/User');
var Organization = require('../database/Organization');

/* GET users listing. */
router.get('/', function(req, res) {
  if (req.session.user_data) {
  	  var user_data = req.session.user_data;
  	  res.render('user', {layout: false,
  	  					  host:config.host,
                  port:config.port,
  	  					  user_data:user_data});
  } else {
  	res.redirect('../login');
  }
});

module.exports = router;
