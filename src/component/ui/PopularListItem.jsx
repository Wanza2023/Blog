import React from "react";
import "../../styles/PopularListItem.css";

export default function PopularListItem(props) {
    const { post, onClick } = props;
    
    // 이미지 변환
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.contents, "text/html");
    const imgElement = doc.querySelector("img");
    const imgSrc = imgElement ? imgElement.getAttribute("src") : "default-image-url.jpg";

    return (
        <div className="popular-post" onClick={onClick}>
            {imgSrc !== "default-image-url.jpg" ? (
                <img src={imgSrc} className="img" />
            ) : (
                <div className="noImg"></div>
            )}
            <div className="post-contents">
                <h2 className="title">{post.title}</h2>
                <p>{post.summary}</p>
            </div>
        </div>
    );
}
