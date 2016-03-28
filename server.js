
var express = require('express'); // loading the express library
var http = require('https');
var app = express();              // creating an instance of express lib
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var uuid = require('node-uuid');
var session = require('express-session');

app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());
app.use(session({secret: "MySecret",
    resave: false,
    saveUnitialized: true}));

require("./public/assignment/server/app.js")(app,uuid);
require("./public/project/server/app.js")(app,uuid);

app.get('/hello', function(req,res){
    res.send('hello world');
});

app.listen(port, ipaddress);
