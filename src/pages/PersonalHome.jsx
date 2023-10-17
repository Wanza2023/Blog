import React, { useState } from 'react';
import '../styles/PersonalHome.css'
import MapComponent from '../component/ui/MapComponent';
import PersonalTextComponent from '../component/ui/PersonalTextComponent';
import PersonalProfile from '../component/ui/PersonalProfile';


const PersonalHome = () => {
    // 지도 화면 보이게 toggle 설정 true로 준건 default로 보이게하기위함
    const [showMap, setShowMap] = useState(true);

    // 글 목록보이게 toggle 설정
    const [showText, setShowText] = useState(false);

    //지도 눌렀을 때 이벤트
    const handleMapButtonClick = () => {
        setShowMap(true);
        setShowText(false);
    };
    // 글 눌렀을 때 이벤트
    const handleTextButtonClick = () => {
        setShowMap(false);
        setShowText(true);
    };

    return (
        <div>
            <PersonalProfile/>
            <div className='toggle'>
                <button onClick={handleMapButtonClick}>지도</button>
                <button onClick={handleTextButtonClick}>글</button>
            </div>
            {showMap && <div className='map_styles'><MapComponent/></div>}
            {showText && <div><PersonalTextComponent/></div>}
        </div>
        );
};

export default PersonalHome;