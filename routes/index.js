const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
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
    res.render('profile', { user, isLoggedIn, title: '내 정보'});
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
    const connections = await Connection.findAll({  where: {type: "meeting"}});
    const users = await User.findAll();
    res.render('find_mealmate', {
        isLoggedIn,
        connections: connections,
        users: users,
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