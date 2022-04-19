import React, { useState, useEffect, useLayoutEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components/macro";
import OrderButton from "./OrderButton";
import useStock from "../../utils/useStock";

const OrderModule = ({ backAPI , company, compId, orderOpened, setOrderOpened}) => {

    return (
        <>
            <Container>
            <h1>{company.companyName || "회사명"}</h1>
            {
                <OrderButton
                    backAPI={backAPI}
                    isBuying={true}
                    pf={null}
                    ticker={company.ticker}
                    compId={compId}
                    orderOpened={orderOpened}
                    setOrderOpened={setOrderOpened}
                    />
            }
            {
                <OrderButton
                    backAPI={backAPI}
                    isBuying={false}
                    pf={null}
                    ticker={company.ticker}
                    compId={compId}
                    orderOpened={orderOpened}
                    setOrderOpened={setOrderOpened}
                    />
            }
            </Container>
        </>
    );
};

export default OrderModule;

const Container = styled.div`
margin: 1rem;
display: block;
justify-content: center;
`;
