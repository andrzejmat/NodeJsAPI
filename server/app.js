// Import all dependencies & middleware here
import express from "express";// Init an Express App. 
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { userController } from "./controller";

const MONGOOSE_URL = "mongodb+srv://automate:automate@cluster0-h3l9t.azure.mongodb.net/docShare?retryWrites=true&w=majority";
const app = express();

// Use your dependencies here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API
app.use('/', userController);

// Start Server here
app.listen(8080, () => {
   console.log("Server is running on port 8080 !");
   mongoose.connect(MONGOOSE_URL).then(() => {
    console.log("Conneted to mongoDB");
  });
});