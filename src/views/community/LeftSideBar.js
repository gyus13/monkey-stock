import React, { useState, useEffect, useLayoutEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import MyPage from "./MyPage";
import { Register } from "./user/Register";
import styled, { css } from "styled-components/macro";
import loginCheck from "../../utils/loginCheck";
import axios from "axios";
axios.defaults.withCredentials = true;

const LeftSideBar = ({update, setUpdate}) => {

    const [showRegister, setShowRegister] = useState(false);
    const [isLoggedin, setIsLoggedin] = useState(false);

    useLayoutEffect(() => {
        async function refresh() {
            const data = await loginCheck();
            setIsLoggedin(data);
            setUpdate(false);
        }
        refresh();
    }, [update]);

    const openRegister = (e) => {
        if (e.target !== e.currentTarget) return;
        setShowRegister(true);
    }

    return (
        <>
        <LeftSide>
            {
                isLoggedin ?
                <MyPage /> :
                <LoginFirst>
                        <p>로그인이 필요합니다.</p>
                        <p>아직 계정이 없으신가요?</p>
                        <RegisterButton onClick={openRegister}>회원가입
                        <Register showRegister={showRegister} setShowRegister={setShowRegister}></Register>
                        </RegisterButton>
                    </LoginFirst>
            }
            <Line />
            <Category>
                <Tags to={{pathname: `/community/topic/`, search: `search=all`,}}>전체</Tags>
                <Tags to={{pathname: `/community/topic/`, search: `search=주식·투자`,}}>주식·투자</Tags>
                <Tags to={{pathname: `/community/topic/`, search: `search=분석`,}}>분석</Tags>
                <Tags to={{pathname: `/community/topic/`, search: `search=자유`,}}>자유</Tags>
            </Category>
        </LeftSide>
        </>
    )
}

export default LeftSideBar;

const LeftSide = styled.div`
border: 1px solid #cacdd1;
text-align: center;
justify-content: center;
min-width: 200px;
max-width: 200px;
min-height: 90vh;
background-color: #f1f3f4;
`

const Line = styled.hr`
/* width: 90%; */
border: 0px;
height: 1px;
background-color: rgba(0,0,0,0.15);
margin: 20px 0;
`

const LoginFirst = styled.div`
margin: auto;
margin-top: 24px;
max-width: 200px;
min-height: 140px;
width: 100%;
font-size: large;
font-family: 'IBM Plex Sans KR', sans-serif;
text-align: center;
`

const RegisterButton = styled.div`
margin: auto;
color: #fff;
width: 50%;
padding: 4px 11px;
border-radius: 10px;
background-color: #000;
text-decoration: none;
-webkit-user-select:none;
-moz-user-select:none;
-ms-user-select:none;
user-select:none;
cursor: pointer;
`

const Category = styled.div`
margin-left: 5px;
text-align: left;
font-size: large;
font-family: 'IBM Plex Sans KR', sans-serif;
`

const Tags = styled(Link)`
color: black;
display: block;
text-decoration: none;
padding: 10px 10px;
margin-bottom: 5px;
cursor: pointer;
`