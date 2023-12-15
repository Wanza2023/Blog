import React from 'react';
import { useNavigate } from "react-router-dom";
import '../../../styles/pages/Main.css'
import { BiUserCircle } from "react-icons/bi";

function PopularBlog({ popularBlog }) {
    const navigate = useNavigate();

    return (
        <div>
            <div className="user-cards">
                {popularBlog.map((popularBlog, index) => (
                    <div key={index} className="user-card-container">
                        <div className="user-card" onClick={() => { navigate(`/user/${popularBlog.nickName}`)}}>
                            <div className="user-icon">
                                {popularBlog.pfp === null ?
                                    <BiUserCircle className='user-icon-default'/> : 
                                    <img src={popularBlog.pfp} alt={`${popularBlog.nickName}의 프로필`} />
                                }
                            </div>
                            <div className="description">{popularBlog.nickName} 님의 <br />블로그</div>
                            <button className="visit-button">방문하기</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PopularBlog;
