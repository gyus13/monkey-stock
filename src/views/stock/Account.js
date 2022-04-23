import React, { useState, useEffect, useLayoutEffect } from "react";
import { Routes, Route, Link, Outlet, NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import AccountInfo from "./AccountInfo";
import TradeLogs from "./TradeLogs";
import Portfolio from "./Portfolio";
import Trade from "./Trade";
import OrderModule from "./OrderModule";
import axios from "axios";
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
// axios.defaults.withCredentials = true;

const Account = ({ backAPI }) => {

    const [show, setShow] = useState(0);
    const [company, setCompany] = useState([]);
    const [account, setAccount] = useState([]);
    const [competition, setCompetition] = useState([]);
    const [orderOpened, setOrderOpened] = useState(false);
    const [points, setPoints] = useState(0);

    const accountAPI = backAPI + "/account";
    const competitionAPI = backAPI + "/competition";

    useEffect(() => {
        async function refresh() {
            const { data } = await axios.get(accountAPI);
            setAccount(data);
            setPoints(data[show].points);
        }
        refresh();
    }, [orderOpened]);

    useLayoutEffect(() => {
        async function refresh() {
            const { data } = await axios.get(competitionAPI);
            setCompetition(data);
        }
        refresh();
    }, []);

    const showAccount = (accountNum, money) => {
        setShow(accountNum);
        setPoints(money);
    }

    return (
        <>
            <LSubList>
                {competition &&
                    account.map((account, idx) => (
                        <div key={idx}>
                            {account.competitionId === 0
                                ? <Item className={show === 0 ? "Item-active" : "Item"} onClick={()=>showAccount(account.competitionId, account.points)}>기본 계좌</Item>
                                : <Item className={show === account.competitionId ? "Item-active" : "Item"} onClick={()=>showAccount(account.competitionId, account.points)}>{competition.find((e) => e.id === account.competitionId).name}</Item>
                            }
                        </div>
                        )
                    )}
                <NavTo to="/competition">+ 대회 참여</NavTo>
            </LSubList>
            <Container>
                <ShowStocks>
                    <Trade backAPI={backAPI} num={show} setCompany={setCompany}></Trade>
                </ShowStocks>
                <ShowOrder>
                    <ShowPoints>보유 포인트 : {points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} P</ShowPoints>
                    <OrderModule backAPI={backAPI} company={company} compId={show} orderOpened={orderOpened} setOrderOpened={setOrderOpened}></OrderModule>
                </ShowOrder>
                <RSubList>
                    <NavTo2 to={`/logs/${show}`}>거래 이력</NavTo2>
                    <NavTo2 to={`/portfolio/${show}`}>포트폴리오</NavTo2>
                </RSubList>
            </Container>
        </>
    )
}

export default Account;

const Container = styled.div`
min-width: 1280px;
max-width: 1280px;
min-height: 720px;
max-height: 720px;
background-color: white;
margin-top: 5vh;
margin-bottom: 10vh;
border: 1px solid rgba(0,0,0,0.1);
display: flex;
// 드래그 금지
-webkit-user-select:none;
-moz-user-select:none;
-ms-user-select:none;
user-select:none;
`;

const LSubList = styled.div`
position: relative;
margin-top: 5vh;
min-height: 720px;
max-height: 720px;
border-top: 1px solid rgba(0,0,0,0.1);
border-left: 1px solid rgba(0,0,0,0.1);
border-bottom: 1px solid rgba(0,0,0,0.1);
border-top-left-radius: 5px;
border-bottom-left-radius: 5px;
background-color: #fff;
`

const RSubList = styled.div`
min-width: 140px;
max-width: 140px;
position: relative;
border-left: 1px solid rgba(0,0,0,0.1);
background-color: #fff;
`

const Item = styled.div`
min-width: 90px;
max-width: 90px;
font-family: 'IBM Plex Sans KR', sans-serif;
font-size: large;
text-decoration: none;
color: #0078ff;
cursor: pointer;
text-decoration: none;
padding: 14px 25px;
display: block;
transition: 0.3s ease-in-out;
&.Item-active{
    color: white;
    background-color: #0078ff;
}
:hover{
    color: white;
    background-color: #0078ff;
}
`

const NavTo = styled(Link)`
position: absolute;
bottom: 0;
padding: 14px 14px;
font-size: large;
text-decoration: none;
color: #0078ff;
`

const NavTo2 = styled(Link)`
display: block;
padding: 14px 14px;
font-size: large;
text-decoration: none;
color: #0078ff;
`

const ShowStocks = styled.span`
overflow-y: scroll;
width: 50%;
`

const ShowOrder = styled.div`
position: relative;
width: 45%;
`

const ShowPoints = styled.div`
position: absolute;
right: 0;
margin: 10px;
`