
let school = new L.LayerGroup();
let sdcounty = new L.LayerGroup();

// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
var myMap = L.map("map", {
  center: [33.0414, -116.8793],
  zoom: 9
});

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap);

// Create a baseMaps object.
var baseMaps = {
  "Street Map": street,
  "Topographic Map": topo
};

// Create an overlay object to hold our overlay.
var overlayMaps = {
  "SD Country": sdcounty,
  "School Ranking": school
};

// Create a layer control.
// Pass it our baseMaps and overlayMaps.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
  collapsed: true
}).addTo(myMap);

// Get the json
var url_master = 'https://raw.githubusercontent.com/pkorat/bulldogs-project-3/main/JSON/sd_master_df_table.json'

var url_zip = 'https://raw.githubusercontent.com/pkorat/bulldogs-project-3/722834ff1e5149ff183a18958e09e6929bc87459/JSON/sd_zipcode.geojson'

// Get the data from the json
var zipcodes = d3.json(url_master).then(function(zipcode) {
  return zipcode.data
})

// Specify the colors for the markers by rating of the schools
function getColor(rating) {
  return rating > 9 ? '#1CF036' :
         rating > 8 ? '#6DF215' :
         rating > 7 ? '#9AF10D' :
         rating > 6 ? '#E6F10D' :
         rating > 5 ? '#F1C10D' :
         rating > 4 ? '#F19A0D' :
         rating > 3 ? '#F1720D' :
         rating > 2 ? '#F14E0D' :
                      '#F11F0D';
}

// Create a Intl.NumberFormat object to format popup currency
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// Add markers from the master data. Includes crime stats
zipcodes.then(function(data) {

  var domethinicity = []
  var domethinicitypct = []

  for (var i=0; i < Object.keys(data).length; i++) {

    if (data[i].latitude_y != null) {

      domethinicitypct[i] = Math.max (data[i]['population_white_ratio'], data[i]['population_black_aa_ratio'], data[i]['population_indigenous_ratio'], data[i]['population_asian_ratio'], data[i]['population_haw_pac_islander_ratio'], data[i]['population_other_ratio'], data[i]['population_mixed_ratio'], data[i]['population_hispanic_latino_ratio'])
      
      if (domethinicitypct[i] === data[i]['population_white_ratio']) {
        domethinicity[i] = 'White';
      }
      else if (domethinicitypct[i] === data[i]['population_black_aa_ratio']) {
        domethinicity[i] = 'African American';
      }
      else if (domethinicitypct[i] === data[i]['ppopulation_indigenous_ratio']) {
        domethinicity[i] = 'Indigenous';
      }
      else if (domethinicitypct[i] === data[i]['population_asian_ratio']) {
        domethinicity[i] = 'Asian';
      }
      else if (domethinicitypct[i] === data[i]['population_haw_pac_islander_ratio']) {
        domethinicity[i] = 'Hawaian/Pacific Islander';
      }
      else if (domethinicitypct[i] === data[i]['population_mixed_ratio']) {
        domethinicity[i] = 'Mixed Ethinicity';
      }
      else if (domethinicitypct[i] === data[i]['population_hispanic_latino_ratio']) {
        domethinicity[i] = 'Hispanic/Latino';
      }
      else {
        domethinicity[i] = 'Others';
      }


      var popupstr = '<h5><b>Zipcode: '+ data[i].zipcode + '</b><hr>' +
                      '</h5><li>Average School Rating: ' + data[i]['Average_School_Rating'].toFixed(2) + 
                      '</li><li>Median Income: ' + formatter.format(data[i]['MEDIAN HOUSEHOLD INCOME']) + 
                      '</li><li>Population: ' + new Intl.NumberFormat().format(data[i]['POPULATION_TOTAL']) + 
                      '</li><li>Major Ethinicity: ' + domethinicity[i] + " (" + Math.round(domethinicitypct[i] * 100) + "%)" +
                      '</li><li>Violent Crimes Commited: ' + data[i]['Violent Count_x'] + '</li>'

      //L.marker([data[i].latitude_y, data[i].longitude_y])                
      L.circleMarker(([data[i].latitude_y, data[i].longitude_y]),{
        color: 'black',
        weight: .5,
        radius: (data[i]['POPULATION_TOTAL']/5000),
        fillColor: getColor(data[i]['Average_School_Rating']),
        fillOpacity: 1
        })     
      .bindPopup(popupstr)
      .addTo(school)
    }
  }
})
school.addTo(myMap)

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
//  console.log(layer.feature.properties)

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

// Set the position of the info table to the top left
var info = L.control({position: 'bottomleft'})

// Create add the info table function
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info')
    this.update();
    return this._div;
};

// Using the properties of the feature to update the info table
info.update = function (zipinfo) {
    // Check to see if the property is there to update the info table
    this._div.innerHTML = '<h4><b>Community / Zipcode</b></h4>' +  (zipinfo ?
        '<b>' + zipinfo.community + '</b> / ' + zipinfo.zip + '':'')
};

// Call function to add the info table
info.addTo(myMap);

// Apply the geoJSON to the map layer and onEachFeature
var zipcode_geo = d3.json(url_zip).then(function(bounds) {
  console.log(bounds)
  geojsonlayer = L.geoJSON(bounds, {
    onEachFeature: onEachFeature
  }).addTo(sdcounty)
})
sdcounty.addTo(myMap)

// Set the position of the legend to the bottom right
var legend = L.control({position: 'bottomright'})

// Set the method to call when using on add on the legend
legend.onAdd = function(map) {

  var div = L.DomUtil.create('div', 'legend'),
            rating = [1, 2, 3, 4, 5, 6, 7, 8, 9],
            labels = []
  
  div.innerHTML = '<b> School Rating </b> <br><br>'
  
  for (var i = 0; i < rating.length; i++) {

    div.innerHTML += '<i style=background:' + getColor(rating[i] + 1) + '></i>' + 
                      rating[i] + (rating[i + 1] ? '&ndash;' + rating[i + 1] + '<br>' : '+')
  }

  return div
}

// Add the legend to the map
legend.addTo(myMap)