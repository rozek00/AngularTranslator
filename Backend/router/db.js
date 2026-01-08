const { User } = require('./database/user')
const bcrypt = require('bcrypt');

async function createUserEntity() {
    try {
        const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
        const hashedPassword = await bcrypt.hash('Test123', saltRounds);

        const existingUser = await User.findOne({ email: 'jan@example.com' });
        if (existingUser) {
        console.log('Użytkownik już istnieje');
        return;
        }

        const lastUser = await User.findOne().sort({ _id: -1 }); 
        const newId = lastUser ? lastUser._id + 1 : 1;
        
        const user = new User({
        _id: newId,
        email: 'jan@example.com',
        password: hashedPassword
        });

        await user.save();
        console.log('Użytkownik zapisany!');
    } catch (err) {
        console.error('Błąd przy zapisie użytkownika:', err);
    }
}

module.exports = { createUserEntity };
