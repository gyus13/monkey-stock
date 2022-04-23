import React, { useState, useLayoutEffect, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled, {css} from "styled-components/macro";
import moment from "moment";
import 'moment/locale/ko'
import axios from "axios";
axios.defaults.withCredentials = true;

const Search = () => {

    const id = window.location.hostname;
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("search");
    let [pageNum, setPageNum] = useState(0);
    const [max, setMax] = useState(0);
    let [totals, setTotals] = useState([]);
    const BACK_URL = `http://${window.location.hostname}:8081`

    // 최초 게시글 불러오기
    useLayoutEffect(() => {
        async function refresh() {
            // console.log(keyword)
            const { data } = await axios.get(BACK_URL + `/api/v1/topic/${keyword}/?page=${pageNum}&size=10`);
            setMax(Math.ceil(data.count/10));
            setTotals(data.rows);
        }
        refresh();
    }, [keyword]);

    useEffect(() => {
        async function refresh() {
            await axios.get(BACK_URL + `/api/v1/topic/${keyword}/?page=${pageNum}&size=10`)
                .then((res) => {
                    // console.log(res.data.rows);
                    setTotals(res.data.rows);
                })
        }
        refresh();
    }, [pageNum]);

    const getNext = () => {
        setPageNum(pageNum === max-1 ? 0 : pageNum => pageNum + 1);
        if(pageNum === max-1){
            setPageNum(max-1)
            alert("마지막 페이지");
        }
        if(max === 0){
            setPageNum(0);
            alert("마지막 페이지");
        }
    }

    const getPrev = () => {
        setPageNum(pageNum === 0 ? max-1 : pageNum - 1);
        if(pageNum === 0){
            setPageNum(0)
            alert("가장 최신 페이지");
        }
    }

    return (
        <SiteView>
            {console.log(id)}
            <Box>
                <h1>{keyword === "all" ? "전체" : keyword} 게시판</h1>
                <TableSize>
                    <Table>
                        <thead>
                            <tr>
                                <Th>태그</Th>
                                <Th>제목</Th>
                                <Th>글쓴이</Th>
                                <Th>작성일</Th>
                                <Th>조회수</Th>
                            </tr>
                        </thead>
                        <Tbody>
                            {totals.map((page, idx) => (
                                <Tr key={idx}>
                                    <Td>{page.tags}</Td>
                                    <Td><NavTitle to={`/community/article/${page.id}`}>{page.title}</NavTitle></Td>
                                    <Td>{page.nickname}</Td>
                                    <Td>{moment(page.createdAt).format("MM.DD. HH:mm")}</Td>
                                    <Td>{page.view}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableSize>
                    <Button onClick={getPrev}>&lt;이전</Button>
                    <Button onClick={getNext}>다음&gt;</Button>
            </Box>
        </SiteView>
    )
}

export default Search;

const SiteView = styled.div`
margin-top: 15px;
margin-left: 15px;
font-size: large;
font-family: 'IBM Plex Sans KR', sans-serif;
/* display: flex; */
`

const Box = styled.div`
margin-top: 10px;
margin-left: 10px;
min-width: 1280px;
max-width: 1280px;
`

const Button = styled.button`
padding: 5px 20px;
border: none;
border-radius: 5px;
color: white;
background-color: #FF7800;
margin-top: 10px;
margin-right: 10px;
font-size: large;
font-family: 'IBM Plex Sans KR', sans-serif;
cursor: pointer;
`

const TableSize = styled.div`
min-height: 530px;
`

const Table = styled.table`
width: 1280px;
border-collapse: collapse;
`

const Tr = styled.tr`
border-bottom: 1px solid rgba(0,0,0,0.15);
transition: 0.2s ease-in-out;
:hover{
    background-color: #f3f3f3;
}
`

const Th = styled.th`
font-size: larger;
:first-child{
    width: 10%;
}
:nth-child(2){
    width: 60%;
}
:nth-child(3){
    width: 10%;
}
:nth-child(4){
    width: 10%;
}
:nth-child(5){
    width: 10%;
}
padding-bottom: 10px;
border-bottom: 1px solid rgba(0,0,0,0.15);
`

const Tbody = styled.tbody`
text-align: center;
`

const Td = styled.td`
padding: 10px 0;
:nth-child(2){
    text-align: left;
}
`

const NavTitle = styled(Link)`
color: #000;
text-decoration: none;
`