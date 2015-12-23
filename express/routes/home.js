var path = require('path');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var config = require('../config');
var file = null;
// 	file = fs.readFileSync(path.resolve('..', 'dist', 'index.html'), 'utf8');
// /* GET home page. */
// router.get('/', function(req, res, next) {
// 		res.setHeader('Content-type','text/html');
//     res.end(file);
// });
// router.get('/download',function(req, res) {
//   var options = {
//     root: path.join(__dirname,'..' , '/uploads/'),
//     dotfiles: 'deny',
//     headers: {
//         'x-timestamp': Date.now(),
//         'x-sent': true
//     }
//   };
//   res.sendFile('a.png', options, function(err) {
//     if (err) {
//       console.log('sendfile failed');
//     } else {
//       console.log('sendfile successfully');
//     }
//   });
//   // res.download(path.join(__dirname, 'Gruntfile.js'), 'grunt.js',function(err) {
//   //   if (err) {
//   //     console.log('sendfile failed');
//   //   } else {
//   //     console.log('sendfile successfully');
//   //   }
//   // });
// });
module.exports = router;
