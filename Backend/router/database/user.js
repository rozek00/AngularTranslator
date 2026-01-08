const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;

const userEntity = new Schema({
    _id: Number,
    email: String,
    password: String
});

const User = mongoose.model('User', userEntity);

module.exports = { User };