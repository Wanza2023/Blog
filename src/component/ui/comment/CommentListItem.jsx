import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineMore, AiOutlineEdit, AiOutlineDelete, AiOutlineFlag } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { nickNameState } from '../../common/AuthState';
import '../../../styles/component/Comment.css'
import { CiLock, CiUnlock } from "react-icons/ci";

const Comments = styled.div`
    margin-top: 2vh;
`;

const CommentsInfo = styled.div`
    clear: both;
    float: left;
    margin-bottom: 0.5rem;

    > svg {
        width: 3vh;
        height: 3vh;
        fill: gray;
        cursor: pointer;
    }

    > button {
        border: none;
        background: none;
        cursor: pointer;
        clear: both;
        float: right;
        margin-top: 1vh;
        font-size: 0.9rem;
        font-weight: bold;
        color: #6E6E6E;
    }
`;

const ButtonContainer = styled.div``;

const CommentsHeart = styled.div`
    float: right;
    > button {
        border: none;
        background: none;
        cursor: pointer;
        > svg {
            width: 3vw;
            height: 3vh;
            color: gray;
        }
    }
`;

const CommentsEdit = styled.button`
    float: right;
    background: none;
    border: none;
    cursor: pointer;
    > svg {
        width: 3vw;
        height: 3vh;
        fill: gray;
    }
`;

const CommentsMenu = styled.div`
    float: right;
    display: flex;
    >button {
        font-size: 0.9rem;
        cursor: pointer;
        background: none;
        border: 1px solid #d5d5d5;
        border-radius: 3px;
        color: gray;
    }
`;

const CommentsList = styled.div`
    clear: both;
    float: left;
    border-bottom: 2px solid #e8e7e7;
    width: 100%;
    min-height: ${props => props.isEditing ? '19vh' : '5vh'};
    padding-bottom: 1vw;
    margin-bottom: 2vh;
    text-align: left;
    font-size: 0.9rem;

    .comment-edit-input {
        border: 2px solid #e8e7e7;
        border-radius: 10px;
        background: white;
        width: 95%;
        padding: 10px;
        margin-top: 1vh;
        font-size: 0.9rem;
    }

    .edit-button-set {
        display: flex;
        float: right;
        margin-right: 1rem;
        margin-top: 0.5rem;
        
        button {
            float: right;
            border: none;
            border-radius: 20px;
            background: #5076FF;
            color: white;
            cursor: pointer;
            width: 3vw;
            height: 3.3vh;
            font-size: 0.8rem;
            margin-left: 0.5rem;
        }
    }

    .secretComment {
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        float: left;
    }

    .commentContent {
        float: left;
        font-size: 0.9rem;
        margin-left: 0.2rem;
    }

    .commentDate {
        font-size: 0.7rem;
        color: gray;
        margin-top: 1.5rem;
    }
`;

