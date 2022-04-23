import React, { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko.js';
import styled from "styled-components/macro";
import './CKEdit.css';
import axios from "axios";
axios.defaults.withCredentials = true;

function Post() {
    let navigate = useNavigate();
    const [post, setPost] = useState({ title: "", content: "", tags: "" });
    const [topics, setTopics] = useState([]);
    const BACK_URL = `$http://${window.location.hostname}:8081`

    useEffect(() => {
        async function refresh() {
            const data = await Promise.resolve(getTopics());
            setTopics(data.data);
        }
        refresh();
    }, []);

    const getTopics = async () => {
        return await axios.get(BACK_URL + `/api/v1/topic`);
    };

    const getPost = () => {
        console.log(post);
        if (post.title === "") {
            alert("제목을 적어주세요");
        } else if (post.content === "") {
            alert("내용을 적어주세요")
        } else if (post.tags === "" || post.tags === "default"){
            alert("주제를 선택")
        }
        else {
            axios.post(BACK_URL + '/api/v1/article', {
                title: post.title,
                content: post.content,
                tags: post.tags,
            }).then((res) => {
                console.log(res);
                if (res.data.title === post.title){
                    navigate("/community");
                } else if (res.data.original.code === "ER_DATA_TOO_LONG") {
                    alert("제목이 너무 깁니다. 30자 이내.")
                }
                // window.location.replace("/community");
            });
        }
    };

    return (
        <SiteView>
            <PostBox>
                <Input
                    value={post.title || ""}
                    placeholder="제목을 입력해 주세요."
                    onChange={(e) => {
                        setPost({ ...post, title: e.target.value });
                    }}
                />
                <Select
                    value={post.tags}
                    onChange={(e) => {
                        setPost({ ...post, tags: e.target.value });
                    }}
                >
                    <option value="default"> -- TOPIC -- </option>
                    {topics.map((topic, idx) => (
                        <option value={topic.tags} key={idx}>{topic.tags}</option>
                    ))}
                </Select>
                <Button onClick={getPost}>등록</Button>
                <br />
                <CKEditor
                    editor={ ClassicEditor }
                    config={{
                        toolbar: [ 'heading', '|', 'alignment','bold', 'bulletedList', '|', 'undo', 'redo', '|','fontColor','fontFamily','fontSize'],
                        placeholder: `글을 입력해보세요! 이미지는 이미지 복사 후 ctrl + v 로 삽입할 수 있습니다.`,
                        mediaEmbed: {
                            previewsInData:true
                        },
                        language:"ko",
                    }}
                    onReady={ editor => {
                        console.log( 'Editor is ready to use!', editor );
                    }}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setPost({ ...post, content: data});
                        // console.log( { event, editor, data } );
                    }}
                    // onBlur={ ( event, editor ) => {
                    //     console.log( 'Blur.', editor );
                    // }}
                    // onFocus={ ( event, editor ) => {
                    //     console.log( 'Focus.', editor );
                    // }}
                />
            </PostBox>
        </SiteView>
    )
}

export default Post;

const SiteView = styled.div`
margin-top: 15px;
margin-left: 15px;
font-size: large;
font-family: 'IBM Plex Sans KR', sans-serif;
/* display: flex; */
`

const PostBox = styled.div`
margin-top: 20px;
margin-left: 20px;
min-width: 1100px;
max-width: 1100px;

/* background-color: yellow; */
`

const Input = styled.input`
height: 33px;
width: 900px;
border: 1px solid rgba(0,0,0,0.15);
outline: none;
margin-right: 5px;
margin-bottom: 20px;
`

const Select = styled.select`
height: 37px;
border: 1px solid rgba(0,0,0,0.15);
outline: none;
`

const Button = styled.button`
margin-left: 5px;
padding-bottom: 4px;
height: 37px;
width: 90px;
/* border: 1px solid rgba(0,0,0,0.15); */
border: none;
border-radius: 2px;
background-color: #0078ff;
color: white;
cursor: pointer;
`