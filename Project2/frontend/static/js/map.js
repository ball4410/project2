// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4
  });
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  function markerSize(enrollment){
    return enrollment * 4;
  }

  d3.json("http://127.0.0.1:5000/map").then((data) => {
    console.log(data)

    for(var i=0; i < data.length; i++){
      var color = "";

      if(data[i].type === 'Engineering'){
        color = "blue";
      } else if (data[i].type === 'Ivy League'){
        color = "orange";
      } else if (data[i].type === 'Liberal Arts'){
        color = "green";
      } else if (data[i].type === 'Party'){
        color = "red";
      } else if (data[i].type === 'State'){
        color = "purple"
      } else {
        color = "pink";
      }

      L.circle(data[i].coords, {
        fillOpacity: 0.75,
        color: "white",
        fillColor: color, 
        radius: markerSize(data[i].enrollment)
      }).bindPopup("<h4>" + data[i].schoolName + "</h4><hr> <h6> Enrollment: " + data[i].enrollment + "</h6>").addTo(myMap)
    }
})