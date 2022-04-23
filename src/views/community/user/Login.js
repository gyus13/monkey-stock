import React, { useState, useEffect, } from "react";
import axios from "axios";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";

export const Login = ({ showLogin, setShowLogin }) => {
    
    let navigate = useNavigate();
    const [login, setLogin] = useState({ userid: "", password: "", });
    const BACK_URL = `http://${window.location.hostname}:8081`

    const getLogin = () => {
        axios.post(BACK_URL + '/api/v1/user/login', {
            userid: login.userid,
            password: login.password,
        }).then((res) => {
            // 로컬스토리지에 저장후, 모든 페이지에 Header 에 삽입
            // console.log(res.data);
            const token = res.data.token;
            localStorage.setItem('accessToken', token);

            if (token) {
                setShowLogin(false);
                navigate(0);
                // window.location.reload();
            } else {
                alert("로그인 실패")
            }
        });
    };

    return (
        <>
            {showLogin ? (
                <Background>
                    <LoginBox showLogin={showLogin}>
                    <Button onClick={() => setShowLogin(false)}>X</Button>   
                        <Content>
                            <Header>로그인</Header>
                            <InputBox
                                value={login.userid || ""}
                                placeholder={"ID"}
                                onChange={(e) => {
                                    setLogin({ ...login, userid: e.target.value });
                                }}
                            />
                            <br />
                            <InputBox
                                value={login.password || ""}
                                type={"password"}
                                placeholder={"PASSWORD"}
                                onChange={(e) => {
                                    setLogin({ ...login, password: e.target.value });
                                }}
                            />
                            <br />
                            <LoginButton onClick={getLogin}>SIGN IN</LoginButton>
                            <Line />
                        </Content>
                    </LoginBox>
                </Background>
            ) : null}
        </>
    )
}

const Background = styled.div`
width: 100%;
height: 100%;
/* transition: background-color .5s ease-in; */
background: rgba(0,0,0,0.2);
position: fixed;
left: 0;
top: 0;
display: flex;
justify-content: center;
align-items: center;
z-index: 99;
cursor: default;
`
const LoginBox = styled.div`
width: 400px;
height: 500px;
box-shadow: 0 5px 10px rgba(0,0,0,0.2);
background: #fff;
color: #fff;
position: relative;
z-index: 10;
border-radius: 10px;
`

const Content = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
line-height: 1.8;
color: #141414;
`

const Header = styled.h1`
font-family: 'IBM Plex Sans KR', sans-serif;
font-size: 45px;
text-align:center;
`

const InputBox = styled.input`
font-size: large;
font-family: 'IBM Plex Sans KR', sans-serif;
width:300px;
height: 30px;
display: block;
padding: 10px 10px;
margin-bottom: 4px;
border-radius: none;
border: 1px solid rgba(0,0,0,0.15);
outline: none;
`

const LoginButton = styled.button`
width:320px;
height: 40px;
padding: 6px 10px;
font-family: 'Rajdhani', sans-serif;
font-size: 25px;
color: #fff;
background-color: #0078ff;
border: none;
border-radius: 2px;
cursor: pointer;
`

const Button = styled.button`
position: absolute;
right: 0;
border: none;
border-top-right-radius: 5px;
padding: 6px 10px;
font-size: 30px;
font-weight: bold;
background-color: white;
color:  #0078ff;
cursor: pointer;
`

const Line = styled.hr`
width: 90%;
border: 0px;
height: 1px;
background-color: rgba(0,0,0,0.15);
margin: 20px 0;
`

const RegisterButton = styled.button`
position: absolute;
right: 0;
top: 0;
float: right;
max-width: 100px;
height: 100%;
color: #aaa;
text-decoration: none;
font-size: 15px;
`