var starterCoordinates = [36.77, -119.4179];
var mapZoomLevel = 5;

var map = L.map("map", {
    center: starterCoordinates,
    zoom: mapZoomLevel,
    //layers: [lightmap, earthquake]
});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);

  var earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

  var geojsonMarkerOptions = {
    scale: ["#ffffb2", "#b10026"],
        steps: 10,
        mode: "q",
        style:{
            color: "#fff",
            weight: 1, 
            fillOpacity:0.8 }
  };

  L.geoJson(someGreojsonfeature, {
    pointToLayer: function(feature, latlng){
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  }).addTo(map);