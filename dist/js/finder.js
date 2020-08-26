var places = [
  {
    title: "Zak's Patio",
    position: { lat: 40.716552, lng: -73.946714 },
    icon: './assets/record_voice_over.svg',
    info:
      '<h4>Zak\'s Patio</h4><div stlye="font-size: 12px;"><div>Cozy outdoor patio with handmade craft cocktails</div><div style="display: flex;"><span style="margin-right: 10px;">Look for:</span><div style="background-image: url(./assets/watermellon.png); background-repeat: no-repeat; width: 15px; height: 15px; background-size: cover;"></div></div></div>',
  },
  {
    title: 'Nick\'s House',
    position: { lat: 40.671570, lng: -73.939529},
    icon: '',
    info: ''
  }
];

window.onload = () => {
  const scene = document.querySelector('a-scene');
  // first get current user location
  return navigator.geolocation.getCurrentPosition(function () {
    places.forEach((place) => {
      const latitude = place.position.lat;
      const longitude = place.position.lng;
      // add place name
      const placeText = document.createElement('a-link');
      placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
      placeText.setAttribute('title', place.title);
      placeText.setAttribute('scale', '15 15 15');
                  
      placeText.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
      });

      scene.appendChild(placeText);
      console.log('link added at ', latitude, longitude);
    });
  },
  (err) => console.error('Error in retrieving position', err),
  {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 27000,
  }
  );
};


// if (window.DeviceOrientationEvent) {
//   console.log('ADDED DEVICE ORIENTATION LISTENER');
//   // Listen for the deviceorientation event and handle the raw data
//   window.addEventListener('deviceorientation', function (eventData) {
//     var compassdir;
//     if (event.webkitCompassHeading) {
//       // Apple works only with this, alpha doesn't work
//       compassdir = event.webkitCompassHeading;
//     } else compassdir = event.alpha;
//     document.getElementById('heading').value = compassdir;
//   });
// }

// function getLocation() {
//   // Try HTML5 geolocation.
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       function (position) {
//         console.log('POSITION = ', position);
//         var heading =
//           position.coords.heading === null
//             ? 'Unable to read compass heading'
//             : position.coords.heading;
//         console.log('HEADING = ', heading);
//         console.log('HEADING EL = ', document.getElementById('heading'));
//         document.getElementById('heading').setAttribute('value', heading);
//       },
//       function () {
//         handleLocationError(true);
//       }
//     );
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false);
//   }
// }

// function handleLocationError(browserHasGeolocation) {
//   console.log(
//     browserHasGeolocation
//       ? 'Error: The Geolocation service failed.'
//       : "Error: Your browser doesn't support geolocation."
//   );
// }

// getLocation();
