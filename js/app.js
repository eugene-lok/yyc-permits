new Litepicker({
  element: document.getElementById('datepicker'),
  singleMode: false,
  tooltipText: {
    one: 'night',
    other: 'nights'
  },
  tooltipNumber: (totalDays) => {
    return totalDays - 1;
  }
})

// Get date range 
document.getElementById('getRange').addEventListener('click', function() {
  let dateStr = document.getElementById('datepicker').value;
  const dateLength = 10;
  let startDate = dateStr.substring(0,dateLength);
  let endDate = dateStr.slice(-dateLength);
  console.log(startDate);
  console.log(endDate);
  getPermits(startDate,endDate);
});

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
const getPermits = (startDate, endDate) => {
  console.log(startDate);
  console.log(endDate);
  markers.clearLayers();
  // startDate,endDate,workGroup,contractor,commName,address
  const url = 'https://data.calgary.ca/resource/c2es-76ed.geojson?' + '$where=issueddate > ' + '\'' + startDate + '\'' + ' and issueddate < ' + '\'' + endDate + '\'';
  //const url = 'https://data.calgary.ca/resource/c2es-76ed.geojson?' + '$where=issueddate > ' + '\'' + '2021-01-02' + '\'' + ' and issueddate < ' + '\'' + '2021-03-05' + '\'';
  console.log(url);
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data.features.length != 0) {
      document.getElementById('badQuery').style.display = "none";
      document.getElementById('goodQuery').style.display = "flex";
      document.getElementById('goodQuery').innerHTML = data.features.length + " building permits were loaded.";
      for (let el of data.features) {
        console.log(el);
        const allFields = ['issueddate','workclassgroup','contractorname','communityname','originaladdress'];
        if (el.geometry != null) {
          let lat = parseFloat(el.properties.latitude);
          let lon = parseFloat(el.properties.longitude);
          
          let permitDetails = {};
          // Check if permit details exist 
          for (let field of allFields) {
            if (el.properties.hasOwnProperty(field) && el.properties[field] != null) {
              permitDetails[field] = el.properties[field];
            }
            else {
              permitDetails[field] = 'No Info';
            }
          }
          
          if (el.properties.hasOwnProperty('latitude')) {
            let marker = new L.marker([lat,lon]);
            marker.bindPopup(
              "<ul>" +
              "<li> Issue Date: " + permitDetails['issueddate'] + "</li>" +
              "<li> Work Class: " + permitDetails['workclassgroup'] + "</li>" +
              "<li> Contractor: " + permitDetails['contractorname'] + "</li>" +
              "<li> Community: " + permitDetails['communityname'] + "</li>" +
              "<li> Address: " + permitDetails['originaladdress'] + "</li>" +
              "</ul>"
            );
            markers.addLayer(marker);
          }
        }
      }
    map.addLayer(markers);
    }
    else {
      // Display alert
      document.getElementById('goodQuery').style.display = "none";
      document.getElementById('badQuery').innerHTML = "Date range invalid or no permits were found.";
      document.getElementById('badQuery').style.display = "flex";
    }
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


