import axios from "axios";
axios.defaults.withCredentials = true;

function setAuthToken(token){
    if(token){
        // 로그인 성공시 header 에 토큰 추가
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        
        // console.log(axios.defaults.headers.common.Authorization)
    } else {
        // 로그인 실패시 authorization 제거
        delete axios.defaults.headers.common.Authorization;
    }
}

export default setAuthToken;