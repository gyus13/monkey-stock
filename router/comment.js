const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Models = require('./../models');
const Comment = Models.Comment;

// 댓글 작성
router.post("/api/v1/comment", async (req, res) => {
    const { articleid } = req.body;
    const { authorization } = req.headers;

    if (!authorization) {
        return res.send({
            error: true,
            msg: "토큰이 존재하지 않음",
        });
    }

    const token = authorization.split(" ")[1];
    const secret = req.app.get("jwt-secret");

    jwt.verify(token, secret, async(err, data)=>{
        if (err) {
            res.send(err);
        }
        const post = {
            nickname: data.nickname,
            articleid,
            content: req.body.content,
        };

        const newComment = await new Comment(post).save();
        res.send(newComment);
    })
});

// 개별 댓글 불러오기
router.get("/api/v1/comment/:id", async (req, res) =>{

    const comments = await Comment.findAll({
        order: [['createdAt', 'ASC']],
        where: {articleid: req.params.id}
    })
    res.send(comments);
});

module.exports = router;