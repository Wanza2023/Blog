import React from "react";
import { Link } from "react-router-dom";
import "../../styles/PopularListItem.css";

export default function PopularListItem(props) {
    const { post } = props; // // props에서 post 추출
    
    // 이미지 변환
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.contents, "text/html"); // 문자열을 html로 파싱하여 객체 생성
    const imgElement = doc.querySelector("img"); // 첫 번째 <img> 선택
    const imgSrc = imgElement ? imgElement.getAttribute("src") : "default-image-url.jpg"; // img있으면 속성 값 가져오기, 없으면 default 설정

    return (
        <Link to = {`/${post.nickname}/${post.boardId}`}>
            <div className="popular-post">
                {imgSrc !== "default-image-url.jpg" ? ( // default 아닐 시
                    <img src={imgSrc} className="img" />
                ) : (
                    <div className="noImg"></div>
                )}
                <div className="post-contents">
                    <h2 className="title">{post.title}</h2>
                    <p>{post.summary}</p>
                </div>
            </div>
        </Link>
    );
}
