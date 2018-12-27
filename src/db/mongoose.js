let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let mongooseConnectionOption = {
    useFindAndModify: true,
    poolSize: 10,
    reconnectTries: Number.MAX_VALUE,
}


let connection = mongoose.connect('mongodb://localhost:27017/boilerPlate', mongooseConnectionOption, (err) => {
    console.log(err);
});


module.exports = mongoose;