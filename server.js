var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , path = require('path')
  , mongo = require('mongodb')
  , Server = mongo.Server
  , Db = mongo.Db
  , ObjectID = mongo.ObjectID;

server.listen(8080);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

var APP_KEY = "21KFOEefweofkewoFEWKEFW";

var MONGO_HOST = "localhost";
var MONGO_PORT = 27017;
var MONGO_DB = "busSchedule";

var dbserver = new Server(MONGO_HOST, MONGO_PORT, {auto_reconnect: true});
var db = new Db(MONGO_DB, dbserver);

db.open(function(err, db) {
	  if(!err) {
	    console.log("Connected to the database");
	  }
});

app.get('/', function (req, res) {
	  res.sendfile(__dirname + '/index.html');
});

app.get('/closestStop/:lat/:lng/:destination/:time?', function(req, res) {
	var time;
	if(!req.params.time){
		time = Date.now();
	}else{
		time = req.params.time;
	}
	console.log("Looking for stop near lat:"+req.params.lat+" lng:"+req.params.lng+" time:"+time);
	res.send("Finding closest stop");
	db.collection("busStops", function(err, collection) {
		collection.find().toArray(function(err, items) {
			if(!err){
				res.send(items);
			}
		});
	});

});

app.get('/lines', function (req, res) {
	console.log("Available lines:xxxxx");
});

app.get('/buspositions', function (req, res) {
	//Get buss positions
});

app.get('/allStops', function (req, res) {
	db.collection("busStops", function(err, collection) {
		collection.find().toArray(function(err, items) {
			if(!err){
				res.send(items);
			}
		});
	});
});

app.post('/buslocation', function (req, res) {
	var coordinates = req.body.coords;
	var line = req.body.line;
	var secret = req.body.secret;
	var time = Date.now();
	if (secret === APP_KEY){
		//ADD TO DATABASE
	}
});