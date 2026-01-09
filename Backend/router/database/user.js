const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;

const userEntity = new Schema({
    id: { type: Number, required: true, unique: true}, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userEntity);

module.exports = { User };