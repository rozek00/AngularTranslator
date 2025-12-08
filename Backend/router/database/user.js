const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;

const userEntity = new Schema({
    email: String,
    password: String
});

const User = mongoose.model('User', userEntity);

module.exports = { User };