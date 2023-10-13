import React from 'react';
import CommentListItem from './CommentListItem';
import styled from 'styled-components';

const CommentsNum = styled.div`
    margin-top: 2vh;
`;

const CommentList = ({ comments }) => {
    const reversedComments = comments.slice().reverse();
    return (
        <CommentsNum>
            {reversedComments.map((comment, index) => (
                <CommentListItem key={index} comment={comment} />
            ))}
        </CommentsNum>
    );
}

export default CommentList;
