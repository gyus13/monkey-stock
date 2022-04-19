const express = require("express");
const router = express.Router();
const Models = require('./../models');
const Topic = Models.Topic;
const Article = Models.Article;

// 토픽 등록
router.post("/api/v1/topic", async (req, res) => {
    const post = {
        tags: req.body.tags,
    };

    const newTopic = await new Topic(post).save();
    res.send(newTopic);
});

// 토픽 불러오기 (글 쓸때 사용)
router.get("/api/v1/topic", async (req, res) =>{
    const topics = await Topic.findAll({
        order: [['createdAt', 'ASC']],
    });
    res.send(topics);
});

// 전체 글 카테고리 페이징
router.get("/api/v1/topic/all/", async(req,res)=> {
    try {
        let page = parseInt(req.query.page);
        let size = parseInt(req.query.size);

        const offset = page ? page*size : 0;

        const articles = await Article.findAndCountAll({
            order: [['createdAt', 'DESC']],
            limit: size,
            offset: offset,
        })
        res.send(articles);
    } catch (error) {
        res.send(error);
    }
});

// 토픽별 글 카테고리 페이징
router.get("/api/v1/topic/:tags/", async(req,res)=> {
    try {
        let page = parseInt(req.query.page);
        let size = parseInt(req.query.size);

        const offset = page ? page*size : 0;

        const articles = await Article.findAndCountAll({
            order: [['createdAt', 'DESC']],
            limit: size,
            offset: offset,
            where: {tags: req.params.tags}
        })
        res.send(articles);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;