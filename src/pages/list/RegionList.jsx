import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { hashtagListState, searchResultsState } from "../../component/common/AuthState";
import { useRecoilValue } from 'recoil';
import PostCard from '../../component/ui/list/PostCard';
import Button from "../../component/common/Button";
import axios from 'axios';
import Paging from "../../component/ui/list/Paging";
import '../../styles/pages/PostList.css';
import Pagination from "react-js-pagination";

function RegionList() {
  const { regionName } = useParams(); // useParams로 url에서 파라미터 추출
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

  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(1);
  const offset = (pages - 1) * limit;
  
  useEffect(() => {
    const fetchData = async () => { // api에 데이터 요청 후 응답 response에 저장
        try {
            const response = await axios.get(`${process.env.REACT_APP_BOARD_API_KEY}/local/${regionName}`);
            if (response.data && response.data.body && Array.isArray(response.data.body)) {
                const Data = response.data.body
                setPosts(Data);
                console.log("메인에서 지역 누른 데이터 " + Data);
                setCount(Data.length)
                const indexOfLastPost = currentPage * postPerPage;
                const indexOfFirstPost = indexOfLastPost - postPerPage;
                setCurrentPosts(Data.slice(indexOfFirstPost,indexOfLastPost));
            } 
            else {
            }
        } catch (e) {
            console.error(e);
            alert('Error: 데이터를 불러올 수 없습니다');
        }
    };
    fetchData();
  }, [regionName, currentPage, postPerPage]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             let newData;
  //             if (regionName) {
  //                 const response = await axios.get(`${process.env.REACT_APP_BOARD_API_KEY}/local/${regionName}`);
  //                 newData = response.data.body;
  //             } else if (tagList.length > 0) {
  //                 newData = tagList;
  //             } else if (searchResults.length > 0) {
  //                 newData = searchResults;
  //             } else {
  //                 // Handle the case when none of the conditions are true
  //                 newData = [];
  //             }

  //             setPosts(newData);
  //             setCount(newData.length);

  //             const indexOfLastPost = currentPage * postPerPage;
  //             const indexOfFirstPost = indexOfLastPost - postPerPage;
  //             setCurrentPosts(newData.slice(indexOfFirstPost, indexOfLastPost));

  //         } catch (e) {
  //             console.error(e);
  //             alert('Error: 데이터를 불러올 수 없습니다');
  //         }
  //     };

  //     fetchData();
  // }, [regionName, currentPage, postPerPage, searchResults, tagList]);

    
    // useEffect(() => { // 검색 결과가 있을 때 posts와 count 업데이트
    //   if (searchResults.length > 0) {
    //     setPosts(searchResults);
    //     console.log(searchResults);
    //     setCount(searchResults.length)
    //     const indexOfLastPost = currentPage * postPerPage;
    //     const indexOfFirstPost = indexOfLastPost - postPerPage;
    //     setCurrentPosts(searchResults.slice(indexOfFirstPost,indexOfLastPost));
    //   } else {
    //   }
    // }, [regionName, currentPage, postPerPage, searchResults]);

    // useEffect(() => { // 검색 결과가 있을 때 posts와 count 업데이트
    //   if (tagList.length > 0) {
    //     setPosts(tagList);
    //     console.log("해시태그 검색" + tagList);
    //     setCount(tagList.length)
    //     const indexOfLastPost = currentPage * postPerPage;
    //     const indexOfFirstPost = indexOfLastPost - postPerPage;
    //     setCurrentPosts(tagList.slice(indexOfFirstPost,indexOfLastPost));
    //   } else {
    //   }
    // }, [regionName, currentPage, postPerPage, tagList]);

  return (
    <div className="wrapper">
      {currentPosts && (posts.length || hashtagList.length || searchResults.length) > 0 ? (currentPosts.map((item)=> // currentPosts가 있고, posts도 하나라도 있으면
        (<PostCard key={item.id} path={`/${item.nickname}/${item.boardId}`} {...item} />))):(<div></div>)}
      {/* {posts.map((item) => <PostCard key={item.id} path={`/${item.nickname}/${item.boardId}`} {...item} />)} */}
      <Paging page={currentPage} count={count} setPage={setPage}/>
      {/* <Pagination total={posts.length} limit={limit} page={pages} setPage={setPages}/> */}
      <Button />
    </div>
  )
}

export default RegionList;