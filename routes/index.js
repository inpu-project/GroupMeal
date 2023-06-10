const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Op } = require('sequelize');
const Connection = require('../models/connection');
const User = require('../models/user');

const router = express.Router();

router.use((req, res, next) => {
    console.log("User: ", req.user);
    res.locals.user = req.user;
    next();
});


// 프로필 페이지
router.get('/profile', (req, res) => {
    const user = res.locals.user;
    let gender = "남";
    if(user.gender == false) gender = "여";
    res.render('profile', { 
        user: user,
        isLoggedIn,
        gender: gender,
    });
});

// 로그인 페이지
router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('login');
});

// 회원가입 페이지
router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('signup');
});

// 밥친구 찾기 페이지
router.get('/mealmate', async (req, res) => {
    const connections = await Connection.findAll({ where: {type: "meeting"}});
    const users = await User.findAll();
    res.render('find_mealmate', {
        isLoggedIn,
        connections: connections,
        users: users,
        age10: req.query.age10,
        age20: req.query.age20,
        age30: req.query.age30,
        age40: req.query.age40,
        age50: req.query.age50,
        male: req.query.male,
        female: req.query.female,
    });
});

// 배달비 분담 찾기 페이지
router.get('/orderfee', async (req, res) => {
    const connections = await Connection.findAll({  where: {type: "deliver"}});
    res.render('find_orderfee', {
        isLoggedIn,
        connections: connections,
    });
});

router.get('/create_room', (req, res) => {
    res.render('create_room', {
        isLoggedIn,
    });
});

router.get('/create_room_order', (req, res) => {
    res.render('create_room_order', {
        isLoggedIn,
    });
});

router.get('/wait_match', async (req, res) => {
    try{
        const user = res.locals.user;
        const connection = await Connection.findOne({ where: { hostUserId: user.id } });
        let gender = "남";
        if(user.gender == false) gender = "여";
        res.render('matching_cancel', { isLoggedIn, connection: connection, user: user, gender: gender});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


// 기본 라우터 
// router.get('/', (req, res, next) => {});
router.get('/', isLoggedIn, async (req, res) => {
    // if(!res.locals.user) {
    //     res.render('login');
    //     return;
    // }
    const connections = await Connection.findAll();
    const users = await User.findAll();
    res.render('home', {
        isLoggedIn,
        connections: connections,
        users: users,
    });
})

module.exports = router;