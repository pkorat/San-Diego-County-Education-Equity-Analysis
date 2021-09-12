



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
var url_master = 'https://raw.githubusercontent.com/pkorat/bulldogs-project-3/main/JSON/sd_master_df_table.json'

var url_zip = 'https://raw.githubusercontent.com/pkorat/bulldogs-project-3/722834ff1e5149ff183a18958e09e6929bc87459/JSON/sd_zipcode.geojson'

// Get the data from the json
var zipcodes = d3.json(url_master).then(function(zipcode) {
  return zipcode.data
})

// Add markers from the master data. Includes crime stats
zipcodes.then(function(data) {

  for (var i=0; i < Object.keys(data).length; i++) {

    if (data[i].latitude_y != null) {

      var popupstr = '<h5>Zip code: '+ data[i].zipcode + '</h5><li>Theft Count: ' + data[i]['Theft Count_y'] +
                      '</li><li>Miscellaneous Count: ' + data[i]['Miscellaneous Count_y'] + '</li>'

      L.marker([data[i].latitude_y, data[i].longitude_y])
      .bindPopup(popupstr)
      .addTo(myMap)
    }
  }
})

// Apply the geoJSON to the map layer and onEachFeature
var zipcode_geo = d3.json(url_zip).then(function(bounds) {
  console.log(bounds)
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
  console.log(layer.feature.properties)

  layer.setStyle({
    weight: 3,
    opacity: 1,
    color: '#3388ff',
    fillOpacity: 0.9,
    lineCap: 'round',
    lineJoin: 'round'
  });

  info.update(layer.feature.properties)
}

// Reset the highlighted feature after mouseout
function resetHighlight(e) {
  geojsonlayer.setStyle(style);
  info.update()
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

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Community / Zipcode</h4>' +  (props ?
        '<b>' + props.community + '</b> <br>' + props.zip + '':'')
};

info.addTo(myMap);

var heatmapLayer = L.TileLayer.heatMap({
  // radius could be absolute or relative
  // absolute: radius in meters, relative: radius in pixels
  //radius: { value: 15000, absolute: true },
  radius: { value: 20, absolute: false },
  opacity: 0.8,
  gradient: {
      0.15: "rgb(0,0,255)",
      0.35: "rgb(0,255,255)",
      0.65: "rgb(0,255,0)",
      0.95: "yellow",
      1.0: "rgb(255,0,0)"
  }
});

heatmapLayer.setData(testData.data);