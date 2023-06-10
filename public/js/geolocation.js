function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    document.getElementById("lat").value = lat;
    document.getElementById('lon').value = lon;

    console.log(lat, lon);
}
function onGeoError() {
    alert("위치 권한을 확인해주세요");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);