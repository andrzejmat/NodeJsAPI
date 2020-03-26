const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: false
    },
    lastName: {
        type: String,
        require: false
    },
    email: {
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

UserSchema.plugin(uniqueValidator);

module.exports = User = mongoose.model('User', UserSchema);