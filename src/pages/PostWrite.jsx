import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PostWriteComponent from '../component/ui/PostWriteComponent';
import styled from "styled-components";
import "../styles/PostWrite.css";

const MyBlock = styled.div`
  width: 50%;
  margin: 0 auto;
  margin-bottom: 0.2rem;
`

function PostWrite () {
  const navigate = useNavigate();
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState("");
    
  function onEditorChange(value) {
    setDesc(value)
  }
    
  return (
    <>
      <div className="head">
        <button onClick={() => { navigate("/"); }}>발행</button>
        <button onClick={() => { navigate("/"); }}>저장</button>
      </div>
      <div className="body">
        <input id="title" type="text" value={title} placeholder="제목을 입력해주세요." onChange={(e) => { setTitle(e.target.value); }} />
      </div>
      <MyBlock>
        <PostWriteComponent value={desc} onChange={onEditorChange} />
      </MyBlock>
      <div className="foot">
        <button>요약글 추가</button>
        <button>해시태그 추가</button>
      </div>
    </>
  )
};

export default PostWrite;