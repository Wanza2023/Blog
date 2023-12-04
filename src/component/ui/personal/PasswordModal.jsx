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

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        axios.post(`${process.env.REACT_APP_MEMBER_API_KEY}/validate/passwd`, password,{
            headers: {
                'Content-Type': 'text/plain',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
            if (response.data.success) {
                onPasswordSubmit();
            } else {
                setErrorMessage(response.data.message || '비밀번호 확인에 실패했습니다.');
            }
        })
        .catch(error => {
            console.log(token);
            console.log(password);
            console.error("Error: ", error.response.data);
            setErrorMessage('비밀번호 확인 중 오류가 발생했습니다.');
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