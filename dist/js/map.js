var markers = [
  {
    title: "Zak's Patio",
    position: { lat: 40.716552, lng: -73.946714 },
    icon: './assets/record_voice_over.svg',
    info:
      '<h4>Zak\'s Patio</h4><div stlye="font-size: 12px;"><div>Cozy outdoor patio with handmade craft cocktails</div><div style="display: flex;"><span style="margin-right: 10px;">Look for:</span><div style="background-image: url(./assets/watermellon.png); background-repeat: no-repeat; width: 15px; height: 15px; background-size: cover;"></div></div></div>',
  },
];

function initMap() {
  var map, infoWindow;
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 15,
    gestureHandling: 'greedy'
  });
  infoWindow = new google.maps.InfoWindow();

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent('you');
        infoWindow.open(map);
        map.setCenter(pos);
      },
      function () {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  markers.forEach(function (marker) {
    var m = new google.maps.Marker({
      position: marker.position,
      map: map,
      title: marker.title,
      icon: marker.icon,
    });
    var infowindow = new google.maps.InfoWindow({
      content: marker.info,
    });
    m.addListener('click', function () {
      infowindow.open(map, m);
    });
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
