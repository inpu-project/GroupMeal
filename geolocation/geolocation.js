function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`,
    {headers:{Authorization: `KakaoAK ${process.env.KAKAO_REST_API}`}}
    )
    .then(res=>{
        console.log(res.data.documents)
        dispatch(changeRegion(res.data.documents[0].address.region_1depth_name))
        dispatch(changeCity(res.data.documents[0].address.region_2depth_name))
    })
    .catch(e=>console.log(e))
}

function onGeoError() {
    alert("위치 권한을 확인해주세요");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)