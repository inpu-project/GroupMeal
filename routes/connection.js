const User = require('./user');
const Connection = require('../models/connection');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const axios = require('axios');

const express = require('express');
const app = express();
app.use(express.json());

const router = express.Router();

router.use((req, res, next) => {
    console.log("User: ", req.user);
    res.locals.user = req.user;
    next();
});

// 방 등록 API
router.post('/create_match', async (req, res) => {
    try {
        const user = res.locals.user;
        const axiosResult = await axios({
            url: `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${req.body.lon}&y=${req.body.lat}&input_coord=WGS84`,
            method: 'get',
            headers:{Authorization: `KakaoAK ${process.env.KAKAO_ID}`},
        });
        console.log(axiosResult.data.documents);
        const connection = await Connection.create({
            hostUserId: user.id,
            name: req.body.name,
            food: req.body.food,
            type: req.body.type,
            url: ((req.body.url) ? req.body.url : 'url'),
            lon: req.body.lon,
            lat: req.body.lat,
            region: axiosResult.data.documents[0].address.region_2depth_name,
        });
        console.log(connection);
        res.redirect(`/wait_match?connectionId=${connection.id}`);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 신청취소
router.post('/wait_match', async (req, res) => {
    try {
        const user = res.locals.user;
        await Connection.destroy({
            where:{
                hostUserId: user.id
            }
        })
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 매칭 신청 API
router.post('/request_match', async (req, res) => {
    try {
        const {user, connection} = req.body.name;

        const request = await Request.create({
            requestUserId: user.id,
            hostUserId: connection.hostUserId,
            connectionId: connection.id,
        });

        res.json(request);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/matching_dontwant_cancel', async (req, res) => {
    try{
        const connectionId = req.query.connectionId;
        const connection = await Connection.findOne({ where: { id: connectionId } });
        connection.guestUserId = req.locals.user.id;
        connection.save();
        res.json(connection);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// 매칭 수락 및 성공 API
router.post('/request_accept', async (req, res) => {
    try {
        const { requestId } = req.body;

        // Find the request
        const request = await Request.findOne({ where: { id: requestId } });

        // Update the request status to 'matched'
        request.status = 'matched';
        await request.save();

        // change connection status, add to
        const connection = request.Connection;

        // update connection
        connection.status = 'matched';
        connection.guestUserId = request.requestUserId;
        await connection.save();

        res.json(request);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 매칭 거절 API
router.post('/request_reject', async (req, res) => {
    try {
        const { requestId } = req.body;

        // Find the request
        const request = await Request.findOne({ where: { id: requestId } });

        // Update the request status to 'rejected'
        request.status = 'rejected';
        await request.save();

        res.json(request);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 매칭 성공 후 유저별 정보 제공 API
router.get('/get_connection_info', async (req, res) => {
    try {
        const { connectionId } = req.body;

        // Find the request
        const connection = await Connection.findOne({ where: { id: connectionId } });

        let message = [];

        if(connection.type === 'deliver') {
            message.append(connection.url);
        }
        if(connection.type === 'meeting') {
            message.append(connection.Host.email);
            message.append(connection.Guest.email);
        }

        res.json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;