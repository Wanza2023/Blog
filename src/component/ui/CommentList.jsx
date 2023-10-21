import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '../../component/AuthState';
import { AiOutlineMore, AiOutlineEdit, AiOutlineDelete, AiOutlineFlag } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import styled from 'styled-components';
import data from "../../CommentData.json";

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
    font-size: 0.7rem;

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

const CommentList = ({ onEdit, onDelete, newComment, setNewComment }) => {
    const navigate = useNavigate();
    const isLoggedIn = useRecoilValue(isLoggedInState);
    const [showMenu, setShowMenu] = useState(new Array(data.length).fill(false));
    const [editingComment, setEditingComment] = useState(new Array(data.length).fill(''));
    const [isLikedStates, setIsLikedStates] = useState(new Array(data.length).fill(false));
    const { boardId } = useParams();
    const [comment, setComment] = useState([]);

    useEffect(() => {
        const comments = data.filter((item) => item.boardId == boardId);
        setComment(comments);
    }, [boardId]);

    const addComment = () => {
        if (isLoggedIn && newComment.trim() !== '') {
            const newCommentObject = {
                nickname: '코딩이싫어요',
                contents: newComment,
                createdAt: new Date().toISOString(),
            };
            setComment([...comment, newCommentObject]);
            setNewComment('');
        } else {
            alert('로그인이 필요한 기능입니다.');
            navigate('/login');
        }
    };

    const toggleMenu = (commentIndex) => {
        const updatedShowMenu = [...showMenu];
        updatedShowMenu[commentIndex] = !updatedShowMenu[commentIndex];
        setShowMenu(updatedShowMenu);
    };

    const handleCommentEditClick = (index) => {
        const updatedEditingComment = [...editingComment];
        updatedEditingComment[index] = comment[index].contents;
        setEditingComment(updatedEditingComment);
    };

    const handleCommentSaveClick = (index) => {
        onEdit(comment[index], editingComment[index]);
        const updatedEditingComment = [...editingComment];
        updatedEditingComment[index] = '';
        setEditingComment(updatedEditingComment);
    };

    const handleCommentCancelClick = (index) => {
        const updatedEditingComment = [...editingComment];
        updatedEditingComment[index] = '';
        setEditingComment(updatedEditingComment);
    };

    const handleCommentChange = (event, index) => {
        const updatedEditingComment = [...editingComment];
        updatedEditingComment[index] = event.target.value;
        setEditingComment(updatedEditingComment);
    };

    const handleCommentReportClick = (index) => {
    };

    const handleCommentLikeClick = (commentIndex) => {
        const updatedLikedStates = [...isLikedStates];
        updatedLikedStates[commentIndex] = !updatedLikedStates[commentIndex];
        setIsLikedStates(updatedLikedStates);
    };

    return (
        <div>
            <div className='comments-num'>
                <p>댓글  {comment.length}</p>
            </div>
            <div className='border3' />
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
            <div className='border4' />
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
                                {editingComment[index] !== '' ? (
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
                    {editingComment[index] !== '' ? (
                        <Editing>
                            <input type="text" value={editingComment[index]} onChange={(event) => handleCommentChange(event, index)} />
                        </Editing>
                    ) : (
                        <CommentsList>
                            {commentItem.contents}
                            <div><br />{commentItem.createdAt.toString().split('T')[0]}</div>
                        </CommentsList>
                    )}
                </Comments>
            ))}
        </div>
    );
}

export default CommentList;
