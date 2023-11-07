import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchResultsState } from "../../component/common/AuthState";
import { useRecoilValue } from 'recoil';
import PostCard from '../../component/ui/list/PostCard';
import Button from "../../component/common/Button";
import axios from 'axios';
import Paging from "../../component/ui/list/Paging";
import '../../styles/pages/PostList.css';

function PostList() {
  const { regionName } = useParams(); // useParams로 url에서 파라미터 추출
  const [posts, setPosts] = useState([]); // 게시글 담을 배열 생성
  const [count, setCount] = useState(0); // 아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
  const [postPerPage] = useState(5); // 한 페이지에 보여질 아이템 수 
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들
  
  useEffect(() => {
    const fetchData = async () => { // api에 데이터 요청 후 응답 response에 저장
        try {
            const response = await axios.get(`${process.env.REACT_APP_BOARD_API_KEY}/local/${regionName}`);
            if (response.data && response.data.body && Array.isArray(response.data.body)) {
                const Data = response.data.body
                setPosts(Data);
                setCount(Data.length)
                const indexOfLastPost = currentPage * postPerPage;
                const indexOfFirstPost = indexOfLastPost - postPerPage;
                setCurrentPosts(Data.slice(indexOfFirstPost,indexOfLastPost));
                // const reversedData = response.data.body.reverse();
                // setPosts(reversedData);
                // setCount(reversedData.length);
                // const indexOfLastPost = currentPage * postPerPage;
                // const indexOfFirstPost = indexOfLastPost - postPerPage;
                // setCurrentPosts(reversedData.slice(indexOfFirstPost, indexOfLastPost));
            } else {
            }
        } catch (e) {
            console.error(e);
            alert('Error: 데이터를 불러올 수 없습니다');
        }
    };
    fetchData();
  }, [regionName, currentPage, postPerPage]);

    const setPage = (error) => { // 현재 페이지 번호
      setCurrentPage(error);
    };

    const searchResults = useRecoilValue(searchResultsState); // Recoil 상태 관리에서 검색 전역 관리

    useEffect(() => { // 검색 결과가 있을 때 posts와 count 업데이트
      if (searchResults.length > 0) {
        setPosts(searchResults);
        setCount(searchResults.length)
        const indexOfLastPost = currentPage * postPerPage;
        const indexOfFirstPost = indexOfLastPost - postPerPage;
        setCurrentPosts(searchResults.slice(indexOfFirstPost,indexOfLastPost));
      } else {
      }
    }, [regionName, currentPage, postPerPage, searchResults]);

  return (
    <div className="wrapper">
      {currentPosts && posts.length > 0 ? (currentPosts.map((item)=> // currentPosts가 있고, posts도 하나라도 있으면
        (<PostCard key={item.id} path={`/${item.nickname}/${item.boardId}`} {...item} />))):(<div></div>)}
      {/* {posts.map((item) => <PostCard key={item.id} path={`/${item.nickname}/${item.boardId}`} {...item} />)} */}
      <Paging page={currentPage} count={count} setPage={setPage}/>
      <Button />
    </div>
  )
}

export default PostList;