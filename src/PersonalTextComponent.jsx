import React from "react";
import PersonalTextitems from "./PersonalTextItems";
import './styles/PersonalTextComponent.css';
import ex01 from './assets/images/personalhome_ex01.png'
import ex02 from './assets/images/personalhome_ex02.png'
import ex03 from './assets/images/personalhome_ex03.png'

//이미지 옆으로 정렬되게 css해야됨
function PersonalTextComponent() {
    return (
        <div className="wrapper">
            <PersonalTextitems
                    img={ex01}
                    alt="ex01"
                    title="[부산] 해운대 마린시티"
                    content="제주도에 오랜만에 방문하였다. 돌하르방에 대해서는 한번도 관심을 가져본 적이 없었는데 이번 기회에 ...."
                    // path 설정 해서 그 글 조회하는 페이지로 넘어가게만들기
                />
                <PersonalTextitems
                    img={ex02}
                    alt="ex02"
                    title="[제주] 제주도 카카오 본사 구경"
                    content="카카오 프렌즈 캐릭터 덕후로써 제주도에 방문함김에 카카오 본사를 다녀왔다. vr체험도 가능하고 억새밭 ..."
                    // path 설정 해서 그 글 조회하는 페이지로 넘어가게만들기
                />
                <PersonalTextitems
                    img={ex03}
                    alt="ex03"
                    title="[제주] 돌하르방과 ‘함께’"
                    content="제주도에 오랜만에 방문하였다. 돌하르방에 대해서는 한번도 관심을 가져본 적이 없었는데 이번기회에 ...."
                    // path 설정 해서 그 글 조회하는 페이지로 넘어가게만들기
                />
        </div>
    );
}


export default PersonalTextComponent;