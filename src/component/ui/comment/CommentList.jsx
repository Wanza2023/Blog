import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { bookmarkResultState, nickNameState } from '../../common/AuthState';
import axios from 'axios';
import CommentWrite from './CommentWrite';
import CommentListItem from './CommentListItem';
import { useAuth } from '../../common/useAuth';
import '../../../styles/component/Comment.css'
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";

const CommentList = ({comments, setComments}) => {
    const reversedComments = comments.slice().reverse();
    const navigate = useNavigate();
    const { isLoggedIn, nickname } = useAuth();

    const { boardId } = useParams();
    const [newComment, setNewComment] = useState('');
    const [editingComment, setEditingComment] = useState([]);
    const [isLikedStates, setIsLikedStates] = useState([]);
    const [commentNickname,setCommentNickname] = useRecoilState(nickNameState);
    const [comment, setComment] = useState([]);
    const [isPublic, setIsPublic] = useState(true); // 댓글 공개 비공개 설정

    const [bookmarkState, setBookmarkState] = useRecoilState(bookmarkResultState);

    const addComments = async () => {
        try {
            if(isLoggedIn) {
                const postResponse = await axios.post(`${process.env.REACT_APP_COMMENT_API_KEY}/${nickname}/${boardId}`,{
                    nickname : commentNickname,
                    content : newComment,
                    status : isPublic
                });

                if (postResponse.status === 200) {
                    alert('댓글을 성공적으로 등록하였습니다! ^o^');

                    const getResponse = await axios.get(`${process.env.REACT_APP_COMMENT_API_KEY}/${boardId}`);
                    if (getResponse.data) {
                        setComments(getResponse.data);
                    }
                }
            } else {
                alert('로그인이 필요한 기능입니다!');
                navigate('/login');
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    
    //delete comment
    const deleteComment = async (index) => {
        const ids = comments.reverse().map(item=>item.id);
        const commentsId = ids[index];
        try {
            await axios.delete(`${process.env.REACT_APP_COMMENT_API_KEY}/${nickname}/${boardId}/${commentsId}`);
            alert('댓글을 삭제하였습니다.');
            navigate(0);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCommentDeleteClick = (index) => {
        if (commentNickname === reversedComments[index].nickname) {
            if (window.confirm('정말로 삭제하시겠습니까?')) {
                deleteComment(index);
            }
        }
        else{
            alert('댓글 작성자만 삭제할 수 있습니다.');
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
    
    const onClickBookmark = () => {
        if (isLoggedIn) {
            setBookmarkState(!bookmarkState);
            const token = sessionStorage.getItem('token');
            const memberId = sessionStorage.getItem('memberId');
    
            const headersConfig = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    
            if (bookmarkState) {
                const deleteApiUrl = `${process.env.REACT_APP_BOOKMARK_API_KEY}/${boardId}`;
                axios.delete(deleteApiUrl, headersConfig)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
            } else {
                const postApiUrl = `${process.env.REACT_APP_BOOKMARK_API_KEY}`;
                axios.post(postApiUrl, {
                    memberId: memberId,
                    boardId: boardId
                }, headersConfig)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
            }
        } else {
            alert('로그인이 필요한 기능입니다!');
            navigate('/login');
        }
    }

    return (
        <div>
            <div className='comments-top-wrapper'>
                <div className='comments-num'>
                    댓글   {comments.length}
                </div>
                <div className='comments-bookmarker'>
                    {bookmarkState ? <IoBookmark size={30} onClick={onClickBookmark} color="#5076FF" /> : <IoBookmarkOutline size={30} onClick={onClickBookmark} /> }                
                </div>
            </div>
            <div className='border3' />
            <CommentWrite
                newComment={newComment} 
                setNewComment={setNewComment} 
                addComments={addComments} 
                setIsPublic={setIsPublic}
                isPublic={isPublic}
            />
            {comments.length > 0 && <div className='border4' />}
            <CommentListItem
                comment={reversedComments}
                editingComment={editingComment}
                setEditingComment={setEditingComment}
                handleCommentEditClick={handleCommentEditClick}
                handleCommentSaveClick={handleCommentSaveClick}
                handleCommentCancelClick={handleCommentCancelClick}
                handleCommentChange={handleCommentChange}
                handleCommentReportClick={handleCommentReportClick}
                handleCommentLikeClick={handleCommentLikeClick}
                isLikedStates={isLikedStates}
                onDelete={handleCommentDeleteClick}
                isLoggedIn={isLoggedIn}
            />
        </div>
    );
}

export default CommentList;