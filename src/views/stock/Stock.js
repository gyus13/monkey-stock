import React, { useState, useEffect, useLayoutEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import loginCheck from "../../utils/loginCheck";
import Account from "./Account";
import axios from "axios";
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
// axios.defaults.withCredentials = true;

function Stock({ backAPI }) {

    let navigate = useNavigate();
    const accountAPI = backAPI + "/account";
    const [account, setAccount] = useState([]);
    const [isLoggedin, setIsLoggedin] = useState(false);

    useLayoutEffect(() => {
        async function refresh() {
            const data = await loginCheck();
            setIsLoggedin(data);
        }
        refresh();
    }, [localStorage.getItem('accessToken'),]);

    useEffect(() => {
        getAccount(accountAPI).then((response) => response.data)
            .then((data) => {
                setAccount(data);
            });
    }, []);

    const getAccount = async (request) => {
        let account = [];
        account = await axios.get(request);
        return account;
    };

    const generateAccount = () => {
        axios.post(`http://${window.location.hostname}:8080/api/v1/account`).then(() => {
            navigate(0);
        })
    }

    return (
        <>
            <SiteView>
                {isLoggedin === true ?
                    <>
                        {
                            account.length === 0 ?
                                <Container>
                                    <Alert>개설된 계좌가 없습니다</Alert>
                                    <Button onClick={generateAccount}>계좌 생성</Button>
                                </Container> :
                                <Account backAPI={backAPI}/>
                        }
                    </>
                    : <Container>
                        <Alert>로그인이 필요한 서비스 입니다</Alert>
                    </Container>
                }
            </SiteView>
        </>
    )
}

export default Stock;

const SiteView = styled.div`
font-family: 'IBM Plex Sans KR', sans-serif;
display: flex;
height: 90vh;
width: 100%;
background-color: #f1f3f4;
justify-content: center;
`

const Container = styled.div`
position: relative;
display: table;
text-align: center;
background-color: white;
margin-top: 5vh;
margin-bottom: 10vh;
min-width: 1280px;
max-width: 1280px;
min-height: 720px;
max-height: 720px;
border: 1px solid rgba(0,0,0,0.1);
-webkit-user-select:none;
-moz-user-select:none;
-ms-user-select:none;
user-select:none;
`

const Alert = styled.div`
margin-top: 100px;
font-size: 40px;
font-weight: bold;
`

const Button = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, 0%);
color: #0078ff;
width: 20%;
padding: 11px 11px;
border-radius: 10px;
background-color: #000;
text-decoration: none;
font-size: large;
cursor: pointer;
transition: 0.2s ease-in-out;
  &:hover {
    color: #fff;
  }
`

