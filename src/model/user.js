const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
//note always define the child schema first before passing it to the parent schema incase you do nest schemas
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        required: true,
        type: String
    }
})





// instance methods 
userSchema.methods = {
    // e.g
    updatePassword(password) {
        return true;
    }

}

// model methods... a wrapper to contain all methods available to the model
userSchema.statics = {
    authenticate(email, password) {

        return true;
    }
}


userSchema.pre("save", function (next) {
    let user = this;
    if (user.isModified("password")) {
        console.log(user);
        let salt = bcrypt.genSaltSync(10);
        if (!salt) next(false);
        let hashedPassword = bcrypt.hashSync(user.password, salt);
        if (!hashedPassword) next(false);
        user.password = hashedPassword;
        next();
    }
});



let Users = mongoose.model('Users', userSchema);
module.exports = Users;