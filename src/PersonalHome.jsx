import React, { useState } from 'react';
import MapComponent from './MapComponent';
import './styles/PersonalHome.css'
import PersonalTextComponent from './PersonalTextComponent';
import PersonalProfile from './PersonalProfile';


const PersonalHome = () => {
    const [showMap, setShowMap] = useState(true);
    const [showText, setShowText] = useState(false);

    const handleMapButtonClick = () => {
        setShowMap(true);
        setShowText(false);
    };

    const handleTextButtonClick = () => {
        setShowMap(false);
        setShowText(true);
    };

    return (
        <div className='personalhome'>
            {/* personal_profile 컴포넌트로 분리해야될듯? */}
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