import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedInState,nickNameState } from '../component/AuthState';
import { AiOutlineMore, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { HiOutlineMapPin } from 'react-icons/hi2';
import ScheduleList from '../component/ui/ScheduleList';
import SummaryList from '../component/ui/SummaryList';
import HashtagList from '../component/ui/HashtagList';
import CommentList from '../component/ui/CommentList';
import styled from 'styled-components';
import '../styles/PostView.css';
import Button from '../component/ui/Button';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

function PostView() {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilState(isLoggedInState);
  const nickName = useRecoilState(nickNameState);
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
    axios
      .delete(`http://172.16.210.130:8082/board/${nickname}/${boardId}`)
      .then(function(res){
        console.log(res.data);
        console.log("삭제 성공");
        navigate(-1);
      })
      .catch(function(err){
        console.log("error: ", err);
      })
  };

  const { nickname, boardId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://172.16.210.130:8082/board/${nickname}/${boardId}`);
        if (response.data && response.data.body) {
            console.log('Data received from the server:', response.data.body);
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
  }, [nickname, boardId]);

    if (posts) {
        const { title, createdAt, local, contents, summary, schedules, hashtags } = posts;
        let createdDate;
        try {
            createdDate = new Date(createdAt);
            if (isNaN(createdDate)) {
            throw new Error('Invalid date');
            }
        } catch (error) {
            console.error('Error parsing date:', error);
            createdDate = new Date();
        }

        const formattedDate = createdDate.toISOString().split('T')[0];

        const localToKorean = {
            Busan: "부산",
            Daegu: "대구",
            Daejeon: "대전",
            Gangwon: "강원도",
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
                <button onClick={() => navigate(`/user/${nickname}`)} className='nickname'>
                  {nickname}
                </button>
                <div className='date'>{formattedDate}</div>
                <div className='location'>
                  <HiOutlineMapPin />
                  <button onClick={() => navigate("/post-list/" + local)} className='location-name'>
                    {localKorean}
                  </button>
                </div>
                <div className='border1' />
                <div className='schedule'>
                  {schedules && schedules.length > 0 ? (
                    <ScheduleList scheduleData={schedules} />
                  ) : null}
                </div>
                {/* <div className='border2' /> */}
                <ReactQuill
                  value={contents}
                  readOnly={true}
                  theme={'bubble'}
                />
                <div className="summary-box">
                    <p className="summary">요약</p>
                    <p className="summary-contents">{summary}</p>
                    {/* {Array.isArray(summary) ? (
                        <SummaryList summaryData={summary} />
                    ) : (
                        <p>null</p>
                    )} */}
                </div>
                <div className='hashtags'>
                    {Array.isArray(hashtags) ? (
                        <HashtagList hashtags={hashtags} />
                    ) : (
                        <p>null</p>
                    )}
                </div>
                <CommentList
                  comments={comments}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                  newComment={newComment}
                  setNewComment={setNewComment}
                />
              </div>
              <Button />
            </Container>
        );
    } else {
        return <div>Loading...</div>;
    }
}

export default PostView;
