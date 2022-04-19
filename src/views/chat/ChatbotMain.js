import React from "react";
import Chatbot from "./Chatbot/Chatbot";
import styled, { css } from "styled-components/macro";

export const ChatbotMain = ({ isOpen, setIsOpen }) => {
    return (
        <>
            {isOpen ? (
                <ChatBox isOpen={isOpen}>
                    <Button onClick={() => setIsOpen(false)}>X</Button>
                    <Content>
                        <Header>Monkeystock Bot</Header>
                        <Chatbot />
                    </Content>
                </ChatBox>
            ) : null}
        </>
    )
}

const ChatBox = styled.div`
width: 500px;
height: 700px;
box-shadow: 0 5px 10px rgba(0,0,0,0.2);
background: #fff;
color: #fff;
position: fixed;
bottom: 10px;
right: 10px;
z-index: 10;
border-radius: 10px;
`

const Content = styled.div`
display: flex;
width: 100%;
flex-direction: column;
justify-content: center;
align-items: center;
color: #141414;
`

const Header = styled.h1`
font-family: 'Rajdhani', sans-serif;
font-size: 2em;
text-align:center;
/* letter-spacing: 0.4rem; */
/* margin-top: 11px; */
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