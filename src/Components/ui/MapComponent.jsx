import React,{useEffect} from "react";
import '../../styles/MapComponent.css';
const {kakao} = window;

function MapComponent() {
    useEffect(()=>{
        const container = document.getElementById('map'); // 지도를 표시할 div 
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 10    //지도의 확대 레벨
        };
        const map = new kakao.maps.Map(container,options);
        // 마커가 표시될 위치입니다 
        const markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667); 

        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
    }, [])

    return (
        <div id="map" className="map"></div>
    )
}

export default MapComponent;