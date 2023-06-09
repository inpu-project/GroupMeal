const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
    console.log("User: ", req.user);
    res.locals.user = req.user;
    next();
});


// 프로필 페이지
router.get('/profile', (req, res) => {
    res.render('profile', { title: '내 정보'});
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
router.get('/mealmate', (req, res) => {
    res.render('find_mealmate', { title: '밥친구 찾기'});
});

// 배달비 분담 찾기 페이지
router.get('/orderfee', (req, res) => {
    res.render('find_orderfee', { title: '배달비 분담 찾기'});
});

router.get('/create_room', (req, res) => {
    res.render('create_room');
});

router.get('/create_room_order', (req, res) => {
    res.render('create_room_order');
});



// 기본 라우터 
// router.get('/', (req, res, next) => {});
router.get('/', isLoggedIn, (req, res) => {
    // if(!res.locals.user) {
    //     res.render('login');
    //     return;
    // }
    res.render('home', {
        isLoggedIn: true,
    });
})

module.exports = router;