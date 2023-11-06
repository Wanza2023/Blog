import React, { useState } from 'react';
import { FaBookmark, FaChartBar, FaUserEdit } from 'react-icons/fa';
import '../styles/PersonalEdit.css'

const PersonalEdit = () => {
    const [Menu, setMenu] = useState('bookmark'); // 상태 변수 menu, 초기값 북마크 설정

    const MenuItem = ({ Icon, label, menuId }) => ( // MenuItem 컴포넌트
        <div 
            className={`menuitemE ${Menu === menuId ? 'active' : ''}`}
            onClick={() => setMenu(menuId)}
        >
        <Icon className="menuicon" size={100}/>
        {label}
        </div>
    );

    const renderContent = () => {
        switch (Menu) { // 상태 변수 값에 따라 나누기
        case 'bookmark':
            return <div>북마크</div>;
        case 'stats':
            return <div>방문자 통계</div>;
        case 'edit':
            return <div>회원 정보 수정</div>;
        }
    };

    return (
        <div className="menuContainer">
            <div className="menuE">
                <MenuItem Icon={FaBookmark} label="북마크" menuId="bookmark" />
                <MenuItem Icon={FaChartBar} label="방문자 통계" menuId="stats" />
                <MenuItem Icon={FaUserEdit} label="회원 정보 수정" menuId="edit" />
            </div>
            <div className="contentE">
                {renderContent()}
            </div>
        </div>
    );
};

export default PersonalEdit;

