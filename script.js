const statusEl = document.getElementById("status");
const locationDisplay = document.getElementById("location");
const mapLink = document.getElementById("mapLink");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

let watchId = null;

function setTracking(active) {
  startBtn.disabled = active;
  stopBtn.disabled = !active;
}

function updateLocation(position) {
  const { latitude, longitude, accuracy } = position.coords;

  locationDisplay.textContent =
    `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}, Accuracy: ±${Math.round(accuracy)}m`;
  mapLink.href = `https://www.google.com/maps?q=${latitude},${longitude}`;
  mapLink.hidden = false;
  statusEl.textContent = `Live location updated at ${new Date(position.timestamp).toLocaleTimeString()}`;
}

function handleError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      stopTracking();
      statusEl.textContent = "Location permission was denied. Allow it in your browser settings and try again.";
      break;
    case error.POSITION_UNAVAILABLE:
      statusEl.textContent = "Location is currently unavailable. Still trying...";
      break;
    case error.TIMEOUT:
      // watchPosition keeps retrying after a timeout, so keep the last good fix on screen.
      statusEl.textContent = "Waiting for a GPS fix...";
      break;
    default:
      statusEl.textContent = "Error getting location: " + error.message;
  }
}

function startTracking() {
  if (!("geolocation" in navigator)) {
    statusEl.textContent = "Geolocation is not supported by your browser.";
    return;
  }
  if (!window.isSecureContext) {
    statusEl.textContent = "Location needs a secure page. Open this site over HTTPS or on localhost.";
    return;
  }

  statusEl.textContent = "Requesting your location...";
  setTracking(true);
  watchId = navigator.geolocation.watchPosition(updateLocation, handleError, {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 15000
  });
}

function stopTracking() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  setTracking(false);
  statusEl.textContent = "Location sharing stopped.";
}

startBtn.addEventListener("click", startTracking);
stopBtn.addEventListener("click", stopTracking);
