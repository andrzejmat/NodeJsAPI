// Import all dependencies & middleware here
import express from "express"; 
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";


/// import constanst
import {MONGOOSE_URL, MONGO_PARAMS, SERVER_PORT , SERVER_HOST } from "./store/config";

/// import controlers
import { userController } from "./controller";

import { User } from "./database/models";
const app = express();

/// Set up CORS
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    console.log("deserializacja");
    done(err, user);
  });
});


// Use your dependencies here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API
app.use('/', userController);


// Start Server here
app.listen(SERVER_PORT, SERVER_HOST);
  console.log("HOST:", SERVER_HOST, "PORT", SERVER_PORT, "VER:", process.env.VERSION, "SYSTEM:", process.env.SYSTEM);
mongoose.connect(MONGOOSE_URL, MONGO_PARAMS )
.then(() => {
    console.log("Conneted to mongoDB");
  });