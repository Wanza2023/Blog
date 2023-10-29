import React,{useEffect,useState} from "react";
import '../../styles/MapComponent.css';
const {kakao} = window;

const MapComponent= (props) => {
    // props.data 로 PersonalHome에 있는 posts 배열에 접근가능
    // 위치정보에 대한 정보를 저장하고 뿌려줄수있도록해야함

    const [localArray, setLocalArray] = useState([]);
    
    useEffect(() => {
        if (props.posts && Array.isArray(props.posts)) {
            const firstSchedules = props.posts.map(post => post.schedules ? post.schedules[0] : null).filter(Boolean);
            setLocalArray(firstSchedules);
        }
    }, [props.posts]);


    useEffect(() => {
        const mapContainer = document.getElementById('map');
        const mapOptions = {
            center: new kakao.maps.LatLng(35.771152381440724, 127.93716313603966),
            level: 13
        };
        const map = new kakao.maps.Map(mapContainer, mapOptions);
        
        const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        
        // schedule에서 필요한 데이터만 저장
        const positions = localArray.map(schedule => ({
            title: schedule.location, 
            latlng: new kakao.maps.LatLng(schedule.longitude, schedule.latitude)
        }));
        for (var i=0; i < positions.length; i++) {
            var marker = new kakao.maps.Marker({
                position: positions[i].latlng
            })
        }
        marker.setMap(map)
        for (var i = 0; i < positions.length; i++) {
            // 마커 이미지 크기
            var imageSize = new kakao.maps.Size(24, 35); 
            
            // 마커 이미지 생성
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

            var marker = new kakao.maps.Marker({
                map: map,
                position: positions[i].latlng,
                title: positions[i].title,
                image : markerImage
            });
            console.log("Marker created for position:", positions[i]);
            marker.setMap(map);
        }
    }, [localArray]);

    return (
        <>
            <div id="map" className="map"></div>
        </>
    )
}

export default MapComponent;