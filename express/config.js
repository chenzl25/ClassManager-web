var options = {
  db: {},
  server: { poolSize: 5 },
  user: '',
  pass: ''
};
var url_sessions = 'mongodb://localhost:27017/sessions';
var url_db = 'mongodb://localhost:27017/app';
module.exports.options = options;
module.exports.url_sessions = url_sessions;
module.exports.url_db = url_db;
// module.exports.host = '172.18.68.129';
module.exports.host = 'localhost';
module.exports.port = 3000;
module.exports.web = false;
