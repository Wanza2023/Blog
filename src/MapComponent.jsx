import React,{useEffect} from "react";
import './styles/MapComponent.css';
const {kakao} = window;

function MapComponent() {
    useEffect(()=>{
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
        const map = new kakao.maps.Map(container,options);
    }, [])

    return (
        <div id="map" className="map"></div>
    )
}

export default MapComponent;