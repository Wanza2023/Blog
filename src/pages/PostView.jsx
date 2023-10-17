import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AiOutlineMore, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";
import { BiUserCircle } from "react-icons/bi";
import ScheduleList from '../component/ui/ScheduleList';
import SummaryList from '../component/ui/SummaryList';
import HashtagList from '../component/ui/HashtagList';
import CommentList from '../component/ui/CommentList';
import styled from 'styled-components';
import "../styles/PostView.css";

const Container = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 0 18%;  
}
`;

function PostView() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [comments, setComments] = useState([
        "반가워요~~",
        "즐거운 여행을 하신 것 같아요 ㅎㅎ",
    ]);
    const [newComment, setNewComment] = useState('');

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleEditClick = () => {
        alert('수정 버튼 클릭');
    };

    const handleDeleteClick = () => {
        alert('삭제 버튼 클릭');
    };

    const scheduleData = [
        {
            day: '1일차',
            date: '2023.03.21',
            location: '제주도 애월읍 곽지해수욕장',
            transportation: '비행기/택시'
        },
        {
            day: '2일차',
            date: '2023.03.22',
            location: '제주도 한림읍 협재해수욕장',
            transportation: '택시'
        },
        {
            day: '3일차',
            date: '2023.03.23',
            location: '제주도 서귀포시 거북이한과',
            transportation: '렌트카'
        },
        {
            day: '4일차',
            date: '2023.03.24',
            location: '제주도 서귀포시 천지연폭포',
            transportation: '렌트카, 비행기'
        },
    ];

    const summaryData = [
        "제주도 3박 4일 여행 기록",
        "서귀포 방문, 거북이 한과가 맛있었다.",
        "협재 해변이 특히 예뻤다.",
    ];

    const hashtagData = ["제주도", "서귀포", "협재해수욕장", "거북이한과"];

    const addComment = () => {
        if (newComment.trim() !== '') {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    return (
        <Container>
            <div className='container'>
                <div className='title'>
                    또주도 3박 4일 여행기
                    <div className='button-container'>
                        <button className='edit' onClick={toggleMenu}>
                            <AiOutlineMore className='edit' onClick={toggleMenu} />
                        </button>
                        {showMenu && (
                            <div className='menu'>
                                <button onClick={handleEditClick}>
                                    <AiOutlineEdit /> 수정
                                </button>
                                <button onClick={handleDeleteClick}>
                                    <AiOutlineDelete /> 삭제
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <button onClick={()=> {navigate("/")}} className='nickname'>방글방글</button>
                <div className='date'>2023.10.10</div>
                <div className='location'>
                    <HiOutlineMapPin />
                    <button onClick={()=> {navigate("/")}} className='location-name'>제주도</button>
                </div>
                <div className='border1' />
                <div className='schedule'>
                    <ScheduleList scheduleData={scheduleData} />
                </div>
                <div className='border2' />
                <div className='post'>
                    <p className='post-title'>제주도 1일차</p>
                    <p>한참때 주구장창 제주도만 가다가 질려서 한동안 안갔었다.
                        그러가 오랜만에 친구들과 국내여행이 가고싶어 제주도를 가게 되었다.
                        한참때 주구장창 제주도만 가다가 질려서 한동안 안갔었다.
                        그러가 오랜만에 친구들과 국내여행이 가고싶어 제주도를 가게 되었다.</p>
                    <p className='post-title'>제주도 2일차</p>
                    <p>한참때 주구장창 제주도만 가다가 질려서 한동안 안갔었다.
                        그러가 오랜만에 친구들과 국내여행이 가고싶어 제주도를 가게 되었다.
                        한참때 주구장창 제주도만 가다가 질려서 한동안 안갔었다.
                        그러가 오랜만에 친구들과 국내여행이 가고싶어 제주도를 가게 되었다.</p>
                    <p className='post-title'>제주도 3일차</p>
                    <p>한참때 주구장창 제주도만 가다가 질려서 한동안 안갔었다.
                        그러가 오랜만에 친구들과 국내여행이 가고싶어 제주도를 가게 되었다.
                        한참때 주구장창 제주도만 가다가 질려서 한동안 안갔었다.
                        그러가 오랜만에 친구들과 국내여행이 가고싶어 제주도를 가게 되었다.</p>
                    <p className='post-title'>제주도 4일차</p>
                    <p>한참때 주구장창 제주도만 가다가 질려서 한동안 안갔었다.
                        그러가 오랜만에 친구들과 국내여행이 가고싶어 제주도를 가게 되었다.
                        한참때 주구장창 제주도만 가다가 질려서 한동안 안갔었다.
                        그러가 오랜만에 친구들과 국내여행이 가고싶어 제주도를 가게 되었다.</p>
                    <p>한참때 주구장창 제주도만 가다가 질려서 한동안 안갔었다.
                        그러가 오랜만에 친구들과 국내여행이 가고싶어 제주도를 가게 되었다.
                        한참때 주구장창 제주도만 가다가 질려서 한동안 안갔었다.
                        그러가 오랜만에 친구들과 국내여행이 가고싶어 제주도를 가게 되었다.</p>
                </div>
                <p className='summary'>요약 내용</p>
                <SummaryList summaryData={summaryData} />
                <HashtagList hashtags={hashtagData} onHashtagClick={navigate} />
                <div className='comments-num'>
                    <p>댓글  {comments.length}</p>
                </div>
                <div className='border3' />
                <div className='info'>
                    <BiUserCircle />
                    <p className='comments-nickname'>코딩이싫어요</p>
                </div>
                <div className='comments-input'>
                    <textarea
                        placeholder="댓글을 입력하세요"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button onClick={addComment}>등록</button>
                </div>
                <div className='border4' />
                <CommentList comments={comments} />
            </div>
        </Container>
    );
}

export default PostView;
