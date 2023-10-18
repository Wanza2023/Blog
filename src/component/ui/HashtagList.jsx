import React from 'react';
import HashtagListItem from './HashtagListItem';

const HashtagList = ({ hashtags, onHashtagClick }) => {
    return (
        <div className="hashtag">
            <div>
                {hashtags.map((hashtag, index) => (
                <HashtagListItem
                    key={index}
                    hashtag={hashtag}
                    onClick={() => onHashtagClick(hashtag)}
                />
                ))}
            </div>
        </div>
    );
};

export default HashtagList;
