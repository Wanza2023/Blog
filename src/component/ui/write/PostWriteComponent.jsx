import React, { Component} from 'react';
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import 'react-quill/dist/quill.snow.css';
import AWS from 'aws-sdk';
import {v1} from 'uuid';

Quill.register("modules/imageResize", ImageResize);

class PostWriteComponent extends Component {
    constructor(props) {
        super(props);
        this.quillRef = React.createRef();
    }

    componentDidMount() {
        this.attachImageHandler();
    }

    attachImageHandler = () => {
        const quillEditor = this.quillRef.getEditor();
        const toolbar = quillEditor.getModule("toolbar");
        toolbar.addHandler("image", this.handleImage);
    };

    handleImage = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const reader = new FileReader();

            try {
                //업로드할 파일의 이름으로 Date 사용
                // const name = Date.now();
                //생성한 s3 관련 설정들
                AWS.config.update({
                    region: process.env.REACT_APP_AWS_DEFAULT_REGION,
                    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
                });
                //앞서 생성한 file을 담아 s3에 업로드하는 객체를 만든다
                var upload = new AWS.S3.ManagedUpload({
                  params: {
                    Bucket: process.env.REACT_APP_AWS_BUCKET, //버킷 이름
                    Key: `contents-images/${v1()}.${file.type.split("/")[1]}`, 
                    Body: file,
                    ContentType: file.type,
                    ACL: "public-read"
                  }
                });
                //이미지 업로드 후
                //곧바로 업로드 된 이미지 url을 가져오기
                const IMG_URL = await upload.promise().then((res) => res.Location);
                console.log(IMG_URL);

                const editor = this.quillRef.getEditor();
                const range = editor.getSelection();
                // 가져온 위치에 이미지를 삽입한다
                editor.insertEmbed(range.index, "image", IMG_URL);
                // reader.onload = () => {
                //     //useRef를 사용해 에디터에 접근한 후
                //     //에디터의 현재 커서 위치에 이미지 삽입
                //     const editor = this.quillRef.current.getEditor();
                //     const range = editor.getSelection();
                //     // 가져온 위치에 이미지를 삽입한다
                //     editor.insertEmbed(range.index, "image", IMG_URL);
                // };
            } catch (error) {
                console.log(error);
            }
            // const reader = new FileReader();

            // reader.onload = () => {
            //     const range = this.quillRef.getEditor().getSelection(true);
            //     this.quillRef.getEditor().insertEmbed(range.index, 'image', reader.result);
            // };
            // reader.readAsDataURL(file);
        };
    }

    modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
            ['clean']
        ],
        imageResize: {
            parchment: Quill.import("parchment"),
            modules: ["Resize", "DisplaySize", "Toolbar"],
        },
    }

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',
    ]

    render() {
        const { value, onChange } = this.props;
        return (
            <div style={{ height: "650px", width: "100%" }}>
                <ReactQuill
                    ref={(el) => { this.quillRef = el }}
                    style={{ height: "600px" }}
                    theme="snow"
                    modules={this.modules}
                    formats={this.formats}
                    value={value || ''}
                    onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
                />
            </div>
        );
    }
}

export default PostWriteComponent;
