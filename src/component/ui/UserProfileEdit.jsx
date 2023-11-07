import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { BiUserCircle } from "react-icons/bi";
import '../../styles/UserProfileEdit.css';

const UserProfileEdit = ({ onSaveChanges }) => {
    const [nickname, setNickname] = useState(''); // 닉네임 상태 변수
    const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 상태 변수
    const [password, setPassword] = useState(''); // 비밀번호 상태 변수

    const handleImageChange = (e) => { // 이미지 변경
        if (e.target.files && e.target.files[0]) {
            setProfileImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleNicknameChange = (e) => { // 닉네임 변경
        setNickname(e.target.value);
    };

    const handlePasswordChange = (e) => {  // 비밀번호 확인으로 변경해야됨
        setPassword(e.target.value);
    };

    const handleSubmit = () => {
        // 비밀번호 확인 및 변경사항 저장 로직
        onSaveChanges({ nickname, profileImage, password });
    };

    const handleUnsubscribe = () => { // 탈퇴 시 확인 알림창
        const confirmUnsubscribe = window.confirm('작성하신 모든 글과 댓글이 삭제됩니다. 탈퇴하시겠습니까?');
        if (confirmUnsubscribe) {
            const inputPassword = window.prompt('비밀번호를 입력하세요.');
            if (inputPassword === password) {
                
            } else {
                alert('비밀번호가 틀렸습니다.');
            }
        }
    };

    return (
        <div className="userProfileEdit">
            <div className="profileImage">
                <BiUserCircle size={150} className="userIcon" />
                <label htmlFor="image-upload" className="imageEdit">
                    <FaCog size={25} />
                </label>
                <input id="image-upload" type="file" onChange={handleImageChange} style={{ display: 'none' }} />
            </div>
            <div className="profileChange">
                <input type="text" placeholder="닉네임 변경" value={nickname} onChange={handleNicknameChange} />
                <input type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} />
                <input type="password" placeholder="비밀번호 확인" value={password} onChange={handlePasswordChange} />
                <div className="buttonContainer">
                    <button className="saveButton" onClick={handleSubmit}>저장하기</button>
                    <button className="unsubscribeButton" onClick={handleUnsubscribe}>탈퇴하기</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfileEdit;
