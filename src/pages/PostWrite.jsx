// draftjs 사용
//Ref: https://draftjs.org/, https://haranglog.tistory.com/12, https://so99ynoodles.com/ko/blog/make-wysiwyg-editor-with-draft-js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PostWrite.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js"
import styled from "styled-components";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

const MyBlock = styled.div`
.wrapper-class {
  width: 50%;
  margin: 0 auto;
  margin-bottom: 1rem;
}
.editor {
  height: 70vh !important;
  border: 1px solid #f1f1f1 !important;
  padding: 5px !important;
  border-radius: 10px !important;
}`;

const IntroduceContent = styled.div`
position: relative;
border: 0.0625rem solid #d7e2eb;
border-radius: 0.75rem;
overflow: hidden;
padding: 1.5rem;
width: 50%;
margin: 0 auto;
margin-bottom: 4rem;`;

function PostWrite() {

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => { setEditorState(editorState); }
  const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));

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
        <Editor
          wrapperClassName="wrapper-class"  //editor와 toolbar 모두에 적용되는 클래스
          editorClassName="editor"  //editor 주변에 적용되는 클래스
          toolbarClassName="toolbar-class"  //toolbar 주변에 적용되는 클래스
          toolbar={{
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true }
          }}
          placeholder="내용을 작성해주세요."
          localization={{ locale: "ko" }}  //한국어 설정
          editorState={editorState}  //초기값 설정
          onEditorStateChange={onEditorStateChange}  //에디터의 값이 변경될 때마다 onEditorStateChange 호출
        />
      </MyBlock>
      <div className="foot">
        <button>요약글 추가</button>
        <button>해시태그 추가</button>
      </div>
      <IntroduceContent dangerouslySetInnerHTML={{ __html: editorToHtml }} />

    </>
  );
}

export default PostWrite;
