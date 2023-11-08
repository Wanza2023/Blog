import React,{useEffect,useState} from "react";
import '../../../styles/component/MapComponent.css';
import { useNavigate,useParams } from "react-router";

const {kakao} = window; // window에서 kakao 추출

const MapComponent= (props) => {
    const {nickName, posts} = props; // props에서 nickName과 posts 추출
    const navigate = useNavigate();
    const { nickname } = useParams(); // useParams로 url에서 파라미터 추출ㄴㄴ
    
    useEffect(() => {
        if (props.posts && Array.isArray(props.posts)) { 
            const firstSchedules = props.posts.map(post => { // props.posts에 map 함수를 실행하여 firstSchedules 배열을 생성
                const schedule = post.schedules ? post.schedules[0] : null; // 각 post의 schedules 첫 번째 요소를 schedule로, 없으면 null
                const content = schedule && post.contents ? post.contents : null; // 각 post의 schedul, contents 둘 다 존재하면 content , 없으면 null
                if (schedule && content) {
                    // 이미지 변환
                    const parser = new DOMParser(); 
                    const doc = parser.parseFromString(content, "text/html"); // 문자열을 html로 파싱하여 객체 생성
                    const imgElement = doc.querySelector("img"); // 첫 번째 <img> 선택
                    const imgSrc = imgElement ? imgElement.getAttribute("src") : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; // // img있으면 속성 값 가져오기, 없으면 별 마커로 설정
                    const imgSrchover = imgElement ? imgElement.getAttribute("src") : ""; //imgElement가 존재하면 src 속성값을, 그렇지 않으면 빈 문자열
                    return {
                        schedule: schedule,
                        imgSrc: imgSrc,
                        imgSrchover :imgSrchover
                    };
                }
                return null;
            }).filter(Boolean); // map 함수로 생성된 배열에서 null을 제외하기 위해 Boolean 함수를 사용하여 필터링
            setLocalArray(firstSchedules); // firstSchedules 배열을 localArray 상태로 설정
        }
    }, [props.posts]);


    const [localArray, setLocalArray] = useState([]); // localArray 빈 배열 생성

    useEffect(() => {
        const mapContainer = document.getElementById('map'); // map 아이디를 가진 DOM mapContainer에 할당
        const mapOptions = {
            center: new kakao.maps.LatLng(35.771152381440724, 127.93716313603966), // 중심 좌표
            level: 13 // 확대 레벨
        };
        const map = new kakao.maps.Map(mapContainer, mapOptions); // mapContainer에 지도를 생성하고 map 변수에 할당
        
        const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
        
        // schedule에서 필요한 데이터만 저장
        const positions = localArray.map(({schedule,imgSrc,imgSrchover}) => ({
            title: schedule.location, 
            latlng: new kakao.maps.LatLng(schedule.longitude, schedule.latitude),
            boardId: schedule.boardId,
            imgSrc: imgSrc,
            content: `<img src="${imgSrchover}" style="width:12rem; height:12rem; object-fit: cover;"/>`
        }));

        function makeOverListener(map, marker, infowindow) { // 마우스를 마커 위로 올렸을 때 띄울 창
            return function() {
                infowindow.open(map, marker);
            };
        }
        
        // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
        function makeOutListener(infowindow) {
            return function() {
                infowindow.close();
            };
        }

        for (var i = 0; i < positions.length; i++) {
            // 마커 이미지 크기
            var imageSize = new kakao.maps.Size(24, 35); 
            
            // 마커 이미지 생성
            var markerImage = new kakao.maps.MarkerImage(positions[i].imgSrc, imageSize)

            var marker = new kakao.maps.Marker({ // 지도에 표시될 마커 생성
                map: map,
                position: positions[i].latlng,
                title: positions[i].title,
                image : markerImage
            });
            // var marker = new kakao.maps.Marker({
            //     map: map,
            //     position: positions[i].latlng,
            // });
            var infowindow = new kakao.maps.InfoWindow({
                content: positions[i].content // 인포윈도우에 표시할 내용
            });
            
            if (positions[i].imgSrc != "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png") {
                kakao.maps.event.addListener(marker, 'click', ((position) => { // 마커 클릭 이벤트
                    return () => {
                        // window.location.href = `http://localhost:3000/${nickName}/${position.boardId}`;
                        navigate(`/${nickname}/${position.boardId}`);
                    }
                })(positions[i]));
                kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow)); // 마우스 올렸을 때
                kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow)); // 내렸을 때
            }
            else {
                kakao.maps.event.addListener(marker, 'click', ((position) => { // 마커 클릭 이벤트
                    return () => {
                        // window.location.href = `http://localhost:3000/${nickName}/${position.boardId}`;
                        navigate(`/${nickname}/${position.boardId}`);
                    }
                })(positions[i]));
            }
        }
    }, [localArray]);

    return (
        <>
            <div id="map" className="map"></div>
        </>
    )
}

export default MapComponent;
