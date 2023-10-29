import React,{useEffect,useState} from "react";
import '../../styles/MapComponent.css';
import { useNavigate } from "react-router";
const {kakao} = window;

const MapComponent= (props) => {
    const {nickName, posts} = props;
    const navigate = useNavigate();
    
    // props.data 로 PersonalHome에 있는 posts 배열에 접근가능
    // 위치정보에 대한 정보를 저장하고 뿌려줄수있도록해야함
    
    useEffect(() => {
        if (props.posts && Array.isArray(props.posts)) {
            const firstSchedules = props.posts.map(post => {
                const schedule = post.schedules ? post.schedules[0] : null;
                const content = schedule && post.contents ? post.contents : null;
                if (schedule && content) {
                    // 이미지 변환
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(content, "text/html");
                    const imgElement = doc.querySelector("img");
                    const imgSrc = imgElement ? imgElement.getAttribute("src") : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
                    
                    return {
                        schedule: schedule,
                        imgSrc: imgSrc
                    };
                }
                return null;
            }).filter(Boolean);
            setLocalArray(firstSchedules);
        }
    }, [props.posts]);


    const [localArray, setLocalArray] = useState([]);

    useEffect(() => {
        const mapContainer = document.getElementById('map');
        const mapOptions = {
            center: new kakao.maps.LatLng(35.771152381440724, 127.93716313603966),
            level: 13
        };
        const map = new kakao.maps.Map(mapContainer, mapOptions);
        
        const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        
        // schedule에서 필요한 데이터만 저장
        const positions = localArray.map(({schedule,imgSrc}) => ({
            title: schedule.location, 
            latlng: new kakao.maps.LatLng(schedule.longitude, schedule.latitude),
            boardId: schedule.boardId,
            imgSrc: imgSrc
        }));

        console.log(localArray);

        for (var i = 0; i < positions.length; i++) {
            // 마커 이미지 크기
            var imageSize = new kakao.maps.Size(24, 35); 
            
            // 마커 이미지 생성
            var markerImage = new kakao.maps.MarkerImage(positions[i].imgSrc, imageSize)

            var marker = new kakao.maps.Marker({
                map: map,
                position: positions[i].latlng,
                title: positions[i].title,
                image : markerImage
            });
            kakao.maps.event.addListener(marker, 'click', ((position) => {
                return () => {
                    // window.location.href = `http://localhost:3000/${nickName}/${position.boardId}`;
                    navigate(`/${nickName}/${position.boardId}`);
                }
            })(positions[i]));
        }
    }, [localArray]);

    return (
        <>
            <div id="map" className="map"></div>
        </>
    )
}

export default MapComponent;