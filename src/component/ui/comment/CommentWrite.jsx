import React from 'react';
import { BiUserCircle } from "react-icons/bi";
import { CiLock, CiUnlock } from "react-icons/ci";
import { useAuth } from '../../common/useAuth';
import styled from 'styled-components';
import '../../../styles/component/Comment.css'

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

const CommentWrite = ({ newComment, setNewComment, addComments, setIsPublic, isPublic }) => {
    // const nickname = useRecoilState(nickNameState);
    const { nickname } = useAuth();
    const profileImg = sessionStorage.getItem('pfp');

    const handleSubmit = () => {
        addComments(); 
        setNewComment('');
    }

    const ToggleButton = () => {
        const handleToggle = () => {
            setIsPublic(!isPublic);
        };
    
        return (
            <div onClick={handleToggle} style={{ cursor: 'pointer' }}>
                {isPublic ? <CiUnlock style={{ color: 'gray' }} size={30} /> : <CiLock style={{ color: 'gray' }} size={30} />}
            </div>
        );
    };
    
    return (
        <div>
            <UserContainer>
                <div className='info'>
                    {profileImg ? <img src={profileImg} alt="Profile" style={{ width: '30px', height: '30px', borderRadius: '50%' }} /> : <BiUserCircle />}
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
                <div onClick={() => setIsPublic(!isPublic)} style={{ cursor: 'pointer' }}>
                    <ToggleButton />
                </div>
                <button onClick={handleSubmit}>등록</button>
            </ButtonContainerr>
        </div>
    );
}

export default CommentWrite;