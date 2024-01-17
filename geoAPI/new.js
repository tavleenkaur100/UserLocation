// document.addEventListener("DOMContentLoaded", function () {
//   const map = L.map("map").setView([0, 0], 13);
//   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

//   let latitudeElement = document.getElementById("latitude");
//   let longitudeElement = document.getElementById("longitude");

//   document.getElementById("getLocation").addEventListener("click", getLocation);

//   function getLocation() {
//       if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(showPosition, showError, { enableHighAccuracy: true });

//       } else {
//           alert("Geolocation is not supported by this browser.");
//       }
//   }

//   function showPosition(position) {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;

//       map.setView([latitude, longitude], 13);
//       L.marker([latitude, longitude]).addTo(map);

//       latitudeElement.textContent = `Latitude: ${latitude.toFixed(6)}`;
//       longitudeElement.textContent = `Longitude: ${longitude.toFixed(6)}`;
//   }

//   function showError(error) {
//       switch (error.code) {
//           case error.PERMISSION_DENIED:
//               alert("User denied the request for Geolocation.");
//               break;
//           case error.POSITION_UNAVAILABLE:
//               alert("Location information is unavailable.");
//               break;
//           case error.TIMEOUT:
//               alert("The request to get user location timed out.");
//               break;
//           case error.UNKNOWN_ERROR:
//               alert("An unknown error occurred.");
//               break;
//       }
//   }
// });



document.addEventListener("DOMContentLoaded", function () {
    const map = L.map("map").setView([0, 0], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    




    let latitudeElement = document.getElementById("latitude");
    let longitudeElement = document.getElementById("longitude");
    let addressElement = document.getElementById("address");
  
    document.getElementById("getLocation").addEventListener("click", getLocation);
  
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError, { enableHighAccuracy: true });
  
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
  
    function showPosition(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        map.setView([latitude, longitude], 13);
        L.marker([latitude, longitude]).addTo(map);
  
        latitudeElement.textContent = `Latitude: ${latitude.toFixed(6)}`;
        longitudeElement.textContent = `Longitude: ${longitude.toFixed(6)}`;
  
        // Reverse geocoding to get address
        fetch(`https://apis.mapmyindia.com/advancedmaps/v1/0182db53aca51dfc9348801681beab86/rev_geocode?lat=${latitude}&lng=${longitude}`)
            .then(response => response.json())
            .then(data => {
                const formattedAddress = data.results[0].formatted_address || "Address not available";
                addressElement.textContent = `Address: ${formattedAddress}`;
            })
            .catch(error => {
                console.error('Error fetching address:', error);
                addressElement.textContent = "Address not available";
            });
    }
  
    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }
    }
  });
  
// 