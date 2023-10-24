import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PostWriteComponent from '../component/ui/PostWriteComponent';
import styled from "styled-components";
import "../styles/PostWrite.css";

const Container = styled.div`
`

const MyBlock = styled.div`
  width: 50%;
  margin: 0 auto;
  margin-bottom: 0.2rem;
`

function PostWrite() {
  const navigate = useNavigate();
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("지역 선택");
  const [scheduleItems, setScheduleItems] = useState([{ date: '', location: '', transportation: '' }]);

  function onEditorChange(value) {
    setDesc(value);
  }

  function handleRegionChange(event) {
    setSelectedRegion(event.target.value);
  }

  const handlePublish = () => {
    const isPublic = window.confirm("이 게시물을 공개로 발행하시겠습니까?");

    if (isPublic) {
      navigate("/post-view");      
    } else {
      
    }
  };

  const addScheduleItem = () => {
    const newScheduleItems = [...scheduleItems, { date: '', location: '', transportation: '' }];
    setScheduleItems(newScheduleItems);
  };

  const handleScheduleChange = (index, field, value) => {
    const newScheduleItems = [...scheduleItems];
    newScheduleItems[index][field] = value;
    setScheduleItems(newScheduleItems);
  };

  const removeScheduleItem = (index) => {
    const newScheduleItems = [...scheduleItems];
    newScheduleItems.splice(index, 1);
    setScheduleItems(newScheduleItems);
  };
  

  return (
    <Container>
      <div className="body1">
        <select value={selectedRegion} onChange={handleRegionChange}>
          <option value="지역 선택" disabled>지역 선택</option>
          <option value="서울">서울</option>
          <option value="경기도">경기도</option>
          <option value="인천">인천</option>
          <option value="강원도">강원도</option>
          <option value="충청북도">충청북도</option>
          <option value="충청남도">충청남도</option>
          <option value="세종">세종</option>
          <option value="대전">대전</option>
          <option value="경상북도">경상북도</option>
          <option value="경상남도">경상남도</option>
          <option value="대구">대구</option>
          <option value="울산">울산</option>
          <option value="부산">부산</option>
          <option value="전라북도">전라북도</option>
          <option value="전라남도">전라남도</option>
          <option value="광주">광주</option>
          <option value="제주도">제주도</option>
        </select>
        <input id="title" type="text" value={title} placeholder="제목을 입력해주세요." onChange={(e) => { setTitle(e.target.value); }} />
        <button onClick={handlePublish}>발행</button>
      </div>
      <div className="body2">
        {scheduleItems.map((item, index) => (
          <div key={index}>
            <text>{index + 1}일차</text>
            <input type="text" placeholder="날짜" value={item.date} onChange={(e) => handleScheduleChange(index, 'date', e.target.value)} />
            <input type="text" placeholder="장소" value={item.location} onChange={(e) => handleScheduleChange(index, 'location', e.target.value)} />
            <input type="text" placeholder="이동수단" value={item.transportation} onChange={(e) => handleScheduleChange(index, 'transportation', e.target.value)} />
            <button onClick={() => removeScheduleItem(index)}>-</button>
          </div>
        ))}
        <button onClick={addScheduleItem}>+</button>
      </div>
      <MyBlock>
        <PostWriteComponent value={desc} onChange={onEditorChange} />
      </MyBlock>
      <div className="foot">
        <button>요약글 추가</button>
        <button>해시태그 추가</button>
      </div>
    </Container>
  )
};

export default PostWrite;
