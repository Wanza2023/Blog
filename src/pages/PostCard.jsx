import React from "react";
import { Link } from "react-router-dom";
import "../styles/PostCard.css";

function PostCard(props){
    const createdDate = new Date(props.createdAt);
    const formattedDate = createdDate.toISOString().split('T')[0];
    return (
        <Link to={props.path} className="card">
            <img src={props.img} alt={props.alt} className="cardimg"/>
                <div className="cardbody">
                    <h2 className="cardtitle">{props.title}</h2>
                    <p className="cardInfo">{props.nickname} {formattedDate}</p>
                    <p className="cardcontent">{props.summary}</p>
                    <p className="cardcontent">{props.hashtags}</p>
                </div>
        </Link>
);
}

export default PostCard;
