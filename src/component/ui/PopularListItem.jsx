import React from "react";
import "../../styles/PopularListItem.css";

export default function PopularListItem(props) {
    // contents html안의 이미지 가져오기
    const parser = new DOMParser();
    const doc = parser.parseFromString(props.contents, "text/html");
    const imgElement = doc.querySelector("img");
    const imgSrc = imgElement ? imgElement.getAttribute("src") : "default-image-url.jpg";

    const { post, onClick } = props;
    return (
        <div className="popular-post" onClick={onClick}>
            {imgSrc !== "default-image-url.jpg" ? (<img src={imgSrc} alt={props.alt} className="img"/>) : (<img></img>)}
            {/* <img className="img" src={post.image} alt=" " /> */}
            <div className="post-contents">
                <h2 className="title">{post.title}</h2>
                <p>{post.summary}</p>
            </div>
        </div>
    )
}