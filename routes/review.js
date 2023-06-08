const express = require('express');
const User = require('../models/user');
const Evaluation = require('../models/evaluation');
const Review = require('../models/review')
const Connection = require('../models/connection')

const router = express.Router();

// 리뷰 페이지 등록
app.get('/review', async (req, res) => {
    try{
        res.sendFile('views/review.html');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/review', async (req, res) => {
    try {
        let review;
        const {connection, user} = req.body.name;
        if(connection.hostUserId === user.id){
            review = await Review.create({
                userEvaluateId: user.id,
                userRecieveId: connection.guestUserId,
            });
        }
        if(connection.guestUserId === user.id){
            review = await Review.create({
                userEvaluateId: user.id,
                userRecieveId: connection.hostUserId,
            });
        }
        res.json(review);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 리뷰페이지 저장
app.post('/evaluation', async (req, res) => {
    try {
        const review = req.body.name;
        const {nice, ontime, fun, communication, again, comfortable} = req.body;
        let evaluation = await Evaluation.findByPk(review.userRecieveId);
        evaluation.userId = review.userRecieveId;
        evaluation.nice += nice;
        evaluation.ontime += ontime;
        evaluation.fun += fun;
        evaluation.communication += communication;
        evaluation.again += again;
        evaluation.comfortable += comfortable;
        await evaluation.save();
        res.json(evaluation);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/delete_review', async (req, res) => {
    try{
        const review = req.body.name;
        const idx = await Review.indexOf(review);
        if (idx > -1) users.splice(idx, 1)
        res.json(idx);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})