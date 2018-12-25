const router = require('express').Router();
const User = require('../model/user');
router.get('/', (req, res) => {
    res.render('index');
})


router.get('/login', (req, res) => {
    res.render('login')
})


router.get('/register', (req, res) => {
    res.render('signup');
})

router.post('/signup', (req, res) => {
    let formData = req.body;

    let user = {
        username: formData.username,
        email: formData.email,
        password: formData.password
    };

    User.create(user)
        .then((user) => {
            res.send(user);
        })
        .catch(err => {
            res.send(err);
        })

})
module.exports = router;