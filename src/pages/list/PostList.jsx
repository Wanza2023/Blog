import React, { useState, useEffect } from "react";
import {useNavigate, useLocation } from "react-router-dom";
import { hashtagListState, searchResultsState } from "../../component/common/AuthState";
import { useRecoilValue } from 'recoil';
import PostCard from '../../component/ui/list/PostCard';
import Button from "../../component/common/Button";
import axios from 'axios';
import Paging from "../../component/ui/list/Paging";
import '../../styles/pages/PostList.css';

function PostList() {
  const [posts, setPosts] = useState([]); // 게시글 담을 배열 생성
  const [count, setCount] = useState(0); // 아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
  const [postPerPage] = useState(5); // 한 페이지에 보여질 아이템 수 
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들
  const searchResults = useRecoilValue(searchResultsState); // Recoil 상태 관리에서 검색 전역 관리
  const hashtagList = useRecoilValue(hashtagListState);
  

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // url에서 페이지 번호
    const search = new URLSearchParams(location.search); // 현재 페이지 url에서 뒤에 page 번호 부분 객체로 변환
    const page = parseInt(search.get('page')) || 1; // 객체에서 page 가져오기, 없으면 1
    setCurrentPage(page);
  }, [location]);

  const setPage = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`); // 해당 페이지로 이동
  };
  
  useEffect(() => {
    const fetchData = async () => { // api에 데이터 요청 후 응답 response에 저장
        try {
            const response = await axios.get(`${process.env.REACT_APP_BOARD_API_KEY}/boards`);
            if (response.data && response.data.body && Array.isArray(response.data.body)) {
                const Data = response.data.body
                setPosts(Data);
                setCount(Data.length)
                const indexOfLastPost = currentPage * postPerPage;
                const indexOfFirstPost = indexOfLastPost - postPerPage;
                setCurrentPosts(Data.slice(indexOfFirstPost,indexOfLastPost));
                console.log(response.data.body);
            } 
            else {
            }
        } catch (e) {
            console.error(e);
            alert('Error: 데이터를 불러올 수 없습니다');
        }
    };
    fetchData();
  }, [currentPage, postPerPage]);

  return (
    <div className="wrapper">
      <div className='hashtag-title'>Post</div>
      <div className="hashtag-word"><div className="hashtag-word-term">전체게시글 목록입니다.</div></div>
      <div className='border-line' />
      {currentPosts && (posts.length || hashtagList.length || searchResults.length) > 0 ? (currentPosts.map((item)=> // currentPosts가 있고, posts도 하나라도 있으면
        (<PostCard key={item.id} path={`/${item.nickname}/${item.boardId}`} {...item} />))):(<div></div>)}
      <Paging page={currentPage} count={count} setPage={setPage}/>
      <Button />
    </div>
  )
}

export default PostList;
