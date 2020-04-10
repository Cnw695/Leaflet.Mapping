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

  var geojson;

  d3.json(earthquakeData, function(data){
      console.log(data);
      geojson = L.choropleth(data, {
          valueProperty: "mag",
          scale: ["#ffffb2", "#b10026"],
          steps: 10,
          mode: "q",
          style:{
              color: "#fff",
              weight: 1, 
              fillOpacity:0.8
          },
          onEachFeature: function(feature, layer){
              layer.bindPopup("magnitude:" + features.properties.mag )
          }
      }).addTo(map);
    
      //var earthquakes = response.features//.geometry//.coordinates;

      //var quakeMarkers=[]
    //   for(var index = 0; index < response.length; index++)
    //   {
    //       var location = response[index].geometry;

    //       if(location){
    //           L.marker([location.coordinates[1], location.coordinates[0]]).addTo(map);
    //       }
          


        //   var quakeMarker = L.marker([earthquakes.geometry.coordinates[1], earthquakes.geometry.coordinates[0]])
        //   .bindPopup(earthquake)
    //   };
    });