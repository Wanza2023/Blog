import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from "axios";
import "../../../styles/component/PasswordModal.css"

Modal.setAppElement('#root');

const PasswordModal = ({ isOpen, onRequestClose, onPasswordSubmit, resetPassword }) => {
    const [password, setPassword] = useState(''); // 비밀번호 상태 변수
    const [errorMessage, setErrorMessage] = useState('');
    const userEmail = sessionStorage.getItem('email');
    useEffect(() => {
        if (resetPassword) {
            setPassword('');
        }
    }, [resetPassword]);

    const handleSubmit = (e) => { // 비밀번호 넘겨주기
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_MEMBER_API_KEY}/login`, {
            email: userEmail,
            password: password,
        })
        .then(response => {
            if (response.data.success) {
                onPasswordSubmit();
                axios.post(`${process.env.REACT_APP_MEMBER_API_KEY}/pwInquiry`, userEmail, {
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                })
                .then(response => {
                    console.log('Response:', response);
                    if (response.data.success) {
                        sessionStorage.setItem('href',response.data.body.href);
                        
                    } else {
                        alert('비밀번호 변경 요청 실패');
                    }
                })
                .catch(error => {
                    console.error('Error requesting password change:', error);
                    alert('비밀번호 변경 요청 중 오류 발생');
                });
            } else {
                setErrorMessage('현재 비밀번호가 일치하지 않습니다.');
            }
        })
        .catch(error => {
            console.error('Error verifying password:', error);
            setErrorMessage('비밀번호가 일치하지 않습니다.');
        });
    };

        

    const handleRequestClose = () => {
        setPassword(''); 
        onRequestClose(); 
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleRequestClose}
            className="Modal"
            overlayClassName="Overlay"
        >
            <h2 className="modalTitle">비밀번호 확인</h2>
            <div className="emailInfo">
                {userEmail}
            </div>
            {/* <form onSubmit={handleSubmit}> */}
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="passwordInput"
                />
                <div>
                    <button className="passwordSubmit" type="submit">확인</button>
                    <button className="passwordSubmit" onClick={handleRequestClose}>취소</button>
                    {errorMessage && <div className="errorMessage">{errorMessage}</div>}
                </div>
            </form>
        </Modal>
    );
};

export default PasswordModal;