const mysql = require('mysql');

const connection = mysql.createConnection({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'events'
});

connection.connect((err) => {
    if (err) {
        console.log(`Connection failed with the following error: ${err}`);
    } else {
        console.log('Connected Successfully');
    }
})


module.exports = connection