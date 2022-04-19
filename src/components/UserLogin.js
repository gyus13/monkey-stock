import React, { useState, useLayoutEffect, } from "react";
import { useNavigate } from "react-router-dom";
import styled, {css} from "styled-components/macro";
import { Login } from "../views/community/user/Login";
import loginCheck from "../utils/loginCheck";
import { FaPowerOff } from "react-icons/fa";

function UserLogin({setUpdate})  {

    let navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [isLoggedin, setIsLoggedin] = useState(false);
    
    useLayoutEffect(() => {
        async function refresh() {
            const data = await loginCheck();
            setIsLoggedin(data);
            setUpdate(true);
        }
        refresh();
    }, [localStorage.getItem('accessToken'),]);

    const openLogin = (e) => {
        if (e.target !== e.currentTarget) return;
        setShowLogin(true);
    }

    const getLogout = () => {
        localStorage.removeItem("accessToken");
        navigate(0);
    }

    return (
        <Section>
            {
                isLoggedin ?
                <PowerButton onClick={getLogout}><Green/>
                </PowerButton>:
                <PowerButton onClick={openLogin}><Red/>
                    <Login showLogin={showLogin} setShowLogin={setShowLogin}></Login>
                </PowerButton>
            }
        </Section>
    )
}

export default UserLogin;

const Section = styled.div`
min-width: 165.77px;
text-align: right;
`

const Power = css`
font-size: 30px;
margin-top: 5px;
`

const Red = styled(FaPowerOff)`
pointer-events: none;
color: #FF3B28;
${Power}
`

const Green = styled(FaPowerOff)`
pointer-events: none;
color: #48EB12;
${Power}
`

const PowerButton = styled.button`
background: none;
border: none;
cursor: pointer;
`

