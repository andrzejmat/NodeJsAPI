const express     = require('express'); 
const bodyParser  = require('body-parser');

const HttpError = require('./models/http-error');

const cors        = require('cors');
const connectDB   = require('./config/db');

import {COULD_NOT_FIND_ROUTE, UNKNOWN_ERROR} from './lib/constant'

/// import controlers
const usersRoutes = require('./routes/api/users-routes');


/// Connect Dataabse
connectDB();

const app = express();

/// Set up CORS
app.use(cors());

// Use your dependencies here
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
  });


// API
app.use('/api/users', usersRoutes);



app.use((req, res, next) => {
    const error = new HttpError(COULD_NOT_FIND_ROUTE, 404);
    throw error;
  });


/// Error handling  
app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || UNKNOWN_ERROR });
  });

// Start Server here
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

console.log('PORT', PORT, 'VER:', process.env.VERSION, 'SYSTEM:', process.env.SYSTEM);
