// Initialize map
const map = L.map('map', {
    // Center map at the City of Calgary
    center:[51, -114], 
    zoom: 10
});

//OpenStreetMap display
const OpenStreetMap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let markers = new L.markerClusterGroup({
  spiderifyOnMaxZoom: true,
  addLayers: 'chunkedLoading' 
});

// Fetch Building Permit API
const getPermits = async(ay) => {
  markers.clearLayers();
  // startDate,endDate,workGroup,contractor,commName,address
  const url = 'https://data.calgary.ca/resource/c2es-76ed.json';
  fetch(url)
  .then(response => response.json())
  .then(data => {
    for (let el of data) {
      // Check if permit details exist 
      const allFields = ['issuedate','workclassgroup','contractorname','communityname','originaladdress'];
      let lat = el.latitude;
      let lon = el.longitude;
      
      let permitDetails = {};
      
      for (let field of allFields) {
        if (el.hasOwnProperty(field)) {
          permitDetails[field] = el[field];
        }
        else {
          permitDetails[field] = 'No Info';
        }
      }
      console.log(permitDetails);
      if (!el.hasOwnProperty('location')) {
        continue;
      }
      else {
        //.addTo(map);
        let marker = new L.marker([lat,lon]);
        marker.bindPopup(
          "<ul>" +
          "<li> Issue Date: " + permitDetails['issuedate'] + "</li>" +
          "<li> Work Class: " + permitDetails['workclassgroup'] + "</li>" +
          "<li> Contractor: " + permitDetails['contractorname'] + "</li>" +
          "<li> Community: " + permitDetails['communityname'] + "</li>" +
          "</ul>"
        );
        markers.addLayer(marker);
      }
    }
    map.addLayer(markers);
  });
/*
getPermits().then(permitData => {
  console.log(permitData);
  for (let el of permitData) {
    let lat = el.latitude;
    let lon = el.longitude;
    if (lat === 'undefined' && lon === 'undefined') {
      continue;
    }
    else {
      console.log(lon);
      L.marker([lat,lon]).addTo(map);
    }
  };
})
*/
}

const ayo = "ay";
getPermits(ayo)
