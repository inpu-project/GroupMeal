const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
    console.log("User: ", req.user);
    res.locals.user = req.user;
    next();
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보'});
});

router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('login');
})

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('email_signup');
})


// 기본 라우터 
// router.get('/', (req, res, next) => {});
router.get('/', (req, res) => {
    // if(!res.locals.user) {
    //     res.render('login');
    //     return;
    // }
    res.render('home');
})

module.exports = router;