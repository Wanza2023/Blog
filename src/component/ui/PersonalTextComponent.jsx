// JSON파일에 data넣어서 했는데 img가 load가 안됨
// 그냥 삼항연산자쓰면 되기는 하는데 이러면 image가 많아질수록 코드가 쓸데없이 길어짐

import React from "react";
import PersonalTextitems from "./PersonalTextItems";
import '../../styles/PersonalTextComponent.css';
import ex01 from '../../assets/images/personalhome_ex01.png';
import ex02 from '../../assets/images/personalhome_ex02.png';
import ex03 from '../../assets/images/personalhome_ex03.png';

// function PersonalTextComponent() {
//     const [postList, setPostList] = useState([]);

//     useEffect(() => {
//         setPostList(postData);
//     }, []);

//     return (
//         <div className="wrapper">
//             {postList.map((post) => (
//                 <PersonalTextitems key={post.id} {...post} />
//             ))}
//         </div>
//     );
// }

// export default PersonalTextComponent;


// JSON 안쓰고 하기
// import React from "react";
// import PersonalTextitems from "./PersonalTextItems";
// import '../../styles/PersonalTextComponent.css';
// import ex01 from '../../assets/images/personalhome_ex01.png'
// import ex02 from '../../assets/images/personalhome_ex02.png'
// import ex03 from '../../assets/images/personalhome_ex03.png'

function PersonalTextComponent() {
    
    const post_list_array = [{id:1,
                    img:ex01, 
                    alt:"ex01",
                    title:"[부산] 해운대 마린시티",
                    content1:"제주도에 오랜만에 방문하였다.",
                    content2:"돌하르방에 대해서는 한번도 관심을 가져본 적이 없었는데 이번 기회에 ....",

                    path:"../post-view"
                    },  
                    {id:2,
                    img:ex02, 
                    alt:"ex02",
                    title:"[부산] 해운대 마린시티",
                    content1:"제주도에 오랜만에 방문하였다. 돌하르방에 대해서는 한번도 관심을 가져본 적이 없었는데"
                    // path 설정 해서 그 글 조회하는 페이지로 넘어가게만들기
                    },
                    {id:3,
                    img:ex03, 
                    alt:"ex03",
                    title:"[부산] 해운대 마린시티",
                    content1:"제주도에 오랜만에 방문하였다. 돌하르방에 대해서는 한번도 관심을 가져본 적이 없었는데 "
                    // path 설정 해서 그 글 조회하는 페이지로 넘어가게만들기
                    },              
                ]
    return (
        <div className="wrapper">
            {post_list_array.map((index)=>(<PersonalTextitems key={index.id} {...index}/>))}
        </div>
    )
}


export default PersonalTextComponent;