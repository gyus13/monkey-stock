const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Models = require('./../models');
const Article = Models.Article;
const Comment = Models.Comment;
const Topic = Models.Topic;

// 게시글 작성
router.post("/api/v1/article", async (req, res) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.send({
                error: true,
                msg: "토큰이 존재하지 않음",
            });
        }

        const token = authorization.split(" ")[1];
        const secret = req.app.get("jwt-secret");

        jwt.verify(token, secret, async (err, data) => {
            if (err) {
                res.send(err);
            }
            const post = {
                nickname: data.nickname,
                title: req.body.title,
                content: req.body.content,
                tags: req.body.tags,
            };

            const newArticle = await new Article(post).save().catch(error => {
                res.send(error);
            });

            res.send(newArticle);
        })
    } catch (err) {
        console.log(err);
    }
});

// 게시글 삭제
router.delete("/api/v1/article/", async (req, res) => {
    const target = await Article.findOne({ where: { id: req.query.id }})

    if(target){
        try {
            target.destroy();
            res.send({msg:"삭제 되었음"})
        } catch (error) {
            res.send({msg:"삭제중 에러남"})
        }
    } else {
        res.send({msg: "그런 게시글 못찾음"})
    }
});

// 전체 5개 게시글 불러오기
router.get("/api/v1/article/tags/all", async (req, res) => {
    const articles = await Article.findAll({
        order: [['createdAt', 'DESC']],
        limit: 5,
    });
    console.log(articles);
    res.send(articles);
});

// 토픽별로 5개 게시글 불러오기
router.get("/api/v1/article/tags/:tags", async(req,res)=> {
    const articles = await Article.findAll({
        order: [['createdAt', 'DESC']],
        limit: 5,
        where: {tags: req.params.tags}
    });
    const topic = await Topic.findOne({
        where: {tags: req.params.tags}
    })
    
    res.send({
        topic:topic.tags, 
        articles:articles
    });
});

// 개별 게시글 페이지를 불러오기
router.get("/api/v1/article/:id", async (req, res) => {
    const articles = await Article.findOne({
        where: { id: req.params.id }
    })
    Article.increment({ view: 1 }, { where: { id: req.params.id } })
    res.send(articles);
});

module.exports = router;