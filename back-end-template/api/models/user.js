const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    identifiant: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    level : { type: String, required: true }    
});

module.exports = mongoose.model('user', userSchema);