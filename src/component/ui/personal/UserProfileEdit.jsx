import React, { useState } from 'react';
import axios from "axios";
import { FaCog } from 'react-icons/fa';
import { BiUserCircle } from "react-icons/bi";
import { useRecoilValue } from 'recoil';
import { memberIdState } from '../../common/AuthState';
import '../../../styles/component/UserProfileEdit.css';

const UserProfileEdit = ({ onSaveChanges }) => {
    const [passwordError, setPasswordError] = useState('');

    const storedNickname = sessionStorage.getItem('nickName');

    const memberId = useRecoilValue(memberIdState);

    const [password, setPassword] = useState(''); // 비밀번호 상태 변수
    const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 상태 변수

    const [editPassword, setEditPassword] = useState(false); 

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

    const handlePasswordChange = (e) => {  // 비밀번호 확인으로 변경해야됨
        setPassword(e.target.value);
        if (passwordError) setPasswordError('');
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (passwordError) setPasswordError('');
    };

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
            return;
        }

        const newPassword = password;
        const passwordChangeUrl = sessionStorage.getItem('href');
        console.log(newPassword);
        console.log(memberId);

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
        onSaveChanges({ password });
    };

    return (
        <div className="userProfileEdit">
            <div className="profileChange">
                <p className="label">비밀번호 변경</p>
                <div className="inputContainer">
                    <input 
                        type="password" 
                        placeholder="새 비밀번호" 
                        value={password} 
                        onChange={handlePasswordChange} 
                    />
                </div>
                <div className="inputContainer">
                    <input 
                        type="password" 
                        placeholder="새 비밀번호 확인" 
                        value={confirmPassword} 
                        onChange={handleConfirmPasswordChange} 
                    />
                </div>
                {passwordError && <p className="error-message">{passwordError}</p>}
                <div className="buttonContainer">
                    <button className="saveButton" onClick={handleSubmit}>변경하기</button>
                </div>
                <hr className="borderUnsubscribe" />
                <div className="unsubscribeContainer">
                    <button className="unsubscribeButton" onClick={handleUnsubscribe}>탈퇴하기</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfileEdit;