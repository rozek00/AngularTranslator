const { User } = require('../router/database/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
require('dotenv').config();

const addUser = async (userData) => {
    try {
        const saltRounds = parseInt(process.env.saltRounds, 10);
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        const user = new User({
            email: userData.email,
            password: hashedPassword
        });

        await user.save();
        console.log('Użytkownik zapisany!');
        return user; 
    } catch (err) {
        console.error('Błąd przy dodawaniu użytkownika:', err);
        throw err;
    }
};

const getUsers = async () => {
    try {
        const users = await User.find({}, '-password'); 
        console.log("dzialajj");
        return users;
    } catch (err) {
        throw err;
    }
};


const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Nieprawidłowy email lub hasło");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Nieprawidłowy email lub hasło");
    }

    const token = jwt.sign(
        { id: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' } 
    );

    return token ;
};

module.exports = { addUser, getUsers, loginUser };