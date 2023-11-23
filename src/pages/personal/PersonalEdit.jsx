import React, { useState } from 'react';
import { FaBookmark, FaChartBar, FaUserEdit, FaUserCog } from 'react-icons/fa';
import BookmarkList from '../../component/ui/personal/BookmarkList';
import PasswordModal from '../../component/ui/personal/PasswordModal';
import UserProfileChange from '../../component/ui/personal/UserProfileChange';
import UserProfileEdit from '../../component/ui/personal/UserProfileEdit';
import Button from '../../component/common/Button';
import '../../styles/pages/PersonalEdit.css'

const PersonalEdit = () => {
    const [Menu, setMenu] = useState('bookmark'); // 상태 변수 menu, 초기값 북마크 설정
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [confirmPassword, setconfirmPassword] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);

    const handleSaveChanges = (updatedProfile) => {
        // API
    };
    
    const handleMenuClick = (menuId) => {
        if (menuId === 'edit') {
            // Change to 회원 정보 수정 tab, then show modal
            setMenu('edit');
            setIsPasswordModalOpen(true);
            setResetPassword(prev => !prev);
        } else {
            setMenu(menuId);
            setconfirmPassword(false);
            if (isPasswordModalOpen) {
                setIsPasswordModalOpen(false);
            }
        }
    };

    const handlePasswordSubmit = (password) => { // 모달에서 넘겨받은 비밀번호 처리
        setIsPasswordModalOpen(false);
        setconfirmPassword(true);
    };

    const onRequestCloseModal = () => {
        setIsPasswordModalOpen(false);
        setconfirmPassword(false);
    };


    const menuItems = {
        bookmark: { Icon: FaBookmark, label: "북마크" },
        stats: { Icon: FaChartBar, label: "방문자 통계" },
        change: { Icon: FaUserEdit, label: "회원 정보 수정" },
        edit: { Icon: FaUserCog, label: "비밀번호 변경 및 탈퇴" }
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
            return <BookmarkList onSaveChanges={handleSaveChanges} />;
        case 'stats':
            return 
        case 'change':
            return <UserProfileChange onSaveChanges={handleSaveChanges} />;
        case 'edit':
            if (confirmPassword) {
                return <UserProfileEdit onSaveChanges={handleSaveChanges} />;
            }
        }
    };

    return (
        <>
            <PasswordModal
                isOpen={isPasswordModalOpen}
                onRequestClose={onRequestCloseModal}
                onPasswordSubmit={handlePasswordSubmit}
                resetPassword={resetPassword}
            />
            {/* <div className='menuWrapper'>    
                <div className="menuHeader">
                    <span className="menuTitle">{menuItems[Menu].label}</span>
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
            </div> */}
            <div className='menuWrapper'>    
                
                <div className="menuContainer">
                    <div className="menuE">
                        {Object.keys(menuItems).map((menuId) => (
                            <MenuItem key={menuId} menuId={menuId} />
                        ))}
                    </div>
                    <div className="contentE">
                        <div className="menuHeader">
                            <span className="menuTitle">{menuItems[Menu].label}</span>
                        </div>
                        {renderContent()}
                    </div>
                </div>
            </div>
            <Button></Button>
        </>
    );
};

export default PersonalEdit;
