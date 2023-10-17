import React from "react";
import { Link } from "react-router-dom";

function PostCard(props){
    return (
        <Link to={props.path} className="card">
            <img src={props.img} alt={props.alt} className="cardimg"/>
                <div className="cardbody">
                    <h2 className="cardtitle">{props.title}</h2>
                    <p className="cardcontent">{props.content}</p>
                </div>
        </Link>
);
}

export default PostCard;
