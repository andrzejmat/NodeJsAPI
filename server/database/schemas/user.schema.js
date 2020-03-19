import { Schema } from "mongoose";
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema({
    first_name: {
        type: String,
        require: false
    },
    last_name: {
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

userSchema.plugin(passportLocalMongoose, {
    usernameLowerCase: true,
    usernameUnique: true,

    findByUsername: function (model, queryParameters) {
        // Add additional query parameter - AND condition - active: true
        queryParameters.active = true;
        return model.findOne(queryParameters);
    }

});


export default userSchema;