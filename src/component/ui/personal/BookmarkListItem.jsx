import React from "react";
import { Link } from "react-router-dom";
import { FaBookmark } from 'react-icons/fa';
import { RxReader } from "react-icons/rx";
import '../../../styles/component/Bookmark.css';

const BookmarkListItem = ({ post }) => {
    // 이미지 변환
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.contents, "text/html"); // 문자열을 html로 파싱하여 객체 생성
    const imgElement = doc.querySelector("img"); // 첫 번째 <img> 선택
    const imgSrc = imgElement ? imgElement.getAttribute("src") : "default-image-url.jpg"; // img있으면 속성 값 가져오기, 없으면 default 설정

    return (
        <Link to = {`/${post.nickname}/${post.boardId}`}>
            <div className="bookmark-items">
                <FaBookmark className="bookmark-icons" />
                {imgSrc !== "default-image-url.jpg" ? (
                    <img src={imgSrc} alt={post.title} className="imgs" />
                ) : (
                    <RxReader className="cardimg" color="#BDBDBD" />
                )}
                <div className="bookmark-summarys">
                    <h2>{post.title}</h2>
                    {/* <p>{post.summary}</p> */}
                </div>
            </div>
        </Link>
    );
};

export default BookmarkListItem;
