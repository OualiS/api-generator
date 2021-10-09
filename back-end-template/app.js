// Express
const express = require('express');
const app = express();

// Morgan (show logs)
const morgan = require('morgan');

// Body-parser
const bodyParser = require('body-parser');

// Mongoose
const mongoose = require('mongoose');

require("dotenv").config();

const chalk = require('chalk');
//---------

const userRoutes = require('./api/routes/userRoutes');
const authRoutes = require('./api/routes/authRoutes');

// MongoDB atlas connection

mongoose.set('debug', true);

  mongoose.connect(
     process.env.MONGO_URL,
     {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
     }).then(test => console.log(chalk.blue(test ? "[MongoDB] Connexion MongoDB établit" : "Connexion MongoDB impossible"))); 
     

//------------------ Middlewares ----------------

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

// Handling CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, DELETE, GET, PATCH'
        );
        return res.status(200).json({});
    }
    next();
});

// routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


// Handling errors

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

//------

module.exports = app;
