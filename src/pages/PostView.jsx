import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedInState } from '../component/AuthState';
import { AiOutlineMore, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";
import ScheduleList from '../component/ui/ScheduleList';
import SummaryList from '../component/ui/SummaryList';
import HashtagList from '../component/ui/HashtagList';
import CommentList from '../component/ui/CommentList';
import styled from 'styled-components';
import "../styles/PostView.css";
import Button from '../component/ui/Button';
import data from "../BoardData.json";
import MemberData from "../MemberData.json"

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
    const isLoggedIn = useRecoilState(isLoggedInState);
    const [showMenu, setShowMenu] = useState(false);
    const [comments, setComments] = useState(['']);
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

    const { nickname, boardId } = useParams();

    const board = data.find((item) => {
        return item.nickname == nickname && item.boardId == boardId 
    });

    const { createdAt, local, title, contents, summary } = board;

    const member = MemberData.find((item) => {
        return item.memberId == board.memberId
    });
    
    const createdDate = new Date(createdAt);
    const formattedDate = createdDate.toISOString().split('T')[0];

    const localToKorean = {
        Busan: "부산",
        Daegu: "대구",
        Daejeon: "대전",
        Gangwondo: "강원도",
        Gwangju: "광주",
        Gyeonggi: "경기도",
        Incheon: "인천",
        Jeju: "제주도",
        Chungbuk: "충청북도",
        Gyeongbuk: "경상북도",
        Jeonbuk: "전라북도",
        Sejong: "세종",
        Seoul: "서울",
        Chungnam: "충청남도",
        Gyeongnam: "경상남도",
        Jeonnam: "전라남도",
        Ulsan: "울산"     
    };

    const localKorean = localToKorean[local] || local;

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

    const hashtagData = ["제주도", "서귀포", "협재해수욕장", "거북이한과"];

    return (
        <Container>
            <div className='container'>
                <div className='title'>
                    {title}
                    <div className='button-container'>
                        <button className='edit' onClick={toggleMenu}>
                            <AiOutlineMore className='edit' onClick={toggleMenu} />
                        </button>
                        {showMenu && (
                            <div className='menu'>
                                {(localStorage.getItem("email") == member.email) ? (
                                    <button onClick={handleEditClick}>
                                        <AiOutlineEdit /> 수정
                                    </button>
                                ) : null}
                                {(localStorage.getItem("email") == member.email) ? (
                                    <button onClick={handleDeleteClick}>
                                        <AiOutlineDelete /> 삭제
                                    </button>
                                ) : null}
                            </div>
                        )}
                    </div>
                </div>
                <button onClick={()=> {navigate("/personalhome")}} className='nickname'>{nickname}</button>
                <div className='date'>{formattedDate}</div>
                <div className='location'>
                    <HiOutlineMapPin />
                    <button onClick={()=> {navigate("/")}} className='location-name'>{localKorean}</button>
                </div>
                <div className='border1' />
                <div className='schedule'>
                    <ScheduleList scheduleData={scheduleData} />
                </div>
                <div className='border2' />
                <div className='post'>
                    {contents}
                </div>
                <p className='summary'>요약 내용</p>
                <SummaryList summaryData={[summary]} />
                <HashtagList hashtags={hashtagData} onHashtagClick={navigate} />
                <CommentList
                    comments={comments}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                    newComment={newComment}
                    setNewComment={setNewComment}
                />
            </div>
            <Button/>
        </Container>
    );
}

export default PostView;
