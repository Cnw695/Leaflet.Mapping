var starterCoordinates = [39.8283, -98.5795];
var mapZoomLevel = 12;

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

  d3.json(earthquakeData, function(data){
      console.log(data);

      var earthquakes = data.features//.geometry//.coordinates;

      //var quakeMarkers=[]
      for(var index = 0; index < earthquakes.length; index++)
      {
          var earthquake = earthquakes[index];

          var quakeMarker = L.marker([earthquakes.geometry.coordinates[1], earthquakes.geometry.coordinates[0]])
          .bindPopup(earthquake)
      }
    });