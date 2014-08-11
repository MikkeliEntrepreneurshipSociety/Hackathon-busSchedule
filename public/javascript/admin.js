$("#createRoute").click(function(){
	routeCoords = [];
	for(var i = 0; i < routePoints.length;i++){
		routeCoords.push(L.latLng(routePoints[i].LATITUDE, routePoints[i].LONGITUDE));
	}
	control.setWaypoints(routeCoords);
});

$("#saveRoute").click(function(){
	var routename = prompt("Route name:", "Route 666");
	if(routename != null){
		var route = {
				name : routename,
				busstops : routePoints
		}
		console.log(JSON.stringify(route));
		$.post("/api/addroute", {busroute : JSON.stringify(route)}, function(data){
			console.log("done");
		});
	}
});

$("#deletePoint").click(function(){
	
});