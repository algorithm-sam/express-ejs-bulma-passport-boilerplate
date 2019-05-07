// const path = require("path");

const router = require('express').Router();
const Admin = require("../controllers/admin");
const mw = require("../middlewares");

router.post('/addAdmin', async (req, res) => {

    // use async await syntax to fetch the data


    // res.render('dashboard');
});



router.post('/editRoles', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('dashboard');
    } else {
        res.redirect('/login');
    }
});

router.post("/updatePaymentDetails/:userId", (req, res) => {
    if (req.isAuthenticated() && mw.isAdmin()) {
        let userId = req.params["userId"];
        let data = req.body;

        // Admin.updatePaymentRecord(data)
        // after updating the data send the user back to the referring page and pass a response to the client;

    } else {
        // send the user back to the referring page with an unauthorized error message

    }
});

router.get('/logout', (req, res) => {
    req.logout()
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;