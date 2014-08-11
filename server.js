
/**
 * Module dependencies.
 */

var express = require('express')
, app = express()
, bodyParser = require('body-parser')
, routes = require('./routes')
, api = require('./routes/api')
, http = require('http')
, server = http.createServer(app)
, path = require('path')
, mongo = require('mongodb')
, Server = mongo.Server
, Db = mongo.Db
, ObjectID = mongo.ObjectID;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/admin', routes.admin);

app.get('/api/closestStop/:lat/:lng/:destination/:time?', api.closest);
app.get('/api/lines', api.lines);
app.get('/api/buspositions', api.busLocations);
app.get('/api/allStops', api.stops);

app.post('/api/addroute', api.addRoute);
app.post('/api/buslocation', api.addBusLocation);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
