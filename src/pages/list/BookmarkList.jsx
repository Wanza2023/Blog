import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookmarkListItem from '../../component/ui/personal/BookmarkListItem';
import '../../styles/pages/Bookmark.css';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../../component/common/AuthState';
import { useNavigate } from 'react-router-dom';
import Button from "../../component/common/Button";

const BookmarkList = () => {
    const [posts, setPosts] = useState([]); // 빈 배열로 초기화
    const [isLoggedIn] = useRecoilState(isLoggedInState);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            const memberId = sessionStorage.getItem('memberId');
            const token = sessionStorage.getItem('token');
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BOOKMARK_API_KEY}/${memberId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.data && response.data.body && Array.isArray(response.data.body)) {
                        setPosts(response.data.body);
                    }
                } catch (e) {
                    console.error(e);
                    alert('Error: 데이터를 불러올 수 없습니다');
                }
            };
            fetchData();
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            <div className="bookmark-all">
                <div className="bookmark-header">
                    <div className='bookmark-title'>Bookmark</div>
                    <p>내가 북마크한 게시글 목록입니다.</p>
                    <div className='border-line' />
                </div>
                <div className="bookmark-list">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <BookmarkListItem
                                key={post.id}
                                post={post}
                            />
                        ))
                    ) : (
                        <p>북마크한 게시글이 없습니다.</p>
                    )}
                </div>
            </div>
            <Button></Button>
        </>
    );
};


export default BookmarkList;
