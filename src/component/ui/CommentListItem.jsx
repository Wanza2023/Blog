import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AiOutlineMore, AiOutlineEdit, AiOutlineDelete, AiOutlineFlag } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import styled from 'styled-components';

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
            fill: ${props => (props.isLiked ? "" : "red")};
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
    font-size: 0.7rem;
`;

const CommentListItem = ({ comment, onEdit, onDelete }) => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [editingComment, setEditingComment] = useState(comment);
    const [isEditing, setIsEditing] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onEdit(editingComment);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditingComment(comment);
    };

    const handleCommentChange = (event) => {
        setEditingComment(event.target.value);
    };

    const handleReportClick = () => {

    };

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    return (
        <Comments>
            <CommentsInfo>
                <BiUserCircle onClick={()=> {navigate("/")}} />
                <button onClick={()=> {navigate("/")}}>책읽는토끼</button>
            </CommentsInfo>
            <ButtonContainer>
                <CommentsHeart>
                    <button onClick={handleLikeClick}>
                        {isLiked ? <IoHeart /> : <IoHeartOutline />}
                    </button>
                </CommentsHeart>
                <CommentsEdit onClick={toggleMenu}>
                    <AiOutlineMore />
                </CommentsEdit>
                {showMenu && (
                    <CommentsMenu>
                        {isEditing ? (
                            <>
                                <button onClick={handleSaveClick}>저장</button>
                                <button onClick={handleCancelClick}>취소</button>
                            </>
                        ) : (
                            <>
                                <button onClick={handleEditClick}><AiOutlineEdit />수정</button>
                                <button onClick={() => onDelete(comment)}><AiOutlineDelete />삭제</button>
                                <button onClick={handleReportClick}><AiOutlineFlag />신고</button>
                            </>
                        )}
                    </CommentsMenu>
                )}
            </ButtonContainer>
            {isEditing ? (
                <input type="text" value={editingComment} onChange={handleCommentChange} />
            ) : (
                <CommentsList>{comment}</CommentsList>
            )}
        </Comments>
    );
}

export default CommentListItem;
