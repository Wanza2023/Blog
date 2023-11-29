import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { hashtagListState } from "../../../common/AuthState";
import { HiOutlineHashtag } from "react-icons/hi";
import "../../../../styles/pages/PostList.css";

const HashtagListItem = ({ hashtag, onClick }) => {
    const navigate = useNavigate();
    const [hashtagList, setHashtagList] = useRecoilState(hashtagListState);
    
    const handleHashtagSubmit = async () => {
       try {
            const response = await axios.get(`${process.env.REACT_APP_BOARD_API_KEY}/tags/${hashtag}`);
            setHashtagList(response.data.body.reverse() || []);
            navigate(`/board/tags/${hashtag}`);
        } catch (error) {
            console.error("Failed to fetch search results:", error);
        }
    };

    return (
            <button onClick={handleHashtagSubmit}><div className="hashtagSet"><HiOutlineHashtag />{hashtag}</div></button>
    );
};

export default HashtagListItem;
