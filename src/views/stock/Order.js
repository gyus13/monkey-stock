import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import useStock from "../../utils/useStock";
import axios from "axios";
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
// axios.defaults.withCredentials = true;

const Order = ({ isBuying, pf, orderHandler, ticker, compId, backAPI }) => {
  const tradeAPI = backAPI + "/trade";
  const { stockInfo, isLoading } = useStock();
  const [targetStock, setTargetStock] = useState({});
  const [amount, setAmount] = useState();
  const ratio = pf
    ? (
        ((targetStock.currentPrice - pf.buyingPrice) * 100) /
        pf.buyingPrice
      ).toFixed(2)
    : 0;

  useEffect(() => {
    setTargetStock(stockInfo.data.find((s) => s.ticker === ticker));
  }, [stockInfo]);

  const formHandler = async (event) => {
    event.preventDefault();
    const tradeOrderRequestDto = {
      competitionId: compId,
      buying: isBuying,
      ticker: ticker,
      amount: amount,
    };

    await axios
      .post(tradeAPI, tradeOrderRequestDto)
      .then(() => {
        window.alert(
          targetStock.companyName + (isBuying ? " 매수" : " 매도") + " 완료"
        );
        orderHandler();
      })
      .catch((err) => window.alert(err.response.data.message));
  };

  const inputHandler = (event) => {
    let num = event.target.value;
    setAmount(num);
  };
  return (
    <>
      <Modal style={{border: `1px solid ${isBuying ? "red":"#0078ff"}`}}>
        <p>{isBuying ? "매수" : "매도"}</p>
        <p>회사명 : {targetStock.companyName}</p>
        <p>현재가 : {targetStock.currentPrice}</p>
        {pf && (
          <>
            <p>보유량 : {pf.amount}</p>
            <p>구매가 : {pf.buyingPrice}</p>
            <p
              style={{
                color: ratio < 0 ? "blue" : ratio > 0 ? "red" : "black",
              }}
            >
              등락률 :{ratio}%
            </p>
          </>
        )}
        <p>거래대금 : {amount ? targetStock.currentPrice * amount : "0"}</p>
        <form onSubmit={formHandler}>
          <input type="number" onChange={inputHandler} placeholder="거래량" />
          <br />
          <button onClick={formHandler}>확인</button>
          <button onClick={orderHandler}>취소</button>
        </form>
      </Modal>
    </>
  );
};

export default Order;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border-radius: 4px;
  padding: 1rem;
  background-color: white;
`;
