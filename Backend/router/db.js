const mongoose = require('mongoose');
const { User } = require('./database/user')
const bcrypt = require('bcrypt');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Połączono z MongoDB!"))
    .catch(err => console.error("Błąd połączenia:", err));


async function createUserEntity() {
    try {
        const saltRounds = parseInt(process.env.saltRounds, 10);
        const hashedPassword = await bcrypt.hash('Password123', saltRounds);

        const user = new User({ email: 'jan@example.com', password: hashedPassword });
        await user.save();
        console.log("Użytkownik zapisany!");
    } catch (err) {
        console.error("Błąd przy zapisie użytkownika:", err);
    }
}

module.exports = { createUserEntity };
