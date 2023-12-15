import { useEffect, useState } from "react";
import { useNavigate,useLocation,useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";
import Modal from "react-modal";
import { nickNameState } from "../../component/common/AuthState";
import PostWriteComponent from "../../component/ui/write/PostWriteComponent";
import SelectLocation from "../../component/ui/contents/schedule/SelectLocation";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import 'react-datepicker/dist/react-datepicker.css';
import styled from "styled-components";
import "../../styles/pages/PostWrite.css";
import { HiOutlineHashtag } from "react-icons/hi";
import { TiDeleteOutline } from "react-icons/ti";
import { CiCalendarDate } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { PiBusLight } from "react-icons/pi";
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from "react-icons/hi";
import { CostExplorer } from "aws-sdk";
import { has, map } from "lodash";

const Container = styled.div`
    display: grid;
    justify-content: center;
    background-color: #FAFAFA;
`;

const MyBlock = styled.div`
    margin: 0 auto;
    margin-bottom: 0.2rem;
`;
const WholeBox = styled.div`
    container-type: inline-size;
    display: flex;
`;

const TagBox = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    min-height: 50px;
    margin: 10px;
    padding: 0 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    width: 100%;
    &:focus-within {
        border-color: #5076ff;
    }
`;

const TagItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px;
    border-radius: 12px;
    border: 1px solid #CFCFCF;
    font-size: 0.9rem;
    margin-right: 0.5rem;
`;

const Text = styled.span``;

const TagInput = styled.input`
    display: inline-flex;
    width: auto;
    background: transparent;
    border: none; 
    outline: none;
    cursor: text;
`;

const ToggleButton = styled.label`
    width: 4rem;
    height: 2.3rem;
    border: 1px solid #5585FF;
    border-radius: 50px;
    background-color: ${props => props.isPublic ? 'white' : '#5585FF'};
    color: ${props => props.isPublic ? '#5585FF' : 'white'};
    text-align: center;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.5rem;
    line-height: 2.5rem;
`;

const DeleteButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    margin-left: 0.2rem;
`;

function PostEdit() {
    const navigate = useNavigate();
    const [nickName, setNickName] = useRecoilState(nickNameState); // 닉네임 전역관리
    const { nickname, boardId } = useParams();  // nickname 게시글 작성자 닉네임
    const [desc, setDesc] = useState("");
    const [title, setTitle] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("지역 선택");
    const [scheduleItems, setScheduleItems] = useState([
        { day: 1, date: "", transport: "", locationName: "" },
    ]);
    const [locationItems, setLocationItems] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false); // 모달창 Open 여부
    const [totConfirm, setTotConfirm] = useState([0, 0, 0]); // 필수입력정보 입력되면 1로바꾸기
    const isFormValid = totConfirm.every((item) => item === 1); // 필수입력정보가 모두 입력되면 발행버튼이 눌리게하기
    const [isPublic, setIsPublic] = useState(true); // 글 공개 비공개 설정
    const [tagItem, setTagItem] = useState("");
    const [tagList, setTagList] = useState([]);
    const [summaryN, setSummaryN] = useState("");
    const [showSchedule, setShowSchedule] = useState(false);
    const memberId = sessionStorage.getItem('memberId');

    const handleDayChange = (index, newDay) => {
        const updatedScheduleItems = scheduleItems.map((item, idx) => {
        if (idx === index) {
            return { ...item, day: newDay };
        }
        return item;
        });
        setScheduleItems(updatedScheduleItems);
    };

    const getBoard = async () => {
        const token = sessionStorage.getItem('token');
        
        try {
            const response = await axios.get(`${process.env.REACT_APP_BOARD_API_KEY}/${nickname}/${boardId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
            }
            });
            if (response.data && response.data.body) {
                console.log('Data received from the server:', response.data.body);
                setTitle(response.data.body.title);
                setDesc(response.data.body.contents);
                setSelectedRegion(response.data.body.local);
                setScheduleItems(response.data.body.schedules);
                // 스케쥴아이템은 어떻게 잘 고쳐야할지 모르겠음
                // 현재 스케쥴아이템은 받아오는 상태인데 일정추가를 누르면 에러가 뜨거나 일정추가가 일어나지않음
                setSummaryN(response.data.body.summary);
                setTagList(response.data.body.hashtags);
                setIsPublic(response.data.body.status);
                setTotConfirm([1, 1, 1]);
            } else {
                console.error('Invalid response data format');
            }
            } catch (e) {
                console.error(e);
                alert('Error: 데이터를 불러올 수 없습니다');
            }
        };
    // axios post Write
    const boardEdit = async () => {
        const board = {
            memberId : memberId,
            ninkname : nickname,
            local: selectedRegion,
            title: title,
            contents: desc,
            summary: summaryN,
            status: isPublic,
            schedules: schedules,
            hashtags: tagList,
        };
    
        await axios
            .put(`${process.env.REACT_APP_BOARD_API_KEY}/write/${boardId}`, board)
            .then((res) => {
                navigate(`/${nickName}/${boardId}`, { replace: true }); // 글 작성후 작성된 글로 이동 후 뒤로가기 불가
                alert("게시글을 성공적으로 변경했습니다 :D");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getBoard();
        console.log(totConfirm);
    }, []);
    const handleSelectLocation = (selectedLocationData, index) => {
        setLocationItems((prevLocationItems) => {
        const updatedLocationItems = [...prevLocationItems];
        updatedLocationItems[index] = selectedLocationData;
        return updatedLocationItems;
        });
    
        const newScheduleItems = [...scheduleItems];
        newScheduleItems[index].locationName = selectedLocationData.location;
        setScheduleItems(newScheduleItems);
    };  
    // 글쓰기 내용 content onChange
    function onEditorChange(value) {
        const content = value;
        setDesc(content);
        if (content === null) {
        totConfirm[2] = 0;
        setTotConfirm(() => [...totConfirm]);
        } else {
        totConfirm[2] = 1;
        setTotConfirm(() => [...totConfirm]);
        }
    }
    // 지역 Region onChange
    function handleRegionChange(event) {
        const region = event.target.value;
        setSelectedRegion(region);
        if (region === "지역선택") {
        totConfirm[0] = 0;
        setTotConfirm(() => [...totConfirm]);
        } else {
        totConfirm[0] = 1;
        setTotConfirm(() => [...totConfirm]);
        }
    }
    // 제목 title onChange
    const onChangeTitle = (e) => {
        const changeTitle = e.target.value;
        setTitle(changeTitle);
        if (changeTitle === null) {
        totConfirm[1] = 0;
        setTotConfirm(() => [...totConfirm]);
        } else {
        totConfirm[1] = 1;
        setTotConfirm(() => [...totConfirm]);
        }
    };
    // SelectLocation 컴포넌트에서 받아온 locationItems와 scheduleItems 합치기
    const combinedSchedule = locationItems.map((locationItem, index) => {
        return Object.assign({}, locationItem, scheduleItems[index]);
    });
    // 합쳐진 데이터 schedules에 저장
    const schedules = [...combinedSchedule];
    // + 버튼 클릭시 배열 추가
    const addScheduleItem = () => {
        const newScheduleItems = [...scheduleItems, { date: "", transport: "" }];
        setScheduleItems(newScheduleItems);
    };
    // 스케쥴 Schedule onChange
    const handleScheduleChange = (index, field, date) => {
        if (field === "date") {
        const newScheduleItems = [...scheduleItems];
        newScheduleItems[index][field] = date;
        setScheduleItems(newScheduleItems);
        } else {
        const newScheduleItems = [...scheduleItems];
        newScheduleItems[index][field] = date;
        setScheduleItems(newScheduleItems);
        }
    };

    // 일정 - 버튼 클릭시 
    const removeScheduleItem = (index) => {
        const newScheduleItems = [...scheduleItems];
        newScheduleItems.splice(index, 1);
        setScheduleItems(newScheduleItems);
    };
    // 엔터키 입력시 해시태그 작성
    const onKeyPress = (e) => {
        if (e.target.value.length !== 0 && e.key === "Enter") {
        submitTagItem();
        }
    };
    // 해시태그 입력
    const submitTagItem = () => {
        let updatedTagList = [...tagList];
        const newTagItem = tagItem.replace(/(\s*)/g, "");
        updatedTagList.push(newTagItem);
        setTagList(updatedTagList);
        setTagItem("");
    };
    // 해시태그 삭제
    const deleteTagItem = (tagToDelete) => {
        const filteredTagList = tagList.filter(tag => tag !== tagToDelete);
        setTagList(filteredTagList);
    };
    // 요약 내용 입력 및 변경
    const handleSetSummaryValue = (e) => {
        setSummaryN(e.target.value);
    };
    //글 작성시 지역 선택,제목,내용 입력 안하면 alert창 띄우기
    const handleError = () => {
        alert("지역 선택,제목,내용을 모두 입력해주세요");
    };

    // 클로바 요약
    const fetchSummaryN = async () => {
        try {
        const requestBody = {
            title: title ? title : null,
            content: desc ? desc : null,
        };

        const response = await axios.post(
            `${process.env.REACT_APP_SUMMARY_API_KEY}`,
            requestBody
        );

        if (response.data && "summary" in response.data) {
            setSummaryN(response.data.summary);
        } else {
            console.error("Invalid response format");
        }
        } catch (error) {
        console.error("Failed to fetch summary:", error);
        alert("본문(content) 필드는 문장 분리기에 의해 분리된 문장이 하나 이상 있어야 하며, 문장 분리기는 한 문장이 5 어절 이상이어야 하고 200 자 이하인 경우에만 문장으로 취급합니다.");
        if (error.response) {
            console.error("Server Response:", error.response.data);
        }
        }
    };

    //해시태그 생성
    const fetchHashtag = async () => {
        try {
        const requestBody = {
            content: desc ? desc : null,
        };

        const response = await axios.post(
            `${process.env.REACT_APP_HASHTAG_API_KEY}/createTags`,
            requestBody
        );

        if (response.data && "hashtag" in response.data) {
            console.log(response.data.body)
            setTagList(response.data.hashtag);
        } else {
            console.error("Invalid response format");
        }
        } catch (error) {
        console.error("Failed to fetch hashtag:", error);
        if (error.response) {
            console.error("Server Response:", error.response.data);
        }
        }
    };

        return (
        <Container>
            <div className="containerBox">
            <div className="body0">
                <div>
                <select value={selectedRegion} onChange={handleRegionChange}>
                    <option value="지역 선택" disabled>
                        지역 선택
                    </option>
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
                </div>
                <div className="toggleWrapper">
                <ToggleButton
                    isPublic={isPublic}
                    onClick={() => setIsPublic(!isPublic)}
                >
                    {isPublic ? "공개" : "비공개"}
                </ToggleButton>
                    <button onClick={!isFormValid ? handleError : boardEdit}>수정</button>
                </div>
            </div>
            <div className="body1">
                <input
                id="title"
                type="text"
                value={title}
                placeholder="제목을 입력해주세요."
                onChange={onChangeTitle}
                />
            </div>
            <div className="body3">
                <MyBlock>
                    <PostWriteComponent value={desc} onChange={onEditorChange} />
                </MyBlock>
            </div>
            <div className="foot">
                <div>
                    <button className="menuButtonEdit" onClick={() => setShowSchedule(!showSchedule)}>일정 추가</button>
                    <button className="menuButtonEdit" onClick={fetchSummaryN}>AI 요약</button>
                    <button className="menuButtonEdit" onClick={fetchHashtag}>해시태그 추천</button>
                </div>
                {showSchedule && (
                <>
                <div className="aiSummaryTitle">일정 추가</div>
                <div className="body2">
                    <div className="schedulecss">
                    {scheduleItems.map((item, index) => (
                    <div key={index} className="scheduleList">
                        Day
                        <input
                            type="number"
                            value={item.day}
                            onChange={(e) => handleDayChange(index, Number(e.target.value))}
                        />
                        <div className="scheduleListItems">
                            <CiCalendarDate size={30}/>
                            <DatePicker
                            className="dateSelect"
                            locale={ko}
                            selected={item.date}
                            onChange={(date) => handleScheduleChange(index, "date", date)}
                            dateFormat="yyyy-MM-dd"
                            showTimeSelect={false}
                            showTimeInput={false} 
                            />
                            <button
                            className="selectLocation"
                            onClick={() => setModalIsOpen(index)}
                            >
                            <IoLocationOutline size={20}/>
                            </button>
                            <Modal
                            className="modal"
                            isOpen={modalIsOpen === index}
                            ariaHideApp={false}
                            onRequestClose={() => setModalIsOpen(false)}
                            >
                            <SelectLocation
                                setModalIsOpen={setModalIsOpen}
                                setLocationItems={handleSelectLocation}
                                id = {index}
                            />
                            </Modal>
                            {item.locationName && (
                            <span className="locationName">{item.locationName}</span>
                            )}
                            <PiBusLight size={30}/>
                            <select 
                            value={item.transport} 
                            onChange={(e) => handleScheduleChange(index, 'transport', e.target.value)}
                            className="selectTransport">
                                <option value="" disabled>이동수단</option>
                                <option value="고속버스">고속버스</option>
                                <option value="비행기">비행기</option>
                                <option value="기차">기차</option>
                                <option value="대중교통">대중교통</option>
                                <option value="자차">자차</option>
                                <option value="도보">도보</option>
                            </select>
                            <button className="plus" onClick={addScheduleItem}>
                                <HiOutlinePlusCircle size={17} />
                            </button>
                            {index > 0 ? (
                            <button className="minus" onClick={() => removeScheduleItem(index)}>
                                <HiOutlineMinusCircle size={17} />
                            </button>
                            ) : null}
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                </>
                )}
                {summaryN && (
                <>
                    <div className="aiSummaryTitle">AI 요약</div>
                    <textarea
                    className="summary-content"
                    value={summaryN}
                    onChange={handleSetSummaryValue}
                ></textarea>
                </>
                )}
            </div>
            <WholeBox>
                <TagBox>
                {tagList.map((tagItem, index) => {
                    return (
                    <TagItem key={index}>
                        <Text><HiOutlineHashtag size={13}/>{tagItem}</Text>
                        <DeleteButton onClick={() => deleteTagItem(tagItem)}>
                        <TiDeleteOutline size={15} />
                        </DeleteButton>
                    </TagItem>
                    );
                })}
                <TagInput
                    type="text"
                    placeholder="# 태그 입력"
                    tabIndex={2}
                    onChange={(e) => setTagItem(e.target.value)}
                    value={tagItem}
                    onKeyPress={onKeyPress}
                />
                </TagBox>
            </WholeBox>
            </div>
        </Container>
        );
    }
export default PostEdit;

