import React from "react";
import PersonalTextitems from "./PersonalTextItems";
import '../../styles/PersonalTextComponent.css';

const PersonalTextComponent = ({BoardData}) => {
    return (
        <div className="wrapper">
            {BoardData.map((item)=><PersonalTextitems key={item.id} path={`/${item.nickname}/${item.boardId}`} {...item}/>)}
        </div>
    )
}

export default PersonalTextComponent;