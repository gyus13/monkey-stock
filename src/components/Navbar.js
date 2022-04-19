import React, { useState, useEffect, } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled, {css} from "styled-components/macro";
import UserLogin from "./UserLogin";

const Navbar = ({ setDomain, setUpdate }) => {

    return (
        <Nav>
            <Logo>
                <h1>Monkeystock</h1>
            </Logo>
            <Menu>
                <Box to="/stock" onClick={() => setDomain("stock")}>모의투자</Box>
                <Box to="/community" onClick={() => setDomain("community")}>커뮤니티</Box>
                {/* <Box reloadDocument to="/chatbot">상담문의</Box> */}
            </Menu>
            <UserLogin setUpdate={setUpdate}/>
        </Nav>
    )
}

export default Navbar;

const Nav = styled.div`
height: 40px;
display: flex;
padding: 1rem 2rem;
justify-content: space-between;
background-color: #0c151c; // 메인 남색

// 드래그 금지
-webkit-user-select:none;
-moz-user-select:none;
-ms-user-select:none;
user-select:none;
`

const Logo = styled.div`
align-items: center;
display: flex;
font-family: 'Rajdhani', sans-serif;
color: #0078ff; // 메인 파란색 
/* cursor: pointer; */
`

const Menu = styled.div`
align-items: center;
text-align: center;
display: flex;
cursor: pointer;
`

const BoxStyle = css`
padding: 1rem 2rem;
min-width: 100px;
transition: 0.2s ease-in-out;
  &:hover {
    color: #fff;
  }
`

const Box = styled(Link)`
font-family: 'IBM Plex Sans KR', sans-serif;
font-size: large;
text-decoration: none;
color: #0078ff;
${BoxStyle}
/* &:last-child{
    margin-right: 100px;
} */
`