// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
var myMap = L.map("map", {
  center: [32.98483, -116.73747],
  zoom: 13
});

var datafile = "JSON/sdcrime_geography.json"

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json(datafile).then(function(data) {
  for (var i = 0; i <= data.data.length; i++) {
    
    var marker = L.marker([data.data[i].latitude, data.data[i].longitude], {
    draggable: false,
    }).addTo(myMap);   
  }
});

// Creating a new marker:
// We pass in some initial options, and then add the marker to the map by using the addTo() method.
//var marker = L.marker([32.98483, -116.73747], {
//  draggable: true,
//  title: "My First Marker"
//}).addTo(myMap);

// Binding a popup to our marker
//marker.bindPopup("Hello There!");
