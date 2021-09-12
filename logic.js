// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
var myMap = L.map("map", {
  center: [33.0414, -116.8793],
  zoom: 9
});

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Get the json
var datafile = "JSON/sd_master_df_table.json"

var url_zip = 'https://raw.githubusercontent.com/pkorat/bulldogs-project-3/722834ff1e5149ff183a18958e09e6929bc87459/JSON/sd_zipcode.geojson'

var zipcodes = d3.json(datafile).then(function(zipcode) {
  return zipcode.data
})

zipcodes.then(function(data){

  for (var i=0; i < Object.keys(data).length; i++) {

    if (data[i].latitude_x != null) {
      
      console.log(data[i])

      // var popupstr = '<h5>Zip code: '+ data[i].zipcode + '</h5><li>Theft Count: ' + data[i]['Theft Count_y'] +
      //                 '</li><li>Miscellaneous Count: ' + data[i]['Miscellaneous Count_y'] + '</li>'

      // L.marker([data[i].latitude_y, data[i].longitude_y])
      // .bindPopup(popupstr)
      // .addTo(myMap)
    }

  }
})


// Apply the geoJSON to the map layer and onEachFeature
var zipcode_geo = d3.json(url_zip).then(function(bounds) {
  geojsonlayer = L.geoJSON(bounds, {
    onEachFeature: onEachFeature
  }).addTo(myMap)
})

// Style of the layer
function style(feature) {
  return {
    weight: 3,
    opacity: 1,
    color: '#3388ff',
    fillOpacity: 0.2,
    lineCap: 'round',
    lineJoin: 'round'
  };
}

// Highlight feature with mouseover
function highlightFeature(e) {
  resetHighlight(e);
  var layer = e.target;

  layer.setStyle({
    weight: 3,
    opacity: 1,
    color: '#3388ff',
    fillOpacity: 0.9,
    lineCap: 'round',
    lineJoin: 'round'
  });
}

// Reset the highlighted feature after mouseout
function resetHighlight(e) {
  geojsonlayer.setStyle(style);
}

// Zoom on the zipcode boundary
function zoomToFeature(e) {
  myMap.fitBounds(e.target.getBounds());
}

// Highlight the mouseover and zoom into feature
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}