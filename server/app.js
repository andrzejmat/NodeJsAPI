const express     = require("express"); 
const bodyParser  = require("body-parser");

const cors        = require("cors");
const connectDB   = require('./config/db');


/// import controlers
import { userRouter } from "./controller";


/// Connect Dataabse
connectDB();

const app = express();

/// Set up CORS
app.use(cors());

// Use your dependencies here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API
app.use('/', userRouter);


// Start Server here
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

console.log("PORT", PORT, "VER:", process.env.VERSION, "SYSTEM:", process.env.SYSTEM);
