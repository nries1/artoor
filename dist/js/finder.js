if (window.DeviceOrientationEvent) {
  console.log('ADDED DEVICE ORIENTATION LISTENER');
  // Listen for the deviceorientation event and handle the raw data
  window.addEventListener('deviceorientation', function (eventData) {
    var compassdir;
    if (event.webkitCompassHeading) {
      // Apple works only with this, alpha doesn't work
      compassdir = event.webkitCompassHeading;
    } else compassdir = event.alpha;
    document.getElementById('heading').value = compassdir;
  });
}

function getLocation() {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log('POSITION = ', position);
        var heading =
          position.coords.heading === null
            ? 'Unable to read compass heading'
            : position.coords.heading;
        console.log('HEADING = ', heading);
        console.log('HEADING EL = ', document.getElementById('heading'));
        document.getElementById('heading').setAttribute('value', heading);
      },
      function () {
        handleLocationError(true);
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false);
  }
}

function handleLocationError(browserHasGeolocation) {
  console.log(
    browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : "Error: Your browser doesn't support geolocation."
  );
}

getLocation();
