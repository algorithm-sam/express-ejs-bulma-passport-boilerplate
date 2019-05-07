const router = require('express').Router();

router.post('/addUser', (req, res) => {
    res.render('dashboard');
})



router.post('/editRoles', (req, res) => {
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