import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookmarkListItem from './BookmarkListItem'; // BookmarkListItem 컴포넌트 임포트
import '../../../styles/component/Bookmark.css';

const BookmarkList = () => {
    const [posts, setPosts] = useState([]); // 빈 배열로 초기화
    const memberId = sessionStorage.getItem('memberId');
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BOOKMARK_API_KEY}/${memberId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response);
                if (response.data && response.data.body && Array.isArray(response.data.body)) {
                    setPosts(response.data.body);
                    console.log(response.data.body);
                } else {
                }
            } catch (e) {
                console.error(e);
                alert('Error: 데이터를 불러올 수 없습니다');
            }
        };
        
        fetchData();
    }, []);

    const handleItemClick = (item) => {
    };

    return (
        <div>
            {posts.length > 0 && posts.map((post) => (
                <BookmarkListItem
                    key={post.id}
                    post={post}
                    onClickItem={() => handleItemClick(post)}
                />
            ))}
        </div>
    );
};

export default BookmarkList;
