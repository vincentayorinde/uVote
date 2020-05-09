import Sequelize from 'sequelize';
import db from '../../db/models';
import { expiireThisToken } from '../../utils'

export default {
    signUp: async (req, res) => {
        const {
            first_name,
            last_name,
            password,
            email,
            gender,
            role,
        } = req.body;

        const newEmail = email.toLowerCase();

        try {
            const user = await db.user.create({
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
                user: user.response(),
            });
        } catch (e) {
            console.log('the error', e);
            /* istanbul ignore next */
            return res.status(500).json({
                error: e.message,
            });
        }
    },

    signIn: async (req, res) => {
        const { email, password } = req.body;

        const newEmail = email.toLowerCase();

        try {
            console.log('the login try')
            const user = await db.user.findOne({
                where: { email: newEmail },
            });
            console.log('the user', user);
            if (!user) {
                return res.status(400).send({
                    error: 'Invalid Email or Password',
                });
            }
            const isPasswordValid = await user.passwordsMatch(password);
            if (!isPasswordValid) {
                return res.status(400).send({
                    error: 'Invalid email or password',
                });
            }

            return res.status(201).json({
                message: 'User Login Successful',
                user: user.response(),
            });
        } catch (e) {
            console.log('the error', e);
            /* istanbul ignore next */
            return res.status(500).json({
                error: e.message,
            });
        }
    },

    signOut: async (req, res) => {
        const token = req.headers['x-access-token'];
        await expiireThisToken(token);
        return res.status(200).send({
          message: 'Signed out successfully'
        });
      },
};
