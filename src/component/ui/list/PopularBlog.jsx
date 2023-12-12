import React from 'react';
import { useNavigate } from "react-router-dom";
import personal_profile_icon from '../../../assets/images/personal_profile_icon.png';
import '../../../styles/pages/Main.css'

function PopularBlog({ users }) {
    const navigate = useNavigate();

    return (
        <div>
            <div className="user-cards">
                {users.map((user, index) => (
                    <div key={index} className="user-card-container">
                        <div className="user-card" onClick={() => { navigate(`/user/포비베이글`)}}>
                            <div className="user-icon">
                                <img src={personal_profile_icon} alt={`${user}의 프로필`} />
                            </div>
                            <div className="description">{user} 님의 <br />블로그</div>
                            <button className="visit-button">방문하기</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PopularBlog;
