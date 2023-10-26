import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostCard from './PostCard';
import Button from "../component/ui/Button";
import axios from 'axios';

function PostList() {
  const { regionName } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://172.16.210.130:8080/local/${regionName}`);
            if (response.data && response.data.body && Array.isArray(response.data.body)) {
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
    }, [regionName]);

  return (
    <div className="wrapper">
      {posts.map((item) => <PostCard key={item.id} path={`/${item.nickname}/${item.boardId}`} {...item} />)}
      <Button />
    </div>
  )
}

export default PostList;
