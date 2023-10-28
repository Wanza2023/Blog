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
import Paging from '../component/ui/Paging';


const PersonalHome = () => {
    // 지도 화면 보이게 toggle 설정 true로 준건 default로 보이게하기위함
    const [showMap, setShowMap] = useState(false);

    // 글 목록보이게 toggle 설정
    const [showText, setShowText] = useState(true);

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
    const [nickName,setNickName] = useRecoilState(nickNameState);// 닉네임 전역관리
    const [count, setCount] = useState(0); // 아이템 총 개수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
    const [postPerPage] = useState(5); // 한 페이지에 보여질 아이템 수 
    const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
    const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
    const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들

    const {nick} = useParams();
    const [posts, setPosts] = useState([]);

    const setPage = (error) => {
        setCurrentPage(error);
    };
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`http://172.16.210.130:8082/board/${nickName}`);
    //             if (response.data && response.data.body && Array.isArray(response.data.body)) {
    //                 const reversedData = response.data.body.reverse();
    //                 setPosts(reversedData);
    //                 // console.log(reversedData);
    //                 // setPosts(response.data.body);
    //             } else {
    //             console.error('Invalid response data format');
    //             }
    //         } catch (e) {
    //             console.error(e);
    //             alert('Error: 데이터를 불러올 수 없습니다');
    //         }
    //         };
    //         fetchData();
    //         setCount(posts.length);
    //         setIndexOfLastPost(currentPage * postPerPage);
    //         setIndexOfFirstPost(indexOfLastPost - postPerPage);
    //         setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
    //     }, [nickName,currentPage, indexOfLastPost, indexOfFirstPost, posts, postPerPage]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://172.16.210.130:8082/board/${nickName}`);
                if (response.data && response.data.body && Array.isArray(response.data.body)) {
                    const reversedData = response.data.body.reverse();
                    setPosts(reversedData);
                    setCount(reversedData.length);
                    const indexOfLastPost = currentPage * postPerPage;
                    const indexOfFirstPost = indexOfLastPost - postPerPage;
                    setCurrentPosts(reversedData.slice(indexOfFirstPost, indexOfLastPost));
                } else {
                    console.error('Invalid response data format');
                }
            } catch (e) {
                console.error(e);
                alert('Error: 데이터를 불러올 수 없습니다');
            }
        };
    
        fetchData();
    }, [nickName, currentPage, postPerPage]);
    
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
            {showMap && <div className='map_styles'><MapComponent data={posts}/></div>}
            {/* {showText && <div><PersonalTextComponent BoardData={filterData}/></div>} */}
            {showText &&
                <div className="wrapper">
                    {/* {posts.map((item) => <PostCard key={item.id} path={`/${item.nickname}/${item.boardId}`} {...item} />)} */}
                    {currentPosts && posts.length > 0 ? (currentPosts.map((item)=>(<PostCard key={item.id} path={`/${item.nickname}/${item.boardId}`} {...item} />))):(<div>no posts</div>)}
                    <Paging page={currentPage} count={count} setPage={setPage}/>
                    <Button />
                </div>
            }
            <Button/>
        </div>
        );
};

export default PersonalHome;