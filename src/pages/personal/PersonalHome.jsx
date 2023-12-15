import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import PostCard from '../../component/ui/list/PostCard';
import Button from "../../component/common/Button";
import '../../styles/pages/PersonalHome.css'
import MapComponent from '../../component/ui/personal/MapComponent';
import { useRecoilState } from "recoil";
import { nickNameState } from "../../component/common/AuthState";
import personal_profile_icon from '../../assets/images/personal_profile_icon.png';
import Paging from '../../component/ui/list/Paging';


const PersonalHome = () => {
    // 지도 화면 보이게 toggle 설정 true로 준건 default로 보이게하기위함
    const [showMap, setShowMap] = useState(true);
    // 글 목록보이게 toggle 설정
    const [showText, setShowText] = useState(false);

    //지도 눌렀을 때 이벤트
    const handleMapButtonClick = () => {
        setShowMap(true);
        setShowText(false);
        sessionStorage.setItem('showMap', 'true');
        sessionStorage.setItem('showText', 'false');
    };
    // 글 눌렀을 때 이벤트
    const handleTextButtonClick = () => {
        setShowMap(false);
        setShowText(true);
        sessionStorage.setItem('showText', 'true');
        sessionStorage.setItem('showMap', 'false');
    };

    useEffect(() => {
        setShowMap(showMap);
        setShowText(showText);
        console.log("showmap : "+showMap);
        console.log("showtext : "+showText);
    }, [showMap,showText]);

    const [nickName,setNickName] = useRecoilState(nickNameState);// 닉네임 전역관리
    const [count, setCount] = useState(0); // 아이템 총 개수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
    const [postPerPage] = useState(5); // 한 페이지에 보여질 아이템 수 
    const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들

    const { nickname } = useParams(); // useParams로 url에서 파라미터 추출
    const [posts, setPosts] = useState([]); // 게시물 담을 배열 생성
    const profileImg = sessionStorage.getItem('pfp');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // url에서 페이지 번호
        const search = new URLSearchParams(location.search); // 현재 페이지 url에서 뒤에 page 번호 부분 객체로 변환
        const page = parseInt(search.get('page')) || 1; // 객체에서 page 가져오기, 없으면 1
        setCurrentPage(page);
        console.log("page : "+page);
    }, [location]);

    const setPage = (page) => {
        setCurrentPage(page);
        navigate(`?page=${page}`); // 해당 페이지로 이동
    };

    const token = sessionStorage.getItem('token');
    
    useEffect(() => {
        const fetchData = async () => { // api에 데이터 요청 후 응답 response에 저장
            try {
                const response = await axios.get(`${process.env.REACT_APP_BOARD_API_KEY}/${nickname}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data && response.data.body && Array.isArray(response.data.body)) {
                    const Data = response.data.body
                    setPosts(Data);
                    setCount(Data.length)
                    const indexOfLastPost = currentPage * postPerPage;
                    const indexOfFirstPost = indexOfLastPost - postPerPage;
                    setCurrentPosts(Data.slice(indexOfFirstPost,indexOfLastPost));
                } else {
                }
            } catch (e) {
                console.error(e);
                alert('Error: 데이터를 불러올 수 없습니다');
            }
        };
    
        fetchData();
    }, [nickName, currentPage, postPerPage, nickname]);
    
    const wrapperStyles = {
        paddingBottom: showText ? '30vh' : '0',
        width: 'auto',
        height: '90vh',
    };

    
    return (
        <div className='personal_wrapper' style={wrapperStyles}>
             <div className='personal_profile'>
                {profileImg ? (
                    <img src={profileImg} alt="Profile" />
                ) : (
                    <img src={personal_profile_icon} alt="personal_profile_icon" />
                )}
                <h2>{nickname}</h2>
                <p>님의 여행기록</p>
            </div>
            <div className='toggle'>
                <button onClick={handleMapButtonClick}>지도</button>
                <span>|</span>
                <button onClick={handleTextButtonClick}>글</button>
            </div>
            {showMap && <div className='map_styles'><MapComponent posts={posts} nickName={nickName}/></div>}
            {showText &&
                <div className="wrapper">
                    {currentPosts && posts.length > 0 ? (currentPosts.map((item)=>(<PostCard key={item.id} path={`/${item.nickname}/${item.boardId}`} {...item} />))):(<div></div>)}
                    <Paging page={currentPage} count={count} setPage={setPage}/>
                    <Button />
                </div>
            }
        </div>
    );
};

export default PersonalHome;