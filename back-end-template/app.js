// Express
const express = require('express');
const app = express();

// Morgan (show logs)
const morgan = require('morgan');

// CORS
const cors = require('cors');

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
        useUnifiedTopology: true
     }).then(test => console.log(chalk.blue(test ? "[MongoDB] Connexion MongoDB établit" : "Connexion MongoDB impossible"))); 
     

//------------------ Middlewares ----------------

app.use(morgan('dev'));

app.use(express.urlencoded({extended: false}));

app.use(express.json());

// Handling CORS
app.use(cors({
    origin: '*',
    methods: 'PUT, POST, DELETE, GET, PATCH'
}));

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
