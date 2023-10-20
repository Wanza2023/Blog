import React from "react";
import PostCard from './PostCard';
import Button from "../component/ui/Button";
import BoardData from "../BoardData.json";

function PostList() {
    
    return (
        <div className="wrapper">
            {BoardData.map((item)=><PostCard key={item.id} path={`/${item.nickname}/${item.boardId}`} {...item}/>)}
            <Button/>
        </div>
        
    )
}

export default PostList;
