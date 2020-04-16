import { sanitize } from 'indicative';
import { messages, validatorInstance, sanitizeRules } from '../../utils';

export default {
    signUp: async (req, res, next) => {
        const rules = {
            first_name: 'required|alpha',
            last_name: 'required|alpha',
            email: 'required|email|unique:user',
            password: 'required|min:8|max:30',
        };

        let data = req.body;
        const email = data.email.toLowerCase();
        data = {
            ...data,
            email,
        };

        sanitize(data, sanitizeRules);
        try {
            await validatorInstance.validateAll(data, rules, messages);
            next();
        } catch (e) {
            console.log('the error', e);
            return res.status(400).json({
                message: e,
            });
        }
    },

    signIn: async (req, res, next) => {
        const rules = {
            email: 'required|email|unique:user',
            password: 'required|min:8|max:30',
        };

        let data = req.body;
        const email = data.email.toLowerCase();
        data = {
            ...data,
            email,
        };

        sanitize(data, sanitizeRules);
        try {
            await validatorInstance.validateAll(data, rules, messages);
            next();
        } catch (e) {
            return res.status(400).json({
                message: e,
            });
        }
    },
};
