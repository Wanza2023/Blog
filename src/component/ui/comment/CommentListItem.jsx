import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineMore, AiOutlineEdit, AiOutlineDelete, AiOutlineFlag } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import styled from 'styled-components';
import data from "../../../CommentData.json";
import { useRecoilState } from 'recoil';
import { nickNameState } from '../../common/AuthState';
import '../../../styles/component/Comment.css'
import { SlLock } from "react-icons/sl";

const Comments = styled.div`
    margin-top: 2vh;
`;

const CommentsInfo = styled.div`
    clear: both;
    float: left;

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
        font-size: 0.8rem;
        font-weight: bold;
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
            width: 4vw;
            height: 4vh;
            color: gray;
        }
    }
`;

const CommentsEdit = styled.button`
    float: right;
    background: none;
    border: none;
    cursor: pointer;
    margin-left: -2rem;
    > svg {
        width: 5vw;
        height: 5vh;
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
        margin-left: 0.5rem;
    }
`;

const CommentsList = styled.div`
    clear: both;
    float: left;
    border-bottom: 2px solid #e8e7e7;
    width: 100%;
    min-height: 5vh;
    padding-bottom: 1vw;
    margin-bottom: 2vh;
    text-align: left;
    font-size: 0.9rem;

    .secretComment {
        font-size: 0.8rem;
        margin-bottom: 1rem;
    }

    > div {
        font-size: 0.7rem;
        color: gray;
    }
`;

const CommentListItem = ({ comment, editingComment, setEditingComment, handleCommentEditClick, handleCommentSaveClick, handleCommentCancelClick, handleCommentChange, handleCommentReportClick, handleCommentLikeClick, isLikedStates, onDelete, isLoggedIn }) => {
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(new Array(data.length).fill(false));

    const toggleMenu = (commentIndex) => {
        const updatedShowMenu = [...showMenu];
        updatedShowMenu[commentIndex] = !updatedShowMenu[commentIndex];
        setShowMenu(updatedShowMenu);
    };
    const [signInNickName,setSignInNickName] = useRecoilState(nickNameState); // 로그인한 사용자

    const {nickname} = useParams(); // 게시글 작성자

    const commentNickName = comment.map((commentItem) => commentItem.nickname); // 댓글 작성자

    const commentStatus = comment.map((commentItem) => commentItem.status); // 댓글 공개여부

    function convertTime(date) {
        date = new Date(date);
        let offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
        let dateOffset = new Date(date.getTime() - 2*offset);
        let formattedDate = dateOffset.toISOString().replace("T", " ").replace(/\.\d{3}Z$/, "");
        // return dateOffset.toISOString();
        return formattedDate;
    }

    return (
        <div>
            {comment.map((commentItem, index) => (
                <Comments key={index}>
                    <CommentsInfo>
                        <BiUserCircle onClick={() => { navigate(`/user/${commentItem.nickname}`)}} />
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
                                {editingComment[index] === '' ? (
                                    <>
                                        <button onClick={() => handleCommentSaveClick(index)}>저장</button>
                                        <button onClick={() => handleCommentCancelClick(index)}>취소</button>
                                    </>
                                ) : (
                                    <>
                                        {signInNickName === commentNickName[index] ? (
                                        <>
                                            <button onClick={() => handleCommentEditClick(index)}><div className='edit-set'>수정<AiOutlineEdit /></div></button>
                                            <button onClick={() => onDelete(index)}><div className='edit-set'>삭제<AiOutlineDelete /></div></button>
                                        </>) : (
                                            <button onClick={() => handleCommentReportClick(index)}><div className='edit-set'>신고<AiOutlineFlag /></div></button>
                                        )}
                                    </>
                                )}
                            </CommentsMenu>
                        )}
                    </ButtonContainer>
                    {/* {editingComment[index] === '' ? (
                        <CommentsList>
                            {commentItem.contents}
                            <div><br />{commentItem.createdAt.toString().split('T')[0]}</div>
                        </CommentsList>
                    ) : (
                        <Editing>
                            <input type="text" value={editingComment[index]} onChange={(event) => handleCommentChange(event, index)} />
                        </Editing>
                    )} */}
                    <CommentsList>
                        {
                            commentStatus[index] === false ? 
                            <>
                                <div className='secretComment'><SlLock size={20} /> 비밀 댓글입니다.</div>
                                {(nickname === signInNickName || commentNickName[index] === signInNickName) && <>{commentItem.content}</>}
                            </> :
                            <>{commentItem.content}</>
                        }
                        {/* <div><br />{convertTime(commentItem.createdAt).replace("T", " ").replace(/\.\d{3}Z$/, "")}</div> */}
                        <div><br />{convertTime(commentItem.createdAt)}</div>
                    </CommentsList>
                </Comments>
            ))}
        </div>
    );    
}

export default CommentListItem;