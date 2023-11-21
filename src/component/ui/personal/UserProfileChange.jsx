import React, { useState } from 'react';
import axios from "axios";
import { FaCog } from 'react-icons/fa';
import { BiUserCircle } from "react-icons/bi";
import { useRecoilValue } from 'recoil';
import { memberIdState } from '../../common/AuthState';
import '../../../styles/component/UserProfileChange.css';

const UserProfileChange = ({ onSaveChanges }) => {
    const [passwordError, setPasswordError] = useState('');

    const storedNickname = sessionStorage.getItem('nickName');
    const storedBirth = sessionStorage.getItem('birth');
    const storedGender = sessionStorage.getItem('gender');
    const Gender = storedGender === 'W' ? '여성' : storedGender === 'M' ? '남성' : '';
    const memberId = useRecoilValue(memberIdState);
    const [nickname, setNickname] = useState(storedNickname); // 닉네임 상태 변수
    const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 상태 변수
    const [password, setPassword] = useState(''); // 비밀번호 상태 변수
    const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 상태 변수
    const [passwordChangeUrl, setPasswordChangeUrl] = useState('');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    const birth = formatDate(storedBirth);

    const handleImageChange = (e) => { // 이미지 변경
        if (e.target.files && e.target.files[0]) {
            setProfileImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleNicknameChange = (e) => { // 닉네임 변경
        setNickname(e.target.value);
    };

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
            return;
        }

        const newPassword = password;

        if (passwordChangeUrl && memberId && newPassword) {
            axios.patch(passwordChangeUrl, {
                memberId: memberId,
                password: newPassword
            })
            .then(response => {
                if (response.data.success) {
                    alert('비밀번호가 성공적으로 변경되었습니다.');
                    setPassword('');
                    setConfirmPassword('');
                } else {
                    alert('비밀번호 변경 실패');
                }
            })
            .catch(error => {
                alert('현재 비밀번호와 똑같은 비밀번호로는 변경할 수 없습니다.');
            });
        } else {
            alert('비밀번호 변경 정보가 누락되었습니다.');
        }
        onSaveChanges({ nickname, profileImage, password });
    };

    return (
        <div className="userProfileChange">
            <div className="profileImage">
                <BiUserCircle size={200} className="userIcon" />
                <label htmlFor="image-upload" className="imageEdit">
                    <FaCog size={30} />
                </label>
                <input id="image-upload" type="file" onChange={handleImageChange} style={{ display: 'none' }} />
            </div>
            <div className="profileChangeBox">
                <div className="profileField">
                    <p className="fieldLabel">이름</p>
                    <input 
                        type="text" 
                        placeholder="닉네임 변경" 
                        value={nickname} 
                        onChange={handleNicknameChange} 
                    />
                </div>
                <div className="profileField">
                    <p className="fieldLabel">생년월일</p>
                    <div className="dataField">{birth}</div>
                </div>
                <div className="profileField">
                    <p className="fieldLabel">성별</p>
                    <div className="dataField">{Gender}</div>
                </div>
                <div className="submitButtonContainer">
                    <button className="saveButton" onClick={handleSubmit}>저장하기</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfileChange;