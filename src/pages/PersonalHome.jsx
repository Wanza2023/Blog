import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import Button from "../component/ui/Button";
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
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://172.16.210.130:8080/${nickName}`);
                if (response.data && response.data.body && Array.isArray(response.data.body)) {
                setPosts(response.data.body);
                } else {
                console.error('Invalid response data format');
                }
            } catch (e) {
                console.error(e);
                alert('Error: 데이터를 불러올 수 없습니다');
            }
            };
            fetchData();
        }, [nickName]);
    
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
            {/* {showText && <div><PersonalTextComponent BoardData={filterData}/></div>} */}
            {showText &&
                <div className="wrapper">
                    {posts.map((item) => <PostCard key={item.id} path={`/${item.nickname}/${item.boardId}`} {...item} />)}
                    <Button />
                </div>
            }
        </div>
        );
};

export default PersonalHome;