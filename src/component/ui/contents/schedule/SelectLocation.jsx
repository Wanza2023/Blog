import React, { useEffect, useState } from 'react';
import "../../../../styles/component/SelectLocation.css";
const { kakao } = window;
const SelectLocation = (props) => {
    const [InputText, setInputText] = useState('');
    const [Place, setPlace] = useState('');
    const [places, setPlaces] = useState([]);
    // 모달창 닫기
    const close = () => {
        props.setModalIsOpen(false);
    }
    // 위치정보 배열에 저장 경도,위도,위치이름
    const getLocation = (item) => {
        const locationData = {
            latitude: item.x,
            longitude: item.y,
            location: item.place_name};
        props.setLocationItems(locationData);
    }
    // 검색창 onChange
    const onChange = (e) => {
        setInputText(e.target.value);
    }
    // 검색 버튼
    const handleSubmit = (e) => {
        e.preventDefault();
        setPlace(InputText);
        setInputText('');
    }
    useEffect(() => {
        const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        const container = document.getElementById('myMap');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };
        const map = new kakao.maps.Map(container, options);
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(Place, placesSearchCB, {size:8});
        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                let bounds = new kakao.maps.LatLngBounds();
                for (let i = 0; i < data.length; i++) {
                displayMarker(data[i]);
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }
                map.setBounds(bounds);
                displayPagination(pagination);
                setPlaces(data);
            }
        }
        function displayPagination(pagination) {
            const paginationEl = document.getElementById('pagination');
            const fragment = document.createDocumentFragment();
            while (paginationEl.hasChildNodes()) {
                paginationEl.removeChild(paginationEl.lastChild);
            }
            for (let i = 1; i <= pagination.last; i++) {
                const el = document.createElement('a');
                el.href = '#';
                el.innerHTML = i;
                if (i === pagination.current) {
                    el.className = 'on';
                } else {
                    el.onclick = (function (i) {
                        return function () {
                            pagination.gotoPage(i);
                        };
                    })(i);
                }
                fragment.appendChild(el);
            }
            paginationEl.appendChild(fragment);
        }
        function displayMarker(place) {
            const marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x),
            });
            kakao.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent(
                    '<div style="padding:5px;font-size:12px;">' + place.place_name + '</div'
                );
                infowindow.open(map, marker);
            });
        }
    }, [Place]);
    return (
        <>
            <form className="inputForm" onSubmit={handleSubmit}>
                <input className="searchinput" placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
                <div className="btn">
                    <button className="searchbtn" type="submit">검색</button>
                    <button className="closebtn" onClick={close} aria-label="Close modal">×</button>
                </div>
            </form>
            <div className='selectlocation_wrapper'>
                <div
                    id="myMap"
                    style={{
                        width: '30rem',
                        height: '30rem',
                    }}
                ></div>
                <div className='result-list'>
                    {places.length > 0 ? (
                        places.map((item, i) => (
                            <div key={i} style={{ marginTop: '20px' }} >
                                <div className='list'>
                                    <button className="titlebtn" onClick={() => {getLocation(item); close();}} >{item.place_name}</button>
                                    {item.road_address_name ? (
                                        <div className='addressname'>
                                            <span>{item.road_address_name}</span>
                                        </div>
                                    ) : (
                                        <div className='addressname'>
                                            <span>{item.address_name}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p />
                    )}
                    <div id="pagination"></div>
                </div>
            </div>
        </>
    );
}
export default SelectLocation;