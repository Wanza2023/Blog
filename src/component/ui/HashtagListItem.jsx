import React from 'react';

const HashtagListItem = ({ hashtag, onClick }) => {
    return (
        <button onClick={onClick}>#{hashtag}</button>
    );
};

export default HashtagListItem;
