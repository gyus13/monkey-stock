const loginCheck = async () => {
    if(localStorage.getItem('accessToken') === "undefined" || localStorage.getItem('accessToken') === null){
        return false;
    } else {
        return true;
    }
};

export default loginCheck;