import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AiOutlineMore, AiOutlineEdit, AiOutlineDelete, AiOutlineFlag } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import styled from 'styled-components';
import data from "../../../CommentData.json";

const Comments = styled.div`
    margin-top: 2vh;
`;

const CommentsInfo = styled.div`
    clear: both;
    float: left;

    > svg {
        width: 4vh;
        height: 4vh;
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
    margin-right: 10vw;
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
    margin-right: -2vw;

    > svg {
        width: 4vw;
        height: 4vh;
        fill: gray;
    }
`;

const CommentsMenu = styled.div`
    float: right;

    >button {
        cursor: pointer;
        background: none;
        border: none;
        border-radius: 5px;
        box-shadow: 3px 3px 3px #DCDCDC;
        height: 4vh;
        color: gray;
    }
`;

const CommentsList = styled.div`
    clear: both;
    float: left;
    border-bottom: 2px solid #e8e7e7;
    width: 800px;
    height: 5vh;
    padding: 1vw;
    margin-bottom: 2vh;
    text-align: left;
    font-size: 0.9rem;

    > div {
        font-size: 0.7rem;
        color: gray;
    }
`;

const Editing = styled.div`
    clear: both;
    float: left;
    padding: 1vw;
    margin-bottom: 2vh;
    text-align: left;
    font-size: 0.7rem;
`;

const CommentListItem = ({ comment, editingComment, setEditingComment, handleCommentEditClick, handleCommentSaveClick, handleCommentCancelClick, handleCommentChange, handleCommentReportClick, handleCommentLikeClick, isLikedStates, onDelete, isLoggedIn }) => {
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(new Array(data.length).fill(false));

    const toggleMenu = (commentIndex) => {
        const updatedShowMenu = [...showMenu];
        updatedShowMenu[commentIndex] = !updatedShowMenu[commentIndex];
        setShowMenu(updatedShowMenu);
    };

    function convertTime(date) {
        date = new Date(date);
        let offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
        let dateOffset = new Date(date.getTime() - offset);
        return dateOffset.toISOString();
    }

    return (
        <div>
            {comment.map((commentItem, index) => (
                <Comments key={index}>
                    <CommentsInfo>
                        <BiUserCircle onClick={() => { navigate("/")}} />
                        <button onClick={() => { navigate("/")}}>{commentItem.nickname}</button>
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
                                        {isLoggedIn && (<button onClick={() => handleCommentEditClick(index)}><AiOutlineEdit />수정</button>)}
                                        {isLoggedIn && (<button onClick={() => onDelete(commentItem)}><AiOutlineDelete />삭제</button>)}
                                        <button onClick={() => handleCommentReportClick(index)}><AiOutlineFlag />신고</button>
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
                            {commentItem.content}
                            <div><br />{convertTime(commentItem.createdAt).split("T")[0]}</div>
                    </CommentsList>
                </Comments>
            ))}
        </div>
    );    
}

export default CommentListItem;