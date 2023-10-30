import React from 'react';
import { BiUserCircle } from "react-icons/bi";

const CommentWrite = ({ newComment, setNewComment, addComment }) => {
    return (
        <div>
            <div className='info'>
                <BiUserCircle />
                <p className='comments-nickname'>코딩이싫어요</p>
            </div>
            <div className='comments-input'>
                <textarea
                    placeholder="댓글을 입력하세요"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={addComment}>등록</button>
            </div>
        </div>
    );
}

export default CommentWrite;
