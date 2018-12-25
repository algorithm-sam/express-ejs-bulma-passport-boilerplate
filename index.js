const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const {
    usersRoute,
    defaultRoute
} = require('./src/routes/index');


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



//set up sessions

app.use(session({
    saveUninitialized: false,
    resave: true,
    secret: 'some-secret'
}));


//set up any other middleware in here


// set up view engines


app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));
app.get('/', defaultRoute);
app.use('/users', usersRoute);
app.get('*', (req, res) => {
    res.end('404 Page not found')
})

// console.log(ENV);
app.listen(process.env.port || 3000, () => {
    console.log(`App listening on port ${process.env.port||3000}`);

})