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

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.setView(new L.LatLng(61.68706, 27.27253), 14);

var control = L.Routing.control({
    waypoints: [
    ]
}).addTo(map);


$.getJSON( "/api/allStops", function( json ) {
	for(var i = 0; i < json.length; i++){
		createMarker(json[i]);
	}
});

function createMarker(bustop){
	var marker = new BusStopMarker([bustop.LATITUDE, bustop.LONGITUDE], {stopdata : bustop}).addTo(map);
	var pophtml;
	for(var i in bustop){
		pophtml += i+" : "+bustop[i]+"<br/>";
	}
	marker.bindPopup(pophtml);
    marker.on('mouseover', function (e) {
        this.openPopup();
    });
    marker.on('mouseout', function (e) {
        this.closePopup();
    });
	marker.on('click', function(e){
		routePoints.push(e.target.options.stopdata);
		$("#pointList").append("<option>"+e.target.options.stopdata.STOP_ID+"</option>");
	});
}