import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, Route } from "react-router-dom";
import styled, { css } from "styled-components/macro";

export const Register = ({ showRegister, setShowRegister }) => {

    const [register, setRegister] = useState({ userid: "", password: "", nickname: "" });
    const BACK_URL = `http://${window.location.hostname}:8081`

    const getRegister = () => {
        // console.log(register);
        if (register.userid === "") {
            alert("아이디를 적어주세요");
        } else if (register.password === "") {
            alert("비밀번호를 적어주세요")
        } else if (register.nickname === "") {
            alert("닉네임을 적어주세요")
        } else {
            axios.post(BACK_URL + '/api/v1/user/register', {
                userid: register.userid,
                password: register.password,
                nickname: register.nickname,
            }).then((res) => {

                if (res.data.userid === register.userid){
                    setShowRegister(false);
                    alert("회원가입 성공")
                    // window.location.replace("/community");
                } else if (res.data.errors[0].message === "userid must be unique") {
                    alert("해당 아이디는 이미 존재합니다.")
                } else if (res.data.errors[0].message === "nickname must be unique") {
                    alert("해당 닉네임은 이미 존재합니다.")
                } 
            })
        }
    };

    return (
        <>
            {showRegister ? (
                <Background>
                    <RegisterBox showRegister={showRegister}>
                        <Button onClick={() => setShowRegister(false)}>X</Button>
                        <FormData>
                            <Header>회원가입</Header>
                            <InputBox
                                value={register.userid || ""}
                                placeholder={"아이디를 입력해 주세요"}
                                onChange={(e) => {
                                    setRegister({ ...register, userid: e.target.value });
                                }}
                            />
                            <br />
                            <InputBox
                                value={register.password || ""}
                                type={"password"}
                                placeholder={"비밀번호를 입력해 주세요"}
                                onChange={(e) => {
                                    setRegister({ ...register, password: e.target.value });
                                }}
                            />
                            <br />
                            <InputBox
                                value={register.nickname || ""}
                                placeholder={"닉네임을 입력해 주세요"}
                                onChange={(e) => {
                                    setRegister({ ...register, nickname: e.target.value });
                                }}
                            />
                            <br />
                            <RegisterButton onClick={getRegister}>SIGN UP</RegisterButton>
                            <Line />
                        </FormData>
                    </RegisterBox>
                </Background>
            ) : null}
        </>
    )
}

export default Register;

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
const RegisterBox = styled.div`
width: 600px;
height: 500px;
box-shadow: 0 5px 10px rgba(0,0,0,0.2);
background: #fff;
color: #fff;
position: relative;
z-index: 10;
border-radius: 10px;
`

const FormData = styled.div`
/* margin-top: 5rem; */
display: flex;
align-items: center;
flex-direction: column;
min-height: 600px;
min-width: 400px;
color: #000;
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
const Header = styled.h1`
font-family: 'IBM Plex Sans KR', sans-serif;
font-size: 2.5em;
text-align:center;
/* margin-top: 11px; */
`

const InputBox = styled.input`
font-size: large;
font-family: 'IBM Plex Sans KR', sans-serif;
/* font-family: 'Rajdhani', sans-serif; */
width:80%;
height: 30px;
display: block;
padding: 10px 10px;
margin-bottom: 4px;
border-radius: none;
border: 1px solid rgba(0,0,0,0.15);
outline: none;
`

const RegisterButton = styled.button`
/* margin-top: 10px; */
width: 85%;
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

const Line = styled.hr`
width: 90%;
border: 0px;
height: 1px;
background-color: rgba(0,0,0,0.15);
/* margin: 20px 0; */
`