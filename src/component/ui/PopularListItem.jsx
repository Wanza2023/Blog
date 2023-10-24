import React from "react";
import "../../styles/PopularListItem.css";

export default function PopularListItem(props) {
    const { post, onClick } = props;
    return (
        <div className="popular-post" onClick={onClick}>
            <img className="img" src={post.image} alt=" " />
            <div className="post-contents">
                <h2 className="title">{post.title}</h2>
                <p>{post.summary}</p>
            </div>
        </div>
    )
}