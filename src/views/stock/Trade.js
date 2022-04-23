import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components/macro";
import OrderButton from "./OrderButton";
import useStock from "../../utils/useStock";
import axios from "axios";
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
// axios.defaults.withCredentials = true;

const Trade = ({ backAPI, num, setCompany }) => {
    const compId = num;

    const { stockInfo, isLoading } = useStock();
    const pfAPI = backAPI + "/account/portfolio";
    const [pfs, setPfs] = useState([]);
    const [pfList, setPfList] = useState([]);

    useLayoutEffect(() => {
        let isMounted = true;
        getPfs(pfAPI)
            .then((response) => response[0].data)
            .then((data) => {
                if (isMounted) {
                    setPfs(data);
                    setPfList(data.map((stock) => stock.stockInfo.ticker));
                }
            });
        return () => {
            isMounted = false;
        };
    }, [stockInfo]);

    const getPfs = async (request) => {
        let pf = [];
        pf = pf.concat(
            await axios.get(request, {
                params: { competitionId: compId },
            })
        );
        return pf;
    };

    const own = stockInfo
        ? stockInfo.data.filter((stock) => pfList.includes(stock.ticker))
        : null;
    const notOwn = stockInfo
        ? stockInfo.data.filter((stock) => !pfList.includes(stock.ticker))
        : null;

    return (
        <>
            <Container>
                <Table>
                    <thead>
                        <th>단축코드</th>
                        <th>회사명</th>
                        <th>시가</th>
                        <th>현재가</th>
                        <th>전일대비</th>
                    </thead>
                    <tbody>
                        {own &&
                            own.map((stock, idx) => (
                                <tr key={idx} onClick={() => setCompany(stock)}>
                                    <td>{stock.ticker}</td>
                                    <td>{stock.companyName}</td>
                                    <td>{(stock.openPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                    <td>{(stock.currentPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                    <td
                                        style={{
                                            color:
                                                stock.openPrice < stock.currentPrice
                                                    ? "red"
                                                    : stock.openPrice > stock.currentPrice
                                                        ? "blue"
                                                        : "black",
                                        }}
                                    >
                                        {(stock.currentPrice - stock.openPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    </td>
                                </tr>
                            ))}
                        {notOwn &&
                            notOwn.map((stock, idx) => (
                                <tr key={idx} onClick={() => setCompany(stock)}>
                                    <td>{stock.ticker}</td>
                                    <td>{stock.companyName}</td>
                                    <td>{(stock.openPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                    <td>{(stock.currentPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                    <td
                                        style={{
                                            color:
                                                stock.openPrice < stock.currentPrice
                                                    ? "red"
                                                    : stock.openPrice > stock.currentPrice
                                                        ? "blue"
                                                        : "black",
                                        }}
                                    >
                                        {(stock.currentPrice - stock.openPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default Trade;

const Container = styled.div`
margin: 1rem auto;
display: flex;
justify-content: center;
`;

const Table = styled.table`
border-collapse: collapse;
td,th {
    padding: 8px;
}
tr {
// 드래그 금지
-webkit-user-select:none;
-moz-user-select:none;
-ms-user-select:none;
user-select:none;
cursor: pointer;
:hover{
  background-color: rgba(0,0,0,0.1);
  }
}
`;
