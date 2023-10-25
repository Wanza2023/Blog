import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import PostWriteComponent from '../component/ui/PostWriteComponent';
import SelectLocation from '../component/ui/SelectLocation';
import styled from "styled-components";
import "../styles/PostWrite.css";

const Container = styled.div`
  padding: 2rem 3rem;
`

const MyBlock = styled.div`
  width: 50%;
  margin: 0 auto;
  margin-bottom: 0.2rem;
`
const WholeBox = styled.div`
  display: flex;
  justify-content: center;
`

const Title = styled.div`
  padding: 10px;
`

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 50px;
  margin: 10px;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;

  &:focus-within {
    border-color: #5076FF;
  }
`

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: #5076FF;
  color: white;
  border-radius: 5px;
  font-size: 13px;
`

const Text = styled.span``

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  border: none;
  background-color: #5076FF;
  color: white;
`

const TagInput = styled.input`
  display: inline-flex;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`

function PostWrite() {
  const navigate = useNavigate();
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("지역 선택");
  const [scheduleItems, setScheduleItems] = useState([{ date: '', location: '', transportation: '' }]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  
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

  const locationTitle = window.localStorage.getItem("title");

  const [inputHashTag, setInputHashTag] = useState('');
  const [hashTags, setHashTags] = useState([]);

  const [tagItem, setTagItem] = useState('')
  const [tagList, setTagList] = useState([])

  const onKeyPress = e => {
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      submitTagItem()
    }
  }

  const submitTagItem = () => {
    let updatedTagList = [...tagList]
    updatedTagList.push(tagItem)
    setTagList(updatedTagList)
    setTagItem('')
  }

  const deleteTagItem = e => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText
    const filteredTagList = tagList.filter(tagItem => tagItem !== deleteTagItem)
    setTagList(filteredTagList)
  }

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
            <text className="index">{index + 1}번째 여행지</text>
            <input type="text" placeholder="날짜" value={item.date} onChange={(e) => handleScheduleChange(index, 'date', e.target.value)} />
            <button className="selectLocation" onClick={()=> setModalIsOpen(true)}>장소</button>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
              <SelectLocation />
            </Modal>
            <><text className="locationTitle">{locationTitle}</text></>
            <input type="text" placeholder="이동수단" value={item.transportation} onChange={(e) => handleScheduleChange(index, 'transportation', e.target.value)} />
            <button className="minus" onClick={() => removeScheduleItem(index)}>-</button>
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
      <WholeBox>
      <Title text='Tag' />
      <TagBox>
        {tagList.map((tagItem, index) => {
          return (
            <TagItem key={index}>
              <Text># {tagItem}</Text>
              <Button onClick={deleteTagItem}>X</Button>
            </TagItem>
          )
        })}
        <TagInput
          type='text'
          placeholder='#해시태그를 입력하세요.'
          tabIndex={2}
          onChange={e => setTagItem(e.target.value)}
          value={tagItem}
          onKeyPress={onKeyPress}
        />
      </TagBox>
    </WholeBox>
    </Container>
  )
};

export default PostWrite;
