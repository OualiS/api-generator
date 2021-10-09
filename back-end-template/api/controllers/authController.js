const User = require('../models/user');

//---
const mongoose = require('mongoose');

//---
const bcrypt = require("bcryptjs");

//---
const jwt = require("jsonwebtoken");
const chalk = require('chalk');

module.exports = {
  signup: async (req, res, next) => {
    await User.find({ identifiant: req.body.identifiant })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "L'identifiant existe déjà !"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(401).json({
                error: err
              });
            } else {
              id = new mongoose.Types.ObjectId()
              const user = new User({
                _id: id,                
                identifiant: req.body.identifiant,
                password: hash,
                email : req.body.email,
                level : req.body.level
              });
              console.log(chalk.red(user))
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(401).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  },
  signin: async (req, res, next) => {    
    console.log(req.body)
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {        
        return res.status(401).json({
          message: "Auth failed at email"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (!result) {
          return res.status(401).json({
            message: "Auth failed at password"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              identifiant: user[0].identifiant,
              userId: user[0]._id,
              level: user[0].level
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            user : user[0]

          });
        }
        res.status(401).json({
          message: "Auth failed here"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  }  
};