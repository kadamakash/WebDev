
var express = require('express'); // loading the express library
var http = require('https');
var app = express();              // creating an instance of express lib
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var uuid = require('node-uuid');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');

// creating default connection string
var connectionString ='mongodb://127.0.0.1:27017/webDevAssignment';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);

app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({
    secret: "MySecret",
    resave: false,
    saveUnitialized: true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

require("./public/assignment/server/app.js")(app, uuid, db, mongoose);
require("./public/project/server/app.js")(app, uuid, db, mongoose);

app.get('/hello', function(req,res){
    res.send('hello world');
});

app.listen(port, ipaddress);
