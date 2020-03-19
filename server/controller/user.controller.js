import express from "express";
import {USER_EXISTS_ALREADY} from "../store/constant";
import { User } from "../database/models";
import passport from "passport";


const userController = express.Router();

/**
 * GET/
 * retrieve and display all Users in the User Model
 */
userController.get("/", (req, res) => {
  console.log(req);
    User.find({}, (err, result) => {
      res.status(200).json({
        data: result,
      });
    });
  });


  /**
 * POST/
 * Add a new User to your database
 */
userController.post("/add-user", (req, res) => {
    const { email, password } = req.body;
    User.register({username: email}, password)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      if(err.code == '11000') {
        res.status(400).send(USER_EXISTS_ALREADY)
        return;
      }
      res.status(400).send("unable to save to database");
    });
  });
 

userController.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = new User({
    username: email,
    password: password 
  });
  console.log(req.body);
  req.login(user, function(err){
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log(user)
      passport.authenticate("local",{
        
      })
        (req, res, function(){
          res.status(200).send('test'); 
      });
    }
  });
});

 export default userController;