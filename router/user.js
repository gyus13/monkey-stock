const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Models = require('./../models');
const { status } = require("express/lib/response");
const User = Models.User;

// 로그인
router.post("/api/v1/user/login", async (req, res) => {
    const loginUser = await User.findOne({ where: { userid: req.body.userid } });
    if (loginUser) {
        const password_valid = await bcrypt.compare(req.body.password, loginUser.password);
        if (password_valid) {
            const secret = req.app.get("jwt-secret");
            const token = jwt.sign(
                {
                    // id: loginUser.id,
                    userId: loginUser.userid,
                    nickname: loginUser.nickname,
                    // role: loginUser.role,
                },
                secret,
                {
                    expiresIn: "1d",
                    issuer: "sesac",
                    subject: "auth",
                }
            );
            res.send({
                userid: loginUser.userid,
                nickname: loginUser.nickname,
                role: loginUser.role,
                token: token,
                error: false,
                msg: "로그인 성공",
            });
        } else {
            return res.send({
                error: true,
                msg: "비밀번호 틀림",
            });
        }
    } else {
        return res.send({
            error: true,
            msg: "아이디 틀림",
        });
    }
});

// 회원가입
router.post("/api/v1/user/register", async (req, res) => {

    const salt = await bcrypt.genSalt(10);

    await User.create({
        userid: req.body.userid,
        password: await bcrypt.hash(req.body.password, salt),
        nickname: req.body.nickname,
    }).catch((err)=>{
        res.send(err)
    }).then((result)=>{
        res.send(result);
    })
});

// 회원탈퇴
router.delete("/api/v1/user/leave", async (req, res) => {

    const loginUser = await User.findOne({ where: { userid: req.body.userid }})

    if(loginUser){
        try {
            loginUser.destroy();
            res.send({msg:"계정 삭제 되었음"})
        } catch (error) {
            res.send({msg:"계정 삭제중 에러남"})
        }
    } else {
        res.send({msg: "그런 계정 못찾음"})
    }
});
    

// 사용자 정보 제공
router.get("/api/v1/user/userinfo", (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.send(false);
    }

    const token = authorization.split(" ")[1];
    const secret = req.app.get("jwt-secret");
    jwt.verify(token, secret, (err, data) => {
        if (err) {
            res.send(err);
        }
        User.findOne({
            where: {nickname: data.nickname}
        }).then((result)=>{
            res.send(result.nickname);
        })
    });
});

// 사용자 확인
router.get("/api/v1/user/verify", (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.send(false);
    }
    const token = authorization.split(" ")[1];
    const secret = req.app.get("jwt-secret");
    jwt.verify(token, secret, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send({
            nickname: data.nickname,
        });
    });
});

module.exports = router;