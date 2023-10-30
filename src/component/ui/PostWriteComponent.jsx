import React, { Component, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

        input.onchange = () => {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const range = this.quillRef.getEditor().getSelection(true);
                this.quillRef.getEditor().insertEmbed(range.index, 'image', reader.result);
            };
            reader.readAsDataURL(file);
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
            <div style={{ height: "650px" }}>
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
