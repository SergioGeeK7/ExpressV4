var path            = require('path');
var express         = require('express');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var csrf            = require('csurf');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var compress        = require('compression');
var helmet          = require('helmet');
var morgan          = require('morgan')
var config          = require('./config.json');
var app             = express();

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet.xframe());
app.use(helmet.iexss());
app.use(helmet.contentTypeOptions());
app.use(helmet.cacheControl());
app.use(cookieParser());
app.use(methodOverride());
app.use(session(config.express.sessions));
app.use(csrf());
app.use(compress());
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app