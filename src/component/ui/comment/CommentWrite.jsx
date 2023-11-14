import React from 'react';
import { BiUserCircle } from "react-icons/bi";
import { useAuth } from '../../common/useAuth';
import styled from 'styled-components';

const UserContainer = styled.div`
    display: flex;
`
const CommentInputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ButtonContainerr = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem;
    float: right;
    button {
        float: right;
        border: none;
        border-radius: 20px;
        background: #5076FF;
        color: white;
        font-weight: bold;
        cursor: pointer;
        width: 5vw;
        height: 3.3vh;
        font-size: 0.8rem;
        margin-left: 1rem;
    }
`;

const CommentWrite = ({ newComment, setNewComment, addComments, setIsPublic,isPublic }) => {
    // const nickname = useRecoilState(nickNameState);
    const { nickname } = useAuth();

    const handleSubmit = () => {
        addComments(); 
        setNewComment('');
    }
    
    return (
        <div>
            <UserContainer>
                <div className='info'>
                    <BiUserCircle />
                    <p className='comments-nickname'>{nickname}</p>
                </div>
            </UserContainer>
            <CommentInputContainer>
                <div className='comments-input'>
                    <textarea
                        placeholder="댓글을 입력하세요"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </div>
            </CommentInputContainer>
            <ButtonContainerr>
                <label className="toggleBtn">
                    <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={() => setIsPublic(!isPublic)}
                    />
                    <span></span>
                    <div className="toggleInput">{isPublic ? "공개" : "비공개"}</div>
                </label>
                <button onClick={handleSubmit} >등록</button>
            </ButtonContainerr>
        </div>
    );
}

export default CommentWrite;
