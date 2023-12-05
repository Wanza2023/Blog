import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { hashtagListState } from "../../component/common/AuthState";
import { useRecoilValue } from 'recoil';
import PostCard from '../../component/ui/list/PostCard';
import Button from "../../component/common/Button";
import Paging from "../../component/ui/list/Paging";
import '../../styles/pages/PostList.css';
import { HiOutlineHashtag } from "react-icons/hi";

function HashtagList() {
  const { hashtag } = useParams(); // useParams로 url에서 파라미터 추출
  const [posts, setPosts] = useState([]); // 게시글 담을 배열 생성
  const [count, setCount] = useState(0); // 아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
  const [postPerPage, setPostPerPage] = useState(5); // 한 페이지에 보여질 아이템 수 
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들

  const navigate = useNavigate();
  const location = useLocation();

  const hashtagLists = useRecoilValue(hashtagListState);

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
  const handlePostPerPageSelectChange = (e) => {
    const selectedValue = parseInt(e.target.value);
    setPostPerPage(selectedValue);
  };

  useEffect(() => {
    if (hashtagLists !== undefined) {
      setPosts(hashtagLists);
      setCount(hashtagLists.length)
      const indexOfLastPost = currentPage * postPerPage;
      const indexOfFirstPost = indexOfLastPost - postPerPage;
      setCurrentPosts(hashtagLists.slice(indexOfFirstPost,indexOfLastPost));
      } else {
    }
  }, [currentPage, postPerPage, hashtagLists]);

  return (
    <div className="wrapper">
      <div className='hashtag-title'>Hashtag</div>
      {hashtag && 
        <div className="postlist-topwrapper">
          <div className="hashtag-word">
            <HiOutlineHashtag size={15}/>
            <div className="hashtag-word-term">{hashtag}&nbsp;에 대한 검색결과입니다.</div>
          </div>
          <div className="postlist-topwrapper">
          <div>
                <button className="postlist-popularbtn">인기순</button>
                <button className="postlist-newestbtn">최신순</button>
                <select className="postlist-postperpage-select" onChange={handlePostPerPageSelectChange}>
                  <option value="5">5개</option>
                  <option value="10">10개</option>
                  <option value="20">20개</option>
                </select>
              </div>
          </div>
        </div>
        }
      <div className='border-line' />
      {currentPosts && posts.length > 0 ? (currentPosts.map((item)=> // currentPosts가 있고, posts도 하나라도 있으면
        (<PostCard key={item.id} path={`/${item.nickname}/${item.boardId}`} {...item} />))):(<div className="resultNone">해시태그가 없습니다.</div>)}
      <Paging page={currentPage} count={count} setPage={setPage}/>
      <Button />
    </div>
  )
}

export default HashtagList;