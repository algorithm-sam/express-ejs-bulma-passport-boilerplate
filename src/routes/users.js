const router = require('express').Router();


router.get('/', (req, res) => {
    res.render('dashboard');
})

router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('dashboard');
    } else {
        res.send('please try authenticate yourself');
    }
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
})
module.exports = router;