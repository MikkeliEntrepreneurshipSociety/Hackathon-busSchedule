var mongo = require('mongodb')
 , Server = mongo.Server
 , Db = mongo.Db
 , ObjectID = mongo.ObjectID;

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

exports.closest = function(req, res) {
	var time;
	if(!req.params.time){
		time = Date.now();
	}else{
		time = req.params.time;
	}
	//TODO: Query for closest bus stop
	console.log("Looking for stop near lat:"+req.params.lat+" lng:"+req.params.lng+" time:"+time);
	res.send("Finding closest stop");
	db.collection("busStops", function(err, collection) {
		collection.find().toArray(function(err, items) {
			if(!err){
				res.send(items);
			}
		});
	});

};

exports.lines = function (req, res) {
	console.log("Available lines:xxxxx");
};

exports.busLocations = function (req, res) {
	//TODO: implement feature
};

exports.stops = function (req, res) {
	db.collection("busStops", function(err, collection) {
		collection.find().toArray(function(err, items) {
			if(!err){
				res.send(items);
			}
		});
	});
};

exports.addRoute = function (req, res) {
	var data = req.body.busroute;
	var routeObj = JSON.parse(data);
	db.collection("busRoutes", function(err, collection){
		collection.insert(routeObj, function(error, items) {
			if(!error){
				console.log("inserted route");
				res.send("done");
			}
		});
	});
};

exports.addBusLocation = function (req, res) {
	var coordinates = req.body.coords;
	var line = req.body.line;
	var secret = req.body.secret;
	var time = Date.now();
	if (secret === APP_KEY){
		//ADD TO DATABASE
	}
};