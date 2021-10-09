const User = require('../models/user');

//---
const mongoose = require('mongoose');

module.exports = {
  getAll: async (req, res, next) => {
    await User.find()
      .select()
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          users: docs
        };
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  },
  getOne: async (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    await Mission.findById(id)
      .select("_id identifiant password")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            user: doc
          });
        } else {
          res.status(400).json({
            message: 'No valide entry found for provided ID'
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }
};