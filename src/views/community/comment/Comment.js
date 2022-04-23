import React, { useState, useEffect,useLayoutEffect } from "react";
import styled, { css } from "styled-components/macro";
import loginCheck from "../../../utils/loginCheck";
import moment from "moment";
import 'moment/locale/ko'
import axios from "axios";
axios.defaults.withCredentials = true;

function Comment() {

    // /article/ 제거한 param 값
    const id = window.location.pathname.substring(19);

    const [comments, setComments] = useState([]);
    const [post, setPost] = useState({content:"",});
    const BACK_URL = `http://${window.location.hostname}:8081`

    useEffect(() => {
        async function refresh() {
            const data = await Promise.resolve(getComment());
            setComments(data.data);
        }
        refresh();
    }, []);

    const getComment = async () => {
        return await axios.get(BACK_URL + `/api/v1/comment/${id}`);
    };

    const getPost = async() => {

        const check = await loginCheck();

        if(check === false){
            alert("로그인이 필요한 기능입니다.");
        }

        if(post.content === ""){
            alert("내용을 입력하세요.")
        } else {
            axios.post(BACK_URL + '/api/v1/comment', {
                articleid: id,
                content: post.content,
            }).then((res) => {
                console.log(res);
                window.location.reload();
            });
        }
    };

    const handleKeyPress = e => {if(e.key === 'Enter') {getPost();}}

    return (
        <Display>
            <Line/>
            <Title>댓글{console.log(comments)}</Title>
            {comments.map((comment, idx) => (
                <CommentBox key={idx}>
                    <div>
                        {comment.nickname}　
                        {moment(comment.createdAt).format("YYYY.MM.D. HH:mm:ss")}
                    </div>
                    <div>{comment.content}</div>
                </CommentBox>
            ))}
            <Post>
                <InputBox
                    value={post.content || ""}
                    placeholder={"댓글을 입력해주세요."}
                    onChange={(e) => {
                        setPost({ ...post, content: e.target.value });
                    }}
                    onKeyPress={handleKeyPress}
                />
                <Button onClick={getPost}>등록</Button>
            </Post>
        </Display>
    )
}

export default Comment

const Display = styled.div`
margin-left: 20px;
margin-bottom: 20px;
/* background-color: #f1f3f4; */
`

const Line = styled.hr`
/* width: 90%; */
border: 0px;
height: 1px;
background-color: rgba(0,0,0,0.15);
/* margin: 20px 0; */
`

const Title = styled.h2`
font-size: 20px;
`

const Post = styled.div`
display: flex;
`

const InputBox = styled.input`
padding: 0 5px;
height: 60px;
width: 88%;
border: 1px solid rgba(0,0,0,0.15);
outline: none;
`

const Button = styled.div`
text-align: center;
line-height: 60px;
border: 1px solid rgba(0,0,0,0);
border-radius: 3px;
padding: 0 5px;
margin-left: 5px;
height: 60px;
width: 9%;
font-size: 20px;
font-weight: bold;
color: #fff;
cursor: pointer;
background-color: #0078ff;
`

const CommentBox = styled.div`
/* box-sizing: border-box; */
padding: 5px 5px;
border: 1px solid rgba(0,0,0,0.15);
margin-bottom: 5px;
:first-child{
    margin-top: 10px;
}
`