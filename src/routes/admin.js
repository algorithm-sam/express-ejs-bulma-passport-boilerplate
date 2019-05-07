const router = require('express').Router();

router.post('/addAdmin', (req, res) => {
    res.render('dashboard');
})



router.post('/editRoles', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('dashboard');
    } else {
        res.redirect('/login');
    }
})

router.post("/updatePaymentDetails/:userId", (req, res) => {
    if (req.isAuthenticated() && )
})

router.get('/logout', (req, res) => {
    req.logout()
    req.session.destroy();
    res.redirect('/');
})
module.exports = router;