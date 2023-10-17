import React from "react";
import '../../styles/PersonalProfile.css';

import personal_profile_icon from '../../assets/images/personal_profile_icon.png'

// img랑 h2에는 각 사용자마다의 설정된 data와 닉네임을 불러올수있게해야함
function PersonalProfile() {
    return (
        <div className='personal_profile'>
            <img src={personal_profile_icon} alt="personal_profile_icon"/>
            <h2>방글방글</h2>
            <p>님의 여행기록</p>
        </div>
    )
}

export default PersonalProfile;