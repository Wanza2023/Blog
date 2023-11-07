import React from 'react';
import { BiUserCircle } from "react-icons/bi";
import { useRecoilState } from 'recoil';
import { nickNameState } from '../AuthState';

const CommentWrite = ({ newComment, setNewComment, addComments }) => {
    const nickname = useRecoilState(nickNameState);

    return (
        <div>
            <div className='info'>
                <BiUserCircle />
                <p className='comments-nickname'>{nickname}</p>
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
