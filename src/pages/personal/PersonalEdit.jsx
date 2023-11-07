import React, { useState } from 'react';
import { FaBookmark, FaChartBar, FaUserEdit } from 'react-icons/fa';
import PasswordModal from '../../component/ui/personal/PasswordModal';
import UserProfileEdit from '../../component/ui/personal/UserProfileEdit';
import Button from '../../component/common/Button';
import '../../styles/pages/PersonalEdit.css'

const PersonalEdit = () => {
    const [Menu, setMenu] = useState('bookmark'); // 상태 변수 menu, 초기값 북마크 설정
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const handleSaveChanges = (updatedProfile) => {
        // API
    };
    
    const handlePasswordSubmit = (password) => { // 모달에서 넘겨받은 비밀번호 처리
        setIsPasswordModalOpen(false);
        setMenu('edit');
    };

    const handleMenuClick = (menuId) => {
        if (menuId === 'edit') { // 회원 정보 수정 클릭 시 비밀번호 모달
            setIsPasswordModalOpen(true);
        } else {
            setMenu(menuId);
        }
    };

    const menuItems = {
        bookmark: { Icon: FaBookmark, label: "북마크" },
        stats: { Icon: FaChartBar, label: "방문자 통계" },
        edit: { Icon: FaUserEdit, label: "회원 정보 수정" },
    };

    const MenuItem = ({ menuId }) => {
        const { Icon, label } = menuItems[menuId];
        return (
            <div 
                className={`menuitemE ${Menu === menuId ? 'active' : ''}`} // 메뉴에 해당하는 태그 보여주기
                onClick={() => handleMenuClick(menuId)}
            >
                <Icon className="menuicon" size={30}/>
                <span>{label}</span>
            </div>
        );
    };

    const renderContent = () => {
        switch (Menu) { // 상태 변수 값에 따라 나누기
        case 'bookmark':
            return 
        case 'stats':
            return 
        case 'edit':
            return <UserProfileEdit onSaveChanges={handleSaveChanges} />;
        }
    };

    return (
        <>
            <PasswordModal
                isOpen={isPasswordModalOpen}
                onRequestClose={() => setIsPasswordModalOpen(false)}
                onPasswordSubmit={handlePasswordSubmit}
            />
            <div className="menuHeader">
                <span className="menuTitle">{menuItems[Menu].label}</span>
                <hr className="menuDivider" />
            </div>
            <div className="menuContainer">
                <div className="menuE">
                    {Object.keys(menuItems).map((menuId) => (
                        <MenuItem key={menuId} menuId={menuId} />
                    ))}
                </div>
                <div className="contentE">
                    {renderContent()}
                </div>
            </div>
            <Button></Button>
        </>
    );
};

export default PersonalEdit;
