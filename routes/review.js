const express = require('express');
const User = require('../models/user');
const Evaluation = require('../models/evaluation');
const Review = require('../models/review')
const Connection = require('../models/connection')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
    console.log("User: ", req.user);
    res.locals.user = req.user;
    next();
});


// 리뷰 페이지 등록
router.get('/review', async (req, res) => {
    try{
        res.sendFile('views/review.html');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/review', async (req, res) => {
    try {
        let review;
        const connectionId = req.body.connectionId;
        const user = res.locals.user;
        const connection = await Connection.findByPk(connectionId);
        if(connection.hostUserId === user.id){
            review = await Review.create({
                userEvaluateId: user.id,
                userReceiveId: connection.guestUserId,
            });
        }
        if(connection.guestUserId === user.id){
            review = await Review.create({
                userEvaluateId: connection.hostUserId,
                userReceiveId: user.id,
            });
        }
        res.redirect('/review');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 리뷰페이지 저장
router.post('/evaluation', async (req, res) => {
    try {
        const {ontime, fun, communication, comfortable, nice} = req.body;
        const review = await Review.findOne({where: {userEvaluateId: res.locals.user.Id} });
        const user1 = await User.findByPk(review.userReceiveId);
        if(ontime === 'true') user1.ontime++;
        if(fun === 'true') user1.fun++;
        if(communication === 'true') user1.communication++;
        if(comfortable === 'true') user1.comfortable++;
        if(nice === 'true') user1.nice++;
        await user1.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/report', (req, res) => {
    
})

module.exports = router;