import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostCard from './PostCard';
import Button from "../component/ui/Button";
import axios from 'axios';
import Paging from "../component/ui/Paging";

function PostList() {
  const { regionName } = useParams();
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0); // 아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
  const [postPerPage] = useState(5); // 한 페이지에 보여질 아이템 수 
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://172.16.210.130:8082/board/local/${regionName}`);
            if (response.data && response.data.body && Array.isArray(response.data.body)) {
              const reversedData = response.data.body.reverse();
              setPosts(reversedData);
              // setPosts(response.data.body);
            } else {
              console.error('Invalid response data format');
            }
          } catch (e) {
            console.error(e);
            alert('Error: 데이터를 불러올 수 없습니다');
          }
        };
        // if (regionName && currentPage && indexOfLastPost && indexOfFirstPost && postPerPage) {
        //   fetchData();
        //   setCount(posts.length);
        //   setIndexOfLastPost(currentPage * postPerPage);
        //   setIndexOfFirstPost(indexOfLastPost - postPerPage);
        //   setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost))
        // };
        fetchData();
        setCount(posts.length);
        setIndexOfLastPost(currentPage * postPerPage);
        setIndexOfFirstPost(indexOfLastPost - postPerPage);
        setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
    }, [regionName,currentPage, indexOfLastPost, indexOfFirstPost, posts, postPerPage]);

    const setPage = (error) => {
      setCurrentPage(error);
    };

  return (
    <div className="wrapper">
      {currentPosts && posts.length > 0 ? (currentPosts.map((item)=>(<PostCard key={item.id} path={`/${item.nickname}/${item.boardId}`} {...item} />))):(<div>no posts</div>)}
      {/* {posts.map((item) => <PostCard key={item.id} path={`/${item.nickname}/${item.boardId}`} {...item} />)} */}
      <Paging page={currentPage} count={count} setPage={setPage}/>
      <Button />
    </div>
  )
}

export default PostList;
