const express = require('express');
const passport = require('./src/passport/index');
const mongoose = require('mongoose');
const app = express();
const helmet = require('helmet');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// const morgan = require('morgan');


//connect to mongodb
mongoose.connect('mongodb://localhost:27017/boilerPlate');

//add support for persistent session store;

// app.use(morgan());
mongoose.Promise = global.Promise;

// tell express to use helmet
app.use(helmet())

// set up view engines
app.set('view engine', 'ejs');


app.use(express.static('public'));


// allow your app to parse urlencoded and json encoded request data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//set up session
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'some-secret', // migrate this secret and set it in your config or enviromental variables sometime in the future
    store: new MongoStore({
        ttl: 1 * 24 * 60 * 60, // set session to expire in 24hours if requests are not made to the server
        touchAfter: 60 * 60, //update every one hour
        url: 'mongodb://localhost:27017/boilerPlate', // let the store connect using this url, i plan on changing this to use the existing connection on the server
    })
}));

// initialize passport
app.use(passport.initialize())

// inform passport of the session and tell the app to allow passport manage your sessions;
app.use(passport.session());

// setup your routes
const {
    usersRoute,
    defaultRoute
} = require('./src/routes/index');






//set up any other middleware in here


// set up your routing here
app.use('/', defaultRoute);
app.use('/users', usersRoute);

//setup your fallback route here
app.get('*', (req, res) => {
    res.end('404 Page not found')
})

// start your server

app.listen(process.env.port || 3000, () => {
    console.log(`App listening on port ${process.env.port||3000}`);

})