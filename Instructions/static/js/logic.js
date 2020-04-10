function creatMap(earthquake){

API_KEY = "pk.eyJ1IjoiY253Njk1IiwiYSI6ImNrOGxvd3p2djBld3Mza3BnMzEyd2VlOGUifQ.VNDB5pV2Ykj0GgXz5EOvUA"

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });
  
var baseMaps = {
    "Light Map": lightmap
};

var overlayMaps = {
    "Earthquakes": earthquake
};

var map = L.map("map", {
    center: [0,0],
    zoom: 12,
    layers: [lightmap, earthquake]
});

L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

    // Pull the "stations" property off of response.data
    var quakes = response.features.type.geometry;
  
    // Initialize an array to hold bike markers
    var quakeMarkers = [];
  
    // Loop through the stations array
    for (var index = 0; index < quakes.coordiantes; index++) {
      var quakes = coordiantes[index];
  
      // For each station, create a marker and bind a popup with the station's name
      var bikeMarker = L.marker([station.lat, station.lon])
        .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
  
      // Add the marker to the bikeMarkers array
      bikeMarkers.push(bikeMarker);
    }
  
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(bikeMarkers));
  }
  
  
  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", createMarkers);
  


var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
}