import React, { useState } from 'react';
import '../styles/PersonalHome.css'
import MapComponent from '../component/ui/MapComponent';
import { useRecoilState } from "recoil";
import { useParams } from 'react-router-dom';
import { isLoggedInState,nickNameState,memberIdState } from "../component/AuthState";
import PersonalTextComponent from '../component/ui/PersonalTextComponent';
import BoardData from '../BoardData.json';
import MemberData from '../MemberData.json';
import personal_profile_icon from '../assets/images/personal_profile_icon.png';


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
    const filterData = BoardData.filter(item => item.nickname === '방글방글글');
    const [nickName,setNickName] = useRecoilState(nickNameState);// 닉네임 전역관리

    const {nick} = useParams();
    
    return (
        <div>
            <div className='personal_profile'>
                <img src={personal_profile_icon} alt="personal_profile_icon"/>
                <h2>{nickName}</h2>
                <p>님의 여행기록</p>
            </div>
            <div className='toggle'>
                <button onClick={handleMapButtonClick}>지도</button>
                <span>|</span>
                <button onClick={handleTextButtonClick}>글</button>
            </div>
            {showMap && <div className='map_styles'><MapComponent/></div>}
            {showText && <div><PersonalTextComponent BoardData={filterData}/></div>}
        </div>
        );
};

export default PersonalHome;