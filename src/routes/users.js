const router = require('express').Router();


router.get('/users', (req, res) => {
    res.render('dashboard');
})

module.exports = router;