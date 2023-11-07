import React, { useState } from 'react';
import Modal from 'react-modal';
import "../../../styles/component/PasswordModal.css"

Modal.setAppElement('#root');

const PasswordModal = ({ isOpen, onRequestClose, onPasswordSubmit }) => {
    const [password, setPassword] = useState(''); // 비밀번호 상태 변수

    const handleSubmit = (e) => { // 비밀번호 넘겨주기
        e.preventDefault();
        onPasswordSubmit(password);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Password Confirmation"
            className="Modal"
            overlayClassName="Overlay"
        >
            <h2>비밀번호 확인</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">확인</button>
                <button onClick={onRequestClose}>취소</button>
            </form>
        </Modal>
    );
};

export default PasswordModal;
