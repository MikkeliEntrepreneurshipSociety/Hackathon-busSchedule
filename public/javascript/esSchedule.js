var map;
var routePoints = [];

BusStopMarker = L.Marker.extend({
	   options: { 
	      stopdata: ''
	   }
});

map = new L.Map('map', {});

var drawControl = new L.Control.Draw({
    draw: {
        polygon: false,
        polyline: false,
        marker: false,
        rectangle: false
    },
    edit: false
});

map.addControl(drawControl);

/*var osm = new L.tileLayer(
	'http://tiles.kartat.kapsi.fi/ortokuva/{z}/{x}/{y}.jpg', {
	attribution : '&copy; MML'
}).addTo(map);*/ 
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.setView(new L.LatLng(61.68706, 27.27253), 14);

var control = L.Routing.control({
    waypoints: [
    ]
}).addTo(map);

var sidebar = L.control.sidebar('sidebar', {
    position: 'left'
});

map.addControl(sidebar);

var myBtn = document.getElementById('showSideBar');


myBtn.addEventListener('click', function(event) {
	sidebar.show();
});

$.getJSON( "/allStops", function( json ) {
	for(var i = 0; i < json.length; i++){
		createMarker(json[i]);
	}
});

$("#createRoute").click(function(){
	control.setWaypoints(routePoints);
});

$("#deletePoint").click(function(){
	
});

function createMarker(bustop){
	var marker = new BusStopMarker([bustop.LATITUDE, bustop.LONGITUDE], {stopdata : bustop}).addTo(map);
	var pophtml;
	for(var i in bustop){
		pophtml += i+" : "+bustop[i]+"<br/>";
	}
	marker.bindPopup(pophtml);
	marker.on('click', function(e){
		routePoints.push(e.latlng);
		$("#pointList").append("<option>"+e.target.options.stopdata.NAME_SV+"</option>");
	});
}