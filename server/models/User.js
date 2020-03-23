const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: false
    },
    lastName: {
        type: String,
        require: false
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    resetToken: {
        type: String
    },
    resetTokenDate: {
        type: Date
    },
    active: {
        type: Boolean,
        require: true,
        default: false
    },
});


module.exports = User = mongoose.model('user', UserSchema);