import React, { useEffect, useState } from 'react';
import "../../styles/SelectLocation.css";

const { kakao } = window;

const SelectLocation = ({ searchPlace }) => {
    const [places, setPlaces] = useState([]);

    const handleSelectLocation = (item) => {
        alert(`위치정보 - 경도: ${item.x}, 위도: ${item.y}`);
        //누르면 입력되게 만들기
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

        ps.keywordSearch(searchPlace, placesSearchCB);

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
        // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
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
    }, [searchPlace]);

    return (
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
                        <button onClick={()=>handleSelectLocation(item)}>{item.place_name}</button>
                        {item.road_address_name ? (
                        <div>
                            <span>{item.road_address_name}</span>
                        </div>
                        ) : (
                        <span>{item.address_name}</span>
                        )}
                    </div>
                    </div>
                ))
                ) : (
                <p>Loading or no data available.</p>
                )}
                <div id="pagination"></div>
            </div>
        </div>
    );
};

export default SelectLocation;
