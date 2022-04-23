import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import axios from "axios";
axios.defaults.withCredentials = true;

const TopicBox = () => {

    const [totals, setTotals] = useState([]);
    const [setTagsTitle, SetTagsTitle] = useState([]);
    const BACK_URL = `http://${window.location.hostname}:8081`

    // 전체 게시글 불러오기
    useLayoutEffect(() => {
        async function refresh() {
            const { data } = await axios.get(BACK_URL +"/api/v1/article/tags/all");
            setTotals(data);
        }
        refresh();
    }, []);

    // 태그 불러오기
    useLayoutEffect(() => {
        async function refresh() {
            var orderBy = [];

            const { data } = await axios.get(BACK_URL + "/api/v1/topic");

            for(var i in data){
                var title = await axios.get(BACK_URL + `/api/v1/article/tags/${data[i].tags}`);
                orderBy.push(title.data);
            }
            SetTagsTitle(orderBy);
        }
        refresh();
    }, []);

    return (
        <Display>
            <Box>
                <H1>전체</H1>
                {totals.map((res, idx) => (
                    <Title key={idx}>
                        <NavTitle to={`/community/article/${res.id}`}>
                            {res.title}
                        </NavTitle>
                    </Title>
                ))}
            </Box>
            {setTagsTitle.map((res, idx)=>(
                <Box key={idx}>
                    <H1>{res.topic}</H1>
                    {res.articles.map((fin,idx2)=>(
                        <Title key={idx2}>
                        <NavTitle to={`/community/article/${fin.id}`}>
                            {fin.title}
                        </NavTitle>
                    </Title>
                    ))}
                </Box>
            ))}
        </Display>
    )
}

export default TopicBox;

const Display = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
font-size: large;
font-family: 'IBM Plex Sans KR', sans-serif;
/* justify-content: center; */
`

const NavTitle = styled(Link)`
color: #000;
text-decoration: none;
`

const H1 = styled.h1`
margin-left: 10px;
`

const Title = styled.div`
margin: 20px;
overflow: hidden;
height: 28px;
border-bottom: 1px solid rgba(0,0,0,0.1);
:hover{
    border-bottom: 1px solid rgba(0,0,0,0.3);
  }
`

const Box = styled.div`
display: block;
margin: 5px 5px;
min-width: 300px;
max-width: 300px;
min-height: 350px;
max-height: 350px;
background-color: white;
border-radius: 5px;
border: 1px solid rgba(0,0,0,0.1);

:hover{
    border: 1px solid #99aef4;
  }
`