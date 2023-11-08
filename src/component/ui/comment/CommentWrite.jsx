import React from 'react';
import { BiUserCircle } from "react-icons/bi";
import { useRecoilState } from 'recoil';
import { nickNameState } from '../../common/AuthState';
import { useAuth } from '../../common/useAuth';
import { useState } from 'react';

const CommentWrite = ({ newComment, setNewComment, addComments, setIsPublic,isPublic }) => {
    // const nickname = useRecoilState(nickNameState);
    const { nickname } = useAuth();
    

    return (
        <div>
            <div className='info'>
                <BiUserCircle />
                <p className='comments-nickname'>{nickname}</p>
                    <label className="toggleBtn">
                        <input
                            type="checkbox"
                            checked={isPublic}
                            onChange={() => setIsPublic(!isPublic)}
                        />
                        <span></span>
                        <div className="toggleInput">{isPublic ? "공개" : "비공개"}</div>
                    </label>
            </div>
            <div className='comments-input'>
                <textarea
                    placeholder="댓글을 입력하세요"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                
                <button onClick={addComments}>등록</button>
            </div>
        </div>
    );
}

export default CommentWrite;
