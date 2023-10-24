import React from "react";
import { useParams } from "react-router-dom";
import PostCard from './PostCard';
import Button from "../component/ui/Button";
import BoardData from "../BoardData.json";

function PostList() {
    const { regionName } = useParams();
    const filteredPosts = BoardData.filter((item) => item.local === regionName);
    return (
        <div className="wrapper">
            {filteredPosts.map((item)=><PostCard key={item.id} path={`/${item.nickname}/${item.boardId}`} {...item}/>)}
            <Button/>
        </div>      
    )
}

export default PostList;
