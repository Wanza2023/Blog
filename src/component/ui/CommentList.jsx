import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedInState, nickNameState } from '../../component/AuthState';
import data from "../../CommentData.json";
import CommentWrite from './CommentWrite';
import CommentListItem from './CommentListItem';

const CommentList = ({comments}) => {
    const navigate = useNavigate();
    const isLoggedIn = useRecoilValue(isLoggedInState);
    const { boardId } = useParams();
    const [newComment, setNewComment] = useState('');
    const [editingComment, setEditingComment] = useState([]);
    const [isLikedStates, setIsLikedStates] = useState([]);
    const nickname = useRecoilState(nickNameState);

    const [comment, setComment] = useState([]);

    useEffect(() => {
        const comments = data.filter((item) => item.boardId == boardId);    // boardid가 같은 것만 저장
        setComment(comments);
        setEditingComment(new Array(comments.length).fill(''));
        setIsLikedStates(new Array(comments.length).fill(false));
    }, [boardId]);

    const addComment = () => {
        if (isLoggedIn && newComment.trim() !== '') {
            const newCommentObject = {
                nickname: nickname,
                content: newComment,
                createdAt: new Date().toISOString(),
            };
            
            // 댓글을 추가할 때 editingComment 배열에 빈 문자열 추가
            const updatedEditingComment = [...editingComment, ''];
    
            setComment([...comment, newCommentObject]);
            setEditingComment(updatedEditingComment);
            setNewComment('');
        } else {
            alert('로그인이 필요한 기능입니다.');
            navigate('/login');
        }
    };
    // 댓글 수정 onClick
    const handleCommentEditClick = (index) => {
        const updatedEditingComment = [...editingComment];
        updatedEditingComment[index] = comment[index].contents;
        setEditingComment(updatedEditingComment);
    };    
    // 댓글 저장 onClick
    const handleCommentSaveClick = (index) => {
        const updatedComment = [...comment];
        updatedComment[index].contents = editingComment[index];
        setComment(updatedComment);

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
        alert("댓글이 신고되었습니다.");
    };

    const handleCommentLikeClick = (commentIndex) => {
        const updatedLikedStates = [...isLikedStates];
        updatedLikedStates[commentIndex] = !updatedLikedStates[commentIndex];
        setIsLikedStates(updatedLikedStates);
    };

    const onDelete = (selectedComment) => {
        const updatedComments = comment.filter(cmt => cmt !== selectedComment);
        setComment(updatedComments);
    };

    return (
        <div>
            <div className='comments-num'>
                <>댓글  {comments.length}</>
            </div>
            <div className='border3' />
            <CommentWrite
                newComment={newComment} 
                setNewComment={setNewComment} 
                addComment={addComment} 
            />
            <div className='border4' />
            <CommentListItem
                comment={comment}
                editingComment={editingComment}
                setEditingComment={setEditingComment}
                handleCommentEditClick={handleCommentEditClick}
                handleCommentSaveClick={handleCommentSaveClick}
                handleCommentCancelClick={handleCommentCancelClick}
                handleCommentChange={handleCommentChange}
                handleCommentReportClick={handleCommentReportClick}
                handleCommentLikeClick={handleCommentLikeClick}
                isLikedStates={isLikedStates}
                onDelete={onDelete}
                isLoggedIn={isLoggedIn}
            />
            <CommentListItem
                comment={comments}
                editingComment={editingComment}
                setEditingComment={setEditingComment}
                handleCommentEditClick={handleCommentEditClick}
                handleCommentSaveClick={handleCommentSaveClick}
                handleCommentCancelClick={handleCommentCancelClick}
                handleCommentChange={handleCommentChange}
                handleCommentReportClick={handleCommentReportClick}
                handleCommentLikeClick={handleCommentLikeClick}
                isLikedStates={isLikedStates}
                onDelete={onDelete}
                isLoggedIn={isLoggedIn}
            />
        </div>
    );
}

export default CommentList;
