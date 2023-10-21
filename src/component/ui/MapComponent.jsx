import React,{useEffect} from "react";
import '../../styles/MapComponent.css';
const {kakao} = window;

function MapComponent() {
    useEffect(()=>{
        const mapContainer = document.getElementById('map'); // 지도를 표시할 div 
        const mapOptions = {
            center: new kakao.maps.LatLng(35.771152381440724, 127.93716313603966), // 지도의 중심좌표
            level: 13    //지도의 확대 레벨
        };
        const map = new kakao.maps.Map(mapContainer,mapOptions);

        const imageSrc = 'https://www.hotelrestaurant.co.kr/data/photos/20181252/art_15456112727329_344f19.bmp';
        const imageSize = new kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
        const imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        // 마커가 표시될 위치입니다 
        // const markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667); 
        // const content = "<div>overlay표시</div>"

        // const customOverlay = new kakao.maps.CustomOverlay({
        //     position: markerPosition,
        //     content: content   
        // });
        const markerImage = new kakao.maps.MarkerImage(imageSrc,imageSize,imageOption)
        const markerPosition = new kakao.maps.LatLng(35.15804987174618, 129.15991896087684);
        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
            map: map,
            position: markerPosition,
            image: markerImage,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
    }, [])

    return (
        <div id="map" className="map"></div>
    )
}

export default MapComponent;