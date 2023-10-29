import React,{useEffect,useState} from "react";
import '../../styles/MapComponent.css';
const {kakao} = window;

const MapComponent= (props) => {
    // props.data 로 PersonalHome에 있는 posts 배열에 접근가능
    // 위치정보에 대한 정보를 저장하고 뿌려줄수있도록해야함

    const [localArray, setLocalArray] = useState([]);
    useEffect(() => {
        setLocalArray(props.posts);
        }, [props.posts]);
    const scheduleArr = Object.keys(localArray)
        .filter(key => key === 'schedules')
        .reduce((obj, key) => {
            obj[key] = localArray[key];
            return obj
        },{})

    const onClickCheck = () => {
        console.log(localArray);
        console.log(scheduleArr);
    }

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
    }, [localArray]);

    return (
        <>
            <button onClick={onClickCheck}>데이터확인</button>
            <div id="map" className="map"></div>
        </>
    )
}

export default MapComponent;