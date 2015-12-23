//built-in
var path = require('path');
var crypto = require('crypto');
var url = require('url');
//middleware
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var exphbs  = require('express-handlebars');




//router
var route_home = require('./routes/home');
var route_register = require('./routes/register');
var route_login = require('./routes/login');
var route_users = require('./routes/users');
var route_settings = require('./routes/settings');
var route_organizations = require('./routes/organizations');
var route_search = require('./routes/search');
var route_create = require('./routes/create');
var route_join = require('./routes/join');
var route_vote = require('./routes/vote');
var route_delete = require('./routes/delete');
var route_send = require('./routes/send');
var route_update = require('./routes/update');
//self-database
var db = require('./database/db');
var config = require('./config');

db.init(function(err) {
  if (err) {
    console.log('database open failed');
  } else {
    console.log('database open successfully');
  }
});
//express init
var app = express();
var prefixReduce = function (req, res, next) {
  if (req.url.indexOf('/api') != -1) {
    req.url = req.url.slice(4);
  }
  next();
};
app.use(prefixReduce);


//webpack
// var webpackConfig = require('../webpack.config.dev.js');
// var webpack = require('webpack');
// var compiler = webpack(webpackConfig);
// app.use(require("webpack-dev-middleware")(compiler, {
//     noInfo: true, 
//     publicPath: webpackConfig.output.publicPath,
//     watchOptions: {
//     aggregateTimeout: 300,
//     poll: true
//     },
//     lazy: true,
//     headers: { "X-Custom-Header": "yes" },
//     // custom headers 
   
//     stats: {
//       colors: true
//     }
// }));
// app.use(require("webpack-hot-middleware")(compiler, {
//     // log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
// }));

// webpack dev
// var proxy = require('proxy-middleware');
// app.use('/assets', proxy(url.parse('http://localhost:8081/dist')));
// var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
// var webpackConfig = require('../webpack.config.dev.js');
// var server = new WebpackDevServer(webpack(webpackConfig), {
//     contentBase: path.join(__dirname, '..'),
//     hot: true,
//     quiet: false,
//     noInfo: false,
//     publicPath: "/assets/",

//     stats: { colors: true }
// });
// server.listen(8081, "localhost", function() {});


// view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
// app.enable('view cache');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join('..', 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
//for session init
app.use(session({
  rolling:true,
  secret: 'my_app',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 300000 },
  store: new MongoStore({
    url: config.url_sessions,
    ttl: 600 // = 10 minutes. Default
  }),

}));


app.use('/', route_home);
app.use('/register',route_register);
app.use('/login', route_login);
app.use('/users', route_users);
app.use('/settings', route_settings);
app.use('/organizations', route_organizations);
app.use('/search', route_search);
app.use('/create', route_create);
app.use('/join',route_join);
app.use('/vote', route_vote);
app.use('/send', route_send);
app.use('/update', route_update);
app.use('/', route_delete);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
// if (process.env.NODE_ENV === 'development') {
app.use(function(err, req, res, next) {
  var result = {};
  if (err.code == 'LIMIT_FILE_SIZE') {
    console.log('file too large');
    result.error = true;
    result.message = 'image file is too large;';
    res.end(JSON.stringify(result));
  } else {
      // console.log(err);
      console.log(err.stack);
      res.status(err.status || 500);
      result.error = true;
      result.message = "we couldn't response this url correctly";
      res.end(JSON.stringify(result));
  }
});
// }

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log('product');
  res.status(err.status || 500);
});
module.exports = app;
