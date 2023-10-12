import React from "react";
import './styles/PersonalProfile.css'
import personal_profile_icon from './assets/images/personal_profile_icon.png'


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