const Sequelize = require('sequelize');
const db = require('../../db/models');

const signUp = async (req, res) => {
    const { first_name, last_name, password, email, gender, role } = req.body;

    const newEmail = email.toLowerCase();

    try {
        const user = await db.users.create({
            first_name,
            last_name,
            email: newEmail,
            password,
            gender,
            role,
        });
        console.log('the user', user);

        return res.status(201).json({
            message: 'User Registration Successful',
            user,
        });
    } catch (e) {
        console.log('the error', e);
        /* istanbul ignore next */
        return res.status(500).json({
            error: e.message,
        });
    }
};

module.exports = { signUp };
