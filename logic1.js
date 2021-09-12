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

function getColor(rating) {
  if (rating > 9) {
    return "#1CF036";
  }
  else if (rating > 8) {
    return "#6DF215";
  } 
  else if (rating > 7) {
    return "#9AF10D";
  } 
  else if (rating > 6) {
    return "#E6F10D";
  } 
  else if (rating > 5) {
    return "#F1C10D";
  } 
  else if (rating > 4) {
    return "#F19A0D";
  } 
  else if (rating > 3) {
    return "#F1720D";
  } 
  else if (rating > 2) {
    return "#F14E0D";
  } 
  else {
    return "#F11F0D"; 
  }
}

// Add markers from the master data. Includes crime stats
zipcodes.then(function(data) {

  for (var i=0; i < Object.keys(data).length; i++) {

    if (data[i].latitude_y != null) {

      var popupstr = '<h5>Zip code: '+ data[i].zipcode + '<hr>' +
                      '</h5><li>Theft Count: ' + data[i]['Theft Count_y'] + 
                      '</li><li>Miscellaneous Count: ' + data[i]['Miscellaneous Count_y'] + '</li>'

      //L.circleMarker([data[i].latitude_y, data[i].longitude_y])                
      L.circleMarker(([data[i].latitude_y, data[i].longitude_y]),{
        color: getColor(data[i]['Average_School_Rating']),
        radius: (data[i]['POPULATION_TOTAL']/5000),
        fillColor: getColor(data[i]['Average_School_Rating']),
        fillOpacity: 1
        })     
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