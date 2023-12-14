import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PopularList from "../../component/ui/list/PopularList";
import "../../styles/pages/Intro.css";
import IntroImage from '../../assets/images/Intro.png'

const Intro = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => { // api에 데이터 요청 후 응답 response에 저장
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BOARD_API_KEY}`);
                if (response.data && response.data.body.popularList && Array.isArray(response.data.body.popularList)) {
                    setPosts(response.data.body.popularList);
                } else {
                }
            } catch (e) {
                console.error(e);
                alert('Error: 데이터를 불러올 수 없습니다');
            }
            };
        
            fetchData();
    }, []);  

  return (
    <div className="intro-container">
        {/* <img src={IntroImage} alt="intro image" className="introImage" /> */}
        <div class="intro-overlay"></div>
        <div className="popularPostList">
            {/* <PopularList PopularPosts={posts} /> */}
        </div>
        <div class="intro-text-container">
            <div className="intro-text">국내 여행 블로그,<br />travelog</div>
        </div>
    </div>
  );
};

export default Intro;
