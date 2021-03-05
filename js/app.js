// Initialize map
var map = L.map('map', {
    // Center map at the City of Calgary
    center:[51, -114], 
    zoom: 10
});

//OpenStreetMap display
var OpenStreetMap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

leaflet.control.scale().addTo(this.leaf);

// define a blank geoJSON Layer
var buildings = L.geoJSON(null);

//get the geojson data with ajax, and add it to the blank layer we created
/*
$.getJSON('../data/bui.geojson',function(data){
	buildings.addData(data);
	map.fitBounds(buildings.getBounds());
});

// finally add the layer to the map
buildings.addTo(map);
*/

// Fetch Building Permit API

