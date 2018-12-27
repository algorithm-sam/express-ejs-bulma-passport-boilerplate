const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('dashboard');
})

router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('dashboard');
    } else {
        res.redirect('/login');
    }
})

router.get('/logout', (req, res) => {
    req.logout()
    req.session.destroy();
    res.redirect('/');
})
module.exports = router;