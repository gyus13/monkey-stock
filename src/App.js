import React, { useEffect, useLayoutEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

import Community from "./views/community/Community";
import Article from "./views/community/article/Article";
import Post from "./views/community/article/Post";
import Search from "./views/community/topic/Search";
import LeftSideBar from "./views/community/LeftSideBar";

import Stock from "./views/stock/Stock"
import Account from "./views/stock/Account";
import Competition from "./views/stock/Competition";
import Trade from "./views/stock/Trade";
import Order from "./views/stock/Order";
import TradeLogs from "./views/stock/TradeLogs";
import Portfolio from "./views/stock/Portfolio";

import {ChatbotMain} from "./views/chat/ChatbotMain"

import setAuthToken from "./utils/setAuthToken";
import styled from "styled-components";

function App() {

  const [domain, setDomain] = useState(window.location.pathname.substring(1, 10));
  const [update, setUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const backAPI = `http://${window.location.hostname}:8080/api/v1`;

  const handleModal = () => {
    setIsOpen(!isOpen)
  };

  // 로그인된 토큰을 전체 페이지 헤더에 삽입위해 여기서 사용
  useLayoutEffect(() => {
    setAuthToken(localStorage.getItem('accessToken'));
  }, [domain, update]);

  return (
    <>
    <BrowserRouter>
      <NavBar setDomain={setDomain} setUpdate={setUpdate}/>
      <Display>
      {
        domain === "community" ? <LeftSideBar update={update} setUpdate={setUpdate}/>:null
      }
        <Routes>
          <Route path="/community/*" element={<Community/>} />
          <Route path="/community/article/:id" element={<Article />} />
          <Route path="/community/post/" element={<Post />} />
          <Route path="/community/topic/" element={<Search />} />
          <Route path="/stock/*" element={<Stock backAPI={backAPI}/>}/>
          <Route path="/logs/*" element={<TradeLogs backAPI={backAPI}/>}/>
          <Route path="/portfolio/*" element={<Portfolio backAPI={backAPI}/>}/>
          <Route path="/account/*" element={<Account backAPI={backAPI} />} />
          <Route path="/competition/*" element={<Competition backAPI={backAPI} />}/>
          <Route path="/trade/:competitionId/*" element={<Trade backAPI={backAPI} />}/>
          <Route path="/trade/:competitionId/order" element={<Order />} />
        </Routes>
      </Display>
    </BrowserRouter>
    <Footer />
    <OpenChat onClick={handleModal}>문의하기</OpenChat>
    <ChatbotMain isOpen={isOpen} setIsOpen={setIsOpen}></ChatbotMain>
    </>
  );
}

export default App;

const Display = styled.div`
display: flex;
`

const OpenChat = styled.button`
position: fixed;
border: none;
border-radius: 5px;
color: white;
background-color: #0078ff;
padding: 20px;
bottom: 50px;
right: 50px;
cursor: pointer;
z-index: 10;
`