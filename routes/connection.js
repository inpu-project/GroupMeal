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

        const connection = await Connection.create({
            hostUserId: user.id,
            locate: req.body.locate
        });

        res.json(connection);
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