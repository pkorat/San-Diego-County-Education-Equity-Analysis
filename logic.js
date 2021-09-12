// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
var myMap = L.map("map", {
  center: [32.98483, -116.73747],
  zoom: 13
});

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Get the json
var datafile = "JSON/sd_master_df_table.json"

var zipcodes = d3.json(datafile).then(function(zipcode) {
  return zipcode.data
})

zipcodes.then(function(data){

  for (var i=0; i < Object.keys(data).length; i++) {

    if (data[i].latitude_x != null) {
      
      console.log(data[i])

      var popupstr = '<h5>Zip code: '+ data[i].zipcode + '</h5><li>Theft Count: ' + data[i]['Theft Count_y'] +
                      '</li><li>Miscellaneous Count: ' + data[i]['Miscellaneous Count_y'] + '</li>'

      L.marker([data[i].latitude_y, data[i].longitude_y])
      .bindPopup(popupstr)
      .addTo(myMap)
    }

  }
})
