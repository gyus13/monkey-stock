import React, { useState, useEffect, } from "react";
import styled from "styled-components/macro";
import TopicBox from "./article/TopicBox";
import { Link } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

function Community() {

    return (
        <SiteView>
            <RightSide>
                <TopicBox />
            </RightSide>
        </SiteView>
    )
}

export default Community;

const SiteView = styled.div`
display: flex;
width: 100%;
/* height: 100%; */
background-color: #FCFCFC;
`

const RightSide = styled.div`
margin-top: 10px;
margin-left: 10px;
min-width: 1280px;
max-width: 1280px;
/* border: 1px solid black; */
/* width: 70vw; */
/* height: 100%; */
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

const RegisterLink = styled(Link)`
color: #fff;
padding: 4px 11px;
border-radius: 10px;
background-color: #000;
text-decoration: none;
`

const SearchBar = styled.input`
color: #757575;
margin-top: 10px;
border: none;
border-radius: 5px;
width: 90%;
height: 30px;
outline: none;
`

const Category = styled.div`
margin-left: 10px;
text-align: left;
font-size: large;
font-family: 'IBM Plex Sans KR', sans-serif;
`

const Tags = styled.p`
margin-bottom: 5px;
cursor: pointer;
`