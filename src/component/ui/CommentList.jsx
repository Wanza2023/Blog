import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '../../component/AuthState';
import data from "../../CommentData.json";
import CommentWrite from './CommentWrite';
import CommentListItem from './CommentListItem';

const CommentList = () => {
    const navigate = useNavigate();
    const isLoggedIn = useRecoilValue(isLoggedInState);
    const { boardId } = useParams();
    const [comment, setComment] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingComment, setEditingComment] = useState([]);
    const [isLikedStates, setIsLikedStates] = useState([]);

    useEffect(() => {
        const comments = data.filter((item) => item.boardId == boardId);
        setComment(comments);
        setEditingComment(new Array(comments.length).fill(''));
        setIsLikedStates(new Array(comments.length).fill(false));
    }, [boardId]);

    const addComment = () => {
        if (isLoggedIn && newComment.trim() !== '') {
            const newCommentObject = {
                nickname: '코딩이싫어요',
                contents: newComment,
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

    const handleCommentEditClick = (index) => {
        const updatedEditingComment = [...editingComment];
        updatedEditingComment[index] = comment[index].contents;
        setEditingComment(updatedEditingComment);
    };    

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
                <>댓글  {comment.length}</>
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
        </div>
    );
}

export default CommentList;