const CommentListItem = ({ comment, editingComment, handleCommentEdit, handleCommentSave, handleCommentCancelClick, handleCommentChange, handleCommentReportClick, handleCommentLikeClick, isLikedStates, onDelete, setIsPublic, isPublic}) => {
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(new Array(comment.length).fill(false));

    const toggleMenu = (commentIndex) => {
        const updatedShowMenu = [...showMenu];
        updatedShowMenu[commentIndex] = !updatedShowMenu[commentIndex];
        setShowMenu(updatedShowMenu);
    };
    const [signInNickName,setSignInNickName] = useRecoilState(nickNameState); // 로그인한 사용자

    const {nickname} = useParams(); // 게시글 작성자

    const commentNickName = comment.map((commentItem) => commentItem.nickname); // 댓글 작성자

    const commentStatus = comment.map((commentItem) => commentItem.status); // 댓글 공개여부

    const handleToggle = () => {
        setIsPublic(!isPublic);
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset() * 60000;
        const dateOffset = new Date(date.getTime() - 2 * offset);
        return dateOffset.toISOString().replace("T", " ").replace(/\.\d{3}Z$/, "");
    }

    return (
        <div>
            {comment.map((commentItem, index) => (
                <Comments key={index}>
                    <CommentsInfo>
                        {commentItem.pfp ? (
                            <img src={commentItem.pfp} alt="Profile" style={{ width: '30px', height: '30px', borderRadius: '50%' }} onClick={() => { navigate(`/user/${commentItem.nickname}`)}} />
                        ) : (
                            <BiUserCircle onClick={() => { navigate(`/user/${commentItem.nickname}`)}} />
                        )}
                        <button onClick={() => { navigate(`/user/${commentItem.nickname}`)}}>{commentItem.nickname}</button>
                    </CommentsInfo>
                    <ButtonContainer>
                        <CommentsHeart>
                            <button onClick={() => handleCommentLikeClick(index)}>
                                {isLikedStates[index] ? <IoHeart color="red" /> : <IoHeartOutline />}
                            </button>
                        </CommentsHeart>
                        <CommentsEdit onClick={() => toggleMenu(index)}>
                            <AiOutlineMore />
                        </CommentsEdit>
                        {showMenu[index] && (
                            <CommentsMenu>
                                {editingComment[index] ? (
                                     <></>
                                ) : (
                                    <>
                                        {signInNickName === commentNickName[index] ? (
                                            <>
                                                <button onClick={() => handleCommentEdit(index)}>
                                                    <div className='edit-set'>수정<AiOutlineEdit />
                                                    </div>
                                                </button>
                                                <button onClick={() => onDelete(index)}><div className='edit-set'>삭제<AiOutlineDelete /></div></button>
                                            </>
                                        ) : (
                                            <button onClick={() => handleCommentReportClick(index)}><div className='edit-set'>신고<AiOutlineFlag /></div></button>
                                        )}
                                    </>
                                )}
                            </CommentsMenu>
                        )}
                    </ButtonContainer>
                    <CommentsList>
                        {
                            commentStatus[index] === false ? 
                            <>
                                {editingComment[index] ? (
                                    <div>
                                        <textarea 
                                            value={editingComment[index]}
                                            onChange={(e) => handleCommentChange(e, index)}
                                            className="comment-edit-input"
                                        />
                                        <div className='edit-button-set'>
                                            <div onClick={handleToggle} style={{ cursor: 'pointer' }}>
                                                {!isPublic ? <CiUnlock style={{ color: 'gray' }} size={30} /> : <CiLock style={{ color: 'gray' }} size={30} />}
                                            </div>
                                            <button onClick={() => handleCommentSave(index)}>저장</button>
                                            <button onClick={() => handleCommentCancelClick(index)}>취소</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='secretCommentSet'><div className='secretComment'><CiLock size={18} color='gray' /></div>
                                    {(nickname === signInNickName || commentNickName[index] === signInNickName) && <><div className='commentContent'>{commentItem.content}</div></>}</div>
                                )}
                            </> :
                            <>
                                {editingComment[index] ? (
                                    <div>
                                        <textarea 
                                            value={editingComment[index]}
                                            onChange={(e) => handleCommentChange(e, index)}
                                            className="comment-edit-input"
                                        />
                                        <div className='edit-button-set'>
                                            <div onClick={handleToggle} style={{ cursor: 'pointer' }}>
                                                {isPublic ? <CiUnlock style={{ color: 'gray' }} size={30} /> : <CiLock style={{ color: 'gray' }} size={30} />}
                                            </div>
                                            <button onClick={() => handleCommentSave(index)}>저장</button>
                                            <button onClick={() => handleCommentCancelClick(index)}>취소</button>
                                        </div>
                                    </div>
                                ) : (<div className='commentContent'>{commentItem.content}</div>)}
                            </>
                        }
                        <div className='commentDate'>
                            <br />
                            {formatDate(commentItem.createdAt) === formatDate(commentItem.updatedAt) ? formatDate(commentItem.createdAt) : formatDate(commentItem.updatedAt)}
                        </div>
                    </CommentsList>
                </Comments>
            ))}
        </div>
    );    
}

export default CommentListItem;
