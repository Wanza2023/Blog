import { useState,useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState} from 'recoil';
import axios from 'axios';
import Modal from 'react-modal';
import { nickNameState } from "../component/AuthState";
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
  width: 600px;
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
  const [nickName,setNickName] = useRecoilState(nickNameState);// 닉네임 전역관리
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("지역 선택");
  const [scheduleItems, setScheduleItems] = useState([{ date: '', transport: '', locationName: ''}]);
  const [locationItems,setLocationItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totConfirm, setTotConfirm] = useState([0,0,0]);  // 필수입력정보 입력되면 1로바꾸기
  const isFormValid = totConfirm.every(item => item === 1); // 필수입력정보가 모두 입력되면 발행버튼이 눌리게하기
  const [isPublic, setIsPublic] = useState(true); // 글 공개 비공개 설정
  const location = useLocation();

  
  const boardWrite = async() => {

		const board = {
      "nickname": nickName,
      "local": selectedRegion,
      "title": title,
      "contents": desc,
      "summary": summaryN,
      "status": isPublic,
      "schedules": schedules,
      "hashtags": tagList
  }

		await axios.post("http://172.16.210.130:8082/board/write", board)
    .then((resp) => {
			console.log(resp.data);
      const boardId = resp.data.body;
      console.log(boardId);
      navigate(`/${nickName}/${boardId}`);
			alert("새로운 게시글을 성공적으로 등록했습니다 :D");
      console.log(board);
		})
		.catch((err) => {
			console.log(err);
		});
  }

  const handleSelectLocation = (selectedLocationData) => {
    setLocationItems([...locationItems, selectedLocationData]); //모달에서 지도 정보받아오기 경도,위도,위치이름'

    const newScheduleItems = [...scheduleItems];
    newScheduleItems[newScheduleItems.length - 1].locationName = selectedLocationData.location;
    setScheduleItems(newScheduleItems);
  };

  function onEditorChange(value) {
    const content = value;
    setDesc(content);
    if(content === null) {
      totConfirm[2] = 0;
      setTotConfirm(()=>[...totConfirm]);
    }
    else{
      totConfirm[2] = 1;
      setTotConfirm(()=>[...totConfirm]);
    }
  }

  function handleRegionChange(event) {
    const region = event.target.value;
    setSelectedRegion(region);
    if(region === '지역선택'){
      totConfirm[0] = 0;
      setTotConfirm(()=>[...totConfirm]);
    }
    else{
      totConfirm[0] = 1;
      setTotConfirm(()=>[...totConfirm]);
    }
  }
  const onChangeTitle = (e) => {
    const changeTitle = e.target.value;
    setTitle(changeTitle);
    if(changeTitle === null) {
      totConfirm[1] = 0;
      setTotConfirm(()=>[...totConfirm]);
    }
    else{
      totConfirm[1] = 1;
      setTotConfirm(()=>[...totConfirm]);
    }
  }
  const combinedSchedule = locationItems.map((locationItem, index) => {
    return Object.assign({}, locationItem, scheduleItems[index]);
  });
  
  const schedules = [...combinedSchedule];

  const addScheduleItem = () => {
    const newScheduleItems = [...scheduleItems, { date: '', transport: '' }];
    setScheduleItems(newScheduleItems);
  };

  const handleScheduleChange = (index, field, value) => {
    if (field === 'date') {
      // 일정 날짜 "nnnn-nn-nn" 형식으로
      const formattedDate = value
        .replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
  
      const newScheduleItems = [...scheduleItems];
      newScheduleItems[index][field] = formattedDate;
      setScheduleItems(newScheduleItems);
    } else {
      const newScheduleItems = [...scheduleItems];
      newScheduleItems[index][field] = value;
      setScheduleItems(newScheduleItems);
    }
  };

  const removeScheduleItem = (index) => {
    const newScheduleItems = [...scheduleItems];
    newScheduleItems.splice(index, 1);
    setScheduleItems(newScheduleItems);
  };

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

  const deleteTagItem = (e) => {
    const deletedTag = e.target.parentElement.firstChild.innerText.substr(2);
    const filteredTagList = tagList.filter(tagItem => tagItem !== deletedTag);
    setTagList(filteredTagList);
  };
  const handleError = () => {
    //글 작성시 지역 선택,제목,내용 입력 안하면 alert창 띄우기
    alert("지역 선택,제목,내용을 모두 입력해주세요");
  }
  const handlePublish = () => {
    const isConfirmed = window.confirm("게시글을 발행하시겠습니까?");
    if (isConfirmed) {
      if (isFormValid) {
        boardWrite();
      } else {
        handleError();
      }
    }
  };

  const [summary, setSummary] = useState('');

  const fetchSummary = async () => { // 본문 전송 후 요약글 받기
    try {
      const response = await axios.post('http://172.16.210.130:8000/summary', { content: desc });
      if (response.data && response.data.content) {
        setSummary(response.data.content);
        console.log(summary);
      } else {
        console.error('Invalid response format');
      }
    } catch (error) {
      console.error('Failed to fetch summary:', error);
      if (error.response) {
        console.error('Server Response:', error.response.data);
      }
    }
  }; 

  const [summaryN, setSummaryN] = useState('');

  const fetchSummaryN = async () => {
    try {
      const requestBody = {
        title: title ? title : null,
        content: desc ? desc : null
      };

      const response = await axios.post('http://172.16.210.130:8001/summary', requestBody);
      
      if (response.data && 'summary' in response.data) {
        setSummaryN(response.data.summary);
        console.log(summaryN);
      } else {
        console.error('Invalid response format');
      }
    } catch (error) {
      console.error('Failed to fetch summary:', error);
      if (error.response) {
        console.error('Server Response:', error.response.data);
      }
    }
  };  
  const onClickSelectLocation = () => {
    <SelectLocation setLocationItems={handleSelectLocation}/>
  }
  

  return (
    <Container>
      <div className="body1">
        <select value={selectedRegion} onChange={handleRegionChange}>
          <option value="지역 선택" disabled>지역 선택</option>
          <option value="Seoul">서울</option>
          <option value="Gyeonggi">경기도</option>
          <option value="Incheon">인천</option>
          <option value="Gangwon">강원도</option>
          <option value="Chungbuk">충청북도</option>
          <option value="Chungnam">충청남도</option>
          <option value="Sejong">세종</option>
          <option value="Daejeon">대전</option>
          <option value="Gyeongbuk">경상북도</option>
          <option value="Gyeongnam">경상남도</option>
          <option value="Daegu">대구</option>
          <option value="Ulsan">울산</option>
          <option value="Busan">부산</option>
          <option value="Jeonbuk">전라북도</option>
          <option value="Jeonnam">전라남도</option>
          <option value="Gwangju">광주</option>
          <option value="Jeju">제주도</option>
        </select>
        <input id="title" type="text" value={title} placeholder="제목을 입력해주세요." onChange={onChangeTitle} />
        <label className="toggleBtn">
          <input type="checkbox" checked={isPublic} onChange={() => setIsPublic(!isPublic)} />
          <span></span>
          <div className="toggleInput">
            {isPublic ? '공개' : '비공개'}
          </div>
        </label>
        <button onClick={!isFormValid? handleError : boardWrite}>발행</button>
      </div>
      <div className="body2">
        <div className="schedulecss">
          {scheduleItems.map((item, index) => (
            <div key={index} className="scheduleList">
              <text className="index">{index + 1}번째 여행지</text>
              <input type="text" placeholder="날짜" value={item.date} onChange={(e) => handleScheduleChange(index, 'date', e.target.value)} />
              <button className="selectLocation" onClick={()=> setModalIsOpen(true)}>장소</button>
              <Modal className="modal" isOpen={modalIsOpen} ariaHideApp={false} onRequestClose={() => setModalIsOpen(false)} >
                <SelectLocation setModalIsOpen={setModalIsOpen} setLocationItems={handleSelectLocation}/>
              </Modal>
              {/* <button className="selectLocation" onClick={()=>navigate('/selectlocation')}>장소</button> */}
              {item.locationName && <span className="locationName">{item.locationName}</span>}
              <input type="text" placeholder="이동수단" value={item.transport} onChange={(e) => handleScheduleChange(index, 'transport', e.target.value)} />
              <button className="plus" onClick={addScheduleItem}>+</button>
              {index > 0 ? <button className="minus" onClick={() => removeScheduleItem(index)}>-</button> : null}
            </div>
          ))}
        </div>
      </div>
      <MyBlock>
        <PostWriteComponent value={desc} onChange={onEditorChange} />
      </MyBlock>
      <div className="foot">
        <button onClick={fetchSummary}>카카오</button>
        {summary && <div className="summary-content">{summary}</div>}
        <button onClick={fetchSummaryN}>클로바</button>
        {summaryN  && <div className="summary-content">{summaryN}</div>}
        {/* <button>해시태그 추가</button> */}
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
  );
}
export default PostWrite;
