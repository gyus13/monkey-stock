import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import axios from "axios";
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
// axios.defaults.withCredentials = true;

const Portfolio = ({ backAPI }) => {
  const pfAPI = backAPI + "/account/portfolio";
  const [pfs, setPfs] = useState([]);
  let params = window.location.pathname.substring(11);

  useEffect(() => {
    let isMounted = true;
    getPfs(pfAPI)
      .then((response) => response[0].data)
      .then((data) => {
        if (isMounted) setPfs(data);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const getPfs = async (request) => {
    let pf = [];
    pf = pf.concat(
      await axios.get(request, {
        params: { competitionId: params },
      })
    );
    return pf;
  };
  return (
    <Container>
      {console.log(params)}
      <Table>
        <thead>
          <tr>
            <th>단축 코드</th>
            <th>회사명</th>
            <th>구매가</th>
            <th>현재가</th>
            <th>보유량</th>
            <th>손익</th>
            <th>가치</th>
          </tr>
        </thead>
        <tbody>
          {pfs &&
            pfs.map((pf) => (
              <tr key={pf.id}>
                <td>{pf.stockInfo.ticker}</td>
                <td>{pf.stockInfo.companyName}</td>
                <td>{pf.buyingPrice}</td>
                <td>{pf.stockInfo.currentPrice}</td>
                <td>{pf.amount}</td>
                <td
                  style={{
                    color:
                      pf.profit > 0 ? "red" : pf.profit < 0 ? "blue" : "black",
                  }}
                >
                  {pf.profit}
                </td>
                <td>{pf.value}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Portfolio;

const Container = styled.div`
  margin: 1rem auto;
  width: 80%;
  display: flex;
  justify-content: center;
`;

const Table = styled.table`
  border: 1px solid;
  td,
  th {
    padding: 5px;
    border: 1px solid;
  }
`;
