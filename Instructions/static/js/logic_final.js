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

 
d3.json(earthquakeData, function(data){
  

  function getColor(i) {
    return i > 5 ? '#F30' :
    i > 4  ? '#F60' :
    i > 3  ? '#F90' :
    i > 2  ? '#FC0' :
    i > 1   ? '#FF0' :
              '#9F3';
  }

  function markerSize(mag) {
    return mag * 4;
  }
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, {
        // radius: markersize(feature.properties.mag),
        radius: (feature.properties.mag)*4,
        fillColor: getColor(feature.properties.mag)
    })
  },
    // We set the style for each circleMarker using our styleInfo function.
    // style: styleInfo,
    // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(map);

  var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 1, 2, 3, 4, 5],
                labels = [];
    // loop through density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
    };
    legend.addTo(map);

    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json", 
    function(data){
        L.geoJson(data, {
            color: "red",
        }).addTo(map);
    })








    
});