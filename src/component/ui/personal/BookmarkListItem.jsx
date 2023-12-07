import React from "react";
import { Link } from "react-router-dom";
import { RxReader } from "react-icons/rx";
import '../../../styles/pages/Bookmark.css';
import personal_profile_icon from '../../../assets/images/personal_profile_icon.png';

const BookmarkListItem = ({ post }) => {
    // 이미지 변환
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.contents, "text/html"); // 문자열을 html로 파싱하여 객체 생성
    const imgElement = doc.querySelector("img"); // 첫 번째 <img> 선택
    const imgSrc = imgElement ? imgElement.getAttribute("src") : "default-image-url.jpg"; // img있으면 속성 값 가져오기, 없으면 default 설정
    const summarySentences = post.summary.split('.').filter(sentence => sentence.trim().length > 0); // .단위로 나누기


    return (
        <Link to={`/${post.nickname}/${post.boardId}`} className="bookmark-item">
            <div className="bookmark-image">
                {imgSrc !== "default-image-url.jpg" ? (
                    <img src={imgSrc} alt={post.title} />
                ) : (
                    <RxReader className="bookmark-default-img" color="#BDBDBD" />
                )}
            </div>
            <div className="bookmark-content">
                <p className="bookmark-title">{post.title}</p>
                <div className="bookmark-hover-content">
                    <img src={personal_profile_icon} alt="personal_profile_icon" className="bookmark-profile-img"/>
                    <p className="bookmark-nickname">{post.nickname}</p>
                    {summarySentences.map((sentence, index) => (
                        <p key={index} className="bookmark-summary">{sentence.trim()}.</p> // 각 문장을 별도의 줄로 표시
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default BookmarkListItem;